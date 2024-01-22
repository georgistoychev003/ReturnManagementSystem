import express from 'express';
// import multer from 'multer';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';
import {getAllRmasDetails, getRMAandDates, updateImageDescriptionByCollector} from "../controllers/rma-controller.js";


router.get('/', rmaController.getListOfRmas);

router.get('/count', rmaController.getCountOfRMA);

//router.get('/details', rmaController.getAllRmasDetails);
router.get('/withDates', rmaController.getRMAandDates );
router.get('/monthly', rmaController.getRMAPerMonths );
router.put('/collector/:returnedProductId', rmaController.updateImageDescriptionByCollector);
// const upload = multer({ storage: multer.memoryStorage() });
//
// router.put('/collector/:returnedProductId', upload.single('image'), rmaController.updateImageDescriptionByCollector);

router.get('/returns/Products', rmaController.getListOfReturns);

router.get('/:barcode', rmaController.getRmaByBarcode);
//router.get('/barCode/:barcode', rmaController.getRmaByBarcode);


router.get('/:rmaId', rmaController.getRma);
// router.get('/rma/:rmaId', rmaController.getRma);

router.get('/:rmaId/total-price', rmaController.getRmaPrice);

router.get('/:rmaId/status', rmaController.getRmaStatus);

router.get('/:rmaId/customer', rmaController.getRmaCustomer);

router.get('/:rmaId/products', rmaController.getRmaProducts);

router.get('/:rmaId/quantity', rmaController.getRmaQuantity);

router.patch('/:rmaId', rmaController.patchRma);

router.post('/update-returned-product-quantity', rmaController.updateQuantities);

router.delete('/:rmaId', rmaController.deleteRma);

router.get('/returns/:userId', rmaController.getReturnsByUserId);

//router.get('/details', rmaController.getAllRmasDetails);
//router.get('/withDates', rmaController.getRMAandDates());


router.post('/assign/:RMAId', rmaController.assignRmaToController);

export default router;
