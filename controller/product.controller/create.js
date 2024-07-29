import {pool} from "../../database/connection.js";

// id, user_id, product_name, open_date, expiry_date

const query = `INSERT INTO products (user_id, product_name, open_date, expiry_date)
VALUES ($1, $2, $3, $4)`;

async function createProduct (req,res) {
    try {
        const userId = req.user_id;
        const productName = req.body.product_name;
        const openDate = req.body.open_date;
        const expiryDate = req.body.expiry_date;

        // validate that body is not empty
        if (!userId || !productName || !openDate || !expiryDate) {
            return res.status(400).json({message: "Please complete all fields"});
        }

        await pool.query(query,[userId, productName, openDate, expiryDate]);
        res.status(201).json({message: "Product is created"})
    } catch (error) {
        console.error (error)
        res.status(500).json({message: "Internal server error"})
        }
}
export default createProduct;