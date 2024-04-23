export const query = (content) => {
    return ({
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "system", "content": "You are a product marketer who is proficient in writing engaging content. Your task would be to evaluate a survey and it's questions and then provide a score based on clarity, relevance and engagement"},

        {
            "role":"user",
            "content":`In the following format - {survey_description:'', survey_questions:[{ question_id:'{question_id}', question_type:'{question_type}', question:'{question}'}, {question_id:'{question_id}', question_type:'{question_type}', question:'{question}'}]}. There can be n number of questions in the survey_questions. The possible values in the question_type are 'Dropdown', 'MultiChoice', 'TextInput' & 'Rating'.The actual data is in the form of JavaScript object and let's call it "content" - ${content}. Based on your expertise, clearly understand the survey_description. If the survey_description is not clear, then throw an error. Analyze the survey_questions and the survey_description in the content and come up with a score based on specific categories such as clarity, engagement and relavance. The score should be out of 100% for each category. Give me the result in the following json format. Replace the actual percentage in the placeholder, {value} down below
            
             {  
                "scores":{
                    "engagement":{value},
                    "clarity":{value},
                    "relevance":{value}
                },
            }`
        }
    
    ]
    });
}