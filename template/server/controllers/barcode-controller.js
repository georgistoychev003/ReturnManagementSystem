import { createCanvas } from 'canvas';
import QRCode from 'qrcode';
import Database from 'better-sqlite3';
import * as queries from '../database/database-queries.js';
import { StatusCodes } from 'http-status-codes';
import JsBarcode from "jsbarcode";

const db = new Database('my-shop-database');

export const generateBarcode1 = async (req, res) => {
    const customerName = req.params.username;
    const orderId = req.params.orderId;

    if (!customerName || !orderId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Customer name and order ID are required' });
    }

    // Generate barcode
    const barcodeCanvas = createCanvas();
    JsBarcode(barcodeCanvas, `${customerName} ${orderId}`, {
        format: 'CODE128',
        displayValue: false,
        fontSize: 10,
        textMargin: 2,
        width: 4,
        height: 10,
        lineColor: "#141313"
    });

    // Convert the barcode to a data URL
    const barcodeImage = barcodeCanvas.toDataURL('image/png');

    // Check if the barcode image was generated successfully
    if (!barcodeImage) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to generate barcode image' });
    }

    // Prepare the database query
    const insertBarcode = db.prepare(queries.createRma);

    try {
        // Run the query and get the result
        const result = insertBarcode.run(barcodeImage, 'PENDING');
        const returnNumber = result.lastInsertRowId;

        // Send the response with the barcode image and return number
        res.status(StatusCodes.OK).json({ barcode: barcodeImage, returnNumber });
    } catch (error) {
        console.error('SQLite Error:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to store the barcode image in the database' });
    }
};

export const generateBarcode2 = async (req, res) => {
    const customerName = req.params.username;
    const address = req.params.orderId;

    // Generate barcode as PNG image
    try {
        // Generate QR code as SVG
        const qrCodeSVG = await QRCode.toString(customerName, address, {type: 'svg', scale: 0});

        // Send the SVG response
        res.type('svg');
        res.status(StatusCodes.OK).send(qrCodeSVG);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Internal Server Error'});
    }
};

export const scanBarcode = (req, res) => {
    const { barcode } = req.body;

    if (!barcode) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Barcode is required' });
    }

    // Query to find the product by barcode in the database
    const product = db.prepare(queries.selectProductByBarcode).get(barcode);

    if (!product) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: 'Product not found for the given barcode' });
    }

    // Return the product details
    res.json({ product });
};
