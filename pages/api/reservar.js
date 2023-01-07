import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import { connectToDatabase } from "./database"
import moment from "moment/moment"
import { adminEmails, baseUrl } from "../_app"
import { QueryClient } from "react-query"

export default async function Handler(req, res) {
  
  const db = await connectToDatabase("recanto")
  
  const session = await unstable_getServerSession(req, res, authOptions)
  const queryClient = new QueryClient()

  const isCreatedByAdmin = adminEmails.includes(session?.user?.email) 

  const { name, date, adult, teen, child, local, obs } = req.body

  const reservation = { 
    name, 
    date, 
    email: session.user.email, 
    quantity: {
      adult: parseInt(adult), 
      teen: parseInt(teen), 
      child: parseInt(child),
      total: parseInt(adult) + parseInt(teen) + parseInt(child)
    },
    local, 
    obs,
    mesa: "",
    creationInfo: {
      createdByAdmin: isCreatedByAdmin,
      creator: {
        image: session.user.image,
        name: session.user.name,
        createdAt: moment()._d,
      }
    }
  }
    
  await db.collection(date).insertOne(reservation)
  await queryClient.invalidateQueries("reservas")


  return res.status(200).redirect("/reservas")

}