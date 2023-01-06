import { Center, Flex, FormLabel, RadioGroup, Stack, Text } from "@chakra-ui/react";
import LocalRadio from "./LocalRadio";

export default function LocalInput ({ ...props }) {
  return (
    <FormLabel fontWeight={600}>
      Escolha um salão: 
      <Text fontSize="sm" color="blackAlpha.500">(Sujeito à disponibilidade)</Text>

      <RadioGroup m="auto" name="local" {...props}>
        <Flex my={8} direction='row' justify="space-between" w="100%" fontWeight={400}>
          <LocalRadio>Interno</LocalRadio>
          <LocalRadio>Varanda</LocalRadio>
          <LocalRadio isDisabled>Interno novo</LocalRadio>
        </Flex>
      </RadioGroup>
    </FormLabel>
  )
}