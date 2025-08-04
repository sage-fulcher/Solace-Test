import { and, gt, ilike, or } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const cursor = params.get("cursor");
  const term = params.get("term");
  const _cursor = Number(cursor);
  if (db) {
    console.log("yoooo!", cursor, term);
    const data = await db
      .select()
      .from(advocates)
      .where(
        and(
          _cursor ? gt(advocates.id, _cursor) : undefined,
          term
            ? or(
                ilike(advocates.firstName, term)
                // ilike(advocates.lastName, term),
                // ilike(advocates.degree, term),
                // // ilike(advocates.specialties.ge, term),
                // ilike(advocates.yearsOfExperience, term),
                // ilike(advocates.phoneNumber, term)
              )
            : undefined
        )
      )
      .limit(2);
    return Response.json({ data });
  } else return Response.json({ advocateData });
}
