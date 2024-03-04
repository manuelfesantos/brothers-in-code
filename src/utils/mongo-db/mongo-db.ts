import { MongoClient } from "mongodb";

// Replace the following with your Atlas connection string
// Connect to your Atlas cluster
const client = new MongoClient(String(process.env.MONGODB_URI));

export async function run() {
  try {
    await client.connect();
    const db = client.db("BrothersInCode");
    const col = db.collection("Products");
    console.log(col.collectionName);
  } catch (err: any) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
