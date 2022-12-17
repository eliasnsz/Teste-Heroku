import { Td, Tr, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, InputGroup, InputLeftAddon, Stack, InputRightAddon, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInput } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import InputNumber from "./InputNumber"

export default function IndividualReservation ({ reservation, isLoading }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()

  const [ name, setName ] = useState()
  const [ mesa, setMesa ] = useState()
  const [ local, setLocal ] = useState()
  const [ adult, setAdult ] = useState()
  const [ teen, setTeen ] = useState()
  const [ child, setChild ] = useState()
  const [ obs, setObs ] = useState()

  const [ isSending, setIsSending ] = useState(false)  

  //Fechar modal e limpar inputs
  function handleClose() {
    onClose()
    setName(reservation.name)
    setMesa(reservation.mesa)
    setLocal(reservation.local)
    setAdult(reservation.adult)
    setTeen(reservation.teen)
    setChild(reservation.child)
    setObs(reservation.obs)
  }

  //Submit changes
  const handleChanges = async (e) => {
    setIsSending(true)
    onClose()
    const changes = { mesa, name, adult, teen, child, local, obs }
    await axios.put('/api/reservar', { changes, uuid: reservation._id, date: reservation.date })
    queryClient.invalidateQueries("reservations")
    onClose()
    setIsSending(false)
  }

  return (
    <>
      <Tr onClick={onOpen} _hover={{ cursor: "pointer" }}>
        <Td>{reservation.mesa}</Td>
        <Td w="100%">{reservation.name}</Td>
      </Tr> 
       
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered="true"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar reserva:</ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody pb={6}>
            <form action="">
              <Flex direction="column" gap={4}>
                {/* Mesa */}
                <InputGroup >
                  <InputLeftAddon bgColor="brown.300">Mesa: </InputLeftAddon>
                  <NumberInput 
                  w="100%"
                  defaultValue={reservation.mesa}
                  value={mesa}
                  onChange={e => setMesa(e)}
                  >
                    <NumberInputField borderLeftRadius="none"/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
                {/* Nome */}
                <InputGroup>
                  <InputLeftAddon bgColor="brown.300">Nome: </InputLeftAddon>
                  <Input
                    defaultValue={reservation.name}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  ></Input>
                </InputGroup>
                {/* Quantidade */}
                <Stack direction="row">
                  <InputGroup>
                    <FormLabel fontWeight={400}>
                      Adultos:
                      <InputNumber
                        defaultValue={reservation.adult}
                        value={adult}
                        onChange={e => setAdult(e)}
                        ></InputNumber>
                    </FormLabel>
                  </InputGroup>
                  <InputGroup>
                    <FormLabel fontWeight={400}>
                      8 a 12:
                      <InputNumber
                        defaultValue={reservation.teen}
                        value={teen}
                        onChange={e => setTeen(e)}
                      ></InputNumber>
                    </FormLabel>
                  </InputGroup>
                  <InputGroup>
                    <FormLabel fontWeight={400}>
                      5 a 7:
                      <InputNumber
                        defaultValue={reservation.child}
                        value={child}
                        onChange={e => setChild(e)}
                      ></InputNumber>
                    </FormLabel>
                  </InputGroup>
                </Stack>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Stack justify="flex-end" w="100%" direction="row" spacing={2}>
              <Button
                colorScheme='blue'
                isLoading={isSending}
                onClick={handleChanges}
              >
                Salvar
              </Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}