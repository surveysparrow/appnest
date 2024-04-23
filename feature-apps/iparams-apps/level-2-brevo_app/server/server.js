// Overview - An app that automatically creates a contact on the Brevo platform when a contact is created in SurveySparrow. This is done with the help of "sib-api-v3-sdk" NPM package.

// How to use? - Pass the access token obtained from Brevo in the Iparams and simulate the onContactCreate with sample payload and you can see the contact created on Brevo as well. 

const SibApiV3Sdk = require('sib-api-v3-sdk');

exports = {
  onContactCreate: async function (args) {
    
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];

    const {brevo_api_key} = $Iparams.get()
    apiKey.apiKey = brevo_api_key

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = args.data.attrs.email;
    createContact.firstName = args.data.attrs.first_name
    createContact.lastName = args.data.attrs.last_name

    apiInstance.createContact(createContact).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });

    return {"data":"Contact Created Successfully"}
  }

};
