const { MongoClient } = require("mongodb")
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import moment from "moment/moment"
import { adminEmails } from "../_app"
import { ObjectId } from "mongodb"

const uri = process.env.DATABASE_URL

let cachedDb;

export async function connectToDatabase(dbName) {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)
  cachedDb = db
  return db
}

export default async function Handler(req, res) {
  
  const db = await connectToDatabase("recanto")

  if (req.method === "GET") {
    
    const collections = await db.listCollections().toArray()
    const collectionsNames = collections.map(col => col.name)

    const dbResponse = await Promise.all(collectionsNames.map(async colName => {
      return await db.collection(colName).find().toArray()
    }))
    const allReservations = dbResponse.flat()

    return res.status(200).json(allReservations)
  }
  
  if (req.method === "POST") {

    const session = await unstable_getServerSession(req, res, authOptions)

    const isCreatedByAdmin = adminEmails.includes(session?.user?.email) 

    const { name, phone, date, adult, teen, child, local, obs } = req.body

    const reservation = { 
      name, 
      date, 
      phone,
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
      lastModified: moment()._d,
      creationInfo: {
        createdByAdmin: isCreatedByAdmin,
        creator: {
          image: session.user.image,
          name: session.user.name,
          createdAt: moment()._d
        }
      }
    }
    
    await db.collection(date).insertOne(reservation)

    return res.status(200).end()

  }

  if (req.method === "PUT") {
    const { changes, uuid, date, editLocal } = req.body

    
    const { mesa, name, adult, teen, child, local, obs } = changes
    
    const formattedChanges = () => {
      if (editLocal === "site") {
        return { 
          name, 
          quantity: {
            adult: parseInt(adult), 
            teen: parseInt(teen) , 
            child: parseInt(child),
            total: parseInt(adult) +  parseInt(teen) + parseInt(child)
          }, 
          local, 
          obs,
          lastModified: moment()._d
        }
      } else {
        return { 
          mesa,
          quantity: {
            adult: parseInt(adult), 
            teen: parseInt(teen) , 
            child: parseInt(child),
            total: parseInt(adult) +  parseInt(teen) + parseInt(child)
          }, 
          local, 
          obs,
          lastModified: null
        }
      }
    }

    await db.collection(date)
      .findOneAndUpdate({ _id: ObjectId(uuid) }, { $set: { ...formattedChanges() } }) 

    return res.status(200).end()
  }

  if (req.method === "DELETE") {

    const { uuid, date } = req.body

    await db.collection(date).findOneAndDelete({ _id: ObjectId(uuid) })

    const thisDateReservations = await db.collection(date).find().toArray()
    if (thisDateReservations.length === 0) {
      db.collection(date).drop()
    } 
    
    return res.status(200).end()
  }

  return res.status(200).end()
}