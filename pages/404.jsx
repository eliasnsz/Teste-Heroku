import { Button, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import GiantLogo from "../components/GiantLogo";

export default function Error404() {
  return (
    <Center h="66vh">
      <Stack align="center">
        <GiantLogo />
        <Image 
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/folder-not-found-2-497481.png"
          w="80px"
        ></Image>
        <Heading fontSize="lg">Página não encontrada</Heading>
        <Link href="/">
          <Button variant="link" colorScheme="brown">
            Voltar ao início
          </Button>
        </Link>
      </Stack>
    </Center>
  )
}
