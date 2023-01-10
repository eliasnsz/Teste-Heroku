import { FormLabel, Input } from "@chakra-ui/react";

export default function SearchInput({ ...props }) {
  return (
    <Input
      variant="flushed"
      placeholder="Pesquisar reserva pelo nome"
      isRequired
      borderColor="brown.300"
      focusBorderColor="brown.600"
      { ...props }
    />
  )
}