import express from 'express';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';

router.get('/', rmaController.getListOfRmas);

router.get('/:rmaId', rmaController.getRma);

router.get('/:rmaId/total-price', rmaController.getRmaPrice);

router.get('/:rmaId/status', rmaController.getRmaStatus);

router.get('/rma/products', rmaController.getListOfReturns);

router.patch('/:rmaId', rmaController.patchRma);

router.delete('/:rmaId', rmaController.deleteRma);


export default router;