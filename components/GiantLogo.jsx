import { Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";

export default function GiantLogo() {
  return(
    <Link href="/">
      <Image
      w={["130px", "130px", "200px"]}
      m="auto"
      passHref
      alt="recanto-andreeta-logo"
      src="https://i.imgur.com/xHAkxha.png"
      mb={4}
      />
    </Link>
  )
}