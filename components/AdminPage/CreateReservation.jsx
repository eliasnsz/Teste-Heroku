import DefaultContainer from "../DefaultContainer"
import PageTitle from "../PageTitle"
import NameInput from "../Inputs/NameInput"
import DateInput from "../Inputs/DateInput"
import QuantityInputs from "../Inputs/QuantityInputs"
import LocalInput from "../Inputs/LocalInput"
import ObsInput from "../Inputs/ObsInput"
import SubmitButton from "../Inputs/SubmitButton"
import { useState } from "react"
import axios from "axios"
import { useQueryClient } from "react-query"
import { FormLabel, Stack, useToast } from "@chakra-ui/react"
import NumberInput from "../Inputs/NumberInput"
import TelInput from "./TelInput"


export default function CreateReservation () {

  const toast = useToast()
  const queryClient = useQueryClient()
  const [ isSubmiting, setIsSubmiting ] = useState(false)
  
  const [ adult, setAdult ] = useState(1)
  const [ teen, setTeen ] = useState(0)
  const [ child, setChild ] = useState(0)
  const [ local, setLocal ] = useState("")
  const [ phone, setPhone ] = useState("")
  
    //Submit

  const handleSubmit = async (event) => {
    event.preventDefault()
    // setIsSubmiting(true)
    
    const fields = [ "name", "phone", "date", "adult", "teen", "child", "local", "obs" ]
    const reservation = {}
    
    for (let i = 0; i < fields.length; i++) {
      reservation[fields[i]] = event.target[fields[i]].value
    }
    
    await axios.post("/api/reservas", { ...reservation });
    queryClient.invalidateQueries("reservas")
    
    event.target.reset()
    setAdult(1)
    setTeen(0)
    setChild(0)
    setLocal("")
    setPhone("")

    sendSucessMessage()
    setIsSubmiting(false)
  } 

  //Messages

  const sendSucessMessage = () => {
    toast({
      title: 'Pronto!',
      description: "Sua reserva foi criada com sucesso.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <DefaultContainer maxW="3xl">
      <form onSubmit={handleSubmit}>
        <NameInput />
        <DateInput />
        <TelInput phone={phone} setPhone={setPhone} />
        <FormLabel fontWeight={600}>
          Quantidade de Reservas:

        <Stack mt={4} direction="row">
          <NumberInput 
            name="adult" 
            value={adult}
            onChange={ e => setAdult(e)}
            isRequired 
            min="1" 
            label="Adultos:" 
          />
          <NumberInput 
            name="teen"  
            value={teen}
            onChange={ e => setTeen(e)}
            isRequired
            label="8 a 12" 
          />
          <NumberInput 
            name="child"  
            value={child}
            onChange={ e => setChild(e)}
            isRequired 
            label="5 a 7" 
          />
        </Stack>
    </FormLabel>
        <LocalInput value={local} onChange={e => setLocal(e)} />
        <ObsInput />
        <SubmitButton 
          isLoading={isSubmiting}
          isDisabled={isSubmiting }
        >
          Reservar
        </SubmitButton>
      </form>
    </DefaultContainer>
  )
}