import { pool } from "../database/connection.js";

// create users table: (id, username, email, password, created_at, updated_at)
const query = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username varchar(50) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP default NOW(),
    updated_at TIMESTAMP default NOW()
    );
`;

export async function createUsersTable () {
    try {
        await pool.query (query);
        console.log("Users table is created")
    } catch (error) {
        console.error(error);
    }
}