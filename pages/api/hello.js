const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://elias:elias@cluster0.7acgvi4.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


export default async function handler(req, res) {

  const db = await client.db("test")
  const collection = db.collection("devices")

  collection.insertOne({ nome: "Elias" })
  collection.insertOne({ nome: "Elias2" })
  
  client.close()
  collection.insertOne({ nome: "Elias3" })
  res.status(200).json({ name: 'John Doe' })
}
