import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import GiantLogo from "./GiantLogo";

export default function LoadingScreen() {
  return (
    <Box h="100vh" w="100vw" bgColor="brown.100">
      <Center h="60%">
        <Stack align="center">
          <GiantLogo/>
          <Stack align="center" spacing={8}>
            <Text>Carregando...</Text>
            <Spinner size='xl'/>
          </Stack>
        </Stack>
      </Center>
    </Box>
  )
}