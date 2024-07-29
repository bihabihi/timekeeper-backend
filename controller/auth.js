import { pool } from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({message: "Bad request, email and password are needed"})
        }
        
        const query = ` SELECT * from users WHERE email = $1`
        const dbRes = await pool.query(query, [email])
        const user = dbRes.rows[0];

        if (!user) {
            return res.status(404).json({message: "User is not found"})
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: "Wrong password, user is unauthorised"})
        }

        const data = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        const secretKey = "fullstackdeveloperletsgoer";
        const token = jwt.sign(data, secretKey, { expiresIn: '1h' });

        res.status(200).json({message:"Token created", token: token});

    } catch (error) {
        console.error (error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default createToken;