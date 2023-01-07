import { Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import HeaderButton from "./HeaderButton";

export default function SideMenuContent () {
  return (
    <>
      <UnorderedList 
        w="100%"
        m="auto"
        mt={12}
        color="brown.1000" 
        h="100%"
        textAlign="center"
        fontSize="22px"
        fontWeight="400"
        fontFamily="secondary"
        listStyleType="none"
      >
        <Flex 
          direction="column" 
          h="60%" 
          justify="center" 
          gap={10} 
          align="center"
        >
          <Item href="/">Início</Item>
          <Item href="/reservar">Reservar</Item>
          <Item href="/reservas">Minhas reservas</Item>
          <Item href="/">Sobre nós</Item>
        </Flex>
      </UnorderedList>
    </>
  )
}

function Item ({ href, children}) {
  return (
    <Link href={href} passHref>
      <ListItem w="fit-content"  m="auto" _hover={{ cursor: "pointer" }}>
        <HeaderButton>{children}</HeaderButton>
      </ListItem>
    </Link>
  )
}