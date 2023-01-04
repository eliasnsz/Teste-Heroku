import { ArrowBackIcon } from "@chakra-ui/icons";
import { Avatar, MenuIcon, MenuDivider, Button, Flex, IconButton, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Stack, Text, Tag, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Icon, Image, Box, Divider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { adminEmails } from "../pages/_app";
import { FiMenu } from 'react-icons/fi'
import { MdLogout } from 'react-icons/md'
import DrawerButton from "./DrawerButton";


export default function HeaderMenu({ isOpen, onOpen, onClose }) {
  
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
      <>
        {/* <Menu>
          <MenuButton
            as={Avatar}
            aria-label='Options'
            src={session.user.image}
            size={["sm", "sm", "md"]}
            cursor="pointer"
            variant='outline'
          />
          <MenuList>
            <MenuGroup fontSize="md" title={`Bem-vindo, ${getFirstName()}!`}> */}

        <Icon mt={2} cursor="pointer" as={FiMenu} boxSize="8" onClick={onOpen}></Icon>

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay 
            bg='blackAlpha.400'
            backdropFilter='blur(5px)'
          />
          <DrawerContent bgColor="#222">
            <DrawerHeader >
              <Flex align="center">
                <Image
                  ml={3}
                  as={Avatar}
                  aria-label='Options'
                  src={session.user.image}
                  size="md"
                  cursor="pointer"
                  variant='outline'
                />
                <Box>
                  <Text color="brown.100" ml={4} fontSize="lg">{`Bem-vindo, ${getFirstName()}.`}</Text>
                  {isAdmin && <Tag ml={4} mt={1} colorScheme="red" variant="solid">Administrador</Tag>}
                </Box>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <Stack align="flex-start" w="100">
                <DrawerButton href={"/"}>Início</DrawerButton>
                <DrawerButton href={"/cardapio"}>Cardápio</DrawerButton>
                <DrawerButton href={"/reservar"}>Nova reservas</DrawerButton>
                <DrawerButton href={"/reservas"}>Minhas reservas</DrawerButton>
                {isAdmin &&
                <DrawerButton href={"/admin"}>Painel Administrativo</DrawerButton>
                }
                <DrawerButton 
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                  href="/"
                >
                  <Icon as={MdLogout} mr={2}/>
                  Sair
                </DrawerButton>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
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