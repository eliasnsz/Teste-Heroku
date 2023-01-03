import { Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Divider, Flex, Heading, Icon, Image, SimpleGrid, Spinner, Stack, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import { getSession } from "next-auth/react";
import { EditIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRef } from "react";
import DeletingModal from "../../components/DeletingModal";
import moment from "moment/moment";

export default function Reservas() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const { data: reservations, isLoading } = useQuery("userReservations", async () => {
    const response = await axios.get("../api/reservas")
    return response.data
  }, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 // 60 sec
  })

  const handleDelete = async (uuid) => {
    const res = await axios.delete(`../api/reservas/delete/${uuid}`)
    window.location.href = "/reservas"
  }

  const formmatedDate = (date) => {

    return moment(date).format("DD/MM/YYYY - (dddd)")

  }

  if (isLoading) {
    return (
    <>
      <Container maxW="4xl" mt={8} h="60vh">
        <Center h="100%">
          <Flex direction="column" justify="center">
            <Spinner />
          </Flex>
        </Center>
      </Container>
    </>
    )
  }

  
  if (reservations.length === 0) {
    return (
    <>
      <Container maxW="4xl" mt={8} h="60vh">
        <Center h="100%">
          <Flex direction="column" justify="center">
            <Text fontWeight="500" >Nenhuma reserva encontrada!</Text>
            <Image 
              m="auto" 
              w="80px" 
              src ="https://static.thenounproject.com/png/469473-200.png"
              alt="Empty-folder-img"
            ></Image>
            <Button 
              colorScheme="twitter" 
              m="auto" 
              mt={1}
              display="flex"
              variant="ghost"
              as={Link}
              href="/reservar"
              alignItems="center"
              gap={2}
            >
              <Text>
                Nova reserva
              </Text>
              <EditIcon/>
            </Button>
          </Flex>
        </Center>
      </Container>
    </>
    )
  }

  

  return(
    <>
      <DeletingModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onOpen={onOpen} 
        cancelRef={cancelRef}
        handleDelete={handleDelete}
      />
      <Container maxW="4xl" mt={8}>
        <Heading fontWeight={400} textAlign="center">Minhas reservas:</Heading>
        <Divider py={2}/>
        <SimpleGrid spacing={4} mt={8} templateColumns='repeat(auto-fill, minmax(210px, 1fr))'>
          {reservations.map(( res ) => {
            return (
              <Card key={res._id} textAlign="center" boxShadow="lg" border="1px solid #00000010">
                <CardHeader>
                  <Heading size='md'>{formmatedDate(res.date)}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{res.name}</Text>
                  <Text>{Number(res.adult) + Number(res.teen) + Number(res.child)} pessoas</Text>
                </CardBody>
                <CardFooter>
                    <Button 
                      w="100%"                    
                      as={"a"}
                      colorScheme="blue"
                      href={`./minhasReservas/${res._id}`}
                    >
                      Editar
                    </Button>
                </CardFooter>
              </Card>
            )
          })}
        </SimpleGrid>
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
  return {
    props: {}
  }
}