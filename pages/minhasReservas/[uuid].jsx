import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Container, Flex, FormLabel, Grid, Heading, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import Input from "../../components/Input"
import InputLocal from "../../components/InputLocal"
import InputObs from "../../components/InputObs";
import { useEffect, useRef, useState } from "react";
import InputDate from "../../components/InputDate";
import InputNumber from "../../components/InputNumber";
import { getSession } from "next-auth/react";
import DeletingModal from "../../components/DeletingModal";
import { connectToDatabase } from "../api/reservas";
import { baseUrl, externalMaxCapacity, internalMaxCapacity } from "../_app";

export const getServerSideProps = async (context) => {
  const { req, res, params} = context
  const session = await getSession(context)

  
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  
  const db = await connectToDatabase()
  const { uuid } = params
  const externalResponse = await axios.get(baseUrl + '/api/quantidade/Varanda')
  const externalQuantity = externalResponse.data
  const internalResponse = await axios.get(baseUrl + '/api/quantidade/Interno')
  const internalQuantity = internalResponse.data

  const userEmail = session.user.email

  const colls = await db.listCollections().toArray()
  const collsNames = colls.map(col => col.name)
  
  const userReservations = []

  await Promise.all(collsNames.map(async colName => {
    const filtered = await db.collection(colName)
      .find({ email: userEmail }).toArray()
    if (filtered.length > 0) {
      userReservations.push(filtered);
    }
  }))

  const [ reservationRes ] = userReservations.find(res => res[0]._id == uuid)
  const reservationJSON = JSON.stringify(reservationRes)
  
  return {
    props: { 
      uuid,
      externalQuantity,
      internalQuantity,
      reservationJSON,
      userEmail: session.user.email
    }
  }
}

export default function MinhasReservas ({ uuid, externalQuantity, internalQuantity, reservationJSON }) {
  const reservation = JSON.parse(reservationJSON)
  
  const [ name, setName ] = useState(reservation.name)
  const [ date, setDate ] = useState(reservation.date)
  const [ adult, setAdult ] = useState(Number(reservation.adult))
  const [ teen, setTeen ] = useState(Number(reservation.teen))
  const [ child, setChild ] = useState(Number(reservation.child))
  const [ local, setLocal ] = useState(reservation.local)
  const [ obs, setObs ] = useState(reservation.obs)


  const [ externalIsFull, setExternalIsFull ] = useState(false)
  const [ internalIsFull, setInternalIsFull ] = useState(false)

  const [ isSending, setIsSending ] = useState(false) // Submit Button Blocker

  const { isOpen, onOpen, onClose } = useDisclosure() //Modal Controls
  const cancelRef = useRef()


  //Submit changes
  const handleChanges = async (e) => {
    setIsSending(true)
    e.preventDefault()
    const changes = { name, adult, teen, child, local, obs }
    await axios.put('../api/reservar', { changes, uuid, date })
    window.location.href = "/reservas"
  }

  //Delete reservation
  const handleDelete = async () => {
    const res = await axios.delete(`../api/reservas/delete/${uuid}`)
    window.location.href = "/reservas"
  }


  //Limitador de Reservas Varanda
  useEffect(() => {
    const total = Number(adult) + Number(teen) + Number(child)
    const fixedTotal = Number(reservation.adult) + Number(reservation.teen) + Number(reservation.child)

    switch (reservation.local) {
      case "Interno":
        if (local === "Varanda") {
          if ((externalQuantity[date] + total) > externalMaxCapacity) {
            setExternalIsFull(true)
          } else {
            setExternalIsFull(false)
          }
        }
        if(local === "Interno") {
          if ((internalQuantity[date] - fixedTotal) + total > internalMaxCapacity) {
            setInternalIsFull(true)
          } else {
            setInternalIsFull(false)
          }
        }    
      break;
      case "Varanda": 
        if (local === "Varanda") {
          if ((externalQuantity[date] - fixedTotal) + total > externalMaxCapacity) {
            setExternalIsFull(true)
          } else {
            setExternalIsFull(false)
          }
        }
        if(local === "Interno") {
          if ((internalQuantity[date] + total) > internalMaxCapacity) {
            setInternalIsFull(true)
          } else {
            setInternalIsFull(false)
          }
        }
      break;
      default:
        break;
    }

  }, [adult, teen, child, date, local])

  return (
    <>
    <DeletingModal 
      isOpen={isOpen} 
      onClose={onClose} 
      onOpen={onOpen} 
      cancelRef={cancelRef}
      handleDelete={handleDelete}
    />
      <Grid placeItems="center">
        <Container 
          maxW="lg" 
          mt={16} 
          height="100%"
        >
          <form onSubmit={handleChanges}>
            <Flex 
              direction="column" 
              gap={4}
            >
              
              <FormLabel>
                Nome completo:
                <Input 
                  autoComplete="name" 
                  isRequired
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormLabel>
              <FormLabel>
                E-mail:
                <Input
                  disabled
                  value={reservation.email}
                />
              </FormLabel>
              <FormLabel>
                Data da reserva:
                <InputDate 
                  value={reservation.date} 
                  disabled
                />
              </FormLabel>

              <Text fontWeight={500}>
                Quantidade de reservas:
              </Text>

              <Stack direction="row">
                <FormLabel>
                  <Tooltip 
                    label="Quantidades de adultos na reserva"
                  >
                    Adultos :
                  </Tooltip>
                  <InputNumber 
                    value={adult}
                    onChange={e => setAdult(e)}
                    min={1} 
                    isRequired
                  />
                </FormLabel>
                <FormLabel>
                  <Tooltip 
                    label="Quantidades de crianças de 8 a 12 anos na reserva"
                  >
                    8 a 12 anos:
                  </Tooltip>
                  <InputNumber
                    value={teen}
                    onChange={e => setTeen(e)}
                    min={0} 
                  />
                </FormLabel>
                <FormLabel>
                  <Tooltip 
                    label="Quantidades de crianças de 5 a 7 anos na reserva"
                  >
                    5 a 7 anos:
                  </Tooltip>
                  <InputNumber 
                    min={0} 
                    value={child}
                    onChange={e => setChild(e)}
                  />
                </FormLabel>
              </Stack>

              <Text fontWeight={500}>
                Salões:
              </Text>
              <InputLocal 
                value={local}
                onChange={e => setLocal(e)}
              />
              { internalIsFull && local === "Interno" &&
              <Alert fontSize="sm" status='error'>
                <AlertIcon/>
                <AlertDescription>Não há mais lugares disponíveis no salão interno para essa data. 
                </AlertDescription>
              </Alert>}
              { externalIsFull && local === "Varanda" &&
              <Alert fontSize="sm" status='error'>
                <AlertIcon/>
                <AlertDescription>Não há mais lugares disponíveis na varanda para essa data. 
                </AlertDescription>
              </Alert>}
              
              <InputObs 
                value={obs}
                onChange={e => setObs(e.target.value)}
              />

              <Stack spacing={2} w="50%" m="auto" direction="row">
                <Button 
                  w="50%" 
                  colorScheme="red"
                  onClick={onOpen}
                >
                  Excluir
                </Button>
                <Button 
                  w="50%" 
                  colorScheme="green"
                  type="submit"
                  isLoading={isSending}
                  isDisabled={
                    (externalIsFull && local === "Varanda") ||
                    (internalIsFull && local === "Interno")
                  }
                >
                  Salvar
                </Button>
              </Stack>

            </Flex>
          </form>
        </Container>
      </Grid>
    </>  
  )
}


