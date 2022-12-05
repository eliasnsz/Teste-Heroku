const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://elias:elias@cluster0.7acgvi4.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


export default async function handler(req, res) {

  const db = await client.db("test")
  const collection = await db.collection("devices")

  await collection.insertOne({ nome: "Elias" })
  await collection.insertOne({ nome: "Elias2" })
  
  client.close()
  res.status(200).json({ name: 'John Doe' })
}
