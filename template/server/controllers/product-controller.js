import {deleteProductById, getAllProducts, getProductById, updateProductById} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";

export async function getProduct(req, res) {
    //TODO get a product base on product Id
    const { productId } = req.params;
    try {
        const product = await getProductById(productId);
        if (product) {
            res.status(StatusCodes.OK).json(product);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve product." });
    }
}

export async function getListOfProducts(req, res) {
    //TODO get a list of all the products
    try {
        const products = await getAllProducts();
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve products." });
    }
}

export async function patchProduct(req, res) {
    //TODO update a product base on product id
    const { productId } = req.params;
    const productData = req.body;
    try {
        const updateResult = await updateProductById(productId, productData);
        if (updateResult) {
            res.status(StatusCodes.OK).json({ message: "Product updated successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update product." });
    }
}

export async function deleteProduct(req, res) {
    //TODO delete a product
    const { productId } = req.params;
    try {
        const deleteResult = await deleteProductById(productId);
        if (deleteResult.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "Product deleted successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete product." });
    }
}
