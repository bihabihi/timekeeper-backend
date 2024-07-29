import pkg from "pg";
const {Pool} = pkg;
import "dotenv/config";
import { createUsersTable } from "../model/user.js";
import { createProductsTable } from "../model/product.js";

export const pool = new Pool ({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export async function dbInit() {
    try {
        await createUsersTable();
        await createProductsTable();
    } catch (error) {
        console.error(error);
        console.error("Database connection failed");
      }
}