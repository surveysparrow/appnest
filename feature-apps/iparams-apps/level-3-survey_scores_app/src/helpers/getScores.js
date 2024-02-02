import { chatGptUrl } from '../utils/constants.js';

export async function getScores(body, client) {
    const {openai_api_key} = await client.iparams.get()
    const result = await client.request.post(chatGptUrl, {
        options: {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${openai_api_key}`
            }
        }
    }, body);
    console.log(result);
    return JSON.parse(result).body;
}