import Database from "better-sqlite3";
import * as queries from '../database/database-queries.js'
import * as initData from '../database/init-data.js'
// import {selectAllReturnedProductById} from "../database/database-queries.js";



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
db.prepare(queries.createOrderDetailsTable).run();
//db.prepare(queries.createRma).run();

insertUsers();
insertProducts();
insertOrders();
insertOrderDetails();

function insertUsers(){
    const countResult = db.prepare(queries.countUsers).get();
    if(countResult && countResult['count(email)'] === 0){
        const insert = db.prepare(queries.createUser);
        for(const user of initData.usersData){
            insert.run(user.userId, user.email, user.password, user.userRole, user.isAdmin);
        }
    }
}

function insertProducts(){
    const countResult = db.prepare(queries.countProducts).get();
    if(countResult['count(productId)'] === 0 ){
        const insert = db.prepare(queries.createProduct);
        for(const product of initData.productsData){
            insert.run(product.type, product.price, product.description, product.imageURL, product.productWeight, product.inventoryStock);
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
            insert.run(order.orderDetailId, order.orderId, order.productId, order.quantity);
        }
    }
}

export function insertUser(user){
    const insert = db.prepare(queries.createUser);
    insert.run(
        user.userId, user.email, user.password, user.userRole, user.isAdmin
    );
}

export function getAllUsers() {
    return db.prepare(queries.selectAllUsers).all();
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
    const { type, price, description, imageURL, productWeight, inventoryStock } = productData;
    return db.prepare(queries.updateProductById).run(type, price, description, imageURL, productWeight, inventoryStock, productId);
}

export function getAllOrders() {
    return db.prepare(queries.selectAllOrders).all();
}

export function getOrderById(orderId) {
    return db.prepare(queries.selectOrderByUserId).get(orderId);
}

export function deleteOrderById(orderId) {
    return db.prepare(queries.deleteOrderByOrderId).run(orderId);
}


export function updateOrderByOrderId(orderId, orderData) {
    const { userId, orderDate, totalPrice } = orderData;
    return db.prepare(queries.updateOrderByOrderId).run(userId, orderDate, totalPrice, orderId);
}

export function getOrderDetailById(orderDetailId) {
    return db.prepare(queries.selectOrderDetailById).get(orderDetailId);
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
//TODO check once the design in corrected
export function deleteRmaById(returnId) {
    return db.prepare(queries.deleteRmaById).run(returnId);
}

export function getAllRma() {
    return db.prepare(queries.selectAllRma).all();
}

export function getAllRmaById() {
    return db.prepare(queries.selectAllReturnedProductById).all();
}

export function getALlReturnedProducts(){
    return db.prepare(queries.selectAllReturnedProducts).all();
}

export function getALlReturnedProductsByRMAId(){
    return db.prepare(queries.selectAllReturnedProducts).get(RMAId);
}

export function deleteRMAById(orderId) {
    return db.prepare(queries.deleteOrderByOrderId).run(RMAI);
}
