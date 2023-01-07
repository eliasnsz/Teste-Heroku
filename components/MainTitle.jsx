import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function MainTitle({ isAuthing, setIsAuthing}) {
  return(
    <Center w='65%' h='100%'>
      <Box w="100%" h="40%">
        <Text 
          fontFamily="primary"
          textAlign="center"
          fontSize={["0.9em", "0.9em", "1em", "1.1em", "1.2em"  ]}
          fontWeight="300"
          textShadow="lg"
          mb={2}
        >
          Bem-vindo(a) ao Recanto Andreeta
        </Text>
        <Heading 
          textAlign="center" 
          px={8} 
          fontSize={["2em", "2em", "1.9em", "3em", "3.5em", "4em"  ]}
          fontFamily="secondary"
          fontWeight={700}
        >
          Comida caipira em meio à natureza
        </Heading>

        <Stack 
          spacing={4} 
          w={["50%", "50%", "50%", "100%"]}
          m="auto"
          justify="center" 
          fontFamily="primary"
          mt={12}
          direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
        >
          <SimpleButton href="/sobre">
            Saiba mais
          </SimpleButton>
          <CtaButton href="/reservar">
            Reservar agora!
          </CtaButton>
        </Stack>
      </Box>
    </Center>
  )
}

function SimpleButton ({ href, children }) {
  return (
    <Link href={href} passHref>
      <Button
        size="lg"
        color="#222"
        colorScheme="blackAlpha"
        variant="outline"
        borderRadius="none"
      >
        { children }
      </Button>
    </Link>
  )
}

function CtaButton({ href, children }) {
  return(
    <Link href={href} passHref>
      <Button
        size="lg"
        colorScheme="green"
        variant="solid"
        borderRadius="none"
        >
        { children }
      </Button>
    </Link>
  )
}