import { FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useState } from "react";
import parsePhoneNumber from 'libphonenumber-js'
import { AsYouType } from 'libphonenumber-js'

export default function TelInput() {
    
  const [ phone, setPhone ] = useState("")


  return (
    <FormLabel fontWeight={600}>
      Telefone para contato:

      <InputGroup>
        <Input
          type='tel'
          autoComplete="tel"
          isRequired
          name="phone"
          placeholder='Ex: (19) 91234-5678'
          variant="flushed"
          borderColor="brown.300"
          focusBorderColor="brown.600"
          value={phone}
          onChange={e => setPhone(new AsYouType('BR').input(e.target.value))}
        />
      </InputGroup>
    </FormLabel>
  )
}