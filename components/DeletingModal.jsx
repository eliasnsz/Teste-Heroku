import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useQueryClient } from "react-query";

export default function DeletingModal({ isOpen, onOpen, onClose, reservation }) {

  const toast = useToast()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    const uuid = reservation._id
    const date = reservation.date

    await axios.delete("/api/reservas", {data: { uuid, date }})
    queryClient.invalidateQueries("reservas")

    onClose()
    sendDeletingDateMessage()
  }
  
  const sendDeletingDateMessage = () => {
    toast({
      title: 'Pronto!',
      description: "Sua reserva foi removida.",
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.400'
          backdropFilter='blur(5px)'
        />
        <ModalContent bg="brown.100" borderRadius="none">
          <ModalHeader>Excluir reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tem certeza que deseja excluir sua reserva?</Text>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button variant="ghost" colorScheme="brown" onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" onClick={handleDelete}>Excluir</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}