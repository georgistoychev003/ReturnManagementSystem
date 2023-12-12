import express from 'express';

import * as productRouter from '../controllers/product-controller.js';


const router = express.Router();

router.get('/', productRouter.getListOfProducts);

router.get('/:productId', productRouter.getProduct);

router.patch('/:productId', productRouter.patchProduct);


export default router;