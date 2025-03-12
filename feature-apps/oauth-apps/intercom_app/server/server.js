exports = {
  onSubmissionComplete: async function (args) { // <-- Add 'async' here
    console.log('Hello, Survey Id is ' + args['data']['survey_id']);

    try {
      console.log("🚀 Survey Submission Detected!");

      // Extract Contact Details
      const email = args.data.contact.email;
      const firstName = args.data.contact.first_name;
      const lastName = args.data.contact.last_name;
      const fullName = `${firstName} ${lastName}`;
      const phone = args.data.contact.mobile;

      if (!email) {
        console.error("❌ No email found in submission. Skipping Intercom update.");
        return;
      }

      // Create or Update Contact in Intercom
      let contactData = {
        email: email,
        name: fullName,
        phone: phone,
        role: "user"
      };

      let response;
      
      // Attempt to create a new contact
      response = await $Fetch.post("https://api.intercom.io/contacts", contactData, {
        headers: {
          Authorization: `Bearer <%=access_token%>`,
          "Content-Type": "application/json"
        },
        isOAuth: false,
        maxAttempts: 5
      });
      
      console.log("✅ New contact created in Intercom.", JSON.stringify(response));
      
      if (response.status === 409) {
        console.error("⚠️ Contact already exists, updating instead.");

        const errorMessage = response?.data?.errors?.[0]?.message || response?.body?.errors?.[0]?.message;
console.log("🔍 Error message received:", errorMessage);

if (errorMessage) {
  const existingContactIdMatch = errorMessage.match(/id=([a-f0-9]+)/);
  console.log("🔍 Extracted Contact ID:", existingContactIdMatch ? existingContactIdMatch[1] : "No match found");

  if (existingContactIdMatch) {
    const existingContactId = existingContactIdMatch[1];

    // Proceed with updating the contact
    response = await $Fetch.put(
      `https://api.intercom.io/contacts/${existingContactId}`,
      contactData,
      {
        headers: {
          Authorization: "Bearer <%=access_token%>",
          "Content-Type": "application/json"
        },
        isOAuth: true,
        maxAttempts: 5
      }
    );

    console.log("✅ Existing contact updated successfully in Intercom.", JSON.stringify(response));
  } else {
    console.error("❌ Could not extract existing contact ID from error message.");
  }
} else {
  console.error("❌ No error message found in response.");
}

      }
    } catch (error) {
      console.error("❌ Error while creating/updating contact in Intercom:", error);
    }
  }
};