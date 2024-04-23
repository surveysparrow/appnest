# Survey Enhancement App

An app that analyzes the questions of a survey and provides appropriate scores based on clarity, engagement and relevance. This app utilizes OpenAI's chat completetions API to obtain the scores. Hence, it requires the users to enter their OpenAI API key while installing the app.

## How to use the app?

1. After cloning, run ``` npm install ``` or ``` npm i ``` to install all the necessary dependencies.

2. Obtain the API key from OpenAI

3. Run the application using the command - ``` ssdk run ```. In your SurveySparrow account, go to settings -> Apps & Integrations -> Append "?dev=true" to the end of the url and you will find your local SSDK application in the bottom.

4. Install the app and you will be prompted with the screen to enter your OpenAI API key.

5. Now that you are done with the initial setup, go to the installed apps (below apps & integrations) and append "?dev=true" where you can start using this local app.

6. Refer the [SSDK documentation](https://sdk.surveysparrow.dev/) for more information.

## Key Considerations

In the main.js, the API call is made to SurveySparrow to fetch the list of surveys and the list of questions for the selected Survey. Here the placeholder, ``` <%=iparams.surveysparrow_api_key%> ```, will get replaced by the actual surveysparrow_api_key that the user passed when installing the app. Likewise, if there are multiple iparams, it can be utilized in this exact placeholder format - ``` <%=iparams.{iparams_key_name}%> ```