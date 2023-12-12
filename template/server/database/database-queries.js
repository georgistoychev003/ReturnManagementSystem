
export const createProductTable = `CREATE TABLE IF NOT EXISTS product(
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    price DOUBLE NOT NULL, 
    description TEXT NOT NULL,
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
    totalPrice DOUBLE NOT NULL
    )`

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


export const createProduct = `INSERT INTO product (type, price, description, imageURL, productWeight, inventoryStock) VALUES (?, ?, ?, ?, ?, ?)`
export const createOrder = `INSERT INTO "order" (orderId, userId, orderDate, totalPrice) VALUES (?, ?, ?, ?)`
export const createOrderDetails = `INSERT INTO orderDetail (orderDetailId, orderId, productId, quantity) VALUES (?, ?, ?, ?)`
export const deleteUserByEmail = `DELETE FROM user WHERE email = ?`;
export const deleteUserById = `DELETE FROM user WHERE userID = ?`;

export const deleteProductById = `DELETE FROM product WHERE productId = ?`;
export const deleteOrderByOrderId = `DELETE FROM "order" WHERE orderId = ?`;
export const deleteOrderDetailById = `DELETE FROM orderDetail WHERE orderDetailId = ?`;
export const updateUserByEmail = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE email = ?`;

export const updateUserById = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE userID = ?`;
export const updateProductById = `UPDATE product SET type = ?, price = ?, description = ?, imageURL = ?, productWeight = ?, inventoryStock = ? WHERE productId = ?`;
export const updateOrderByOrderId = `UPDATE "order" SET userId = ?, orderDate = ?, totalPrice = ? WHERE orderId = ?`;
export const updateOrderDetailById = `UPDATE orderDetail SET orderId = ?, productId = ?, quantity = ? WHERE orderDetailId = ?`;
export const selectAllUsers = `SELECT * FROM user`;
export const selectUserByEmail = `SELECT * FROM user WHERE email = ?`;

export const selectUserById = `SELECT * FROM user WHERE userID = ?`;
export const selectAllProducts = `SELECT * FROM product`;
export const selectProductById = `SELECT * FROM product WHERE productId = ?`;
export const selectAllOrders = `SELECT * FROM "order"`;
export const selectOrderByUserId = `SELECT * FROM "order" WHERE userId = ?`;
export const selectOrderByDate = `SELECT * FROM "order" WHERE orderDate = ?`;
export const selectOrderDetailById = `SELECT * FROM orderDetail WHERE orderDetailId = ?`;
export const selectAllOrderDetails = `SELECT * FROM orderDetail`;
//TODO check once the design in corrected


export const createRma = `INSERT INTO return (userId, productId, returnId, description, barcode, weight) VALUES (?, ?, ?, ?, ?, ?)`

export const deleteRmaById = `DELETE FROM return WHERE returnId = ?`;
export const selectAllRma = `SELECT * FROM return`;

export const createRmaTable =
    `CREATE TABLE IF NOT EXISTS return(
    userId INT NOT NULL,
    productId INT NOT NULL,
    returnId INT AUTO_INCREMENT,
    description TEXT NOT NULL,
    barcode VARCHAR(35) NOT NULL,
    weight DOUBLE NOT NULL,
    PRIMARY KEY (userId, productId),
    FOREIGN KEY (userId) REFERENCES user(userId),
    FOREIGN KEY (productId) REFERENCES product(productId)
    )`


