
export const createProductTable = `CREATE TABLE IF NOT EXISTS product(
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    price DOUBLE NOT NULL, 
    name TEXT NOT NULL,
    imageURL TEXT NOT NULL,
    productWeight DOUBLE NOT NULL,
    inventoryStock INT NOT NULL
)`

export const createUserTable = `CREATE TABLE IF NOT EXISTS user(
    userID INT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    userRole TEXT NOT NULL,
    isAdmin TEXT NOT NULL
    )`

export const createOrderTable = `CREATE TABLE IF NOT EXISTS "order"(
    orderId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    orderDate DATE NOT NULL,
    totalPrice DOUBLE NOT NULL,
    returnStatus TEXT,
    credit DOUBLE                              
    )`


// TODO issue with foreign key when deleting a product. Do we need to delete products as I assume and RMA wouldn't be involved?
export const createOrderDetailsTable = `CREATE TABLE IF NOT EXISTS orderDetail(
    orderDetailId INT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES "order"(orderId), 
    FOREIGN KEY (productId) REFERENCES product(productId)
--     unitPrice DOUBLE NOT NULL
--     ^^ Is this value the combined value for the quantity?
)`

export const countUsers = `SELECT count(email) FROM user`
export const countOrderDetails = `SELECT count(orderId) FROM orderDetail`
export const countOrders = `SELECT count(orderId) FROM "order"`
export const countProducts = `SELECT count(productId) FROM product`


export const createUser = `INSERT INTO user (userID, email, password, userRole, isAdmin) VALUES (?, ?, ?, ?, ?)`
export const createProduct = `INSERT INTO product (type, price, name, imageURL, productWeight, inventoryStock) VALUES (?, ?, ?, ?, ?, ?)`
export const createOrder = `INSERT INTO "order" (orderId, userId, orderDate, totalPrice, returnStatus, credit) VALUES (?, ?, ?, ?, ?, ?)`
export const createOrderDetails = `INSERT INTO orderDetail (orderDetailId, orderId, productId, quantity) VALUES (?, ?, ?, ?)`


export const deleteUserByEmail = `DELETE FROM user WHERE email = ?`;
export const deleteUserById = `DELETE FROM user WHERE userID = ?`;
export const deleteProductById = `DELETE FROM product WHERE productId = ?`;
export const deleteOrderByOrderId = `DELETE FROM "order" WHERE orderId = ?`;
export const deleteOrderDetailById = `DELETE FROM orderDetail WHERE orderDetailId = ?`;

export const updateUserByEmail = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE email = ?`;
export const updateUserById = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE userID = ?`;
export const updateProductById = `UPDATE product SET type = ?, price = ?, name = ?, imageURL = ?, productWeight = ?, inventoryStock = ? WHERE productId = ?`;
export const updateOrderByOrderId = `UPDATE "order" SET userId = ?, orderDate = ?, totalPrice = ? WHERE orderId = ?`;
export const updateOrderDetailById = `UPDATE orderDetail SET orderId = ?, productId = ?, quantity = ? WHERE orderDetailId = ?`;

export const selectAllUsers = `SELECT * FROM user`;
export const selectUserByEmail = `SELECT * FROM user WHERE email = ?`;
export const selectUserById = `SELECT * FROM user WHERE userID = ?`;
export const selectAllProducts = `SELECT * FROM product`;
export const selectProductById = `SELECT * FROM product WHERE productId = ?`;
export const selectAllOrders = `SELECT * FROM "order"`;
export const selectOrderById = `SELECT * FROM "order" WHERE OrderId = ?`;
export const selectOrderByUserId = `SELECT * FROM "order" WHERE userId = ?`;
export const selectOrderByDate = `SELECT * FROM "order" WHERE orderDate = ?`;
export const selectOrderDetailById = `SELECT * FROM orderDetail WHERE orderId = ?`;
export const selectAllOrderDetails = `SELECT * FROM orderDetail`;

export const selectOrderedProducts = `SELECT "order".orderId, "order".orderDate ,orderProduct.productId, orderProduct.quantity, product.name, product.price, product.type FROM "order" 
           INNER JOIN orderProduct ON "order".orderId = orderProduct.orderId 
           INNER JOIN product ON orderProduct.productId = product.productId
                     WHERE "order".orderId = ?;`;




