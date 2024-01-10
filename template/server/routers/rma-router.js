import express from 'express';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';
import * as userController from "../controllers/user-controller.js";

router.get('/', rmaController.getListOfRmas);

router.get('/:barcode', rmaController.getRmaByBarcode);

router.get('/:rmaId', rmaController.getRma);

router.get('/rma/products', rmaController.getListOfReturns);

router.patch('/:rmaId', rmaController.patchRma);

router.delete('/:rmaId', rmaController.deleteRma);

router.get('/returns/:userId', rmaController.getReturnsByUserId);


export default router;