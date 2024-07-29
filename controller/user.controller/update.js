import { pool } from "../../database/connection.js";

const queryUpdateUserById = "UPDATE users SET username = $1, email = $2 WHERE id = $3";

const queryUserById = `SELECT * FROM users WHERE id=$1`

async function updateUser (req, res) {
    try {
        const id = req.params.id;
        const username = req.body.username;
        const email = req.body.email;

        const resDb = await pool.query (queryUserById,[id]);
        const data = resDb.rows;

        if (data.length === 0) {
            return res.status(404).json({message: "user is not found"})
        }

        if (!username || !email) {
            return res.status(400).json({message: "username and email are required"})
        }

        const emailRegex = /\S+@\S+\.\S+/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid email"
            })
        }

        await pool.query(queryUpdateUserById, [username, email, id]);
        res.status(200).json({message: "user update is successful"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default updateUser;