import express from 'express';
import {generateBarcode, scanBarcode} from '../controllers/barcode-controller.js';

const router = express.Router();

router.post('/generateBarcode', generateBarcode);
router.post('/scanBarcode', scanBarcode);

export default router;
