import { FormLabel, Input } from "@chakra-ui/react"
export default function DateInput({...props}) {

  return (
    <FormLabel fontWeight={600}>
      Data da reserva:
      <Input
        placeholder="Selecione a data da reserva"
        size="lg"
        variant="flushed"
        isRequired  
        name="date"
        type="date"        
        borderColor="brown.300"
        focusBorderColor="brown.600"
        {...props}
      />  
    </FormLabel>
  )
}