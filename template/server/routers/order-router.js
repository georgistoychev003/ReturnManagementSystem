import express from 'express';

const router = express.Router();

import * as orderController from '../controllers/order-controller.js';

// Order routes
router.get('/', orderController.getListOfOrders);

router.get('/:oderId', orderController.getOrder);

router.patch('/:orderId', orderController.patchOrder);

router.delete('/:orderId', orderController.deleteOrder);

// Order details routes
router.get('/details', orderController.getOrdersDetails);

router.get('/details/:orderDetailId', orderController.getOrderDetails);

router.patch('/details/:orderDetailId', orderController.patchOrderDetails);

router.delete('/details/:orderDetailId', orderController.deleteOrderDetails);

export default router;
