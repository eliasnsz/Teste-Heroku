import { Icon, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function SocialMedia() {
  return (
    <Stack spacing={6} align="center" justify="center" my={12} direction="row">
      <Link 
        passHref
        href="https://www.instagram.com/recantoandreeta/"
        target="_blank"
      >
        <Icon
          as={BsInstagram}
          boxSize={7}
          color="brown.600"
          cursor="pointer"
          _hover={{ color: "brown.400"}}
        >
        </Icon>
      </Link>
      <Link 
        passHref
        href="https://www.facebook.com/recantoandreeta/"
        target="_blank"
      >
        <Icon
          as={BsFacebook}
          boxSize={7}
          color="brown.600"
          cursor="pointer"
          _hover={{ color: "brown.400"}}
        >
        </Icon>
      </Link>
      <Link 
        passHref
        href="https://api.whatsapp.com/send?phone=5519998090924" 
        target="_blank"
      >
        <Icon
          as={BsWhatsapp}
          boxSize={7}
          color="brown.600"
          cursor="pointer"
          _hover={{ color: "brown.400"}}
        >
        </Icon>
      </Link>
    </Stack>
  )
}