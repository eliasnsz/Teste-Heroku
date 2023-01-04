import { Box, Center, Container, Flex, Grid, GridItem, Heading, Image } from "@chakra-ui/react";


export default function Home() {

  return (
    <>
      <Flex direction={["column", "column", "row"]}>
        <Box 
          w={["100%", "100%", "40%"]} 
          h={["50vh", "50vh", "100vh"]} 
          pos={["static", "static", "absolute"]}
          right={0}
        >
          <Image 
            src="https://i.imgur.com/ri0zYBQ.jpg" 
            boxSize="100%" 
            objectFit="cover" 
            objectPosition="80%"
          />
        </Box>
        <Box 
          bgColor="brown.100"
          clipPath={["none", "none", "polygon(0 0, 70% 0, 60% 100%, 0% 100%)"]} 
          w="100%" 
          pos={["static", "static", "relative" ]}
          h={["50vh", "50vh", "100vh"]} 
        > 
        </Box>
      </Flex>
    </>
  )
}


/*bgImage="https://i.imgur.com/ri0zYBQ.jpg" bgPos="right" bgSize={"contain"}*/