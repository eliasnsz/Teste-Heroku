import axios from "axios";
import { useSession } from "next-auth/react";
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
import { useRouter } from "next/router";

export default function Reservar() {

  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = new useRouter()

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
    const { value: name} = e.target.name
    const { value: date} = e.target.date
    const { value: adult} = e.target.adult
    const { value: teen} = e.target.teen
    const { value: child} = e.target.child
    const { value: local} = e.target.local
    const { value: obs} = e.target.obs
    await axios.post("/api/reservas", {
      name, date, adult, teen, child, local, obs
    });
    queryClient.invalidateQueries("reservas")
    router.push("/reservas")
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
            <SubmitButton>
              Reservar
            </SubmitButton>
          </form>
        </DefaultContainer>
    </>
  )
} 
