import {pool} from "../../database/connection.js";

const query = `DELETE FROM products where id= $1`

const queryProductById = `SELECT * FROM products WHERE id=$1`

async function deleteProductByProductId (req,res) {
    try {
        const id = req.params.id;

        // check if product id exists
        const resDb = await pool.query (queryProductById,[id]);
        const data = resDb.rows;

        // this is to handle product id yang non existing
        if (data.length === 0) {
            return res.status(404).json({message: "Product is not found"})
        }

        await pool.query(query,[id]);
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default deleteProductByProductId;