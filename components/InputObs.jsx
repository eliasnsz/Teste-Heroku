import { Text, Textarea } from "@chakra-ui/react";

export default function InputObs({ ...props }) {
  return (
    <>
      <Text my='8px' fontWeight={500}>Observações:</Text>
      <Textarea
        placeholder='Ex: Próximo ao parque... (Sujeito à disponibilidade)'
        size='md'
        {...props}
      />  
    </>
  )
}