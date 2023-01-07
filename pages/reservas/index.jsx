import { SimpleGrid } from "@chakra-ui/react"
import axios from "axios"
import { getSession, useSession } from "next-auth/react"
import { useQuery } from "react-query"
import DefaultContainer from "../../components/DefaultContainer"
import Header from "../../components/Header"
import LoadingScreen from "../../components/LoadingScreen"
import PageTitle from "../../components/PageTitle"
import ReservationCard from "../../components/ReservationCard"
import { baseUrl } from "../_app"

export default function Reservas({ userSession: session }) {

  console.log(session );

  //Get all reservations
  const { data: allReservations, isLoading } = useQuery("reservas", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas`)
    return response.data
  }, {
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })
  
  if (isLoading) return <LoadingScreen/>

  const thisUserReservations = allReservations
    .filter(res => res.email === session?.user?.email)


  return(
    <>
      <Header />
      <DefaultContainer maxW="3xl" >
        <PageTitle>Minhas Reservas</PageTitle>
        <SimpleGrid 
          columns={[1, 1, 2, 2]} 
          w="fit-content" 
          m='auto' 
          spacing={8}
        >
          {thisUserReservations.map((res, id) => {
            return <ReservationCard key={id} reservation={res} />
          })}
        </SimpleGrid>
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