import {
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById,
    updateProductStock
} from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";
import * as path from "path";

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
    const { inventoryStock } = req.body; // Extract only inventoryStock
    try {
        const product = await getProductById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found." });
        }

        // Update the product stock and wait for the operation to complete
        await updateProductStock(productId, inventoryStock);

        // Fetch the updated products list
        const updatedProducts = await getAllProducts();
        console.log(updatedProducts);

        res.status(StatusCodes.OK).json({ message: "Stock updated successfully." });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error." });
    }
}

export async function deleteProduct(req, res) {
    const { productId } = req.params;

        await deleteProductById(productId);
        res.status(StatusCodes.OK).json({ message: "Product deleted successfully." });


}

export async function uploadImage(req, res) {
    const {productId} = req.body.productId;
    const image = req.files.image;

    if (!productId || !image) {
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'ProductId and image are required.'});
    }

    const product = getProductById(productId);

    if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'Product not found.'});
    }

    const uploadPath = path.join('uploads', image.name);

    // Move the uploaded file to the desired upload path
    await image.mv(uploadPath, (err) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Error while uploading the image.'});
        }

        // Update the product with the image location in the database
        updateProductById(productId, {imageURL: uploadPath});

        return res.status(StatusCodes.OK).json({message: 'Image uploaded and product updated successfully.'});
    });
}
