import React, { useEffect, useState } from 'react'

import { Heading, Text, Button, Flex, Select, Input, toast} from "@sparrowengg/twigs-react";
import {API_DOMAIN} from "../utils/constants.js"
import { getScores } from '../helpers/getScores.js';
import { query } from '../helpers/query.js';

const Main = (props) => {

  const [surveys, setSurveys] = useState([])

  const [surveyDescription, setSurveyDescription] = useState("")

  const [curSurveyID, setCurSurveyID] = useState("")

  const [questions, setQuestions]= useState([])

  const [score, setScore] = useState(null)

  useEffect(()=>{
    getAllSurveys()
  },[])

  useEffect(()=>{
    if(!curSurveyID) return

    getAllQuestionsFromSelectedSurvey()
  },[curSurveyID])

  const getAllSurveys = async()=>{
    try {
      const result = await props.client.request.get(`${API_DOMAIN}/v3/surveys`, {
        options: {
          headers: {
            Authorization: "Bearer <%=iparams.surveysparrow_api_key%>"
          }, isOAuth: false, maxAttempts: 5
        }
      });

      const data = JSON.parse(result).body.data
      
      setSurveys(data)
    } catch (error) {
       console.log(error)
    }
  }

  const getAllQuestionsFromSelectedSurvey = async()=>{
    try {
      const result = await props.client.request.get(
          `${API_DOMAIN}/v3/questions?survey_id=${curSurveyID}`,
          {
              options: {
                  headers: {
                      Authorization:
                          "Bearer <%=iparams.surveysparrow_api_key%>",
                  },
                  isOAuth: false,
                  maxAttempts: 5,
              },
          }
      );

      const data = JSON.parse(result).body.data;

      setQuestions(data.map((question)=>{
        return {
          question_text:question.rtxt,
          question_type:question.type,
          question_id:question.id
        }
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetScore  =async (e)=>{
    e.preventDefault()
    if(!surveyDescription) return

    // formatting data
    const data = {
      survey_description:surveyDescription,
      survey_questions: questions.map((question)=>{
        return {
          question_id:question.question_id,
          question:question.question_text,
          question_type:question.question_type
        }
      })
    }

    console.log(data)

    const query_data = query(data) 

    try {
      
      const result = await getScores(query_data, props.client)
      console.log("JSON : ", result.choices[0].message.content)
      const score  = JSON.parse(result.choices[0].message.content)

      
      console.log("OBJECT  :", score)

      setScore(score)
      
    }
    catch(err){
      toast({
      variant: 'error',
      title: 'OPENAI ERROR MESSAGES',
      description: 'Please pass in more precise and short survey description'
    });
      
    }
  }

  return (
    <Flex alignItems='center' justifyContent='center' flexDirection='column' gap = "$3" css = {{
      width:"100%",
      height:"100vh"
    }} >
      <Heading>
        Survey Optimization
      </Heading>

      {
        surveys.length > 0 ?  
          <Select size = "lg" css = {{ width:"80%"}}  options = {surveys.map((survey)=>{
            return {
              label:survey.name,
              value:survey.name,
              survey_id:survey.id
            }
          })}  onChange={(target)=>{
            setCurSurveyID(target.survey_id)
          }} >

          </Select> 
        : null
      }

      {/* get Questions */}
      {questions.length > 0 ?  
      <>
      <Heading size = "h3">Questions</Heading>
        {questions.map((question)=>{
          return <Text css = {{
            padding:"$4"
          }}  key = {question.question_id}>
            {question.question_text} - {question.question_type}
          </Text>
        })}


        <Input type = "text" placeholder='describe your survey' value={surveyDescription} onChange={(e)=>{
          console.log(e)
          setSurveyDescription(e.target.value)
        }}  css = {{
        width:"80%"
      }}/>

        <Button onClick={handleGetScore} size="lg" css = {{
          marginTop:"$3"
        }}>Get Score</Button>
      
      </>
      :null
      }

      {score ? 
      <>
      <Heading size = "h2" css = {{marginTop:"$3"}}>
        Score
      </Heading>

      <Flex alignItems='center' justifyContent='center' gap = "$6" css = {{
        marginBottom:"$6"
      }}>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' gap = "$3">
          <Text size="md" css = {{fontWeight:"600"}}>Engagement</Text>
          <Text>{score.scores.engagement}%</Text>
        </Flex>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' gap = "$3">
          <Text size="md" css = {{fontWeight:"600"}}>Clarity</Text>
          <Text>{score.scores.clarity}%</Text>
        </Flex>
        <Flex flexDirection='column' alignItems='center' justifyContent='center' gap = "$3">
          <Text size="md" css = {{fontWeight:"600"}}>Relavance</Text>
          <Text>{score.scores.relevance}%</Text>
        </Flex>
      </Flex>

      </>
      : null
    }
      
    </Flex>
  )
}

export default Main