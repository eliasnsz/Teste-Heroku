import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { GiCheckMark } from 'react-icons/gi'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { baseUrl } from '../pages/_app'
import { useQueryClient } from 'react-query'
import { useState } from 'react'

export default function WaitlistStatusModal({ isOpen, onOpen, onClose, data, pos }) {

  const toast = useToast()

  const queryClient = useQueryClient()

  async function handleDelete(uuid, action) {
    await axios.delete(`${baseUrl}/api/waitlist`, { data: { uuid } })
    queryClient.invalidateQueries("waitlist")
    handleAlert(action)
    onClose()
  }

  const handleAlert = (action) => {
    const getAlertMessage = () => {
      switch (action) {
        case "entrada":
          return {
            title: "Entrada efetuada com sucesso.",
            status: 'success',
          }
        case "desistencia":
          return {
            title: "Desistência efetuada com sucesso.",
            status: 'warning',
          }
        case "exclusao":
          return {
            title: "Exclusão efetuada com sucesso.",
            status: 'error',
          }
        default:
          break;
      }
    }
    toast({
      duration: 4000, //4 segundos
      isClosable: true,
      ...getAlertMessage()
    })
  }

  if (data) {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay 
            bg='blackAlpha.400'
            backdropFilter='blur(5px)'
          />
          <ModalContent>
            <ModalHeader>
              {pos}º - {data.name}
              <Text fontWeight={600} fontSize="md">Escolha a ação desejada:</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Flex w="100%" justify="center" align="center" gap={2} direction="column"> 
                <Button w="96%" colorScheme="green" onClick={() => handleDelete(data._id, "entrada")}>
                  Efetivar entrada
                  <Icon ml={1} as={GiCheckMark} boxSize={3.5}/>
                </Button>
                <Button w="96%" colorScheme="yellow" onClick={() => handleDelete(data._id, "desistencia")}>
                  Desistência
                  <Icon ml={1} as={BsExclamationCircle}/>
                </Button>
                <Button w="96%" colorScheme="red" onClick={() => handleDelete(data._id, "exclusao")}>
                  Excluir
                  <Icon ml={1} as={FaTrash} boxSize={3.5}/>
                </Button>
                <Button w="96%" variant='outline' onClick={onClose}>
                  Cancelar
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
