import moment from "moment/moment"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { getSession, SessionProvider } from "next-auth/react"
import { Header } from "../components/Header"

moment.locale('pt-br', {
  months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
  monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
  weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
  longDateFormat : {
      LT : 'HH:mm',
      L : 'DD/MM/YYYY',
      LL : 'D [de] MMMM [de] YYYY',
      LLL : 'D [de] MMMM [de] YYYY [às] LT',
      LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
  },
  calendar : {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek: function () {
          return (this.day() === 0 || this.day() === 6) ?
              '[Último] dddd [às] LT' : // Saturday + Sunday
              '[Última] dddd [às] LT'; // Monday - Friday
      },
      sameElse: 'L'
  },
  relativeTime : {
      future : 'em %s',
      past : '%s atrás',
      s : 'segundos',
      m : 'um minuto',
      mm : '%d minutos',
      h : 'uma hora',
      hh : '%d horas',
      d : 'um dia',
      dd : '%d dias',
      M : 'um mês',
      MM : '%d meses',
      y : 'um ano',
      yy : '%d anos'
  },
  ordinal : '%dº'
});

const queryClient = new QueryClient()

// export const baseUrl = "http://localhost:3000"
export const baseUrl = "https://teste-heroku-eliasnsz.vercel.app"
export const externalMaxCapacity = 250
export const internalMaxCapacity = 200
export const adminEmails = [ 
  "shadowplays1008@gmail.com", 
  "eliasnsouza1245@gmail.com", 
  "lele.andreeta@gmail.com" 
]

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