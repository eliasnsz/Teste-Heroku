import { 
  Button, 
  FormLabel, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Flex, 
  InputGroup, 
  InputLeftAddon, 
  Stack, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper, 
  NumberInput,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import InputNumber from './InputNumber'
import InputLocal from './InputLocal'
import InputObs from './InputObs'
import axios from "axios"
import { useQueryClient } from "react-query"
import GlobalAlert from "./GlobalAlert"

export default function InfoModal({ reservations, reservation, isOpen, onClose, isSending, setIsSending }) {

  const queryClient = useQueryClient()

  const [ name, setName ] = useState(reservation.name)
  const [ mesa, setMesa ] = useState(reservation.mesa)
  const [ local, setLocal ] = useState(reservation.local)
  const [ adult, setAdult ] = useState(reservation.adult)
  const [ teen, setTeen ] = useState(reservation.teen)
  const [ child, setChild ] = useState(reservation.child)
  const [ obs, setObs ] = useState(reservation.obs)

  const [ isExistentTableNumber, setExistentTableNumber ] = useState(false)

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
    return
  }

  //Delete reservation
  const handleDelete = async (uuid) => {
    const res = await axios.delete(`../api/reservas/delete/${uuid}`)
    queryClient.invalidateQueries("reservations")
    onClose()
  }
  
  //Checar se existe um numero de mesa ja existente
  useEffect(() => {
    const allTableNumbers = (reservations.filter(res => res.mesa !== reservation.mesa && res.mesa.trim() !== "")).map(res => res.mesa)
    if (allTableNumbers.includes(mesa)) {
      setExistentTableNumber(true)
      return
    }
    setExistentTableNumber(false)
  }, [mesa])

  const isButtonDisabled = isExistentTableNumber ? true : false

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered="true"
      >
        <ModalOverlay/>
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
                    value={mesa}
                    onChange={e => setMesa(e)}
                    min={1}
                  >
                    <NumberInputField borderLeftRadius="none"/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
                {
                isExistentTableNumber 
                  && <GlobalAlert>Já existe uma reserva nessa mesa</GlobalAlert>
                } 
                {/* Nome */}
                <InputGroup>
                  <InputLeftAddon bgColor="brown.300">Nome: </InputLeftAddon>
                  <Input
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
                        value={adult}
                        min={1}
                        onChange={e => setAdult(e)}
                        ></InputNumber>
                    </FormLabel>
                  </InputGroup>
                  <InputGroup>
                    <FormLabel fontWeight={400}>
                      8 a 12:
                      <InputNumber
                        value={teen}
                        min={0}
                        onChange={e => setTeen(e)}
                      ></InputNumber>
                    </FormLabel>
                  </InputGroup>
                  <InputGroup>
                    <FormLabel fontWeight={400}>
                      5 a 7:
                      <InputNumber
                        value={child}
                        min={0}
                        onChange={e => setChild(e)}
                      ></InputNumber>
                    </FormLabel>
                  </InputGroup>
                </Stack>
                {/* Salão */}
                <InputLocal 
                  value={local}
                  onChange={e => setLocal(e)}
                />
                {/* Observações */}
                <InputObs 
                  value={obs}
                  onChange={e => setObs(e.target.value)}
                />

              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
                colorScheme='red'
                isLoading={isSending}
                onClick={() => handleDelete(reservation._id)}
              >
                Excluir
              </Button>
            <Stack justify="flex-end" w="100%" direction="row" spacing={2}>
              <Button
                colorScheme='blue'
                isLoading={isSending}
                onClick={handleChanges}
                isDisabled={isButtonDisabled}
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