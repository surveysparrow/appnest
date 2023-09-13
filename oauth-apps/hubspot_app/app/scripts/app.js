var client;

init();

function init() {
  client = window.app.initialized();
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  textElement.innerHTML = `Welcome, Create your simple app here`;

  try{
  const resp = await client.request.get(`https://api.hubapi.com/cos-domains/v1/domains`, {
    options: {
      headers: {
        Authorization: "Bearer <%=access_token%>",
      }, isOAuth: true
    }
  });
  console.log(JSON.stringify(resp));

}catch(error){
  console.log(error);
}
}

renderText()

