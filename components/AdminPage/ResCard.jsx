import { Avatar, Box, Center, Divider, Flex, Heading, Icon, Img, Tag, Text, useDisclosure } from "@chakra-ui/react";
import { BsArrowUpRight, BsPeopleFill } from 'react-icons/bs'
import { BiEdit, BiChair } from 'react-icons/bi'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { MdOutlineError } from 'react-icons/md'
import { ImClock2 } from 'react-icons/im'
import ResModal from "./ResModal";
import CheckInModal from "./CheckInModal";
import moment from "moment/moment";


export default function ResCard({ reservation, allReservations }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: checkInIsOpen, checkInOnOpen, checkInOnClose } = useDisclosure()
  
  function isRecentReservation() {
    const createdAt = reservation.creationInfo.creator.createdAt
    const createdAtFormatted = moment(createdAt)
    const now = moment()
    const diffInMinutes = Math.round(now.diff(createdAtFormatted) / 1000 / 60)
    if (diffInMinutes < 10) {
      return true
    }
    return false
  }
  
  function isRecentModified() {
    const lastModified = reservation.lastModified
    const lastModifiedFormatted = moment(lastModified)
    const now = moment()
    const diffInMinutes = Math.round(now.diff(lastModifiedFormatted) / 1000 / 60)
    if (diffInMinutes < 10 && !isRecentReservation()) {
      return [true, diffInMinutes]
    }
    return false
  }

  const handleCheckIn = () => {
  }

  return (
    <>
      <CheckInModal
        isOpen={checkInIsOpen} 
        onOpen={checkInOnOpen} 
        onClose={checkInOnClose}
        reservation={reservation}
      />
      <ResModal 
        isOpen={isOpen} 
        onOpen={onOpen} 
        onClose={onClose}
        reservation={reservation}
        allReservations={allReservations}
        handleCheckIn={handleCheckIn}
      />
      <Box 
        h="260px" 
        w="100%" 
        pos="relative"
        border="1px solid"
        borderColor="brown.500"
        boxShadow="5px 5px 0px #D4A276"  
        transition=".3s ease"
        _hover={{ 
          bgColor: "brown.200",
          cursor: "pointer"
        }}
        onClick={onOpen}
      >
        {isRecentReservation() && <RecentTag/>}
        {isRecentModified() && <ModifiedTag/>}
        <Box h="30%">
          <Img
            src={ reservation.local === "Varanda" 
              ? 'https://i.imgur.com/nBqZACE.jpg'
              : 'https://i.imgur.com/3f1s1V5.jpg'
            }
            alt="hall-image"
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
          />

          <Center>
            <Avatar mt={-6} boxShadow="base" bg="brown.400" src={reservation.creationInfo.creator.image}/>
          </Center>

          <Flex p={4} direction="column">
            <Heading mb={1} fontSize="md" noOfLines={1}>{reservation.name}</Heading>
            
            <Flex align="flex-start" gap={2} fontSize="sm">
              <Icon boxSize={5} as={AiOutlineFieldNumber}/>
              <Text>
                {
                  reservation.mesa ||
                  <Icon boxSize={5} as={MdOutlineError} color="red.500"/>
                }
              </Text>
            </Flex>

            <Divider mb={2} borderColor="brown.200"/>

            <Flex align="center" gap={2} fontSize="sm">
              <Icon boxSize={4} as={BsPeopleFill}/>
              <Text>{`${reservation.quantity.total} pessoas`}</Text>
            </Flex>

            <Flex align="center" gap={2} fontSize="sm">
              <Icon boxSize={4} as={BiChair}/>
              <Text>{reservation.local}</Text>
            </Flex>

            <Flex align="center" gap={2} fontSize="sm">
              <Icon boxSize={4} as={HiOutlinePencilAlt}/>
              <Text>{reservation.obs || "--"}</Text>
            </Flex>

          </Flex>
        </Box>
      </Box>
    </>
  )
}

const RecentTag = () => {
  return (
    <Tag 
      top={-2}
      right={-2}
      bg="blue.500"
      color="white" 
      pos="absolute"
      boxShadow={`2px 2px 0px #0000ff66`}
    >Novo
      <Icon ml={2} as={ImClock2} />
    </Tag>
  )
}

const ModifiedTag = () => {
  return (
    <Tag 
      top={-2}
      right={-2}
      bg="blue.500"
      color="white" 
      boxShadow={`2px 2px 0px #0000ff66`}
      pos="absolute"
    >Editado
      <Icon ml={2} as={ImClock2} />
    </Tag>
  )
}