import { FormLabel, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { externalMaxCapacity, internalMaxCapacity } from "../../pages/_app";
import GlobalAlert from "../GlobalAlert";
import NumberInput from "./NumberInput";

export let isInternalFull;
export let isExternalFull;

export default function QuantityInputs ({ local, allReservations, date }) {
  
  const [ adult, setAdult ] = useState(1)
  const [ teen, setTeen ] = useState(0)
  const [ child, setChild ] = useState(0)
  
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
  
  if (local && date) {
    const total = getReservationNumbers() + currentTotal 

    if (local === "Interno") {
      isExternalFull = false

      if (total > internalMaxCapacity) {
        isInternalFull = true
      } else {
        isInternalFull = false
      }
    }
    if (local === "Varanda") {
      isInternalFull = false

      if (total > externalMaxCapacity) {
        isExternalFull = true
      } else {
        isExternalFull = false
      }
    }
  } 
  
  return (
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
          label="8 a 12 anos:" 
        />
        <NumberInput 
          value={child} 
          onChange={e => setChild(e)}
          name="child"  
          label="5 a 7 anos:" 
        />
      </Stack>
      { isInternalFull && <GlobalAlert>Não há mais lugares disponíveis no salão interno.</GlobalAlert>}
      { isExternalFull && <GlobalAlert>Não há mais lugares disponíveis na varanda.</GlobalAlert>}
    </FormLabel>
  )
}
