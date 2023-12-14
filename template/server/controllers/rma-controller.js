import * as databaseManager from '../database/database-manager-2.js';



export function createRMA(req, res) {
    // Should be a logic on whether the item is already returned or not
    //TODO check once the design in corrected
    const rma = req.body;
    if (rma.type === "food"){
        res
            .status(408)
            .json(
            {message: "you cannot return a food item"}
        )
    }
    // Check the 14 days return requirement
    // Check that the product has not yet been returned
    else{
        res
            .status(201)
            .json({message : "The RMA was successfully created"})
    }
}

export function deleteRma(req, res) {
    //TODO check once the design in corrected
    const returnId = req.params.returnId;
    const listOfRMa = databaseManager.getAllRma();
    const returnIdExists = listOfRMa.some(obj => Object.values(obj).includes(returnId));
    if (returnIdExists){
        databaseManager.deleteRmaById(returnId);
        res
            .status(201)
            .json(
                {message : "The RMA with Id "  + returnId + "was successfully deleted"});
    }
    else{
        res
            .status(404)
            .json({message : "The RMA with Id " + returnId + " does not exist and thus cannot be deleted"})
    }
}

export function patchRma() {
    //TODO update an rma
}

export function getRma() {
    //TODO get an rma
}

export function getListOfRmas() {
    //TODO get list of rmas
}
