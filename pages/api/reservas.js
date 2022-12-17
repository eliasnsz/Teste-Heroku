import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const { MongoClient } = require("mongodb")

const uri = process.env.DATABASE_URL

let cachedDb;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(uri)
  const db = client.db("recanto")
  cachedDb = db
  return db
}


export default async function handler(req, res) {

  const db = await connectToDatabase()  
  
  if (req.method === "GET") {
    
    const session = await unstable_getServerSession(req, res, authOptions)
    
    if (session) {
      const userEmail = session.user.email
      
      const colls = await db.listCollections().toArray()
      const collsNames = colls.map(col => col.name)
      
      const userReservations = []
  
      await Promise.all(collsNames.map(async colName => {
        const filtered = await db.collection(colName).find({ email: userEmail }).toArray()
        if (filtered.length > 0) {
          userReservations.push(filtered);
        }
      }))
  
      return res.status(200).json(userReservations.flat())
    }
    return res.status(200).json("")
  }

  if (req.method === "POST") {
    
    const { userEmail } = req.body
    
    const colls = await db.listCollections().toArray()
    const collsNames = colls.map(col => col.name)
    
    const userReservations = []

    await Promise.all(collsNames.map(async colName => {
      const filtered = await db.collection(colName).find({ email: userEmail }).toArray()
      if (filtered.length > 0) {
        userReservations.push(filtered);
      }
    }))

    return res.status(200).json(userReservations.flat())
  }

  return res.status(200).json("")
}
