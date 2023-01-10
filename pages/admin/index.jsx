import AdminTabs from "../../components/AdminTabs"
import Header from "../../components/Header"
import DefaultContainer from "../../components/DefaultContainer"
import LoadingScreen from "../../components/LoadingScreen"
import axios from "axios"
import { baseUrl } from "../_app"
import { useQuery } from "react-query"
import Reservations from "../../components/AdminPage/Reservations"
import CreateReservation from "../../components/AdminPage/CreateReservation"

export default function Admin() {

  //Get all reservations
  const { data: allReservations, isLoading } = useQuery("reservas", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas`)
    return response.data
  }, {
    staleTime: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })

  if (isLoading) return <LoadingScreen />
  
  return (
    <>
      <Header />
      <DefaultContainer maxW="3xl">
        <AdminTabs 
          tabOne={<Reservations allReservations={allReservations} />}
          tabTwo={<CreateReservation />} 
          tabThree={"cu3"}
        />
      </DefaultContainer>
    </>
  )
}