import express from 'express';

const router = express.Router();

import * as orderController from '../controllers/order-controller.js';


router.get('/', orderController.getListOfOrders);
router.get('/:orderId', orderController.getOrderById);
router.get('/MyOrders/:userId', orderController.getOrderDetailsPage)
router.patch('/:orderId', orderController.patchOrder);
router.delete('/:orderId', orderController.deleteOrder);
router.get('/details', orderController.getOrdersDetails);
router.get('/orderDetails/:orderId', orderController.getProductDetailsByOrderId);
router.patch('/details/:orderDetailId', orderController.patchOrderDetails);
router.delete('/details/:orderDetailId', orderController.deleteOrderDetails);

export default router;
