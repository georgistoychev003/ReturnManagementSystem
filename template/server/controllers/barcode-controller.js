import { createCanvas } from 'canvas';
import barcode from 'jsbarcode';
import QRCode from 'qrcode';
import Database from 'better-sqlite3';
import * as queries from '../database/database-queries.js';
import { StatusCodes } from 'http-status-codes';

const db = new Database('my-shop-database');

export const generateBarcode = (req, res) => {
    const customerName = req.params.username;
    const address = req.params.orderId;

    if (!customerName || !address) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Customer name and address are required' });
    }

    // Generate barcode
    const canvas = createCanvas(200, 60);
    barcode(canvas, req.params.text, {
        format: 'CODE128',
        displayValue: true,
        formatSize: 18,
        textMargin: 10,
        width: 4,
        height: 60,
        lineColor: "#141313"
    });

    const barcodeImage = canvas.toDataURL(`image/png`, (err, png) => {
        console.log(png);
    });

    if (!barcodeImage) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to generate barcode image' });
    } else {
        // Store information in the database
        const insertBarcode = db.prepare(queries.createRma);
        const result = insertBarcode.run(barcodeImage, 'PENDING');

        if ('lastInsertRowId' in result) {
            const returnNumber = result.lastInsertRowId;

            // Send response with barcode image and return number
            res.json({ barcodeImage, returnNumber });
        } else {
            console.log('lastInsertRowId does not exist on the result object');
        }
    }
};

export const generateBarcode2 = async (req, res) => {
    const customerName = req.params.username;
    const address = req.params.orderId;

    // Generate barcode as PNG image
    try {
        // Generate QR code as SVG
        const qrCodeSVG = await QRCode.toString(customerName, address, {type: 'svg'});

        // Send the SVG response
        res.type('svg');
        res.status(200).send(qrCodeSVG);
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
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
