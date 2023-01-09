import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import GiantLogo from "./GiantLogo";
import SideMenuContent from "./SideMenuContent";
import SocialMedia from "./SocialMedia";

export default function SideMenu() {
  return(
    <Box 
      bgColor="brown.200" 
      px={4}
      borderLeft="4px solid"
      borderRight="4px solid"
      boxShadow="lg"
      borderColor="brown.300"
      display="flex"
      flexDir="column"
    >
      <GiantLogo />
      <SideMenuContent />
      <Divider />
      <SocialMedia />
    </Box>
  )
}
