import { EditIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons"
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { getSession } from "next-auth/react"
import { useQueryClient } from "react-query"
import Reservations from "../../components/Reservations"
import { adminEmails } from "../_app"


export default function Admin({ email }) {
  const queryClient = useQueryClient()
  
  
  return (
    <>
      <Container 
       maxW="4xl"
      >
      <Tabs 
        isFitted 
        colorScheme="twitter" 
        variant="enclosed" 
      >
        <TabList 
          boxShadow="md" 
          my={4}
        >
          <Tab border="1px solid #C7936E" _selected={{bgColor: "#ffeadb"}} >
            <SearchIcon />
          </Tab>
          <Tab border="1px solid #C7936E" _selected={{bgColor: "#ffeadb"}} >
            <PlusSquareIcon />
          </Tab>
          <Tab border="1px solid #C7936E" _selected={{bgColor: "#ffeadb"}} >
            <EditIcon />
          </Tab>

        </TabList>
        
        <TabPanels>

          <TabPanel >
            <Reservations />
          </TabPanel>

        </TabPanels>
      </Tabs>
      </Container>
    </> 
  )
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  const userEmail = session.user.email
  const hasPermission = adminEmails.includes(userEmail)

  if (!hasPermission) {
    return {
      redirect: {
        destination: "/404",
        permanent: false
      }
    }
  }

  return {
    props: {
      email: session.user.email
    }
  }
}