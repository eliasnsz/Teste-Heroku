import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function LocalRadio({ children, ...props }) {
  
  return(
    <Radio 
      isRequired 
      borderColor='brown.500' 
      colorScheme="brown" 
      _disabled={{ borderColor: "blackAlpha.200"}}
      value={children} 
      {...props}
    >{ children }
    </Radio>
  )
}