const dbHelper = require('./dbHelper');
const constants_helper = require('../constants/intercomConstants');

const saveContactMapping = async (updatedContactMapping) => {
    const constantsHelper = await constants_helper;
    try {
        const db_helper = await dbHelper;
        let contactMapping = await db_helper.getDb(constantsHelper.dbAttributes.contactMapping);
        if (!contactMapping || !Object.keys(contactMapping).length) {
            contactMapping = {};
        }
        if (updatedContactMapping) {
            contactMapping = updatedContactMapping;
        }
        await db_helper.saveDataToDb(constantsHelper.dbAttributes.contactMapping, contactMapping);
        console.log("contactMapping saved to the db: ", contactMapping);
        return { "success": true, "message": "Contact Mapping saved" };
    } catch (error) {
        console.log("Error in saving contact mapping: ", error);
        throw error;
    }
};


function getContactsObject(allContacts, mappings) {
    return allContacts.map(contact => {
        // Create a transformed contact object
        const transformedContact = {};

        // Apply mappings from source fields to destination fields
        Object.entries(mappings).forEach(([sourceField, destField]) => {
            if (sourceField in contact) {
                transformedContact[destField] = contact[sourceField] || PLACEHOLDER;
            } else {
                transformedContact[destField] = PLACEHOLDER;
            }
        });

        // Special case for mobile/phone field
        // Set default mobile number if mobile and phone are empty or placeholder
        if ((transformedContact?.mobile?.trim() !== PLACEHOLDER && transformedContact?.mobile) ||
            (transformedContact?.phone?.trim() !== PLACEHOLDER && transformedContact?.phone)) {
        }
        else {
            transformedContact.mobile = DEFAULT_MOBILE;
        }

        if (transformedContact.company_id) {
            transformedContact.company_id = 1234567890;
        }
        // Keep only contacts with email
        if (transformedContact.email && transformedContact.email !== PLACEHOLDER) {
            if (transformedContact.hasOwnProperty('company_id')) {
                // delete transformedContact.company_id;
                transformedContact.company_id = 100000001;
            }
            return transformedContact;
        }

        return null;
    }).filter(contact => contact);
}


module.exports = {
    saveContactMapping,
    getContactsObject
};