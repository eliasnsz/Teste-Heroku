import { 
  Box,
  Flex, 
  Stat, 
  StatLabel, 
  StatNumber, 
} from "@chakra-ui/react";


export default function Stats({ reservations }) {

  const totalInternal = reservations ? reservations.reduce((acc, res) => {
    if (res.local === "Interno") {
      return acc + Number(res.adult) + Number(res.teen) + Number(res.child)  
    } else {
      return acc
    }
  }, 0) : 0

  const totalExternal = reservations ? reservations.reduce((acc, res) => {
    if (res.local === "Varanda") {
      return acc + Number(res.adult) + Number(res.teen) + Number(res.child)  
    } else {
      return acc
    }
  }, 0) : 0
  
  return (
    <Box w="100%" border="1px solid #00000019" p="3px 20px" borderRadius="md">
      <Flex textAlign="center">
        <Stat>
          <StatLabel>
            Interno:
          </StatLabel>
          <StatNumber>
            {totalInternal}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>
            Externo:
          </StatLabel>
          <StatNumber>
            {totalExternal}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>
            Total:
          </StatLabel>
          <StatNumber>
            {totalInternal + totalExternal}
          </StatNumber>
        </Stat>
      </Flex>
    </Box >
  )
}