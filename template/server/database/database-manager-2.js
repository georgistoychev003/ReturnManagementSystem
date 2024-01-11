import Database from "better-sqlite3";
import * as queries from '../database/database-queries.js'
import * as initData from '../database/init-data.js'
import {selectAllRMAByUserId} from "../database/database-queries.js";

import {selectStatusById} from "../database/database-queries.js";


let db;
try{
    db = new Database('my-shop-database')
    console.log('Database Initialised')
} catch(e){
    console.error('Error while initializing DB', e)
    throw e;
}

db.prepare(queries.createProductTable).run();
db.prepare(queries.createUserTable).run();
db.prepare(queries.createOrderTable).run();
db.prepare(queries.createOrderedProductTable).run();
db.prepare(queries.createReturnTable).run();
db.prepare(queries.createReturnedProductTable).run();


insertUsers();
insertProducts();
insertOrders();
insertOrderDetails();
insertRMA();
insertReturned();

function insertUsers(){
    const countResult = db.prepare(queries.countUsers).get();
    if(countResult && countResult['count(email)'] === 0){
        const insert = db.prepare(queries.createUser);
        for(const user of initData.usersData){
            insert.run(user.userId, user.userName, user.email, user.password, user.userRole);
        }
    }
}

function insertProducts(){
    const countResult = db.prepare(queries.countProducts).get();
    if(countResult['count(productId)'] === 0 ){
        const insert = db.prepare(queries.createProduct);
        for(const product of initData.productsData){
            insert.run(product.type, product.price, product.name, product.imageURL, product.productWeight, product.inventoryStock);
        }
    }
}

function insertOrders(){
    const countResult = db.prepare(queries.countOrders).get();
    if(countResult['count(orderId)'] === 0){
        const insert = db.prepare(queries.createOrder);
        for(const order of initData.ordersData){
            insert.run(order.orderId, order.userId, order.orderDate, order.totalPrice);
        }
    }
}

function insertOrderDetails(){
    const countResult = db.prepare(queries.countOrderDetails).get();
    if(countResult['count(orderId)'] === 0){
        const insert = db.prepare(queries.createOrderDetails);
        for(const order of initData.orderDetailsData){
            insert.run(order.orderedProductId, order.orderId, order.productId, order.quantity, order.unitPrice);
        }
    }
}

export function insertReturned(){
    const countResult = db.prepare(queries.countReturnedProducts).get();
    if(countResult['count(returnedProductId)'] === 0) {
        const insert = db.prepare(queries.createReturnedProduct);
        for (const returnedProductData of initData.returnedProduct) {
            insert.run(
                returnedProductData.returnedProductId,
                returnedProductData.orderedProductId,
                returnedProductData.RMAId,
                returnedProductData.quantityToReturn,
                returnedProductData.returnedDate,
                returnedProductData.description,
                returnedProductData.weight,
                returnedProductData.statusProduct,
                returnedProductData.quantity);
        }
    }
}

export function insertRMA(){
    const countResult = db.prepare(queries.countReturns).get();
    if(countResult['count(RMAId)'] === 0) {
        const insert = db.prepare(queries.createRma);
        for (const rma of initData.rmaData) {
            insert.run(rma.barcode, rma.statusRma);
        }
    }
}

export function insertUser(user){
    const insert = db.prepare(queries.createUser);
    insert.run(
        user.userId, user.name, user.email, user.password, user.userRole, user.isAdmin
    );
}

export function getAllUsers() {
    return db.prepare(queries.selectAllUsers).all();
}
export function getNumberOfUsers() {
    return db.prepare(queries.countUsers).get();
}


export function getUserByEmail(email) {
    return db.prepare(queries.selectUserByEmail).get(email);
}

export function getUserById(userId) {
    return db.prepare(queries.selectUserById).get(userId);
}

export function deleteUserByEmail(email) {
    return db.prepare(queries.deleteUserByEmail).run(email);
}

export function deleteUserById(userId) {
    return db.prepare(queries.deleteUserById).run(userId);
}

export function updateUserByEmail(email, userData) {
    const { userId, updatedEmail, password, userRole, isAdmin } = userData;
    return db.prepare(queries.updateUserByEmail).run(userId, updatedEmail, password, userRole, isAdmin);
}

export function updateUserById(userId, userData) {
    const { email, password, userRole, isAdmin } = userData;
    return db.prepare(queries.updateUserById).run(userId, email, password, userRole, isAdmin);
}

export function getAllProducts() {
    return db.prepare(queries.selectAllProducts).all();
}

export function getProductById(productId) {
    return db.prepare(queries.selectProductById).get(productId);
}

export function deleteProductById(productId) {
    return db.prepare(queries.deleteProductById).run(productId);
}

export function updateProductById(productId, productData) {
    const { type, price, name, imageURL, productWeight, inventoryStock } = productData;
    return db.prepare(queries.updateProductById).run(type, price, name, imageURL, productWeight, inventoryStock, productId);
}

export function getAllOrders() {
    return db.prepare(queries.selectAllOrders).all();
}

export function getOrderByOrderId(orderId) {
    return db.prepare(queries.selectOrderById).get(orderId);
}
export function getOrderByUserId(orderId) {
    return db.prepare(queries.selectOrderByUserId).get(orderId);
}

export function deleteOrderById(orderId) {
    return db.prepare(queries.deleteOrderByOrderId).run(orderId);
}


export function updateOrderByOrderId(orderId, orderData) {
    const { userId, orderDate, totalPrice } = orderData;
    return db.prepare(queries.updateOrderByOrderId).run(userId, orderDate, totalPrice, orderId);
}

export function getOrderDetailById(orderId) {
    return db.prepare(queries.selectOrderDetailById).all(orderId);
}

export async function updateProductStock(productId, inventoryStock) {
    const updateStatement = db.prepare(queries.updateProductStockById);
    return updateStatement.run(inventoryStock, productId);
}
export function updateOrderDetailById(orderDetailId, orderDetailData) {
    const { orderId, productId, quantity } = orderDetailData;
    return db.prepare(queries.updateOrderDetailById).run(orderId, productId, quantity, orderDetailId);
}

export function deleteOrderDetailById(orderDetailId) {
    return db.prepare(queries.deleteOrderDetailById).run(orderDetailId);
}

export function getAllOrderDetails() {
    return db.prepare(queries.selectAllOrderDetails).all();
}

export function getOrderedProductsByOrderId(orderId){
    return db.prepare(queries.selectOrderedProducts).all(orderId);
}
//TODO check once the design in corrected
export function getNumberOfRMA() {
    return db.prepare(queries.countReturns).get();
}

export function deleteRmaById(returnId) {
    return db.prepare(queries.deleteRmaById).run(returnId);
}

export function getAllRma() {

    return db.prepare(queries.selectAllRma).all();
}

export function getAllRmaById(Id) {
    return db.prepare(queries.selectAllReturnedProductById).get(Id);
}

export function getALlReturnedProducts(){
    return db.prepare(queries.selectAllReturnedProducts).all();
}

export function getALlReturnedProductsByRMAId(){
    return db.prepare(queries.selectAllReturnedProducts).get(RMAId);
}

export function deleteRMAOrderById(orderId) {
    return db.prepare(queries.deleteOrderByOrderId).run(orderId);
}

export function getStatusById(RMAId) {
    return db.prepare(queries.selectStatusById).get(RMAId);
}

export function getTotalPriceOfRMA(RMAId) {
    const query = `
        SELECT r.RMAId, SUM(op.unitPrice * rp.quantity) AS TotalReturnPrice
        FROM returnedProduct rp
        JOIN orderedProduct op ON rp.orderedProductId = op.orderedProductId
        JOIN returntable r ON rp.RMAId = r.RMAId
        WHERE r.RMAId = ?
        GROUP BY r.RMAId;
    `;
    console.log(query)
    return db.prepare(query).get(RMAId);
}

export function getCustomerEmailByRMAId(RMAId) {
    const statement = db.prepare(queries.selectCustomerEmailByRMAId);
    return statement.get(RMAId);
}

export function getProductByRMAId(RMAId) {
    const statement = db.prepare(queries.selectProductDescriptionsByRMAId);
    return statement.get(RMAId);
}


export function updateUserPasswordById(userId, newPassword) {
    const update = db.prepare(queries.updateUserPasswordById);
    return update.run(newPassword, userId);
}


export function getAllReturnsByUserId(userId){
    return db.prepare(queries.selectAllRMAByUserId).all(userId);
}