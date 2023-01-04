import { Box, Button, Flex, Image, List, ListItem, Menu, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import HeaderButton from "./HeaderButton";
import Drawer from "./Drawer";


export function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <>
      <Box 
        minH="8vh" 
        position={["static", "static", "absolute"]}
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

          <Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </Flex>
      </Box>
    </>  
  )
}
