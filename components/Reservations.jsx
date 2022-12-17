import { SearchIcon } from "@chakra-ui/icons";
import { Button, Divider, Flex, FormLabel, Heading, Input, InputGroup, InputRightAddon, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../pages/_app";
import IndividualReservation from "./IndividualReservation";

export default function Reservations () {

  const queryClient = useQueryClient()
  const now = new Date().toISOString().split("T")[0]

  const [ date, setDate ] = useState(now)

  const { data: reservations, isLoading } = useQuery("reservations", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas/${date}`)
    return response.data
  },{
    refetchInterval: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })

  const handleDateChange = () => {
    queryClient.fetchQuery("reservations")
  }

  return (
  <>
    <Flex direction="column" gap={4}>
      <Stack w="100%" spacing={2} direction="row">
        <Input
          type="date"
          value={date}
          w="80%"
          onChange={e => setDate(e.target.value)}
        />
        <Button 
          w="20%" 
          colorScheme="blue"
          onClick={handleDateChange}
        >Buscar</Button>
      </Stack>
      
      <InputGroup>
        <Input
          type="text"
          placeholder="Pesquise as reservas pelo nome"
        >
        </Input>
        <InputRightAddon>
          <SearchIcon/>
        </InputRightAddon>
      </InputGroup>
    </Flex>

    <TableContainer>
      <Table size={["sm","md","md"]} variant={["striped", "simple", "simple"]} mt={8} colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>Mesa</Th>
            <Th>Nome</Th>
          </Tr>
        </Thead>
        <Tbody>
          { !isLoading && 
          reservations.map(res => {
            return (
              <IndividualReservation key={res._id} isLoading={isLoading} reservation={res}/>
            )})
          }
        </Tbody>
      </Table>
    </TableContainer>
  </>
  )
}