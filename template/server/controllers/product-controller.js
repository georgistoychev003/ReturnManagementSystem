import {deleteProductById, getAllProducts, getProductById, updateProductById} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";

export async function getProduct(req, res) {
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
    try {
        const products = await getAllProducts();
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve products." });
    }
}

export async function patchProduct(req, res) {
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
    const { productId } = req.params;

        await deleteProductById(productId);
        res.status(StatusCodes.OK).json({ message: "Product deleted successfully." });


}
