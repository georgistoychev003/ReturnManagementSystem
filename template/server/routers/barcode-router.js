import express from 'express';
import { generateBarcode2, scanBarcode} from '../controllers/barcode-controller.js';

const router = express.Router();

router.get('/generateBarcode/rmaId/:rmaId', generateBarcode2);
router.get('/scanBarcode/:barcode', scanBarcode);

export default router;

