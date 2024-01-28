import { createCanvas } from 'canvas';
import QRCode from 'qrcode';
import Database from 'better-sqlite3';
import * as queries from '../database/database-queries.js';
import { StatusCodes } from 'http-status-codes';


const db = new Database('my-shop-database');

export const generateBarcode2 = async (req, res) => {
    const rmaId = req.params.rmaId;

    // Generate barcode as PNG image
    try {
        // Generate QR code as SVG
        const qrCodeSVG = await QRCode.toString(rmaId, {type: 'svg', scale: 0});
        res.type('svg');
        res.status(StatusCodes.OK).send(qrCodeSVG);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Internal Server Error'});
    }
};

export const scanBarcode = (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Barcode is required' });
    }

    const product = db.prepare(queries.selectProductByBarcode).get(barcode);

    if (!product) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Product not found for the given barcode' });
    }
    res.json({ product });
};
