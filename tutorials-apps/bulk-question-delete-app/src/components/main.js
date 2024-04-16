import React, { useState, useEffect } from 'react'
import icon from "../assets/icon.png"
import {
  Box, Heading, Text, Button, Flex, Input, Checkbox, Avatar, toast, AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
  AlertDialogCancel,
  AlertDialogAction,
} from "@sparrowengg/twigs-react";
import { SearchIcon } from '@sparrowengg/twigs-react-icons';
import Question from './Question';
import Logo from "../assets/appnest_logo.png"
import axios from 'axios';
import Loader from './loader';
const Main = (props) => {
  const [questions, setQuestions] = useState([])
  const [surveyid, setSurveyId] = useState(0)
  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(false)
  const [qids, setQids] = useState([])
  const [btnLoader, setBtnLoader] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [filteredQuestions, setFilteredQuestion] = useState([])
  const getQuestions = async () => {
    try {
      setLoader(true);
      let allQuestions = [];
      let i = 1;
      let response;

      do {
        response = await axios.get(`https://api.surveysparrow.com/v3/questions?page=${i}&survey_id=${surveyid}`, {
          headers: {
            Authorization: 'Bearer prTp291Zd5mN5eots8Bio2_eTaUWuvLOGquBfJ3jiAQELSxXnqfVN0H47HFcG5Cpzhgeic-QXknDhIKNpfL_uUGQ'
          }
        });

        allQuestions = allQuestions.concat(response?.data?.data);
        i++;
      } while (response?.data?.has_next_page);

      setQuestions(allQuestions);
      setFilteredQuestion(allQuestions);
    } catch (error) {
      if (error?.response?.status === 404) {
        toast({
          variant: 'error',
          title: 'Invalid Survey Id',
          description: 'Please check the surveyId'
        });
      } else {
        console.log(error);
      }
    } finally {
      setLoader(false);
    }
  };
  const toggleSelectAll = () => {
    const allSelected = qids.length === filteredQuestions.length;
    setSelectAll(!allSelected);
    setQids(allSelected ? [] : filteredQuestions.map(question => question.id));
  };

  const deleteQuestions = async (ids) => {
    try {
      await Promise.all(ids.map(async (id) => {
        await axios.delete(`https://api.surveysparrow.com/v3/questions/${id}`, {
          headers: {
            Authorization: 'Bearer prTp291Zd5mN5eots8Bio2_eTaUWuvLOGquBfJ3jiAQELSxXnqfVN0H47HFcG5Cpzhgeic-QXknDhIKNpfL_uUGQ'
          }
        });
        await new Promise(resolve => setTimeout(resolve, 700));
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      setBtnLoader(true)
      await deleteQuestions(qids);
      await getQuestions();
      toast({
        variant: 'success',
        title: 'Questions Deleted Successfully',
      });
    } catch (error) {
      console.log(error);
    } finally{
      setBtnLoader(false)
      setShowModal(false);
    }
    
  };

  const filterQuestions = (questions, search) => {
    var ques = questions.filter(question => question.rtxt.toLowerCase().includes(search.toLowerCase()));
    setFilteredQuestion(ques)
  }

  useEffect(() => {
    filterQuestions(questions, search)
  }, [search])

  return (
    <Box css={{
      width: "100%",
      minHeight: "70vh",
      background: "$background",

    }} >
      <Flex flexDirection='column' justifyContent='space-between' css={{
        padding: "$20"
      }} >
        <Flex justifyContent='space-between' alignItems='center' css={{
          paddingBottom: "$10",
          borderBottom: '$borderWidths$xs solid $neutral300',
        }}>
          <Flex >
            <Avatar src={Logo} size="2xl" rounded="xs"></Avatar>
            <Box css={{
              marginLeft: "$5"
            }}>
              <Text size={'lg'} weight={'bold'} css={{
                color: "$black900",


              }}>
                Bulk Question Delete App
              </Text>
              <Text size={'sm'} weight={'normal'} css={{
                color: "$black600",
              }}>
                You can Delete bulk questions using Survey id
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent='center' alignItems='center'>
            <Input onChange={(e) => setSurveyId(e.target.value)} type='number' size={'lg'} placeholder='Enter Your Survey Id  ...' css={{
              width: "250px"
            }} ></Input>
            <Button variant="solid" color="primary" size="lg" onClick={getQuestions} css={{
              marginLeft: "$10"
            }} >
              Get Questions
            </Button>
          </Flex>
        </Flex>
        {!loader ?
          (questions.length ? (
            <Flex flexDirection='column' justifyContent='start' alignItems='start' css={{
              width: "100%",
            }}>
              <Flex alignItems='center' css={{
                paddingBlock: "$10 $10",
              }} >
                <Flex justifyContent="start" alignItems='center' >
                  <Input onChange={(e) => setSearch(e.target.value)} iconRight={<SearchIcon />} size={'lg'} placeholder='Search Questions here ..' css={{
                    width: "400px"
                  }} ></Input>
                </Flex>
                <Flex justifyContent='center' alignItems='center' css={{
                  marginLeft: "$10"
                }}>
                  <Checkbox size="md" onChange={toggleSelectAll}>Select All</Checkbox>
                  <Button variant="solid" color="error" disabled={!qids.length} onClick={() => setShowModal(true)} size="lg" css={{
                    marginLeft: "$10"
                  }} >
                    Delete Questions
                  </Button>
                </Flex>
              </Flex>
              <Box css={{
                width: "100%",
                height: "58vh",
                overflowY: "auto"
              }}>
                {filteredQuestions.length ? filteredQuestions.map((question) => (
                  <Question
                    selectAll={selectAll}
                    content={question.rtxt}
                    id={question.id}
                    qids={qids}
                    handleChange={(checked, id) => {
                      const updatedQids = checked ? [...qids, id] : qids.filter(qid => qid !== id);
                      setQids(updatedQids);
                    }}
                    key={question.id}
                  />
                )) : null}
                {showModal ? (<AlertDialog open>
                  <AlertDialogContent css={{ minWidth: 550 }}>
                    <React.Fragment>
                      <AlertDialogTitle>
                        Delete Questions
                      </AlertDialogTitle>
                      <AlertDialogDescription css={{ lineHeight: '$md' }}>
                        This action is irreversible, and all related data will be
                        deleted accordingly. Proceed with caution.
                      </AlertDialogDescription>
                      <AlertDialogActions>
                        <AlertDialogCancel asChild>
                          <Button color="default" size="lg" onClick={() => setShowModal(false)}>
                            Cancel
                          </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            color="error"
                            size="lg"
                            css={{ marginLeft: '$3' }}
                            loading={btnLoader}
                            onClick={handleDelete}
                          >
                            Delete Questions
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogActions>
                    </React.Fragment>
                  </AlertDialogContent>
                </AlertDialog>) : null}
              </Box>
            </Flex>

          ) : <Flex justifyContent='center' alignItems='center' css={{
            minHeight: "70vh"
          }} >
            <Avatar src={icon} rounded={'xs'} css={{
              width: "300px",
              height: "300px",
            }} ></Avatar>
          </Flex>)
          : <><Loader /></>}
      </Flex>
    </Box>
  )
}

export default Main
