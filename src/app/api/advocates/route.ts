import { and, gt, ilike, or } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(cursor?: number, pageSize = 2, term?: string) {
  if (db) {
    const data = await db
      .select()
      .from(advocates)
      .where(
        and(
          cursor ? gt(advocates.id, cursor) : undefined,
          term
            ? or(
                ilike(advocates.firstName, term),
                ilike(advocates.lastName, term),
                ilike(advocates.degree, term),
                // ilike(advocates.specialties.ge, term),
                ilike(advocates.yearsOfExperience, term),
                ilike(advocates.phoneNumber, term)
              )
            : undefined
        )
      )
      .limit(pageSize);
    console.log("data", data);
    return Response.json({ data });
  } else return Response.json({ advocateData });
}
