import { Box, Button, Center, Container, Divider, Flex, Heading, Img, Stack } from "@chakra-ui/react";
import { getSession, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function Login() {

  return(
    <>
      <Header/>
      <Center w="100vw" h="80vh">
        <Stack border="1px solid lightGray" borderRadius="lg" px={20} py={8}>
          <Heading fontSize={24} fontWeight={300}>Faça o login para continuar:</Heading>
          
          <Button
            display="flex"
            size="lg"
            w="100%"
            colorScheme="blue"
            onClick={() => signIn("google")}
            gap={3}
            m="auto"
            py={7}
          >
            <Box bg="#fff" p="4px" borderRadius={4}>
              <Img src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/imagem-google-logo-com-fundo-transparente-1.png" alt="" w="30px"/>
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