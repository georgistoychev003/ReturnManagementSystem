import express from 'express';
import { scanBarcode } from '../controllers/barcode-controller.js';

const router = express.Router();

router.post('/scanBarcode', scanBarcode);

export default router;
