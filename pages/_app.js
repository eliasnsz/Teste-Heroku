import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const queryClient = new QueryClient()

const theme = extendTheme({
  colors: {
    brown: {
      400: '#C7936E',
      500: '#5B3914',
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </QueryClientProvider>
  )
}

export default MyApp
