const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://elias:elias@cluster0.7acgvi4.mongodb.net/?retryWrites=true&w=majority"

let cachedDb;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(uri)
  const db = client.db("test")
  cachedDb = db
  return db
}


export default async function handler(req, res) {

  const db = await connectToDatabase()
  const collection = await db.collection("devices")

  if (req.method === "GET") {
    const list = await collection.find().toArray()
    console.log(list);
    return res.status(200).json(list)
  }
  
}
