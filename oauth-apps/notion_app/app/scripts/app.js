var client;

init();

function init() {
  client = window.app.initialized();
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  textElement.innerHTML = `Welcome, Create your simple app here`;

  try{
  const resp = await client.request.get(`https://api.notion.com/v1/users`, {
    options: {
      headers: {
        Authorization: "Bearer <%=access_token%>",
        "Notion-Version": "2022-06-28",
      }, isOAuth: true
    }
  });
  console.log(JSON.stringify(resp));

}catch(error){
  console.log(error);
}
}

renderText()

