import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { TfiReload } from "react-icons/tfi";

export default function DateSearch({ refetchQuery, ...props}) {
  return (
    <Flex gap={2}>
      <Input
        size="md"
        variant="flushed"
        isRequired  
        name="date"
        type="date"        
        borderColor="brown.300"
        focusBorderColor="brown.600"
        {...props}
      />  
      <Button colorScheme="blue" onClick={refetchQuery}>
        <Icon as={TfiReload}/>
      </Button>
    </Flex>
  )
} 