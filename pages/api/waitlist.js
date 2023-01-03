import moment from "moment"
import { ObjectId } from "mongodb"

const { MongoClient } = require("mongodb")

const uri = process.env.DATABASE_URL

let cachedDb;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(uri)
  const db = client.db("waitlist")
  cachedDb = db
  return db
}

export default async function Handler(req, res) {
  
  if (req.method === "GET") {
    const db = await connectToDatabase()
    
    const date = moment().format("YYYY-MM-DD")
    const waitlist = await db.collection("waitlist").find().toArray()
    const filteredWaitlist = waitlist.filter(item => item.date === date)

    return res.status(200).json(filteredWaitlist)
  }

  if (req.method === "POST") {
    const db = await connectToDatabase()
    
    const collection = await db.collection("waitlist")

    const { name, quantity, date } = req.body

    const waitlistRegistered = await collection.insertOne({ name, quantity, date })
    return res.status(200).end()
  }

  if (req.method === "DELETE") {
    const db = await connectToDatabase()
    
    const collection = await db.collection("waitlist")

    const { uuid } = req.body

    const waitlistRegistered = await collection.findOneAndDelete({ _id: ObjectId(uuid) })

    return res.status(200).end()
  }

  return res.status(200).end()
} 