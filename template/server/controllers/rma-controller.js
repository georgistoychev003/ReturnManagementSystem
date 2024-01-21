import {
    deleteRmaById,
    getAllRma,
    getAllRmaById,
    getALlReturnedProducts,
    getALlReturnedProductsByRMAId,
    updateOrderDetailById,
    getNumberOfRMA,
    getAllReturnsByUserId,
    getTotalPriceOfRMA,
    getStatusById,
    getCustomerEmailByRMAId,
    getProductByRMAId,
    getQunatityByRMAId,
    returnAllRmaDetails,
    returnRMAaandDates,
    returnRMAPerMonth,
    updateReturnedProductQuantity,
    assignRmaToControllerDb, getRMAByClientEmail
} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";
import {getAllRmaDetails, selectAllRMAbyCustomersEmail} from "../database/database-queries.js";

export function getAllRMAOfCustomerByEmail(req, res) {
    const { email } = req.params;
    try {
        console.log(email.json)
        const RMAbyEmail = getRMAByClientEmail(email)
        res.status(StatusCodes.OK).json(RMAbyEmail);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get RMA for this customer with email: ${email}." });
    }
}


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

export function getRmaPrice(req, res) {
    const { rmaId } = req.params;
    try {

        const total = getTotalPriceOfRMA(rmaId);
        res.status(StatusCodes.OK).json(total);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get RMA price." });
    }
}

export function getRmaStatus(req, res) {
    const { rmaId } = req.params;
    try {

        const status = getStatusById(rmaId);
        res.status(StatusCodes.OK).json(status);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get RMA status." });
    }
}

export function getRmaCustomer(req, res) {
    const { rmaId } = req.params;
    try {

        const customer = getCustomerEmailByRMAId(rmaId);
        res.status(StatusCodes.OK).json(customer);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get RMA customer." });
    }
}

export function getRmaProducts(req, res) {
    const { rmaId } = req.params;
    try {
        const products = getProductByRMAId(rmaId);
        res.status(StatusCodes.OK).json(products.map(p => ({
            orderedProductId: p.orderedProductId,
            name: p.name
        })));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get RMA products." });
    }
}

export function getRmaQuantity(req, res) {
    const { rmaId } = req.params;
    try {
        const products = getQunatityByRMAId(rmaId);
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get RMA products." });
    }
}

export function getRma(req, res) {

    const { rmaId } = req.params;
    try {
        let rmaResult;
        if (rmaId) {
            rmaResult = getAllRmaById(rmaId)
            console.log(rmaResult)
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
        const returns = getALlReturnedProducts();
        res.status(StatusCodes.OK).json(returns);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }
}

export async function getCountOfRMA(req, res){
    try {
        const numberOfRMA = getNumberOfRMA();
        res.status(StatusCodes.OK).json(numberOfRMA);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve number of users." });
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

export function getAllRmasDetails(req, res) {
    try {
        const rmas = returnAllRmaDetails;
        res.status(StatusCodes.OK).json(rmas);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }
}


export  function getRMAandDates(req, res) {
    try {
        const rmawithDate = returnRMAaandDates();
        res.status(StatusCodes.OK).json(rmawithDate);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }

}

export  function getRMAPerMonths(req, res) {
    try {
        const rmawithDate = returnRMAPerMonth();
        res.status(StatusCodes.OK).json(rmawithDate);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }

}

export async function assignRmaToController(req, res) {
    const RMAId = req.params.RMAId;
    const { controllerId } = req.body;
    console.log("Received RMA assignment request for ID:", RMAId);

    try {
        const result = await assignRmaToControllerDb(RMAId, controllerId);
        console.log("Result from DB operation:", result);

        if (result.locked) {
            res.status(StatusCodes.CONFLICT).json({ message: "RMA is currently locked by another controller." });
        } else if (result.alreadyLockedByThisController) {
            res.status(StatusCodes.OK).json({ message: "You already have the lock on this RMA." });
        } else if (result.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "RMA successfully assigned to controller." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "RMA not found or could not be assigned." });
        }
    } catch (error) {
        console.error("Error in assignRmaToController:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}



export  function updateQuantities(req, res) {
    const { productName, quantity, RMAId } = req.body;
    try {
        updateReturnedProductQuantity(productName, quantity, RMAId);
        res.status(200).json({ message: 'Returned product quantity updated successfully' });
    } catch (error) {
        console.error('Error updating returned product quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


