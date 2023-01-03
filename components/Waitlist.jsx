import { Button, Flex, FormLabel, Heading, Icon, Image, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { MdOutlineAddCircle } from 'react-icons/md'
import WaitlistModal from "./WaitlistModal";
import WaitlistStatusModal from "./WaitlistStatusModal"
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../pages/_app";

export default function Waitlist() {

  const { 
    isOpen: isOpenWaitListModal, 
    onOpen: openWaitListModal, 
    onClose: closeWaitListModal 
  } = useDisclosure()

  const { 
    isOpen: isOpenWaitListStatusModal, 
    onOpen: openWaitListStatusModal, 
    onClose: closeWaitListStatusModal 
  } = useDisclosure()

  const [ dataForModal, setDataForModal ] = useState(null)

  const date = moment().format("YYYY-MM-DD")
  
  const { data: waitlist, isLoading } = useQuery("waitlist", async () => {
    const response = await axios.get(`${baseUrl}/api/waitlist`)
    return response.data
  }, {
    refetchInterval: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })

  

  if (!isLoading) {
    return (
      <>
        {dataForModal &&
          <WaitlistStatusModal 
          isOpen={isOpenWaitListStatusModal} 
          onOpen={openWaitListStatusModal}
          onClose={closeWaitListStatusModal}
          data={dataForModal.item}
          pos={dataForModal.pos}
        />}
        <WaitlistModal isOpen={isOpenWaitListModal} onOpen={openWaitListModal} onClose={closeWaitListModal}/>
        <Flex direction="column" gap={4}>
          {waitlist.length ?
          <TableContainer>
            <Table size={["sm", "md", "md"]} variant='striped'>
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
                        <Tr 
                          key={index + 1} 
                          _hover={{ cursor: "pointer" }} 
                          onClick={() => { setDataForModal({item, pos: index + 1}); openWaitListStatusModal() }}
                        >
                          <Td isNumeric>{`${index + 1}º`}</Td>
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
              <Text textAlign="center">Lista de espera vazia</Text>
              <Image 
                m="auto" 
                w="80px" 
                src ="https://static.thenounproject.com/png/469473-200.png"
                alt="Empty-folder-img"
              ></Image>
            </div>      
          }
          <Button colorScheme="green" onClick={openWaitListModal}>
            Adicionar
            <Icon ml={1} as={MdOutlineAddCircle} boxSize={6}></Icon>
          </Button>
        </Flex>
      </>
    )
  }

}