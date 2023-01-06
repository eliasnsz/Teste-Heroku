import { Box, Button, Flex, Image, List, ListItem, Menu, UnorderedList, useDisclosure } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import HeaderButton from "./HeaderButton";
import Drawer from "./Drawer";


export default function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <>
      <Box 
        w="100%"
        bgColor={["brown.100", "brown.100", "transparent"]}
      >
        <Flex 
          align="center"
          w="100%"
          minH="8vh"
          bgColor="brown.200"
          borderBottom="4px solid"
          borderColor="brown.300"
          px={8}
          justify="space-between"
        >
          <Image 
            alt="recanto-andreeta-logo"
            w="80px"
            src="https://i.imgur.com/xHAkxha.png"
          />

          <Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </Flex>
      </Box>
    </>  
  )
}
