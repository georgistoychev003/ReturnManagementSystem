import express from 'express';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';

router.get('/', rmaController.getListOfRmas);

router.get('/:barcode', rmaController.getRmaByBarcode);

router.get('/:rmaId', rmaController.getRma);

router.get('/rma/products', rmaController.getListOfReturns);

router.patch('/:rmaId', rmaController.patchRma);

router.delete('/:rmaId', rmaController.deleteRma);


export default router;