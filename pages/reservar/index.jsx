import { Box, Button, Center, Container, Divider, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useQuery } from "react-query";
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

export default function Reservar() {

  const { data: session } = useSession()

  //Get all reservations
  const { data: allReservations, isLoading } = useQuery("reservas", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas`)
    return response.data
  }, {
    staleTime: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })

  if (isLoading) return <LoadingScreen/>

  const teste = allReservations.filter(item => item.email === session?.user?.email)

  return (
    <>
      <Header/>
        <DefaultContainer max="xl">
          <form action="/api/reservar" method="POST">
            <PageTitle>Reservar</PageTitle>
            <NameInput />
            <DateInput />
            <QuantityInputs />
            <LocalInput />
            <ObsInput />
            <SubmitButton>
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