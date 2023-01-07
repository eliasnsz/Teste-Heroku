import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "react-query";
import Header from "../../components/Header";
import { baseUrl } from "../_app";
import LoadingScreen from "../../components/LoadingScreen";
import NameInput from "../../components/Inputs/NameInput";
import DateInput from "../../components/Inputs/DateInput";
import QuantityInputs from "../../components/Inputs/QuantityInputs";
import LocalInput from "../../components/Inputs/LocalInput";
import ObsInput from "../../components/Inputs/ObsInput";
import SubmitButton from "../../components/Inputs/SubmitButton";
import PageTitle from "../../components/PageTitle";
import DefaultContainer from "../../components/DefaultContainer"
import Router from "next/router";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function Reservar() {

  const queryClient = useQueryClient()
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

  if (isLoading) return <LoadingScreen/>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmiting(true)
    const fields = [ "name", "date", "adult", "teen", "child", "local", "obs" ]

    const reservation = {}
    for (let i = 0; i < fields.length; i++) {
      reservation[fields[i]] = e.target[fields[i]].value
    }

    await axios.post("/api/reservas", {
      ...reservation
    });

    queryClient.invalidateQueries("reservas")
    Router.push("/reservas")

    sendSucessMessage()
  } 

  function sendSucessMessage() {
    toast({
      title: 'Pronto!',
      description: "Sua reserva foi criada com sucesso.",
      status: 'success',
      duration: 3000,
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
            <DateInput />
            <QuantityInputs />
            <LocalInput />
            <ObsInput />
            <SubmitButton 
              isLoading={isSubmiting}
              isDisabled={isSubmiting}
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
      session
    }
  }

}