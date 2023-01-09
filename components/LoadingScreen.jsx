import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import GiantLogo from "./GiantLogo";

export default function LoadingScreen() {
  return (
    <Center h="60vh">
      <Stack align="center">
        <GiantLogo />
        <Stack align="center" spacing={8}>
          <Text>Carregando...</Text>
          <Spinner size='xl'/>
        </Stack>
      </Stack>
    </Center>
  )
}