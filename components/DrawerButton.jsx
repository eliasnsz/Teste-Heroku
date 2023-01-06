import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function DrawerButton({ children, ...props }) {
  return (
    <Button 
      {...props}
      variant='ghost' 
      w="100%"
      as={Link} 
      color="brown.1000"
      role="group"
      _hover={{ bgColor: "brown.100" }}
    >
      <Text transition=".3s ease" _groupHover={{ color: "brown.1000" }} textAlign="left" w="100%">{ children }</Text>
    </Button>
  )
}