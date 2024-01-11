import express from 'express';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';

router.get('/', rmaController.getListOfRmas);

router.get('/count', rmaController.getCountOfRMA);


router.get('/returns/Products', rmaController.getListOfReturns);

router.get('/:barcode', rmaController.getRmaByBarcode);

router.get('/:rmaId', rmaController.getRma);

router.get('/:rmaId/total-price', rmaController.getRmaPrice);

router.get('/:rmaId/status', rmaController.getRmaStatus);

router.get('/:rmaId/customer', rmaController.getRmaCustomer);

router.get('/:rmaId/products', rmaController.getRmaProducts);

router.patch('/:rmaId', rmaController.patchRma);

router.delete('/:rmaId', rmaController.deleteRma);

router.get('/returns/:userId', rmaController.getReturnsByUserId);


export default router;
