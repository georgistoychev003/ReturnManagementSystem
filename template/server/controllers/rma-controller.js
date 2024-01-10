import {
    deleteRmaById,
    getAllRma,
    getAllRmaById,
    getALlReturnedProducts,
    getALlReturnedProductsByRMAId,
    updateOrderDetailById,
    deleteRMAOrderById, getAllReturnsByUserId
} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";

export function deleteRma(req, res) {
    const { rmaId } = req.params;
    try {
        let deleteResult;
        if (typeof rmaId === 'string') {
            deleteResult = deleteRmaById(rmaId)
        } else if (typeof rmaId === 'number') {
            deleteResult = deleteRmaById(rmaId)
        }
        if (deleteResult.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "RMA deleted successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "RMA not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete RMA." });
    }
}

export function patchRma(req, res) {
    const { rmaId } = req.params;
    const updateData = req.body;
    try {
        const updatedRMADetails = updateOrderDetailById(rmaId, updateData);
        res.status(StatusCodes.OK).json(updatedRMADetails);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update RMA details." });
    }
}

export function getRma(req, res) {
    //TODO get an rma
    const { rmaId } = req.params;
    try {
        let rmaResult;
        if (rmaId) {
            rmaResult = getAllRmaById(rmaId)
        }
        if (rmaResult) {
            res.status(StatusCodes.OK).json(rmaResult);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "RMA not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve user." });
    }
}

export function getRmaByBarcode(req, res) {
    //TODO get an rma
    const { barcode } = req.params;
    try {
        let rmaBarcode;
        if (barcode) {
            rmaBarcode = getAllRmaById(barcode)
        }
        if (rmaBarcode) {
            res.status(StatusCodes.OK).json(rmaBarcode);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "RMA not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve user." });
    }
}

export function getListOfRmas(req, res) {
    try {
        const rmas = getAllRma();
            res.status(StatusCodes.OK).json(rmas);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }
}

export function getListOfReturns(req, res) {
    try {
        console.log("bruh")
        const returns = getALlReturnedProducts(userId);
        res.status(StatusCodes.OK).json(returns);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }
}

export function getReturnsByUserId(req, res){
    const { userId } = req.params;
    try{
        const result = getAllReturnsByUserId(userId);
        res.status(StatusCodes.OK).json(result);
    }catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve User Returns." });
    }
}