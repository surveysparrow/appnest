exports = {
  onSubmissionComplete: async function (args) {
    try{
      const survey_id = args['data']['survey_id'];
      const storage = await $Storage.get("data");
     
      const storageArr = Object.values(storage);
      storageArr.forEach(async (survey)=>{
        if(survey_id === survey.survey.survey_id && survey.emails.includes(args['data']['contact']['email'])){
          
          const response = await $Fetch.post("https://slack.com/api/chat.postMessage", 
          {
            channel: "Your-bot-channel-id",
            text: JSON.stringify(args['data']['answers'])
           },{headers:{
            Authorization: "Bearer <%=access_token%>"//Token will be substiyued at the time of making API call
          },isOAuth:true,maxAttempts:5});
           console.log(response);
        }
      });
      
    }catch(err){
      console.log(err)
    }
  }
};
