import { 
  Alert, 
  AlertDescription, 
  AlertIcon, 
  Button, 
  Container, 
  Flex, 
  FormLabel,
  Grid, 
  Link, 
  Stack, 
  Text, 
  Tooltip 
} from "@chakra-ui/react"
import { useQueryClient } from "react-query"
import axios from "axios"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Input from "../../components/Input"
import InputDate from "../../components/InputDate"
import InputLocal from "../../components/InputLocal"
import InputNumber from "../../components/InputNumber"
import InputObs from "../../components/InputObs"
import { connectToDatabase } from "../api/reservas"
import { baseUrl, externalMaxCapacity, internalMaxCapacity } from "../_app"

export default function Reservar({ sessionEmail, externalQuantity, internalQuantity, reservations }) {

  const queryClient = useQueryClient()
  
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState(sessionEmail)
  const [ local, setLocal ] = useState("")
  const [ adult, setAdult ] = useState(1)
  const [ teen, setTeen ] = useState(0)
  const [ child, setChild ] = useState(0)
  const [ date, setDate ] = useState("")
  const [ obs, setObs ] = useState("")

  const [ internalIsFull, setInternalIsFull ] = useState(false)
  const [ externalIsFull, setExternalIsFull ] = useState(false)
  
  const [ isSending, setIsSending ] = useState(false)
  const [ isExistingDate, setIsExistingDate ] = useState(false)
  const [ pastDate, setPastDate ] = useState(false)

  //Enviar reserva
  async function handleSubmit(e) {
    e.preventDefault()
    setIsSending(true)

    const response = await axios.post("../api/reservar", {
      name, email, local, adult, teen, child, date, obs
    })
    
    window.location.href="/reservas"
  }

  //Checar se esta registrando numa data que ja ha reserva
  useEffect(() => {
    const dates = reservations.map(res => res.date)
    if(dates.includes(date)) {
        setIsExistingDate(true)
      return
    }
    setIsExistingDate(false)
  }, [date])

  //Checar se a data desejada ja passou
  useEffect(() => {
    if (date) {
      const now = new Date().toISOString().split("T")[0]
      const reservationDate = new Date(date).toISOString().split("T")[0]
      if (now > reservationDate) {
        setPastDate(true)
      } else {
        setPastDate(false)
      }
    }
  }, [date])

  //Checar disponibilidade das reservas
  useEffect(() => {
    const total = Number(adult) + Number(teen) + Number(child)

    switch (local) {
      case "Interno":
        if (internalQuantity[date] !== undefined) {
            if (internalQuantity[date] + total > internalMaxCapacity) {
            setInternalIsFull(true)
          } else {
            setInternalIsFull(false)
          }
        } else {
          if (total > internalMaxCapacity) {
            setInternalIsFull(true)
          } else {
            setInternalIsFull(false)
          }
        }
      break;
      case "Varanda":
        if (externalQuantity[date] !== undefined) {
          if (externalQuantity[date] + total > externalMaxCapacity) {
            setExternalIsFull(true)
          } else {
            setExternalIsFull(false)
          }
        } else {
          if (total > externalMaxCapacity) {
            setExternalIsFull(true)
          } else {
            setExternalIsFull(false)
          }
        }
      break;
      default:

        break;
    }

  }, [adult, teen, child, date, local])

  return (
  <>
    <Grid placeItems="center">
      <Container maxW="lg" mt={16} height="100%">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            
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
                value={email}
              />
            </FormLabel>
            <FormLabel>
              Data da reserva:
              <InputDate isRequired value={date} onChange={e => setDate(e.target.value)}/>
              { isExistingDate &&
              <Alert fontSize="sm" status='error'>
                <AlertIcon/>
                <AlertDescription>Você já possui uma reserva para essa data. 
                  <Link 
                    fontWeight="600" 
                    color="blue.400"
                    href="/reservas"  
                  > Ver</Link>
                </AlertDescription>
              </Alert>}
              { pastDate &&
              <Alert fontSize="sm" status='error'>
                <AlertIcon/>
                <AlertDescription>Data inválida. 
                </AlertDescription>
              </Alert>}
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

            <Stack direction="row" align="center">
              <Text fontWeight={500}>
                Salões:
              </Text>
              <Text fontSize="sm" displây="inline" color="gray">
                (Sujeito à disponibilidade)
              </Text>
            </Stack>
            <InputLocal 
              onChange={setLocal} 
              value={local}
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

            <InputObs value={obs} onChange={e => setObs(e.target.value)}/>

            <Button 
              colorScheme="green" 
              alignSelf="center"
              type="submit"
              disabled={
                isSending || isExistingDate || pastDate ||
                (externalIsFull && local === "Varanda") ||
                (internalIsFull && local === "Interno")
              }
              isLoading={isSending}
            >
              Reservar
            </Button>

          </Flex>
          
          
        </form>
      </Container>
    </Grid>
  </>
  )
} 


export const getServerSideProps = async (context) => {
  const { req, res, params } = context
  const session = await getSession(context)
  const userEmail = session.user.email

  const db = await connectToDatabase()
  const externalResponse = await axios.get(baseUrl + '/api/quantidade/Varanda')
  const externalQuantity = externalResponse.data
  const internalResponse = await axios.get(baseUrl + '/api/quantidade/Interno')
  const internalQuantity = internalResponse.data

  const reservationsResponse = await axios.post(baseUrl + "/api/reservas", { userEmail })
  const reservations = reservationsResponse.data

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: { 
      sessionEmail: userEmail,
      externalQuantity,
      internalQuantity,
      reservations
    }
  }
}
