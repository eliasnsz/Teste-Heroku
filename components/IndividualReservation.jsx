import { Icon, WarningIcon } from "@chakra-ui/icons"
import { 
  useDisclosure, 
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Stack,
  Tag,
  Divider,
  Flex,
  TagLabel,
} from "@chakra-ui/react"
import { useState } from "react"
import InfoModal from "./InfoModal"
import { MdError } from "react-icons/md"
import moment from "moment/moment"

export default function IndividualReservation ({ reservations, reservation, isLoading }) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ isSending, setIsSending ] = useState(false)  

  const getResTotal = () => {
    const total = 
      Number(reservation.adult) + 
      Number(reservation.teen) + 
      Number(reservation.child) 
    if (total > 1) {
      return total + " pessoas"
    }
      return total + " pessoa"
  }

  const creationPastTimeInMinutes = (reservation) => {
    const now = moment()
    const createdAt = moment(reservation.createAt)
    const pastTimeInMinutes = Math.round(now.diff(createdAt) / 1000 / 60) // 60s
    return pastTimeInMinutes
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
          {creationPastTimeInMinutes(reservation) < 10 &&
          <Tag mt={1} colorScheme="twitter" variant="solid">
            <TagLabel>
              Recente
            </TagLabel>
          </Tag>}
        </CardHeader>
        <CardBody >
          <Flex align="center">
            <Heading fontSize="md" mr={1}>Mesa: </Heading>
            <Text>{ reservation.mesa || 
              <Icon boxSize="20px" color="#ff4043" as={MdError}/>}
            </Text>
          </Flex>
          <Flex align="center">
            <Heading fontSize="md" mr={1}>Reservas: </Heading>
            <Text><em>{getResTotal()}</em></Text>
          </Flex>
          <Flex align="center">
            <Heading fontSize="md" mr={1}>Salão: </Heading>
            <Text><em>{reservation.local}</em></Text>
          </Flex>
          <Flex align="flex-start">
            <Heading mt={"2px"} mr={1} fontSize="md">Obs: </Heading>
            <Text><em>{reservation.obs  || "--" }</em></Text>
          </Flex>
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