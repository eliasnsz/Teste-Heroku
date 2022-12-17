import { Input as ChakraInput } from "@chakra-ui/react"

export default function Input({ ...props}) {
  return (
    <ChakraInput
      borderColor="#00000044"
      variant="flushed"
      focusBorderColor="brown.400"
      {...props}
    />
  )
}