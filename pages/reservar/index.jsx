import axios, { all } from "axios";
import { getSession, useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "react-query";
import Header from "../../components/Header";
import { baseUrl } from "../_app";
import LoadingScreen from "../../components/LoadingScreen";
import NameInput from "../../components/Inputs/NameInput";
import DateInput from "../../components/Inputs/DateInput";
import QuantityInputs, { isExternalFull, isInternalFull } from "../../components/Inputs/QuantityInputs";
import LocalInput from "../../components/Inputs/LocalInput";
import ObsInput from "../../components/Inputs/ObsInput";
import SubmitButton from "../../components/Inputs/SubmitButton";
import PageTitle from "../../components/PageTitle";
import DefaultContainer from "../../components/DefaultContainer"
import Router from "next/router";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function Reservar({ userSession }) {

  const queryClient = useQueryClient()
  const toast = useToast()
  
  const [ date, setDate ] = useState("")
  const [ local, setLocal ] = useState("")
  const [ isSubmiting, setIsSubmiting ] = useState(false)
  const [ isSubmitBlocked, setIsSubmitBlocked ] = useState(false)

  //Get all reservations
  const { data: allReservations, isLoading } = useQuery("reservas", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas`)
    return response.data
  }, {
    staleTime: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })

  if (isLoading) return <LoadingScreen/>

  const isAllValidate = (event, reservation) => {
    const quantity = isQuantityValidate(reservation)
    const date = isDateValidate()
    
    if (!date) { 
      sendExistentDateMessage()
      event.target.date.focus()
      return [ quantity, date ]
    }
    if (!quantity) {
      sendMaxCapacityMessage(reservation.local)
      return [ quantity, date ]
    }

    return [ quantity, date ]

  }

  const isDateValidate = () => {
    const thisUserReservationsDates = allReservations
      .filter(item => item.email === userSession.user.email)
      .map(item => item.date)
    const alreadyHasReservationInThisDate = thisUserReservationsDates
      .includes(date) 

    return !alreadyHasReservationInThisDate 
  }

  const isQuantityValidate = (reservation) => {
    switch (reservation.local) {
      case "Interno":
        if (isInternalFull) {
          return false
        }
        return true
      case "Varanda":
        if (isExternalFull) {
          return false
        }
        return true
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmiting(true)
    
    const fields = [ "name", "date", "adult", "teen", "child", "local", "obs" ]
    const reservation = {}
    
    for (let i = 0; i < fields.length; i++) {
      reservation[fields[i]] = event.target[fields[i]].value
    }
    
    if (isAllValidate(event, reservation).includes(false)) {
      setIsSubmiting(false) 
      return
    }

    Router.push("/reservas")

    await axios.post("/api/reservas", { ...reservation });

    queryClient.invalidateQueries("reservas")

    sendSucessMessage()
  } 

  const sendSucessMessage = () => {
    toast({
      title: 'Pronto!',
      description: "Sua reserva foi criada com sucesso.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const sendMaxCapacityMessage = (local) => {
    const message = local === "Interno"
    ? "Capacidade máxima do salão atingida"
    : "Capacidade máxima da varanda atingida"

    toast({
      title: 'Erro!',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  const sendExistentDateMessage = () => {
    toast({
      title: 'Erro!',
      description: "Você já possui uma reserva para essa data.",
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
  return (
    <>
      <Header/>
        <DefaultContainer max="xl">
          <form onSubmit={handleSubmit}>
            <PageTitle>Reservar</PageTitle>
            <NameInput />
            <DateInput
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <QuantityInputs 
              local={local} 
              allReservations={allReservations}
              date={date}
            />
            <LocalInput 
              value={local}
              onChange={e => setLocal(e)}/>
            <ObsInput />
            <SubmitButton 
              isLoading={isSubmiting}
              isDisabled={isSubmiting }
            >
              Reservar
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