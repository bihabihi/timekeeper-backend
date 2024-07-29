import { pool } from "../../database/connection.js";

// id, user_id, product_name, open_date, expiry_date

const query = "UPDATE products SET user_id = $2, product_name = $3, open_date = $4, expiry_date= $5 WHERE id = $1";

async function updateProductByProductId (req, res) {
    try {
        const id = req.body.id;
        const userId = req.user_id;
        const productName = req.body.product_name;
        const openDate = req.body.open_date;
        const expiryDate = req.body.expiry_date;

        console.log(id, userId, productName, openDate,expiryDate)

        if (!id || !userId || !productName || !openDate || !expiryDate) {
            return res.status(400).json({message: "Please complete all fields"})
        }

        await pool.query(query,[id, userId, productName, openDate, expiryDate]);
        res.status(201).json({message: "Product update is successful"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default updateProductByProductId;