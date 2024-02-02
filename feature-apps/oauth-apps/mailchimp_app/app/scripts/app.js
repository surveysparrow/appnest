var client;

init();

function init() {
  client = window.app.initialized();
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  textElement.innerHTML = `Welcome, Create your simple app here`;

  try{
  const response = await client.request.get(`https://us21.api.mailchimp.com/3.0/campaigns`, {
    options: {
      headers: {
        Authorization: "Bearer <%=access_token%>",
      }, isOAuth: true
    }
  });
  console.log("Response from mailChimp", JSON.stringify(response));

}catch(error){
  console.log(error);
}
}

renderText()

