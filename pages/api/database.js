const { MongoClient } = require("mongodb")

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