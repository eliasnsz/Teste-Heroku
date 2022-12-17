import { ArrowBackIcon } from "@chakra-ui/icons";
import { Avatar, MenuIcon, MenuDivider, Button, Flex, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Stack, Text, Tag } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { adminEmails } from "../pages/_app";

export default function HeaderMenu() {
  
  const {data: session} = useSession()

  const getFirstName = () => {
    const name = session.user.name
    if (session) {
      const index = name.indexOf(" ")
      if (index > -1) {
        return name.slice(0, index)
      }
      return name
    }
  }

  const isAdmin = session && adminEmails.includes(session.user.email)

  if (session) {
    return (
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label='Options'
          src={session.user.image}
          size="md"
          cursor="pointer"
          variant='outline'
        />
        <MenuList>
          <MenuGroup fontSize="md" title={`Bem-vindo, ${getFirstName()}!`}>
            {isAdmin && <Tag ml={4} colorScheme="red" variant="solid">Administrador</Tag>}
            <MenuDivider />
            <MenuItem pl={4} as={Link} href="/">
              Inicio
            </MenuItem>
            <MenuItem pl={4} as={Link} href="/reservar">
              Nova reserva
            </MenuItem>
            <MenuItem pl={4} as={Link} href="/reservas">
              Minhas reservas
            </MenuItem>
            <MenuItem pl={4} as={Link} href="/cardapio">
              Cardapio
            </MenuItem>
            {isAdmin &&
            <MenuItem pl={4} as={Link} href="/admin">
              Painel Administrativo
            </MenuItem>}
            <MenuDivider />
            <MenuItem onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
              <ArrowBackIcon mr={2}/>
              Sair
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    )
  }

  return (
    <Flex 
      color="#000" 
      align="" 
      gap={2}
    >

      <Link href="/login">
        <Button 
          size="sm" 
          colorScheme="green"
        >Entrar</Button>
      </Link>

    </Flex>  
  )
}