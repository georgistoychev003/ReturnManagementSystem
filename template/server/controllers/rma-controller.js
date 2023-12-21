import * as db from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";

export function patchRma(req, res) {
    const { rmaId } = req.params;
    const updateData = req.body;
    try {
        const updatedRMADetails = db.updateOrderDetailById(rmaId, updateData);
        res.status(StatusCodes.OK).json(updatedRMADetails);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update RMA details." });
    }
}

export async function getListOfRmas(req, res) {
    // TODO get list of rmas
    try {
        const rmaList = await db.getAllRma();
        res.status(StatusCodes.OK).json(rmaList);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function getRma(req, res) {
    // TODO get all rma by id
    try {
        const id = req.params.id;
        const rma = await db.getAllRmaById(id);
        if (rma) {
            res.status(StatusCodes.OK).json(rma);
        } else {
            res.status(StatusCodes.NOT_FOUND).json( { error: "RMA not found" });
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function getAllReturnedProducts(req, res) {
    // TODO get list of all returned products
    try {
        const products = await db.getALlReturnedProducts();
        res.status(StatusCodes.OK).json(products);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function getAllReturnedProductsByRMAId(req, res) {
    // TODO get list of all returned products
    try {
        const id = req.params.id;
        const products = await db.getALlReturnedProductsByRMAId(id);
        res.status(StatusCodes.OK).json(products);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function deleteRma(req, res) {
    // TODO delete an rma by id
    try {
        const id = req.params.id;
        const result = await db.deleteRMAById(id);
        if (result > 0) {
            res.status(StatusCodes.OK).json("RMA deleted");
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "RMA not found" });
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

export async function deleteRmaByReturnId(req, res) {
    // TODO delete an rma by returnId
    try {
        const id = req.params.id;
        const result = await db.deleteRmaByReturnId(id);
        if (result > 0) {
            res.status(StatusCodes.OK).json("RMA deleted");
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "RMA not found" });
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
}

