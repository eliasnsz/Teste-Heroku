import { Text } from "@chakra-ui/react";
import { useState } from "react";

export default function HeaderButton ({ children }) {

  const [ width, setWidth ] = useState("0%")

  return(  
    <Text
      _after={{
        display: "block",
        content: "''",
        bgColor: "brown.300",
        w: width,
        h: "2px",
        transition: "0.25s ease"
      }}
      onMouseEnter={() => setWidth("100%")}
      onMouseLeave={() => setWidth("0%")}
      _hover={{ color: "brown.700"}}
      transition=".2s ease"
    >{children}</Text>
  )
}