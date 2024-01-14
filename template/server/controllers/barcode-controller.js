import Database from 'better-sqlite3';
import * as queries from '../database/database-queries.js';
import {StatusCodes} from "http-status-codes";

const db = new Database('my-shop-database');

export const scanBarcode = (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Barcode is required' });
    }

    // Perform a query to find the product by barcode in your database
    const product = db.prepare(queries.selectProductByBarcode).get(barcode);

    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found for the given barcode' });
    }

    // Return the product details
    res.json({ product });
};
