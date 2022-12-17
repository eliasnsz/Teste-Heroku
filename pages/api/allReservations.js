import { connectToDatabase } from "./reservas"

export default async function Handler(req, res) {
  
  if (req.method === "GET") {
    const db = await connectToDatabase()
    
    const collections = await db.listCollections().toArray()
    const collectionsNames = collections.map(col => col.name)
    

    const col = await Promise.all(collectionsNames.map(async colName => {
      return await db.collection(colName).find().toArray()
    }))

    return res.status(200).json(col)
  }
  return res.status(200).send("ok")
}