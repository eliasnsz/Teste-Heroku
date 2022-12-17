import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { getSession, SessionProvider } from "next-auth/react"
import { Header } from "../components/Header"

const queryClient = new QueryClient()

export const baseUrl = "https://teste-heroku-delta.vercel.app"
export const externalMaxCapacity = 250
export const internalMaxCapacity = 200
export const adminEmails = [ "shadowplays1008@gmail.com", "eliasnsouza1245@gmail.com", "lele.andreeta@gmail.com" ]

const theme = extendTheme({
  colors: {
    brown: {
      300: '#ffeadb',
      400: '#C7936E',
      500: '#5B3914',
    },
  },
})

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
  <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Header />
          <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  </QueryClientProvider>
  )
}


export default MyApp
