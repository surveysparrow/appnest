# An OAuth 2.0 application for Klaviyo in AppNest

### This is a simple OAuth application for Klaviyo using PKCE and passport js.

## Use Case

This app is used to add a contact to Klaviyo and also fetch the contacts from Klaviyo.
The OAuth flow is implemented using PKCE and passport js.

## Prerequisites

- Node.js
- npm
- Klaviyo account
- Klaviyo app 
- Authentication variables

## Installation

1. Clone the repository
2. Install the dependencies (npm install)


## config files

- create a config/oauth_config.json file:

```json
{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  .
  .
  .
  "options": {
    "scope": "Your scopes mentioned in the Klaviyo app"
  }
}
```

## Run the application

- ssdk run or sudo ssdk run
- Your application will starting running on https://localhost:30001
- You can test the backend working of your appilcation on http://localhost:30001/web/test
- You can test the application on the marketplace by appending "?dev=true" to your SurveySparrow URL.