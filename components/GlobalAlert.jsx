import { Alert, AlertIcon } from "@chakra-ui/react";

export default function GlobalAlert({ children }) {
  return (
    <Alert status='error'>
      <AlertIcon />
      {children}
    </Alert>
  )
}