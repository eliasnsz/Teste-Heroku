import { FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput as ChakraNumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

export default function NumberInput({ label, ...props }) {
  
  return (
    <FormLabel fontWeight={600}>
      {label}
      <ChakraNumberInput
        allowMouseWheel
        borderColor="brown.300"
        focusBorderColor="brown.600"
        variant="flushed"
        min="0"
        {...props}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </FormLabel>
  )
}