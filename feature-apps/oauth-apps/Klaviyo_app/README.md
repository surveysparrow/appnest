## An OAuth application for Klaviyo using PKCE

This is a simple OAuth application for Klaviyo using PKCE and passport js.

### Prerequisites

- Node.js
- npm
- Klaviyo account
- Klaviyo app 
- Authentication variables

### Installation

1. Clone the repository
2. Install the dependencies (npm install)
3. Run the application (npm start)

### config files

- create a config/oauth_config.json file:

```json
{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  .
  .
  .
  "options": {
    "scope": "Your scope mentioned in the Klaviyo app"
  }
}
```

### Run the application

- ssdk run or sudo ssdk run