import { FormLabel, Text, Textarea } from "@chakra-ui/react";

export default function ObsInput({ ...props }) {
  return (
    <>
      <FormLabel fontWeight={600} >
        Observações: 

        <Textarea
          placeholder='Ex: Próximo ao parque... (Sujeito à disponibilidade)'
          size='md'
          name="obs"
          mt={4}
          borderColor="brown.300"
          focusBorderColor="brown.600"
          variant="flushed"
          rows="2"
          {...props}
        />
      </FormLabel>
    </>
  )
}