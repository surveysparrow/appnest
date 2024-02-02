var client;

init();

function init() {
  client = window.app.initialized();
}

function renderText() {
  const textElement = document.getElementById('apptext');
  textElement.innerHTML = `Welcome, Create your simple app here`;
}

renderText()

