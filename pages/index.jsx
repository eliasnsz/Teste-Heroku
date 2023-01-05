import { Box, Flex} from "@chakra-ui/react";
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
          <MainTitle />
        </WelcomeSection>
      </Flex>
    </>
  )
}