import { Alert, AlertIcon, Button, Center, Container, Flex, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import Input from "./Input"
import InputDate from "./InputDate"
import InputLocal from "./InputLocal"
import InputNumber from "./InputNumber"
import InputObs from "./InputObs"

export default function CreateReservation() {

    const queryClient = useQueryClient()

    const [ name, setName ] = useState("")
    const [ date, setDate ] = useState("")
    const [ adult, setAdult ] = useState(1)
    const [ teen, setTeen ] = useState(0)
    const [ child, setChild ] = useState(0)
    const [ local, setLocal ] = useState("")
    const [ obs, setObs ] = useState("")

    const [ isSending, setIsSending ] = useState(false)
    const [ submitSucess, setSubmitSucess] = useState(false)

    //Enviar reserva
    async function handleSubmit(e) {
        e.preventDefault()
        setIsSending(true)

        const response = await axios.post("../api/reservar", {
        name, email: "", local, adult, teen, child, date, obs
        })
        
        queryClient.invalidateQueries("reservations")
        setName("")
        setDate("")
        setAdult(1)
        setTeen(0)
        setChild(0)
        setLocal("")
        setObs("")
        setIsSending(false)

        setSubmitSucess(true)
        setTimeout(() => {
            setSubmitSucess(false)
        }, 3000);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormLabel>
                    Nome:
                    <Input required value={name} onChange={e => setName(e.target.value)} />
                </FormLabel>
                <FormLabel>
                    Data:
                    <InputDate isRequired value={date} onChange={e => setDate(e.target.value)} />
                </FormLabel>
                
                <Flex justify="space-between">
                    <FormLabel>
                        Adultos:
                        <InputNumber isRequired min="1" value={adult} onChange={e => setAdult(e)} />
                    </FormLabel>
                    <FormLabel>
                        8 a 12:
                        <InputNumber value={teen} min="0" onChange={e => setTeen(e)} />
                </FormLabel>
                <FormLabel>
                    5 a 7:
                    <InputNumber value={child} min="0" onChange={e => setChild(e)} />
                </FormLabel>
                </Flex>

                <FormLabel>
                    Salão:
                    <Center mt={4}>
                        <InputLocal value={local} onChange={e => setLocal(e)} />
                    </Center>
                </FormLabel>

                <FormLabel>
                    <InputObs value={obs} onChange={e => setObs(e.target.value)} />
                </FormLabel>

                <Flex justify="center" mt={4}>
                    <Button 
                        colorScheme="green" 
                        type="submit"
                        isDisabled={isSending}
                        isLoading={isSending}
                    >
                        Reservar
                    </Button>
                </Flex>
            </form>
            {
                submitSucess && 
                <Alert mt={4} status='success'>
                    <AlertIcon />
                    Reserva criada com sucesso!
                </Alert>
            }
        </>
    )
}