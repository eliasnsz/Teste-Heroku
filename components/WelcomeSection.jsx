import { Box } from "@chakra-ui/react";

export default function WelcomeSection({ children }) {
  return(
    <Box 
      bgColor="brown.100"
      clipPath={["none", "none", "polygon(0 0, 70% 0, 60% 100%, 0% 100%)"]} 
      w="65%"
      display={["none", "none", "block"]}
      h="100vh" 
    > 
      {children}
    </Box>
  )
} 