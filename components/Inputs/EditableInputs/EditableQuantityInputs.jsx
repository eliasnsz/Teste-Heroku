import { FormLabel, Stack } from "@chakra-ui/react";
import { useState } from "react";
import NumberInput from "../NumberInput";

export default function EditableQuantityInputs ({ date, reservation, allReservations }) {

  const [ adult, setAdult ] = useState(reservation.quantity.adult)
  const [ teen, setTeen ] = useState(reservation.quantity.teen)
  const [ child, setChild ] = useState(reservation.quantity.child)

  const currentTotal = parseInt(adult) + parseInt(teen) + parseInt(child)

  //Checar se há reservas disponíveis
  const getReservationNumbers = () => {
    const thisDateReservations = allReservations
    .filter(item => item.date === date)
    
    const total = (local) => thisDateReservations.reduce((acc, item) => {
      if (item.local === local) return acc + parseInt(item.quantity.total)
      return acc
    }, 0)
    return total(local)
  }
  
  return (
    <>
      <FormLabel fontWeight={600}>
        Quantidade de Reservas:

        <Stack mt={4} direction="row">
          <NumberInput 
            value={adult} 
            onChange={e => setAdult(e)}
            name="adult" 
            isRequired 
            min="1" 
            label="Adultos:" 
          />
          <NumberInput 
            value={teen} 
            onChange={e => setTeen(e)}
            name="teen"  
            isRequired
            label="8 a 12 anos:" 
          />
          <NumberInput 
            value={child} 
            onChange={e => setChild(e)}
            name="child"  
            isRequired 
            label="5 a 7 anos:" 
          />
        </Stack>
      </FormLabel>
    </>
  )
}