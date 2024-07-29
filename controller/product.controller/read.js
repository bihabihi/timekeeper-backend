import { pool } from "../../database/connection.js";

const query = ` SELECT id, product_name, open_date, expiry_date,
CASE 
    WHEN expiry_date < CURRENT_DATE THEN 'Expired'
    ELSE 'Safe to use'
END AS status
FROM products WHERE user_id = $1`

const listAllProducts = async (req, res) => {
    
    const userId = req.user_id;

    try {
        
        const dbRes = await pool.query(query,[userId]);
        const data= dbRes.rows;

        res.status(200).json({message: `${data.length} products found`,
            data})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default listAllProducts;