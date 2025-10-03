import { MongoClient, ServerApiVersion } from "mongodb";
import { HOST, DB } from "@/lib/constant";

export const client = new MongoClient(HOST, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function connect() {
  try {
    await client.connect();
    const db = client.db(DB);
    await db.command({ ping: 1 });

    return db;
  } catch {
    await client.close();
  }
}
