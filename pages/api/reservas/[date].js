import { ObjectId } from "mongodb"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { connectToDatabase } from "../reservas"

export default async function Handler(req, res) {
  const db = await connectToDatabase()  
  
  if (req.method === "GET") {
    const { date } = req.query

    const colls = await db.listCollections().toArray()
    const collsNames = colls.map(col => col.name)
    
    const dateReservations = []

    await Promise.all(collsNames.map(async colName => {
      const filtered = await db.collection(colName)
        .find({ date: date }).toArray()
      if (filtered.length > 0) {
        dateReservations.push(filtered);
      }
    }))

    const result = dateReservations.flat()

    return res.status(200).json(result)
  }

  if (req.method === "DELETE") {
    const { uuid } = req.query

    const colls = await db.listCollections().toArray()
    const collsNames = colls.map(col => col.name)

    await Promise.all(collsNames.map(async colName => {
    const filtered = await db.collection(colName).findOneAndDelete({ _id: ObjectId(uuid) })
    }))
    return res.status(200).end()
  }

  return res.status(200).end()
} 