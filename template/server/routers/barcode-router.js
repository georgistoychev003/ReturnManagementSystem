import express from 'express';
import {generateBarcode, generateBarcode2, scanBarcode} from '../controllers/barcode-controller.js';

const router = express.Router();

router.get('/generateBarcode/:username/:orderId', generateBarcode2);
router.post('/scanBarcode', scanBarcode);

export default router;
