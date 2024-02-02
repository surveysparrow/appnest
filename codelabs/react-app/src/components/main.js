import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Input, Text } from '@sparrowengg/twigs-react';
import { query } from './helpers/query';
import { generateQuestion } from './helpers/generateQuestions';
import { createSurvey } from './helpers/createSurvey';
import createQuestions from './helpers/createQuestions';

const Main = ({ client }) => {
  const [surveyText, setSurveyText] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitDisabled(surveyText === '');
  }, [surveyText]);

  async function handleSubmit() {
    try {
      setIsSubmitDisabled(true);

      const response = await generateQuestion(query(surveyText), client);
      const questionsArray = response?.choices[0]?.message?.content.split('\n');

      const createSurveyResponse = await createSurvey(surveyText, client);
      const surveyObject = JSON.parse(createSurveyResponse).body;
      const surveyId = surveyObject?.data?.id;

      const numQuestions = questionsArray.length;
      await createQuestions(numQuestions, questionsArray, surveyId, client);

      document.getElementById('InputForChatGpt').value = '';
      client.interface.alertMessage('Survey Generated Successfully', { type: 'success' });
      setIsSubmitDisabled(false);
    } catch (error) {
      document.getElementById('InputForChatGpt').value = '';
      setIsSubmitDisabled(false);
      client.interface.alertMessage('Error while generating the survey. If your survey is malformed kindly delete it.', { type: 'failure' });
      console.error(error);
    }
  }

  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '$30'
      }}
    >
      <Box>
        <Heading
          css={{
            textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.2px',
            borderBottom: '1px solid black',
            display: 'inline',
            pb: '$2'
          }}
          size="h5"
          weight="semibold"
        >
          Create Survey Using ChatGPT
        </Heading>
      </Box>
      <Box css={{ mt: '$10' }}>
        <Flex css={{ alignItems: 'center' }}>
          <Text size="lg" css={{ textTransform: 'capitalize' }}>
            Generate a Survey for:
          </Text>
          <Input
            css={{ width: '500px', ml: '$5' }}
            id="InputForChatGpt"
            onChange={(e) => {
              setSurveyText(e.target.value);
            }}
            placeholder="Enter information to generate.."
            size="lg"
          />
        </Flex>
      </Box>
      <Button
        css={{
          mt: '$22',
          background: '#19B885',
          color: '$white900',
          padding: '$10 $15',
          '&:hover, &:focus, &:active': {
            background: '#19B885',
            color: '$white900'
          }
        }}
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
        size="lg"
        variant="default"
      >
        Generate
      </Button>
    </Flex>
  );
};

export default Main;