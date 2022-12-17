import { Box, Button, Flex, Image, List, ListItem, Menu } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";


export function Header() {


  return(
    <>
      <Box 
        bg="brown.300" 
        px="6" 
        boxShadow="0px 8px 8px #00000011" 
      >
        <Flex 
          align="center" 
          justify="space-between"
        >
          <Link href="/">
            <Image /*Logo*/
            w="75px"
            alt="recanto-andreeta-logo"
            src="https://i.imgur.com/KlB6QOs.png"
            />
          </Link>

          <HeaderMenu />
        </Flex>
      </Box>
    </>  
  )
}
