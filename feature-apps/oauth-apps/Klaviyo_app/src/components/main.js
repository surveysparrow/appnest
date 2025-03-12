import React from 'react'
import { Flex } from "@sparrowengg/twigs-react"
import AddContact from './AddContact'
import Contacts from './Contacts'

const Main = ({client}) => {

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection = 'column' gap = "$3" css={{
      width: "100%",
      height: "100vh"
    }}>
      <AddContact client={client} />
            <Contacts client={client} />
    </Flex>
  )
}

export default Main
