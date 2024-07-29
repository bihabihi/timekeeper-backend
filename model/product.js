import { pool } from "../database/connection.js";

// create products table
// (id, user_id, product_name, open_date, expiry_date, created_at, updated_at)

const query = `
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_name VARCHAR(50) NOT NULL,
    open_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    );
`;

export async function createProductsTable() {
    try {
        await pool.query (query);
        console.log("Products table is created")
    } catch (error) {
        console.error(error)
    }
}