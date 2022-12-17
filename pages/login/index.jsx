import { Box, Button, Container, Divider, Flex, Heading, Img } from "@chakra-ui/react";
import { getSession, signIn } from "next-auth/react";

export default function Login() {

  return(
    <>
        <Container maxW={["100%", null, "50%"]}>
          <Container 
            my={36} 
            minW="200px"
            p={[12, 8]} 
            border="1px solid #00000022" 
            borderRadius={"10px"}
          >
            <Flex 
              flexDir="column" 
              gap={4} 
              margin="auto"
            >
              <Heading fontSize={24} fontWeight={300}>Fazer login:</Heading>
              <Divider/>
              
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

            </Flex>
          </Container>
        </Container>
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
    props: {}
  }
}