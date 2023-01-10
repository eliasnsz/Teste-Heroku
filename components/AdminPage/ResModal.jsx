import {  Button, ButtonGroup, Divider, EditableInput, EditablePreview, Flex, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useEditableControls, useToast } from "@chakra-ui/react";
import moment from "moment";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Local from "./Local";
import GlobalAlert from "../GlobalAlert"
import { useQueryClient } from "react-query";
import axios from "axios";
import DeletingModal from "../DeletingModal";
import Editable from "./Editable"
import Obs from "./Obs";
import ResModalButtons from "./ResModalButtons";
import Link from "next/link";

export default function ResModal({ isOpen, onOpen, onClose, reservation, allReservations, handleCheckIn }) {

  const [ isSending, setSending ] = useState(false)

  const { isOpen: deletingIsOpen, onOpen: deletingOnOpen, onClose: deletingOnClose } = useDisclosure()
  const toast = useToast()
  const queryClient = useQueryClient()

  const handleDelete = () => {
    deletingOnOpen()
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    
    const fields = [ "mesa", "adult", "teen", "child", "local", "obs" ]
    const changes = {}
    
    for (let i = 0; i < fields.length; i++) {
      changes[fields[i]] = event.target[fields[i]].value
    }

    const alreadyExistTableNumber = allReservations
      .filter(res => res.date === reservation.date)
      .filter(res => res.mesa)
      .map(res => res.mesa)
      .includes(changes.mesa)

    if (reservation.mesa !== changes.mesa && alreadyExistTableNumber) {
      sendExistentTableNumberMessage(changes.mesa)
      setSending(false)
      return
    }

    await axios.put("/api/reservas", { changes, uuid: reservation._id, date: reservation.date, editLocal: "admin" });

    queryClient.invalidateQueries("reservas")
    onClose()
    sendSucessMessage()
    setSending(false)
  } 

  //Messages
  const sendSucessMessage = () => {
    toast({
      title: 'Pronto!',
      description: "Sua reserva foi atualizada com sucesso.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const sendExistentTableNumberMessage = (mesa) => {
    toast({
      title: 'Erro!',
      description: `A mesa ${mesa} já está ocupada!`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <DeletingModal reservation={reservation} isOpen={deletingIsOpen} onOpen={deletingOnOpen} onClose={deletingOnClose} />
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick="false" size={["sm", "md", "md"]}>
        <ModalOverlay
          bg='blackAlpha.400'
          backdropFilter='blur(5px)'
        />
        <form onSubmit={handleSubmit}>
          <ModalContent bg="brown.100" borderRadius="none">
            <ModalHeader>
              <Heading fontSize="2xl">Dados da reserva:</Heading>
              <CreationInfo reservation={reservation}/>
            </ModalHeader>
            
            <ModalCloseButton onClick={onClose}/>

            <ModalBody>
              <Flex direction="column" gap={1}>

                <Editable title="Mesa" name="mesa" defaultValue={reservation.mesa}/>
                <ModalField title="Nome" value={reservation.name}/>
                <ModalField title="Contato" value={
                <Button 
                  variant="link"  
                  as={Link} 
                  color="blue.500" 
                  href={`tel:${reservation.phone}`}
                >
                  {reservation.phone}
                </Button>
              }/>
                
                <Editable isRequired title="Adultos" name="adult" defaultValue={reservation.quantity.adult}/>
                <Editable isRequired title="8 a 12" name="teen" defaultValue={reservation.quantity.teen}/>
                <Editable isRequired title="5 a 7" name="child" defaultValue={reservation.quantity.child}/>
                <Local name="local" defaultValue={reservation.local}/>
                <Obs defaultValue={reservation.obs}/>
                
              </Flex>
            </ModalBody>
          
          
            <ModalFooter>
              <ResModalButtons 
                isSending={isSending} 
                onClose={onClose} 
                handleDelete={handleDelete} 
                handleCheckIn={handleCheckIn} 
                reservation={reservation}
              />
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

function ModalField ({ title, value }) {
  return (
    <Flex align="flex-start" justify="space-between" gap={2}>
      <Heading fontSize="md">{`${title}:`}</Heading>
      <Text>{value}</Text>
    </Flex>
  )
}

function CreationInfo ({ reservation }) {
  const creator = reservation.creationInfo.creator.name
  const createdAt = reservation.creationInfo.creator.createdAt
  const creationToNow = moment(createdAt).fromNow()


  function isRecentReservation() {
    const createdAt = reservation.creationInfo.creator.createdAt
    const createdAtFormatted = moment(createdAt)
    const now = moment()
    const diffInMinutes = Math.round(now.diff(createdAtFormatted) / 1000 / 60)
    if (diffInMinutes < 10) {
      return true
    }
    return false
  }
  function isRecentModified() {
    const lastModified = reservation.lastModified
    const lastModifiedFormatted = moment(lastModified)
    const now = moment()
    const diffInMinutes = Math.round(now.diff(lastModifiedFormatted) / 1000 / 60)
    const diffFormatted = lastModifiedFormatted.fromNow()

    if (diffInMinutes < 10) {
      return [true, diffFormatted]
    }
    return [false, diffFormatted]
  }
  
  if (isRecentModified()[0] && !isRecentReservation()) {
    return (
    <>
      <Text fontSize="sm" color="gray">
        Criado pelo site há {creationToNow}
      </Text>
      <Text fontSize="sm" color="gray">Editada pelo usuário há {isRecentModified()[1]}</Text>
    </>
    )
  }

  if (reservation.creationInfo.createdByAdmin) {
    return (
      <>
        <Text fontSize="sm" color="gray">
          Criado pela administração há {creationToNow}
        </Text>
        <Text fontSize="sm" color="gray">Administrador: {creator}</Text>
      </>
    )
  }

  return (
    <>
      <Text fontSize="sm" color="gray">
        Criado pelo site há {creationToNow}
      </Text>
    </>
  )
}