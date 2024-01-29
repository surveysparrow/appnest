var client;
var surveyDetails = {};
var emails = [];
var dataToStorage = {};

init();

function init() {
  client = window.app.initialized();
}

async function renderText() {
 
  document.getElementById("dropdown").style.display = "none";
  const getAllSurveys = await client.request.get("https://api.surveysparrow.com/v3/surveys",{options:{
    headers:{
      "Authorization":"Bearer <%=iparams.surveysparrow_api_key%>"
    }
  }});
  const apiData = JSON.parse(getAllSurveys)?.body?.data;
  document.getElementById("dropdown").style.display = "block";

  const dropdown = document.querySelector('.dropdown');
  const select = dropdown.querySelector('.dropdown-select');
  const optionsContainer = dropdown.querySelector('#options');
  
  
  apiData.forEach(obj => {
    if (obj.survey_type === 'NPS' || obj.survey_type === 'NPSChat'){
      const option = document.createElement('div');
    option.classList.add('dropdown-option');
    option.textContent = obj.name;
    option.addEventListener('click', () => {
      select.textContent = obj.name;
      surveyDetails['survey_id'] = obj.id;
      surveyDetails['survey_name'] = obj.name;
      dropdown.classList.remove('active');
    });
    optionsContainer.appendChild(option);
    }
    
  });

  select.addEventListener('click', () => {
    dropdown.classList.toggle('active');

  });

  // Close the dropdown when clicking outside
  window.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('active');
    }
  });
}
  document.getElementById('press').onclick = (e) => {
    e.preventDefault();
    emails.push(document.getElementById('email').value);
    document.getElementById('email').value = '';
  }
  document.getElementById('submit').onclick = async () => {
    dataToStorage['survey'] = surveyDetails;
    dataToStorage['emails'] = emails;
    document.getElementById('submit').disabled = true;
    console.log(dataToStorage);

    
    try{
      const existing = await client.db.get("data");
      const existingObj = JSON.parse(existing);
      const arr = Object.keys(existingObj);
      const pushArr = [];
      for(let i in arr){
        pushArr.push(existingObj[i])
      }
      pushArr.push(dataToStorage);
      await client.db.set("data", pushArr);
    }catch(err){
      await client.db.set("data", [dataToStorage])
    }
  }

renderText()
