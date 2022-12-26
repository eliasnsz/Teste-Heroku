import { 
  useDisclosure, 
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import InfoModal from "./InfoModal"

export default function IndividualReservation ({ reservation, isLoading }) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ isSending, setIsSending ] = useState(false)  

  const getResTotal = () => {
    return Number(reservation.adult) + Number(reservation.teen) + Number(reservation.child) 
  }

  return (
    <>
      <Card onClick={onOpen} _hover={{cursor: "pointer", bgColor: "#efeeffbb"}} size="sm" variant="outline">
        <CardHeader>
          <Heading size='md'>{reservation.name}</Heading>
        </CardHeader>
        <CardBody fontWeight={500}>
          <Text>Mesa: { reservation.mesa || "--" }</Text>
          <Text>Reservas: {getResTotal()}</Text>
          <Text>Salão: {reservation.local}</Text>
          <Text>Obs: {reservation.obs  || "..." }</Text>
        </CardBody>
      </Card>
       
      <InfoModal 
        reservation={reservation} 
        isOpen={isOpen} 
        onClose={onClose}
        isSending={isSending}
        setIsSending={setIsSending}
      />
    </>
  )
}