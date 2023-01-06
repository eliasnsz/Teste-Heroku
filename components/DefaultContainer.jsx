import { Box, Container } from "@chakra-ui/react";

export default function DefaultContainer({ children, ...props }) {
  return (
    <Box minH="92vh" bg="brown.100" py={4}>
      <Container {...props}>
        { children }
      </Container>
    </Box>
  )
}