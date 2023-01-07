import { Box, Image } from "@chakra-ui/react";

export default function MainWallpaper() {
  return(
    <Box 
      w={["100%", "100%", "50%"]}
      zIndex={[-1, -1, 0]}
      h="100vh"
      pos="absolute" 
      right={0}
    >
      <Image 
        src="https://i.imgur.com/ri0zYBQ.jpg" 
        boxSize="100%" 
        objectFit="cover" 
        objectPosition="80%"
        alt="wallpaper"
      />
    </Box>
  )
}