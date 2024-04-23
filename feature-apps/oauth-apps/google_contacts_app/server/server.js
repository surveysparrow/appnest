exports = {
  onContactCreate: async function (args) {
    const headers = { Authorization: "Bearer <%= access_token %>" };//Access will be stored by AppNest and will be replaced at the time of API call.
    const reqData = { headers: headers, isOAuth: true };
    try {
      await createGoogleContact(args, reqData);
    } catch (error) {
      console.log(error.response);
    }
  },
};
async function createGoogleContact(args, reqData) { //Function for sending data to google via its public API
  try {
    const responseFromGoogle = await $Fetch.post(
      "https://people.googleapis.com/v1/people:createContact",
      {
        names: [
          {
            givenName: args["data"]["attrs"]["first_name"],
            familyName: args["data"]["attrs"]["last_name"],
          },
        ],
        phoneNumbers: [
          {
            value: args["data"]["attrs"]["mobile"],
            type: "mobile",
          },
          {
            value: args["data"]["attrs"]["phone"],
            type: "work",
          },
        ],
        emailAddresses: [
          {
            value: args["data"]["attrs"]["email"],
            type: "work",
          },
        ],
      },
      reqData
    );
    console.log("Contact Created in onContactCreate", responseFromGoogle);
  } catch (error) {
    console.log("error while sending to google");
    throw error;
  }
}
