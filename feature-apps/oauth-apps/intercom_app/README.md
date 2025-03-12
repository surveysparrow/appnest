# Intercom Contact Synchronization App

## Description

This app listens for survey submissions and automatically updates contacts in Intercom based on the submitted data. If a contact with the same email already exists, the app updates the existing contact instead of creating a new one.

## Use Case

When a user submits a survey, their contact details are extracted and sent to Intercom:

- If the contact does not exist, the app attempts to create a new contact.
- If the contact already exists, their details are updated.

## Features Demonstrated

| Feature              | Description |
|----------------------|-------------|
| **onSubmissionComplete** | Listens for survey submissions and triggers contact update in Intercom. |

## Prerequisites

- You must have an Intercom account and access token.
- Ensure that the Survey API provides necessary contact details (email, first name, last name, phone number).
- `$Fetch` must be available to make HTTP requests.

## OAuth Implementation

- This app uses OAuth for authentication with Intercom.
- The Authorization header in API requests includes the access token retrieved via OAuth.
- Ensure that the OAuth token has the necessary permissions to create and update contacts in Intercom.

## Procedure to Run the App Locally

1. Ensure that your environment has all required dependencies installed.
2. Set up Intercom API credentials and obtain an OAuth access token.
3. Start the app and trigger survey submissions to test the contact update functionality.

## Additional Notes

- The app only updates contacts if an email is present in the submission.
- Proper error handling ensures that API failures do not disrupt other operations.
- Use the logging mechanism to track API responses and troubleshoot issues.

## Future Enhancements

- Add retry mechanisms for failed API requests.
- Implement batch processing for handling multiple submissions efficiently.