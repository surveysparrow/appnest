## https://ssdk.surveysparrow.dev/ssdk/2.0/assets/survey_client.js App Project

Congratulations on creating your App Project! Feel free to replace this text with your project description.

### Project folder structure explained

    .
    ├── README.md                  This file.
    ├── config                     Installation parameter configs.
    │   ├── iparams.json           Installation parameter config in English language.
    │   └── iparam_test_data.json  Installation parameter data for local testing.
    └── manifest.json              Project manifest.
    └── server                     Business logic for remote request and event handlers.
        ├── lib
        │   └── handle-response.js
        ├── server.js
        └── test_data
            ├── onContactCreate.json
            ├── onContactUpdate.json
            ├── onContactDelete.json
            ├── onSubmissionComplete.json
