import { FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { AsYouType } from 'libphonenumber-js'

export default function TelInput({ phone, setPhone }) {

  return (
    <FormLabel fontWeight={600}>
      Telefone para contato:

      <InputGroup>
        <Input
          type='tel'
          autoComplete="tel"
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