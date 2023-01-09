import { Heading, useToast } from "@chakra-ui/react";
import axios, { all } from "axios";
import moment from "moment";
import { getSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import DefaultContainer from "../../components/DefaultContainer";
import Header from "../../components/Header";
import DateInput from "../../components/Inputs/DateInput";
import EditableNameInput from "../../components/Inputs/EditableInputs/EditableNameInput";
import EditableQuantityInputs from "../../components/Inputs/EditableInputs/EditableQuantityInputs";
import LocalInput from "../../components/Inputs/LocalInput";
import NameInput from "../../components/Inputs/NameInput";
import ObsInput from "../../components/Inputs/ObsInput";
import QuantityInputs from "../../components/Inputs/QuantityInputs";
import SubmitButton from "../../components/Inputs/SubmitButton";
import LoadingScreen from "../../components/LoadingScreen";
import PageTitle from "../../components/PageTitle";
import Error404 from "../404";
import { baseUrl, externalMaxCapacity, internalMaxCapacity } from "../_app";

export default function EditReservation ({ userSession }) {

  const queryClient = useQueryClient()
  const router = useRouter()
  const { uuid } = router.query
  const toast = useToast()

  const [ isSubmiting, setIsSubmiting ] = useState(false)

  //Get all reservations
  const { data: allReservations, isLoading } = useQuery("reservas", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas`)
    return response.data
  }, {
    staleTime: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })
  
  if (isLoading) return <LoadingScreen />
  
  //GetThisReservation
  const thisUserReservations = allReservations
    .filter(res => res.email === userSession.user.email)
  const reservation = thisUserReservations
    .find(res => res._id === uuid)
  
  if (!reservation) return <Error404/>

  //Validar quantiade de reservas
  const isQuantityValidate = (event) => {
    const adult = parseInt(event.target.adult.value)
    const teen = parseInt(event.target.teen.value)
    const child = parseInt(event.target.child.value)
    const alreadyReservedQuantity = parseInt(reservation.quantity.total)
    const currentTotal = adult + teen + child
    const local = event.target.local.value
    
    const thisDateReservations = allReservations.filter(res => {
      return res.date === reservation.date
    })

    const globalTotal = (local) => {
      return thisDateReservations.reduce((acc, res) => {
        if (res.local === local) {
          return acc + parseInt(res.quantity.total)
        }
          return acc
      }, 0)
    }

    const maxCapacity = (local) => {
      if (local === "Interno") {
        return internalMaxCapacity
      }
      if (local === "Varanda") {
        return externalMaxCapacity
      }
    }

    if (local === reservation.local) {
      if ((currentTotal + globalTotal(local) - alreadyReservedQuantity) > maxCapacity(local)) {
        const remainedQuantity = (maxCapacity(local) + alreadyReservedQuantity) - globalTotal(local)
        sendMaxCapacityMessage(local, remainedQuantity)
        return false
      } else {
        return true
      }
    } else {
      if ((currentTotal + globalTotal(local)) > maxCapacity(local)) {
        const remainedQuantity = (maxCapacity(local)) - globalTotal(local)
        sendMaxCapacityMessage(local, remainedQuantity)
        return false
      } else {
        return true
      }
    }
  }
  

  //Submit Changes
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmiting(true)
    
    const fields = [ "name", "date", "adult", "teen", "child", "local", "obs" ]
    const changes = {}

    for (let i = 0; i < fields.length; i++) {
        const inputValue = event.target[fields[i]].value 

        changes[fields[i]] = inputValue
    }

    
    if (!isQuantityValidate(event)) {
      setIsSubmiting(false) 
      return
    }

    Router.push("/reservas")

    await axios.put("/api/reservas", { changes, uuid: reservation._id, date: reservation.date });

    queryClient.invalidateQueries("reservas")

    sendSucessMessage()
  } 

  //Messages

  const sendSucessMessage = () => {
    toast({
      title: 'Pronto!',
      description: "Sua reserva foi atualizada com sucesso.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const sendMaxCapacityMessage = (local, remainingQuantity) => {
    const message = local === "Interno"
    ? `A quantidade desejada não está disponível. Temos ${remainingQuantity} lugares restantes no salão interno`
    : `A quantidade desejada não está disponível. Temos ${remainingQuantity} lugares restantes na varanda`

    toast({
      title: 'Erro!',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <Header />
      <DefaultContainer maxW="xl">
        <PageTitle>Editar reserva</PageTitle>

        <form onSubmit={handleSubmit}>
          <EditableNameInput defaultValue={reservation.name} />
          <DateInput defaultValue={reservation.date} isDisabled/>
          <EditableQuantityInputs 
            reservation={reservation} 
          />
          <LocalInput 
            defaultValue={reservation.local}
          />
          <ObsInput defaultValue={reservation.obs} />
          <SubmitButton 
            isLoading={isSubmiting}
            isDisabled={isSubmiting }
          >
            Salvar
          </SubmitButton>
        </form>
      </DefaultContainer>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: {
      userSession: session
    } 
  }

}