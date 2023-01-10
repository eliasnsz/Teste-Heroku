import { Button, Flex } from "@chakra-ui/react";

export default function ResModalButtons({ isSending, onClose, handleDelete, handleCheckIn, reservation }) {
  return (
    <Flex w="100%" m="auto" justify={["space-between", "center", "center"]} gap={2} direction="column-reverse">
      <Button
        size="sm"
        w="100%"
        colorScheme="green"
        type="submit"
        isLoading={isSending}
        isDisabled={isSending}
      >Salvar</Button>
      <Flex
        gap={2}
        w="100%"
        justify={["space-between", "center", "center"]}
        direction={["column-reverse", "row", "row"]}
      >
        <Button size="sm" w="100%" bg="#ddd" onClick={onClose}>Cancelar</Button>
        <Button size="sm" w="100%" variant="solid" colorScheme="red" onClick={handleDelete}>Excluir</Button>
        <Button
          size="sm"
          w="100%"
          variant="solid"
          colorScheme="blue"
          onClick={handleCheckIn}
          isDisabled={!reservation.mesa}
        >Check-In</Button>
      </Flex>
    </Flex>
  )
}