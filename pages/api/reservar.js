import { ObjectId } from "mongodb"
import { connectToDatabase } from "./reservas"

export default async function Handler(req, res) {
  
  if (req.method === "POST") {
    const db = await connectToDatabase()
    
    const { name, email, date, adult, teen, child, local, obs } = req.body
    const collection = await db.collection(date)

    const adultParsed = parseInt(adult)
    const teenParsed = parseInt(teen)
    const childParsed = parseInt(child)

    const newUser = { 
      name, 
      email, 
      date, 
      createAt: new Date(), 
      adult: adultParsed, 
      teen: teenParsed, 
      child: childParsed, 
      local,
      obs, 
      mesa: ""
    }
    const reservationRegistered = await collection.insertOne(newUser)
    return res.status(200).send(reservationRegistered)
  }
  
  if (req.method === "PUT") {
    const db = await connectToDatabase()
    const { changes, uuid, date } = req.body
    const collection = await db.collection(date)
    
    const finded = await collection.updateOne({_id: ObjectId(uuid)}, { $set: { ...changes } })
    return res.status(200).send(finded)
  }

  return res.status(200).end()
} 