import { Box, Button, Flex, Icon, Input, SimpleGrid } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { useQueryClient } from "react-query";
import DateSearch from "./DateSearch";
import { TfiReload } from "react-icons/tfi";
import SearchInput from "./SearchInput";
import ResCard from "./ResCard";
import Stats from "./Stats";

export default function Reservations({ allReservations }) {

  const queryClient = useQueryClient()  
  const today = moment().format("YYYY-MM-DD")
  const [ date, setDate ] = useState(today)
  const [ search, setSearch ] = useState("")

  const refetchQuery = () => {
    queryClient.refetchQueries("reservas")
  }

  const reservations = allReservations.filter(res => res.date === date).reverse()

  const searchFilteredReservations = search.length && 
    reservations.filter(res => res.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Flex gap={4} direction="column">
        <DateSearch
          value={date}
          onChange={e => setDate(e.target.value)}
          refetchQuery={refetchQuery}
        />
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />

        <Box border="1px solid" borderColor="brown.300" p={4} h="56vh" overflowY="scroll">
          <SimpleGrid columns={[ 1, 2, 2, 3 ]}   placeItems="center" gap={4}>
            {!search.length ? 
              reservations.map((res, index) => {

                return <ResCard key={index} reservation={res} allReservations={allReservations} />

              })
              :
              searchFilteredReservations.map((res, index) => {

                return <ResCard key={index} reservation={res} allReservations={allReservations} />

              })
            }
          </SimpleGrid>
        </Box>
          <Stats reservations={reservations}/>
      </Flex>
    </>
  )
}