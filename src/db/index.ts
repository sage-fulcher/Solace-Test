import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (process.env.DATABASE_URL) {
    const queryClient = postgres(process.env.DATABASE_URL);
    const db = drizzle(queryClient);
    return db;
  }
  console.error("DATABASE_URL is not set");
};

export default setup();
