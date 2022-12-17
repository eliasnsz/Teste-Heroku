import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function InputLocal({internalIsFull, externalIsFull, ...props }) {
  
  return(
    <RadioGroup m="auto" {...props}>
      <Stack direction='row'>
        <Radio isRequired isDisabled={internalIsFull} value='Interno'>Interno</Radio>
        <Radio isRequired isDisabled={externalIsFull} value='Varanda'>Varanda</Radio>
        <Radio isDisabled value='Interno novo'>Interno novo</Radio>
      </Stack>
    </RadioGroup>  
  )
}