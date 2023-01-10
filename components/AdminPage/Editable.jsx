import { Flex, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

export default function Editable({ title, ...props}) {
  return (
    <Flex justify="space-between" align="center" w="100%">
      <Heading fontSize="md">{title}</Heading>
      <NumberInput 
        size="sm"
        w="30%"
        variant="flushed"
        borderColor="brown.300"
        focusBorderColor="brown.600" 
        min={0}
        { ...props }
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  )
}