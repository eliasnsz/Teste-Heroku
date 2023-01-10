import { Box, Center, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

export default function Stats({ reservations }) {

  const getTotal = (local) => {
    return reservations.reduce((acc, res) => {
      if (res.local === local) {
        return acc + parseInt(res.quantity.total)
      }
        return acc
    }, 0)
  }
  
  return (
    <>
      <Box 
        w="100%"
        h="100%"
        border="1px solid" 
        borderColor="brown.300"
        p={2}
      >
        <StatGroup textAlign="center">
          <Stat size="sm">
            <StatLabel>Interno</StatLabel>
            <StatNumber>{getTotal("Interno")}</StatNumber>
          </Stat>

          <Stat size="sm">
            <StatLabel>Varanda</StatLabel>
            <StatNumber>{getTotal("Varanda")}</StatNumber>
          </Stat>
          
          <Stat size="sm">
            <StatLabel>Total</StatLabel>
            <StatNumber>{getTotal("Varanda") + getTotal("Interno")}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </>
  )
}