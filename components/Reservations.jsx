import { 
  Box,
  Button, 
  Flex,
  Input, 
  InputGroup, 
  InputRightAddon, 
  SimpleGrid, 
  Stack, 
} from "@chakra-ui/react";
import { useState } from "react"
import { SearchIcon } from "@chakra-ui/icons";
import { useQuery, useQueryClient } from "react-query";
import { baseUrl } from "../pages/_app";
import axios from "axios";

import IndividualReservation from "./IndividualReservation";
import Stats from "./Stats";

export default function Reservations () {

  const queryClient = useQueryClient()
  const now = new Date().toISOString().split("T")[0]

  const [ date, setDate ] = useState(now)
  const [ searchInputValue, setSearchInputValue ] = useState("")

  const { data: reservations, isLoading } = useQuery("reservations", async () => {
    const response = await axios.get(`${baseUrl}/api/reservas/${date}`)
    return response.data
  },{
    refetchInterval: 1000 * 60, // 60 segundos
    refetchOnWindowFocus: false
  })


  const filteredRes = searchInputValue.length ?
    reservations.filter(res => res.name.toLowerCase().includes(searchInputValue.toLowerCase())) 
    : []

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
      
      <Stats reservations={reservations}/>

      <InputGroup>
        <Input
          type="text"
          placeholder="Pesquise as reservas pelo nome"
          value={searchInputValue}
          onChange={e => setSearchInputValue(e.target.value)}
        >
        </Input>
        <InputRightAddon>
          <SearchIcon/>
        </InputRightAddon>
      </InputGroup>
    </Flex>

    <Box 
      height="45vh" 
      overflowY="scroll" 
      border="1px solid #00000019" 
      mt={4}
      px={3}
      borderRadius="md"
    >
      <SimpleGrid 
        mt={4} 
        spacing={4} 
        templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
      >
        { !isLoading && !searchInputValue ?
        reservations.map(res => {
          return (
            <IndividualReservation reservations={reservations} key={res._id} isLoading={isLoading} reservation={res}/>
          )})
        : !isLoading && filteredRes.map( res => {
          return (
            <IndividualReservation reservations={reservations} key={res._id} isLoading={isLoading} reservation={res}/>
          )
        })
        }
      </SimpleGrid>
    </Box>

  </>
  )
}