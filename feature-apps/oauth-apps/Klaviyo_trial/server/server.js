exports = {

    onSubmissionComplete: async function (args) {
        console.log("onSubmissionComplete", args);
    },

    addContact: async function (args) {
        return await processAddContact(args);
    },
    fetchContacts: async function () {
        console.log("Entered inside fetch contacts")
        return await processFetchContacts();
    }
};

const processAddContact = async (args) => {
  try {
    console.log('args are: ', JSON.stringify(args));
      const { email, firstName, lastName } = args?.data?.data;
      
      if (!email) {
          return { status: 400, data: { error: 'Email is required' } };
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

      const response = await $Fetch.post(apiUrl, contactData, {
          headers: {
              'Authorization': "Bearer <%=access_token%>", // Fix incorrect token placeholder
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Revision': '2023-10-15'
          },
          isOAuth: true, 
          maxAttempts: 5
      });

      return { status: 200, data: response.data };
  } catch (error) {
      console.error("Error adding contact:");
      if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Response Data:", error.response.data);
      } else {
          console.error("Error Message:", error.message);
      }
      return { status: 500, data: { error: error.response?.data || 'Error adding contact' } };
  }
};

const processFetchContacts = async () => {
    try {
        const apiUrl = 'https://a.klaviyo.com/api/profiles/';
        console.log("Entered inside fetch contacts")
       
        const response = await $Fetch.get(apiUrl, {
            headers: {
                'Authorization': "Bearer <%=access_token%>",
                'Accept': 'application/json',
                'Revision': '2023-10-15'
            },
            isOAuth: true, 
            maxAttempts: 5
        });
        return { status: 200, data: response.data };
    } catch (error) {
        console.error('Error fetching contacts:', error.response?.data || error.message);
        return { status: 500, data: { error: error.response?.data || 'Error fetching contacts' } };
    }
};
