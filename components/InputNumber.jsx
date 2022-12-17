import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

export default function InputNumber({ ...props }) {
  
  return (
    <NumberInput
      mt={2}
      allowMouseWheel
      {...props}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper/>
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}