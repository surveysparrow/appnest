exports = {
  onSubmissionComplete: async function (args) {
    console.log('Hello, Survey Id is ' + args['data']['survey_id']);
    // const domain = "https://api.surveysparrow.com";

    // const result1 = await $Fetch.get(`${domain}/v3/channels?type=LINK&limit=1&survey_id=468603`, {
    //   headers: {
    //     Authorization: "Bearer <%=iparams.surveysparrow_api_key%>"
    //   }
    // });
   
    const result = await fetch('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=cDllclFwWko4YnNUcVQwT0d0V246MTpjaQ&redirect_uri=https://localhost:30001/auth/callback&scope=tweet.write%20tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain&access_type=offline'
    , {
      headers: {
        // Authorization: "Bearer <%=iparams.surveysparrow_api_key%>"
      }
    });
    console.log('result', result)

  }
};
