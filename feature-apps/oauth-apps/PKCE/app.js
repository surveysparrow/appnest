const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/callback', (req, res) => {
    const authorizationCode = req.query.code;
    const state = req.query.state;

    if (!authorizationCode) {
        return res.send('Error: Authorization code not found');
    }

    console.log('Received authorization code:', authorizationCode);

    res.send(`
        <script>
            console.log("inside script");
            const codeVerifier = localStorage.getItem('code_verifier');
            console.log('Code Verifier:', codeVerifier);
            fetch('/exchange-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ authCode: '${authorizationCode}', codeVerifier })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Access Token:', data.accessToken);
                localStorage.setItem('access_token', data.accessToken);
                document.body.innerHTML = '<h1>Access Token Received!</h1>';
            })
            .catch(err => {
                console.error('Error exchanging token:', err);
                document.body.innerHTML = '<h1>Error Fetching Token</h1>';
            });
        </script>
    `);
});

app.post('/exchange-token', async (req, res) => {
    const { authCode, codeVerifier } = req.body;

    console.log('Received authCode:', authCode);
    console.log('Received codeVerifier:', codeVerifier);

    if (!authCode || !codeVerifier) {
        return res.status(400).json({ error: 'Missing authCode or codeVerifier' });
    }

    const tokenUrl = 'https://a.klaviyo.com/oauth/token';
    const requestData = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier
    });

    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedAuth = Buffer.from(authString).toString('base64');

    console.log('Sending request to:', tokenUrl);
    console.log('Request data:', requestData.toString());

    try {
        const response = await axios.post(tokenUrl, requestData, {
            headers: {
                'Authorization': `Basic ${encodedAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log('Access Token:', response.data.access_token);
        // Get the access token from the response
        const accessToken = response.data.access_token;
        res.json({ accessToken });
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || 'Error fetching access token' });
    }
});

//Endpoint to Add Contacts
app.post('/add-contact', async (req, res) => {
    const accessToken = req.body.accessToken;
    const { email, firstName, lastName } = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const apiUrl = 'https://a.klaviyo.com/api/profiles/';
    
    const contactData = {
        data: {
            type: "profile",
            attributes: {
                email: email,
                first_name: firstName,
                last_name: lastName
            }
        }
    };

    try {
        const response = await axios.post(apiUrl, contactData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Revision': '2023-10-15'
            }
        });

        console.log('Contact Added:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error adding contact:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || 'Error adding contact' });
    }
});


//Fetch Contacts Endpoint
app.get('/contacts', async (req, res) => {
    const accessToken = req.query.accessToken; // Get access token from query parameter
    
    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    const apiUrl = 'https://a.klaviyo.com/api/profiles/';
    
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Revision': '2023-10-15'
            }
        });

        console.log('Contacts:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching contacts:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || 'Error fetching contacts' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});