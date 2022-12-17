import Input from "./Input";

export default function InputDate({...props}) {

  return (
    <Input
      placeholder="Selecione a data da reserva"
      size="lg"
      type="date"
      {...props}
    />  
  )
}