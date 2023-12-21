import express from 'express';

const router = express.Router();

import * as rmaController from '../controllers/rma-controller.js';

router.get('/', rmaController.getListOfRmas);

router.get('/:rmaId', rmaController.getRma);

router.get("/:mraId/products", rmaController.getAllReturnedProductsByRMAId);

router.get("/rma/products", rmaController.getAllReturnedProducts);

router.patch('/:rmaId', rmaController.patchRma);

router.delete('/:rmaId', rmaController.deleteRma);

router.delete("/rma/returnId/:id", rmaController.deleteRmaByReturnId);


export default router;
