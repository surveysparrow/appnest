exports = {
  onSubmissionComplete: async function (args) {
    console.log('Hello, Survey Id is ' + args['data']['survey_id']);
  }
};
