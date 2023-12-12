import {
    deleteOrderById,
    deleteOrderDetailById, getAllOrderDetails,
    getAllOrders,
    getOrderById, getOrderDetailById,
    updateOrderByOrderId, updateOrderDetailById
} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";


export async function getOrdersDetails(req, res) {
    //TODO get all order details
    try {
        const orderDetails = getAllOrderDetails();
        res.status(StatusCodes.OK).json(orderDetails);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve order details." });
    }
}

export async function deleteOrderDetails(req, res){
    //TODO delete order details
    const { orderDetailId } = req.params;
    try {
        const deleteResult = deleteOrderDetailById(orderDetailId);
        if (deleteResult.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "Order details deleted successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Order details not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete order details." });
    }
}

export async function patchOrderDetails(req, res) {
    //TODO update order details
    const { orderDetailId } = req.params;
    const updateData = req.body;
    try {
        const updatedOrderDetails = updateOrderDetailById(orderDetailId, updateData);
        res.status(StatusCodes.OK).json(updatedOrderDetails);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update order details." });
    }
}

export async function getOrderDetails(req, res){
    //TODO get an order's details
    const { orderId } = req.params;
    try {
        const orderDetails = getOrderDetailById(orderId);
        if (orderDetails) {
            res.status(StatusCodes.OK).json(orderDetails);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Order details not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve order details." });
    }
}

export async function deleteOrder(req, res) {
    //TODO delete an order
    const { orderId } = req.params;
    try {
        const deleteResult = await deleteOrderById(orderId);
        if (deleteResult.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "Order deleted successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Order not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete order." });
    }
}

export async function patchOrder(req, res) {
    //TODO update an order
    const { orderId } = req.params;
    const updateData = req.body;
    try {
        const updatedOrder = await updateOrderByOrderId(orderId, updateData);
        res.status(StatusCodes.OK).json(updatedOrder);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update order." });
    }
}

export async function getOrder(req, res) {
    //TODO get an order
    const {orderId} = req.params;
    try {
        const order = await getOrderById(orderId);
        if (order) {
            res.status(StatusCodes.OK).json(order);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({error: "Order not found."});
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Failed to retrieve order."});
    }
}

export async function getListOfOrders(req, res) {
        //TODO get list of orders
    try {
        const orders = await getAllOrders();
        res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve orders." });
    }
}
