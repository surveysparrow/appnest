function addListeners() {
  q('#create-schedule').addEventListener('click', async function () {
    const res = await client.request.invoke('createSchedule', {
      name: "ayesha1222",
      data: { "name": "Ayesha1" },
      schedule_at: "2023-08-09T04:29:36.427Z"
    });
    console.log('res', res)
  });

}

document.addEventListener('DOMContentLoaded', function () {
  addListeners();
  const client = window.app.initialized();
  window.client = client;
});


var client;

init();

async function init() {
  client = window.app.initialized();
  console.log(client)
}

function q(selector) {
  return document.querySelector(selector);
}