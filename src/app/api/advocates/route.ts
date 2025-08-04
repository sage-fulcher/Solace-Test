import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  console.log("yooooo");
  // Uncomment this line to use a database
  if (db) {
    const data = await db.select().from(advocates);
    console.log("data", data);
    return Response.json({ data });
  } else return Response.json({ advocateData });
}
