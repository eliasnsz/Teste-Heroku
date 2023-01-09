import { Box, Flex} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import MainTitle from "../components/MainTitle";
import MainWallpaper from "../components/MainWallpaper";
import SideMenu from "../components/SideMenu";
import WelcomeSection from "../components/WelcomeSection";

export default function Home() {

  return (
    <>
      <Flex>
        <Box
          bgColor="brown.100" 
          px={[0, 0, "1.5%"]}
          h="100vh"
        />
        <SideMenu />
        <MainWallpaper/>
        <WelcomeSection>
          <MainTitle/>
        </WelcomeSection>
      </Flex>
    </>
  )
}