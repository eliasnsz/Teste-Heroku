import { FormLabel, Stack } from "@chakra-ui/react";
import NumberInput from "./NumberInput";

export default function QuantityInputs () {
  return (
    <FormLabel fontWeight={600}>
      Quantidade de Reservas:

      <Stack mt={4} direction="row">
        <NumberInput defaultValue="1" name="adult" isRequired min="1" label="Adultos:" />
        <NumberInput defaultValue="0" name="teen"  label="8 a 12 anos:" />
        <NumberInput defaultValue="0" name="child"  label="5 a 7 anos:" />
      </Stack>
    </FormLabel>
  )
}