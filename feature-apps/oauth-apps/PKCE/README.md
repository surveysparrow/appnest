# Klaviyo OAuth 2.0 with PKCE Integration

This Folder demonstrates how to authenticate with Klaviyo using OAuth 2.0 with PKCE, fetch an access token, create and retrieve contacts from Klaviyo's API.

## Action Done
- OAuth 2.0 Authorization with PKCE
- Fetch Klaviyo Contacts
- Create & Store Contacts
- Fetch Contacts

## Prerequisites
- Node.js (>= 14.x)
- npm
- Klaviyo Developer Account

## Installation

1. Clone this repository:

2. Create a `.env` file and add your credentials:
   ```env
   CLIENT_ID= klaviyo_client_id
   CLIENT_SECRET= klaviyo_client_secret
   REDIRECT_URI= http://localhost:3000/callback
   ```

## Usage

### 1️. Start the Server
```sh
npm app.js
```
Server runs at `http://localhost:3000`.

### 2️ Authorize Application
1. Open `http://localhost:3000` in a browser.
2. Click the *Authorize* button to authenticate with Klaviyo.
3. After authentication, you will receive an access token.

### 3 Add Contacts
1. Add contacts to Klaviyo.
2. Click *Add Contacts*.

### 4️ Fetch Contacts
1. Click *Fetch Contacts*.
2. The list of contacts will be displayed.