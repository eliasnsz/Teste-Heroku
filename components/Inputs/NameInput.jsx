import { FormLabel, Input } from "@chakra-ui/react";

export default function NameInput({ ...props }) {
  
  return (
    <FormLabel fontWeight={600}>
      Nome:
      <Input
        autoComplete="name"
        variant="flushed"
        name="name"
        isRequired
        borderColor="brown.300"
        focusBorderColor="brown.600"
        {...props}
      />
    </FormLabel>
  )
}