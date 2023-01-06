import { Button, Center } from "@chakra-ui/react"

export default function SubmitButton({ children , ...props}) {
  return(
    <Center mt={8}>
      <Button 
        size="lg"
        colorScheme="green"
        type="submit"
        {...props}
      >
        {children}
      </Button>
    </Center>
  )
}