import { Icon, WarningIcon } from "@chakra-ui/icons"
import { 
  useDisclosure, 
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Stack,
} from "@chakra-ui/react"
import { useState } from "react"
import InfoModal from "./InfoModal"
import { MdError } from "react-icons/md"

export default function IndividualReservation ({ reservations, reservation, isLoading }) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ isSending, setIsSending ] = useState(false)  

  const getResTotal = () => {
    return Number(reservation.adult) + Number(reservation.teen) + Number(reservation.child) 
  }

  return (
    <>
      <Card 
          onClick={onOpen} 
          _hover={{cursor: "pointer"}} 
          size="sm" 
          variant="outline"
          boxShadow="md "
        >
        <CardHeader>
          <Heading size='md'>{reservation.name}</Heading>
        </CardHeader>
        <CardBody fontWeight={500}>
          <Stack direction="row" align="center">
            <Text>Mesa: { reservation.mesa || "--" }</Text>
              {!reservation.mesa && <Icon boxSize="20px" color="#ff4043" as={MdError}/>}
          </Stack>
          <Text>Reservas: {getResTotal()}</Text>
          <Text>Salão: {reservation.local}</Text>
          <Text>Obs: {reservation.obs  || "..." }</Text>
        </CardBody>
      </Card>
      <InfoModal 
        reservations={reservations}
        reservation={reservation} 
        isOpen={isOpen} 
        onClose={onClose}
        isSending={isSending}
        setIsSending={setIsSending}
      />
    </>
  )
}