import { FormLabel, Stack } from "@chakra-ui/react";
import { useState } from "react";
import NumberInput from "../NumberInput";

export default function EditableQuantityInputs ({ reservation }) {


  return (
    <>
      <FormLabel fontWeight={600}>
        Quantidade de Reservas:

        <Stack mt={4} direction="row">
          <NumberInput 
            name="adult" 
            isRequired 
            defaultValue={reservation.quantity.adult}
            min="1" 
            label="Adultos:" 
          />
          <NumberInput 
            name="teen"  
            isRequired
            defaultValue={reservation.quantity.teen}
            label="8 a 12 anos:" 
          />
          <NumberInput 
            name="child"  
            isRequired 
            defaultValue={reservation.quantity.child}
            label="5 a 7 anos:" 
          />
        </Stack>
      </FormLabel>
    </>
  )
}