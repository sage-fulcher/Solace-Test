import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    const queryClient = postgres(process.env.DATABASE_URL);
    const db = drizzle(queryClient);
    return db;
  }
  // for query purposes
};

export default setup();
