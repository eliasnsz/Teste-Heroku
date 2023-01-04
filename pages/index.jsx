import { Box, Center, Container, Divider, Flex, Grid, GridItem, Heading, Icon, Image, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import HeaderButton from "../components/HeaderButton";
import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs'

export default function Home() {

  return (
    <>
      <Flex>
        <Box
          bgColor="brown.100" 
          px={[0, 0, "1.5%"]}
          h="100vh"
        />
        <Box 
          bgColor="brown.200" 
          px={4}
          borderLeft="4px solid"
          borderRight="4px solid"
          boxShadow="lg"
          borderColor="brown.300"
          display="flex"
          flexDir="column"
        >
          <Link href="/">
            <Image
            w={["130px", "130px", "200px"]}
            m="auto"
            alt="recanto-andreeta-logo"
            src="https://i.imgur.com/xHAkxha.png"
            />
          </Link>
          <UnorderedList 
            w="100%"
            m="auto"
            color="brown.1000" 
            h={["40%", "40%", "25%"]}
            textAlign="center"
            fontSize="22px"
            fontWeight="600"
            fontFamily="Playfair Display"
            listStyleType="none"
            ml={2}
            mt={8} 
          >
            <Flex direction="column" h="100%" justify="space-between" align="flex-start">
              <Link href="/">
                <ListItem w="fit-content"  m="auto" _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Início</HeaderButton>
                </ListItem>
              </Link>
              <Link href="/reservar">
                <ListItem w="fit-content" m="auto" _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Reservar</HeaderButton>
                </ListItem>
              </Link>
              <Link href="/cardapio">
                <ListItem w="fit-content" m="auto" _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Minhas reservas</HeaderButton>
                </ListItem>
              </Link>
              <Link href="/">
                <ListItem w="fit-content" m="auto" _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Sobre nós</HeaderButton>
                </ListItem>
              </Link>
            </Flex>
          </UnorderedList>
          <Divider mt={8}/>
          <Stack spacing={6} align="center" justify="center" my={8} direction="row">
            <Link 
              href="https://www.instagram.com/recantoandreeta/"
              target="_blank"
            >
              <Icon
                as={BsInstagram}
                boxSize={7}
                color="brown.600"
                cursor="pointer"
                _hover={{ color: "brown.400"}}
              >
              </Icon>
            </Link>
            <Link 
              href="https://www.facebook.com/recantoandreeta/"
              target="_blank"
            >
              <Icon
                as={BsFacebook}
                boxSize={7}
                color="brown.600"
                cursor="pointer"
                _hover={{ color: "brown.400"}}
              >
              </Icon>
            </Link>
            <Link 
              href="https://api.whatsapp.com/send?phone=5519998090924" 
              target="_blank"
            >
              <Icon
                as={BsWhatsapp}
                boxSize={7}
                color="brown.600"
                cursor="pointer"
                _hover={{ color: "brown.400"}}
              >
              </Icon>
            </Link>
          </Stack>
        </Box>
        <Box 
          w={["100%", "100%", "50%"]}
          zIndex={[-1, -1, 0]}
          h="100vh"
          pos="absolute" 
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
          w="65%"
          display={["none", "none", "block"]}
          h="100vh" 
        > 
        </Box>
      </Flex>
    </>
  )
}


/*bgImage="https://i.imgur.com/ri0zYBQ.jpg" bgPos="right" bgSize={"contain"}*/