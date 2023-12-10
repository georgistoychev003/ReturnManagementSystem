import express from 'express';

const router = express.Router();

import * as orderController from '../controllers/order-controller.js';

router.get('/', orderController.getListOfOrders);

router.get('/:oderId', orderController.getOrder);

router.patch('/:orderId', orderController.patchOrder);

router.delete('/:orderId', orderController.deleteOrder);


export default router;