import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

export default function CheckInModal({ isOpen, onOpen, onClose }) {
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
              <Button colorScheme="red">Excluir</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}