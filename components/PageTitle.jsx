import { Divider, Heading } from "@chakra-ui/react";

export default function PageTitle({ children }) {
  return (
    <>
      <Heading textAlign="center" mb={4} fontFamily="secondary">{ children }</Heading>
    </>
  )
}