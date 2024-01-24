import express from 'express';
// import multer from 'multer';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';




router.get('/', rmaController.getListOfRmas);

router.get('/count', rmaController.getCountOfRMA);

//router.get('/details', rmaController.getAllRmasDetails);
router.get('/withDates', rmaController.getRMAandDates );
router.get('/monthly', rmaController.getRMAPerMonths );
router.put('/collector/:returnedProductId', rmaController.updateImageDescriptionByCollector);
// const upload = multer({ storage: multer.memoryStorage() });
//
// router.put('/collector/:returnedProductId', upload.single('image'), rmaController.updateImageDescriptionByCollector);

router.get(`/returns/last/rma`, rmaController.getLastRmaFrom);

router.get('/returns/Products', rmaController.getListOfReturns);

router.get('/:barcode', rmaController.getRmaByBarcode);
//router.get('/barCode/:barcode', rmaController.getRmaByBarcode);


router.get('/:rmaId', rmaController.getRma);
router.get('/rma/:rmaId', rmaController.getRma);

router.get('/:rmaId/total-price', rmaController.getRmaPrice);

router.get('/:rmaId/status', rmaController.getRmaStatus);

router.get('/:rmaId/refund', rmaController.getRmaRefund);

router.patch('/:rmaId/update-status', rmaController.UpdateStatus);

router.get('/:rmaId/customer', rmaController.getRmaCustomer);
router.get('/:rmaId/controller', rmaController.getRmaController);

router.get('/:rmaId/products', rmaController.getRmaProducts);

router.get('/:rmaId/quantity', rmaController.getRmaQuantity);

router.post('/update-total-refund/:RMAId', rmaController.updateTotalRefund);

router.patch('/:rmaId', rmaController.patchRma);

router.post('/update-returned-product-quantity', rmaController.updateQuantities);

router.delete('/:rmaId', rmaController.deleteRma);

router.get('/returns/:userId', rmaController.getReturnsByUserId);
router.get('/email/:email', rmaController.getAllRMAOfCustomerByEmail);

//router.get('/details', rmaController.getAllRmasDetails);
//router.get('/withDates', rmaController.getRMAandDates());
// router.post('/assignCollector/:RMAId', authenticateToken, rmaController.assignRmaToCollector);

router.post('/assign/:RMAId', rmaController.assignRmaToController);
router.get('/collector/imageAndDescription/:returnedProductId', rmaController.getCollectorImageAndDescription);


router.post(`/returns/return-request`, rmaController.addNewRMARequest);
export default router;
