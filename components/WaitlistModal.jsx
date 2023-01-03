import { Button, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import axios from "axios"
import moment from "moment"
import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { baseUrl } from "../pages/_app"
import Input from './Input'
import InputNumber from './InputNumber'

export default function WaitlistModal({ isOpen, onOpen, onClose }) {

  const [ name, setName ] = useState("")
  const [ quantity, setQuantity ] = useState(1)
  
  const [ isSending, setIsSending ] = useState(false)

  const queryClient = useQueryClient()
  const date = moment().format("YYYY-MM-DD")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    console.log(name, quantity, date);
    await axios.post(`${baseUrl}/api/waitlist`, {
      name, quantity, date
    })
    queryClient.invalidateQueries("waitlist")
    setName("")
    setQuantity(1)
    onClose() 
    setIsSending(false)
  }

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
          bg='blackAlpha.400'
          backdropFilter='blur(5px)'
        />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>
              Adicionar à lista de espera:
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormLabel>
                  Nome:
                  <Input 
                    required
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                  />
                </FormLabel>
                <FormLabel>
                  Quantidade de reservas:
                  <InputNumber 
                    required
                    min={1} 
                    value={quantity} 
                    onChange={e => setQuantity(e)} 
                  />
                </FormLabel>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' onClick={onClose}>Cancelar</Button>
              <Button 
                colorScheme='green' 
                type="submit" 
                mr={3}
                isLoading={isSending}
                isDisabled={isSending}
              >
                Adicionar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}