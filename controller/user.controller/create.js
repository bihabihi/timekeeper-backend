import { pool } from "../../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const query = `
INSERT INTO users (username, email, password)
VALUES ($1, $2, $3)
`;

async function createUser (req, res) {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !password || !email ) {
            return res.status(400).json({
                message: "Username, email and password are required"
            })
        }

        const emailRegex = /\S+@\S+\.\S+/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            return res.status(400).json({
                message: "Invalid email"
            })
        }

        const SALTROUNDS = 10;
        const salt = bcrypt.genSaltSync(SALTROUNDS);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await pool.query(query, [
            username, email, hashedPassword])

        const data = {
            username,
            email,
            password,
        };
        // const secretKey = "fullstackdeveloperletsgoer";
        // const token = jwt.sign(data, secretKey);
    
        res.status(200).json({message:"User and Token created"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

export default createUser;
