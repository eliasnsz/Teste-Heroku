import axios from "axios";
import { connectToDatabase } from "../reservas";

export default async function Handler(req, res) {
  if (req.method === "GET") {
    const { local } = req.query
    const db = await connectToDatabase()
    
    const collections = await db.listCollections().toArray()
    const collectionsNames = collections.map(col => col.name)
    
    const cols = await Promise.all(collectionsNames.map(async colName => {
      return await db.collection(colName).find().toArray()
    }))
    const allData = cols.flat()
    const teste = {}
    const response = []

    for (let i = 0; i < allData.length; i++) {
      const col = local !== "all" ? 
        await db.collection(allData[i].date)
          .find({ date: allData[i].date, local: local }).toArray() :
        await db.collection(allData[i].date)
          .find({ date: allData[i].date }).toArray() 
      const quantity = col.reduce((acc, { adult, teen, child }) => {
        return acc + Number(adult) + Number(teen) + Number(child)
      }, 0)
      teste[allData[i].date] = quantity
    }
  
    return res.status(200).json(teste)
  }
  return res.status(200).send("")
}