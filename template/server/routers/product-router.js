import express from 'express';

import * as productRouter from '../controllers/product-controller.js';

const router = express.Router();

router.get('/', productRouter.getListOfProducts);
router.get('/mostReturned', productRouter.getMostReturnedProducts);
router.get('/:productId', productRouter.getProduct);
router.get('/:productId/price', productRouter.getProductPrice);
router.patch('/:productId', productRouter.patchProduct);
router.post('/uploadImage', productRouter.uploadImage);
router.delete('/:productId', productRouter.deleteProduct);
export default router;
