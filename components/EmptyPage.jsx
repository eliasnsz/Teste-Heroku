import { Button, Center, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function EmptyPage({ children, action, href }) {
  return(
    <>
      <Center w="100%" mt={32}>
        <Stack align="center">
          <Text textAlign="center">{ children }</Text>
          <Image
            w={["100px", "100px", "150px"]}
            m="auto"
            alt="empty-folder-icon"
            src="https://static.thenounproject.com/png/469473-200.png"
          />
          
          {action && href && 
            <Link href={href}>
              <Button variant="link" colorScheme="brown">
                Reservar
              </Button>
            </Link>
          }
        </Stack>
      </Center>
    </>
  )
}