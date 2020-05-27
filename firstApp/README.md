## Create a first simple app to understand structure.

- Use 'fdk run' to execute this app
- Open your freshdesk ticket as shown in example url https://subdomain.freshdesk.com/helpdesk/tickets/1?dev=true
- You can see ur app in right sidebar as we have given ticket_sidebar in manifest.json file.
![](https://github.com/AyeshaKulsum/freshworksApps/blob/master/pictures/first.PNG)
### Folder structure explained

    .
    ├── README.md                  This file
    ├── app                        Contains the files that are required for the front end component of the app
    │   ├── app.js                 JS to render the dynamic portions of the app
    │   ├── icon.svg               Sidebar icon SVG file. Should have a resolution of 64x64px.
    │   ├── freshdesk_logo.png     The Freshdesk logo that is displayed in the app
    │   ├── style.css              Style sheet for the app
    │   ├── template.html          Contains the HTML required for the app’s UI
    ├── config                     Contains the installation parameters and OAuth configuration
    │   ├── iparams.json           Contains the parameters that will be collected during installation
    │   └── iparam_test_data.json  Contains sample Iparam values that will used during testing
    └── manifest.json              Contains app meta data and configuration information
