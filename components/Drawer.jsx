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

  const isAdmin = adminEmails.includes(session?.user?.email)

  return (
    <>
      <Icon cursor="pointer" as={FiMenu} boxSize="8" onClick={onOpen}></Icon>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay 
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
          />
        <DrawerContent bgColor="brown.100" color="brown.1000" >
          <DrawerCloseButton />
          <DrawerHeader mt={4}>
            <Flex align="center">
              <Image
                ml={3}
                as={Avatar}
                src={session?.user?.image}
                size="md"
                cursor="pointer"
                variant='outline'
                />
              <Box>
                <div>
                  <Text ml={4} fontSize="lg">{session?.user?.name}</Text>
                  {isAdmin && <Tag ml={4} mt={1} colorScheme="red" variant="solid" w="fit-content">Administrador</Tag>}
                </div>
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Stack align="flex-start" w="100">
              <DrawerButton href={"/"}>Início</DrawerButton>
              <DrawerButton href={"/cardapio"}>Cardápio</DrawerButton>
              <DrawerButton href={"/reservar"}>Nova reserva</DrawerButton>
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