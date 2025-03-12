import React, { useState } from 'react';


const Contacts = ({client}) => {
    const [contacts, setContacts] = useState([]);
    const FetchContact = async () => {
        try {
            const data = await client.request.invoke("fetchContacts",{});
            const emails = [];
            const parsedData = JSON.parse(data);
            console.log("parsedData is: ", parsedData);
            for(let i = 0; i < parsedData["body"]["data"]["data"].length; i++) {
                if(parsedData["body"]["data"]["data"][i]["attributes"]["email"]) {
                    emails.push(parsedData["body"]["data"]["data"][i]["attributes"]["email"]);
                }
            }
            setContacts(emails);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            alert("Failed to fetch contacts.");
        }
    };

    return (
        <div>
            <h2>Contacts</h2>
            <button onClick={FetchContact}>Fetch Contacts</button>
            <ul id="contactsList">
                {contacts.length > 0 ? (
                    contacts.map(contact => (
                        <li key={contact}>
                            {contact}
                        </li>
                    ))
                ) : (
                    <li>No contacts found.</li>
                )}
            </ul>
        </div>
    );
};

export default Contacts;