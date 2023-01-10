import { Center, Flex, FormLabel, Heading, RadioGroup, Stack, Text } from "@chakra-ui/react";
import LocalRadio from "../Inputs/LocalRadio";

export default function Local ({ ...props }) {
  return (
    <Stack>
      <Heading fontSize="md">Salão:</Heading>

      <RadioGroup w="100%" m="auto" name="local" {...props}>
        <Flex my={2} w="100%" direction='row' justify="space-between" fontWeight={400}>
          <LocalRadio>Interno</LocalRadio>
          <LocalRadio>Varanda</LocalRadio>
          <LocalRadio isDisabled>Interno novo</LocalRadio>
        </Flex>
      </RadioGroup>
    </Stack>
  )
}