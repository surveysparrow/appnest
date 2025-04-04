import React from 'react'
import { Flex, Text, Heading, Link } from "@sparrowengg/twigs-react"

const Main = (props) => {

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection = 'column' gap = "$3" css={{
      width: "100%",
      height: "100vh"
    }}>
      <Heading size="h4" weight="medium">Welcome to React + Serverless App</Heading>
      <Text size="md" css={{ color: "$neutral900", textAlign:"center", padding:"0 $24" }} >
        You can utilize the frontend functionalities of constructing the UI using React as well as serverless functionalities of handling event triggers and Server Method Invocation.
      </Text>
      <Link href="https://sdk.surveysparrow.dev/docs/apps/react_serverless_app.html" target="_blank" css={{
        textDecoration: "underline",
        color: "$primary400",
      }}>Visit React + Serverless Documentation</Link>
    </Flex>
  )
}

export default Main
