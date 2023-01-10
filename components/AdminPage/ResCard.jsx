import { Avatar, Box, Center, Flex, Heading, Icon, Img, Text } from "@chakra-ui/react";
import { BsArrowUpRight, BsPeopleFill } from 'react-icons/bs'
import { BiEdit, BiChair } from 'react-icons/bi'
import { HiOutlinePencilAlt } from 'react-icons/hi'


export default function ResCard({ reservation }) {
  
  
  return (
    <>
      <Box h="220px" w="100%" boxShadow="5px 5px 0px #D4A276">
        <Box h="30%">
          <Img
            src={ reservation.local === "Varanda" 
              ? 'https://i.imgur.com/nBqZACE.jpg'
              : 'https://i.imgur.com/3f1s1V5.jpg'
            }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
          <Center>
            <Avatar mt={-6} boxShadow="base" src={reservation.creationInfo.creator.image  }/>
          </Center>
          <Flex p={4} direction="column">
            <Heading mb={1} fontSize="md" noOfLines={1}>{reservation.name}</Heading>
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
              <Text>{reservation.obs ? reservation.obs : "--"}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  )
}