import { Button, Flex, FormLabel, Heading, Icon, Image, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { MdOutlineAddCircle } from 'react-icons/md'
import WaitlistModal from "./WaitlistModal";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../pages/_app";

export default function Waitlist() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const date = moment().format("YYYY-MM-DD")
  
  const { data: waitlist, isLoading } = useQuery("waitlist", async () => {
    const response = await axios.get(`${baseUrl}/api/waitlist`)
    return response.data
  }, {
    staleTime: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })

  if (!isLoading) {
    return (
      <>
        <WaitlistModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        <Flex direction="column" gap={4}>
          {waitlist.length ?
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th isNumeric>Fila</Th>
                  <Th>Nome</Th>
                  <Th isNumeric>Quantidade</Th>
                </Tr>
              </Thead>
              <Tbody>
                <>
                  {
                    waitlist.map((item, index) => {
                      return (
                        <Tr key={index + 1}>
                          <Td isNumeric>{index + 1}</Td>
                          <Td w="100%">{item.name}</Td>
                          <Td isNumeric>{item.quantity}</Td>
                        </Tr>
                      )
                    })
                  }
                </>
              </Tbody>
            </Table>
          </TableContainer>
          :
            <div>
              <Text textAlign="center" fontWeight="600">Lista de espera vazia</Text>
              <Image 
                m="auto" 
                w="80px" 
                src ="https://static.thenounproject.com/png/469473-200.png"
                alt="Empty-folder-img"
              ></Image>
            </div>      
          }
          <Button colorScheme="green" onClick={onOpen}>
            Adicionar
            <Icon ml={1} as={MdOutlineAddCircle} boxSize={6}></Icon>
          </Button>
        </Flex>
      </>
    )
  }

}