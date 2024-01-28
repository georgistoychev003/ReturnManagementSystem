import {
    deleteRmaById,
    getAllRma,
    getAllRmaById,
    getALlReturnedProducts,
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
    updateImageDescriptionBycollector, insertRma, insertReturnedProduct, getLastRma,
    assignRmaToControllerDb, getControllerInfoByRMAId,
    getRMAByClientEmail, updateTotalRefundAmount, getTotalRefundByRMAId, updateRMAStatus, getDescriptionForRma,
} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";
import * as databaseManager from "../database/database-manager-2.js";

export async function UpdateStatus(req, res) {
    const {rmaId} = req.params;
    const {status} = req.body;

    if (!rmaId || !status) {
        return res.status(400).json({message: 'RMA ID and new status are required.'});
    }

    try {
        console.log(rmaId)
        console.log(status)
        const result = await updateRMAStatus(rmaId, status);
        console.log(result)
        if (result.changes > 0) {
            res.status(200).json({message: 'RMA status updated successfully'});
        } else {
            res.status(404).json({message: 'RMA not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}


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
export function getRmaController(req, res) {
    const { rmaId } = req.params;
    try {
        const controllerInfo = getControllerInfoByRMAId(rmaId);

        if (controllerInfo) {
            res.status(StatusCodes.OK).json(controllerInfo);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Controller information not found for the given RMA ID." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get controller information." });
    }
}



export function getRmaProducts(req, res) {
    const { rmaId } = req.params;
    try {
        const products = getProductByRMAId(rmaId);
        res.status(StatusCodes.OK).json(products.map(p => ({
            returnedProductId: p.returnedProductId,
            orderedProductId: p.orderedProductId,
            name: p.name,
            price: p.price,
            type: p.type,
            imageURL: p.imageURL,
            quantityToReturn: p.quantityToReturn,
            returnedDate : p.returnedDate,
            collectorDescription : p.collectorDescription



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
    const { productName, quantityToReturn, RMAId } = req.body;
    try {
        updateReturnedProductQuantity(productName, quantityToReturn, RMAId);
        res.status(200).json({ message: 'Returned product quantity updated successfully' });
    } catch (error) {
        console.error('Error updating returned product quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export async function updateImageDescriptionByCollector(req, res) {
    const { collectorDescription, collectorImage } = req.body;
    const { returnedProductId } = req.params;

    try {
        updateImageDescriptionBycollector(collectorImage, collectorDescription, returnedProductId);
        res.status(200).json({ message: 'Returned product image and description updated successfully' });
    } catch (error) {
        console.error('Error updating returned product description and image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export async function getLastRmaFrom(req, res) {
    try {
        const rma = getLastRma();
        res.status(StatusCodes.OK).json(rma);
    } catch (error) {
        console.error("Error fetching last RMA:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve RMA's." });
    }
}

export async function updateTotalRefund(req, res) {
    const { RMAId } = req.params;
    const { totalRefundAmount } = req.body;

    try {
        const result = updateTotalRefundAmount(RMAId, totalRefundAmount);
        console.log(result)
        if (result.changes > 0) {
            res.status(StatusCodes.OK).json({ message: 'Total refund amount updated successfully.' });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'RMA not found.' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update total refund amount.' });
    }
}

export async function getRmaRefund(req, res) {
    const { rmaId } = req.params;
    try {
        const result = getTotalRefundByRMAId(rmaId);
        if (result) {
            res.json({ totalRefundAmount: result.totalRefundAmount });
        } else {
            res.status(404).json({ error: 'RMA not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



export async function addNewRMARequest(req, res) {
    try {
        console.log("Received JSON payload:", req.body);

        let products = req.body;
        if (!Array.isArray(products)) {
            products = [products];
        }

        const rmaId = await insertRma("barcodeX", "pending", 0);

        // Get today's date in YYYY-MM-DD format
        const formattedDate = new Date().toISOString().split('T')[0];

        for (const product of products) {
            await insertReturnedProduct(
                product.orderedProductId, rmaId, formattedDate,
                product.description, product.productWeight,
                "pending", product.quantityToReturn,
                product.imageBase64 // Include the Base64 image data
            );
        }

        res.status(200).json({ message: "RMA request added successfully" });
    } catch (error) {
        console.error("Error in addNewRMARequest:", error);
        res.status(500).send("An error occurred while processing your request.");
    }
}


export async function getCollectorImageAndDescription(req, res) {
    const { returnedProductId } = req.params;
    try {
        const result = await databaseManager.getCollectorImageAndDescriptionById(returnedProductId);
        if (result) {
            res.status(StatusCodes.OK).json({
                collectorImage: result.collectorImage,
                collectorDescription: result.collectorDescription
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).send('Image and description not found for the given product ID.');
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve the image and description.' });
    }
}

export async function getRmaDescription(req, res) {
    const {returnedProductId} = req.params;
    try {
        const result = await getDescriptionForRma(returnedProductId);
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to get descriptions for RMA." });
    }
}

