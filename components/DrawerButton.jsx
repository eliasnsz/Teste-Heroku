import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function DrawerButton({ children, href }) {
  return (
    <Button 
      variant='ghost' 
      w="100%"
      as={Link} 
      href={href}
      color="brown.100"
      role="group"
      _hover={{ bgColor: "brown.100" }}
    >
      <Text transition=".3s ease" _groupHover={{ color: "brown.1000" }} textAlign="left" w="100%">{ children }</Text>
    </Button>
  )
}