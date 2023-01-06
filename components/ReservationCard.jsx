import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, Heading, HStack, Icon, IconButton, Image, Img, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { BsArrowUpRight, BsPeopleFill } from 'react-icons/bs'
import { BiEdit, BiChair } from 'react-icons/bi'
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'

import moment from "moment";

export default function ReservationCard({ reservation }) {

  return (
    <Center>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="brown.100"
        border={'1px'}
        borderColor="brown.200"
        boxShadow={useColorModeValue('6px 6px 0 #D4A27655', '6px 6px 0 cyan')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
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
        </Box>
        <Box p={4}>
          <Stack direction="row" align="center" gap={2} h="100%" mb={2} spacing={0}>
            <Heading color={'brown.1000'} fontSize={'2xl'} noOfLines={1}>
              {moment(reservation.date).format("DD/MM/YYYY")}
            </Heading>
            <Text color={'brown.900'}>
            {`(${moment(reservation.date).format("dddd")})`}
            </Text>
          </Stack>
          <Flex align="center" gap={2}>
            <Icon as={FaUserEdit}></Icon>
            <Text color={'brown.600'} noOfLines={2}>
              {reservation.name}
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Icon as={BsPeopleFill}></Icon>
            <Text color={'brown.600'} noOfLines={2}>
              {`${reservation.quantity.total} pessoas`}
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Icon as={BiChair}></Icon>
            <Text color={'brown.600'} noOfLines={2}>
              {reservation.local}
            </Text>
          </Flex>
        </Box>
        <HStack borderTop={'1px'} color="brown.200">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            color="brown.800"
            _hover={{ color: "brown.400" }}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'}>
              Editar Reserva
            </Text>
            <Icon as={BiEdit}></Icon>
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            role="group"
            _hover={{ bg: "red.500"}}
            cursor="pointer"
            >
              <Icon 
              color="brown.800"
              _groupHover={{ color: "white  "  }}
              as={FaTrashAlt}
              ></Icon>
          </Flex>
        </HStack>
      </Box>
    </Center> 
  )
}