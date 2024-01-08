import express from 'express';

const router = express.Router();

import * as orderController from '../controllers/order-controller.js';

// Order routes
router.get('/', orderController.getListOfOrders);

router.get('/:orderId', orderController.getOrderById);

router.get('/MyOrders/:userId', orderController.getOrderForUserId)

router.patch('/:orderId', orderController.patchOrder);

router.delete('/:orderId', orderController.deleteOrder);

// Order details routes
router.get('/details', orderController.getOrdersDetails);

router.get('/details/:orderId', orderController.getOrderDetails);

router.patch('/details/:orderDetailId', orderController.patchOrderDetails);

router.delete('/details/:orderDetailId', orderController.deleteOrderDetails);

export default router;
