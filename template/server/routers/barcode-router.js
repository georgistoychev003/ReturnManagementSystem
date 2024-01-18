import express from 'express';
import { generateBarcode1, generateBarcode2, scanBarcode} from '../controllers/barcode-controller.js';

const router = express.Router();

router.get('/generateBarcode/:username/:orderId', generateBarcode2);
router.get('/generateBarcode1/:username/:orderId', generateBarcode1);
router.post('/scanBarcode', scanBarcode);

export default router;

