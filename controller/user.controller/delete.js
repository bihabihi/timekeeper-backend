import {pool} from "../../database/connection.js";

const query = `DELETE FROM users where id= $1`

const queryUserById = `SELECT * FROM users WHERE id=$1`

async function deleteUserById (req,res) {
    try {
        const id = req.params.id;

        const resDb = await pool.query (queryUserById,[id]);
        const data = resDb.rows;

        if (data.length === 0) {
            return res.status(404).json({message: "User is not found"})
        }

        await pool.query(query,[id]);
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default deleteUserById;