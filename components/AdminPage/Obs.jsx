import { Heading, Stack, Textarea } from "@chakra-ui/react";

export default function Obs({ ...props }) {
  return (
    <Stack>
      <Heading fontSize="md">Observações:</Heading>

      <Textarea
        size='md'
        name="obs"
        borderColor="brown.300"
        focusBorderColor="brown.600"
        variant="flushed"
        rows="1"
        {...props}
      />
    </Stack>
  )
}