import { Pool } from "pg";

interface GlobalWithPool {
  pool?: Pool;
}

const globalForPool = global as unknown as GlobalWithPool;

export const pool =
  globalForPool.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPool.pool = pool;
}
