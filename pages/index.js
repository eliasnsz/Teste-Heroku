import axios from "axios";
import { useQuery } from "react-query"
import Link from "next/link";


export default function Home() {

  const { data, isLoading } = useQuery("database", async () => {
    const response = await axios.get('./api/hello')
    return response.data
  }, {
    staleTime: 1000 * 10 // 10 segundos
  })
  
  if (isLoading) {
    return <p>Carregando...</p>
  }
  
  return (
    <>
      <ul>
        {!isLoading && data.map(item => <li key={item["_id"]}>{item["_id"]}</li>)}
      </ul>
      <Link href="/teste">teste</Link>
    </>
  )
}
