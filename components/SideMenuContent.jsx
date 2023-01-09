import { Button, Center, Divider, Flex, Icon, ListItem, Stack, Tag, Text, UnorderedList } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import HeaderButton from "./HeaderButton";
import { RiLoginBoxLine } from 'react-icons/ri'
import { adminEmails } from "../pages/_app";

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
          h="70%" 
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

      <Divider m="auto"/>
      <LoginInfoOrButton />

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

function LoginInfoOrButton() {

  const { data: session } = useSession()
  const isAdmin = adminEmails.includes(session?.user?.email)

  if (!session) return (
    <Link href="/login">
      <Flex align="center" justify="center" gap={1}>
        <Button 
          my={6} 
          textAlign="center" 
          variant="solid" 
          colorScheme="green"
          borderRadius="none"
        >
          <Icon as={RiLoginBoxLine} color="white" mr={1}/>
          Fazer login
        </Button>
      </Flex>
    </Link>
  )
  return (
    <>

      <Stack align="center" spacing={1} my={4}>
        <Text fontWeight="600">{session.user.name}</Text>
        {isAdmin && <Tag colorScheme="red" variant="solid" size="sm" w="fit-content">Administrador</Tag>}
        <Button 
          variant="link" 
          colorScheme="red" 
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Sair
        </Button>
      </Stack>
    </>
  )
  
}