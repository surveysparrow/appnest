import React, { useState } from 'react';

const AddContact = ({client}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const addContacts = async () => {
        await client.request.invoke("addContact",{
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        })
    };

    return (
        <div>
            <h2>Add Contact</h2>
            <input type="text" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" id="firstName" placeholder="First Name (optional)" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" id="lastName" placeholder="Last Name (optional)" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <button onClick={addContacts}>Add Contact</button>
        </div>
    );
};

export default AddContact;