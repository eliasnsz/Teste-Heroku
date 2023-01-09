import { Box, Button, Center, Container, Divider, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import { getSession, signIn } from "next-auth/react";
import GiantLogo from "../../components/GiantLogo";

export default function Login() {

  return(
    <>
      <Center h="70vh">
        <Stack align="center" spacing={4}>
          <GiantLogo/>
          <Text>Faça login para continuar: </Text>
          <Button
            display="flex"
            size="lg"
            colorScheme="blue"
            borderRadius="full"
            onClick={() => signIn("google")}
            gap={3}
            m="auto"
          >
            <Box bg="#fff" p="4px" borderRadius={4}>
              <Img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/imagem-google-logo-com-fundo-transparente-1.png" alt="google-logo" w="20px"/>
            </Box>
            Continuar com o Google
          </Button>
        </Stack>
      </Center>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}