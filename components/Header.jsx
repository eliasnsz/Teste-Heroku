import { Box, Button, Flex, Image, List, ListItem, Menu, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import HeaderButton from "./HeaderButton";
import HeaderMenu from "./HeaderMenu";


export function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <>
      <Box 
        minH="8vh" 
        position={["static", "static", "absolute"]}
        zIndex={1}
        w="100%"
        bgColor={["brown.100", "brown.100", "transparent"]}
      >
        <Flex 
          align="flex-start"
          w={["100%", "100%", "70%"]}
          px={[4, 4, 12]} 
          pt={[2, 2, 4]}
          justify="space-between"
        >
          <Box 
            bg="brown.200" 
            borderRadius={"lg"} 
            px={2} 
            py={10} 
            mt={-10}
            ml={[2, 2, 4, 24]}
            pos="static" 
            top={-10}
            border="4px solid"
            boxShadow="lg"
            borderColor="brown.300"
          >
            <Link href="/">
              <Image /*Logo*/
              w={["75px", "75px", "100px", "175px"]}
              alt="recanto-andreeta-logo"
              src="https://i.imgur.com/xHAkxha.png"
              />
            </Link>
          </Box>

          <UnorderedList 
            w="100%"
            color="brown.1000" 
            fontWeight="600"
            fontSize={["sm", "sm", "md"]}
            fontFamily="Montserrat"
            listStyleType="none"
            mt={3}
          >
            <Flex justify="space-evenly">
              <Link href="/">
                <ListItem _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Início</HeaderButton>
                </ListItem>
              </Link>
              <Link href="/cardapio">
                <ListItem _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Cardápio</HeaderButton>
                </ListItem>
              </Link>
              <Link href="/">
                <ListItem _hover={{ cursor: "pointer" }}>
                  <HeaderButton>Contato</HeaderButton>
                </ListItem>
              </Link>
            </Flex>
          </UnorderedList>

          <HeaderMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </Flex>
      </Box>
    </>  
  )
}
