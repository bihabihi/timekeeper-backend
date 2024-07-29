import { pool } from "../../database/connection.js";

const queryAllUsers = `SELECT * FROM users`
const queryUserById = `SELECT * FROM users WHERE id=$1`

export async function getAllUsers (req,res) {
    try{
        const resDb = await pool.query (queryAllUsers);
        const data = resDb.rows;
        res.status(200).json({message: `${data.length} users found`,
            data})
    }catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getUserById (req,res) {
    try{
        const id = req.params.id;
        const resDb = await pool.query (queryUserById,[id]);
        const data = resDb.rows;

        if (data.length === 0) {
            return res.status(404).json({message: "User is not found"})
        }

        console.log(resDb);
        res.status(200).json({message: data})
    }catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}