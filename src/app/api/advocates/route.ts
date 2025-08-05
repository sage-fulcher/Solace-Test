import { and, gt, ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData, specialties } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const cursor = params.get("cursor");
  const term = params.get("term");
  const pageSize = Number(params.get("pageSize")) || 3;
  const _cursor = Number(cursor);
  if (db) {
    console.log("yoooo!", cursor, term);
    const data = await db
      .selectDistinct()
      .from(advocates)
      .where(
        and(
          _cursor ? gt(advocates.id, _cursor) : undefined,
          term
            ? or(
                ilike(advocates.firstName, term),
                ilike(advocates.lastName, term),
                ilike(advocates.degree, term),
                sql`${advocates.specialties}::text ILIKE ${`%${term}%`}`,
                sql`${advocates.phoneNumber}::text ILIKE ${`%${term}%`}`,
                // Not sure we really want to match on this one, but it was in the original logic.
                sql`${advocates.yearsOfExperience}::text ILIKE ${`%${term}%`}`
              )
            : undefined
        )
      )
      .limit(pageSize + 1);
    return Response.json({ data });
  } else return Response.json({ advocateData });
}
