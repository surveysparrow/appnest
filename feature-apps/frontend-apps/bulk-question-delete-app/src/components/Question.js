import React from 'react';
import { Checkbox, Flex, Text } from '@sparrowengg/twigs-react';

const Question = ({ selectAll, content, id, qids, handleChange }) => {
  return (
    <Flex alignItems='center' css={{
      width: "90%",
      minHeight: "8vh",
      background: "$white900",
      boxShadow: "$sm",
      borderRadius: "$md",
      border: '$borderWidths$xs solid $neutral300',
      marginBlock: "$5"
    }}>
      <Checkbox
        checked={selectAll || qids.includes(id)}
        onChange={(e) => handleChange(e, id)}
        css={{ margin: "$10" }}
      />
      <Text size={'md'} weight={'bold'} css={{ color: "$black700" }}>
        {content}
      </Text>
    </Flex>
  );
};

export default Question;
