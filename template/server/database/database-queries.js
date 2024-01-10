
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
    userRole TEXT NOT NULL
    )`

export const createOrderTable = `CREATE TABLE IF NOT EXISTS "order"(
    orderId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    orderDate DATE NOT NULL,
    totalPrice DOUBLE NOT NULL
    )`

export const createOrderedProductTable = `CREATE TABLE IF NOT EXISTS orderedProduct(
    orderedProductId INT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    unitPrice INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES "order"(orderId), 
    FOREIGN KEY (productId) REFERENCES product(productId)
--     unitPrice DOUBLE NOT NULL
--     ^^ Is this value the combined value for the quantity?
)`

export const createReturnTable = `CREATE TABLE IF NOT EXISTS returntable(
    RMAId INTEGER NOT NULL PRIMARY KEY,
    barcode TEXT NOT NULL,
    statusRma TEXT NOT NULL
    )`

export const createReturnedProductTable = `CREATE TABLE IF NOT EXISTS returnedProduct(
    returnedProductId INTEGER PRIMARY KEY AUTOINCREMENT,
    orderedProductId INT NOT NULL,
    RMAId INT,
    returnedDate DATE,
    description TEXT,
    weight DOUBLE,
    statusProduct TEXT,
    FOREIGN KEY (orderedProductId) REFERENCES orderedProduct(orderedProductId),
    FOREIGN KEY (RMAId) REFERENCES returntable(RMAId)
    )`;


export const countUsers = `SELECT count(email) FROM user`

export const countOrderDetails = `SELECT count(orderId) FROM orderedProduct`
export const countOrders = `SELECT count(orderId) FROM "order"`
export const countProducts = `SELECT count(productId) FROM product`
export const countReturns = `SELECT count(RMAId) FROM returntable`
export const countReturnedProducts = `SELECT count(returnedProductId) FROM returnedProduct`

export const createUser = `INSERT INTO user (userID, email, password, userRole) VALUES (?, ?, ?, ?)`
export const createRma = `INSERT INTO returntable (barcode, statusRma) VALUES (?, ?)`;
export const createReturnedProduct = `INSERT INTO returnedProduct (returnedProductId, orderedProductId, RMAId, returnedDate, description, weight, statusProduct) VALUES (?, ?, ?, ?, ?, ?, ?)`
export const createProduct = `INSERT INTO product (type, price, description, imageURL, productWeight, inventoryStock) VALUES (?, ?, ?, ?, ?, ?)`
export const createOrder = `INSERT INTO "order" (orderId, userId, orderDate, totalPrice) VALUES (?, ?, ?, ?)`
export const createOrderDetails = `INSERT INTO orderedProduct (orderedProductId, orderId, productId, quantity, unitPrice) VALUES (?, ?, ?, ?, ?)`

export const deleteUserByEmail = `DELETE FROM user WHERE email = ?`;
export const deleteUserById = `DELETE FROM user WHERE userID = ?`;
export const deleteProductById = `DELETE FROM product WHERE productId = ?`;
export const deleteOrderByOrderId = `DELETE FROM "order" WHERE orderId = ?`;
export const deleteOrderDetailById = `DELETE FROM orderDetail WHERE orderDetailId = ?`;
export const deleteRmaById = `DELETE FROM returntable WHERE RMAId = ?`;
export const deleteReturnedProduct = `DELETE FROM returnedProduct WHERE RMAId = ? AND returnedProductId = ? AND orderedProductId = ?`;

export const updateUserByEmail = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE email = ?`;
export const updateUserById = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE userID = ?`;
export const updateProductById = `UPDATE product SET type = ?, price = ?, description = ?, imageURL = ?, productWeight = ?, inventoryStock = ? WHERE productId = ?`;
export const updateOrderByOrderId = `UPDATE "order" SET userId = ?, orderDate = ?, totalPrice = ? WHERE orderId = ?`;
export const updateOrderDetailById = `UPDATE orderDetail SET orderId = ?, productId = ?, quantity = ? WHERE orderDetailId = ?`;
export const updateRmaById = `UPDATE returntable SET RMAId = ?, returnedProductId = ?, barcode = ?, statusRma = ? WHERE RMAId = ?`;
export const updateReturnedProduct = `UPDATE returnedProduct SET returnedProductId = ?, orderedProductId = ?, RMAId = ?, returnedDate = ?,description = ?, weight = ?, statusProduct = ? WHERE RMAId = ? AND returnedProductId = ? AND orderedProductId = ?`;

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
export const selectAllReturns =  `SELECT * FROM returntable`;
export const selectStatusById =  `SELECT statusRma FROM returntable WHERE RMAId = ?`;
export const selectAllReturnedProducts =  `SELECT * FROM returnedProduct`;
export const selectAllReturnedProductById = `SELECT * FROM returnedProduct WHERE RMAId = ? AND returnedProductId = ?AND orderedProductId = ?`;
//TODO check once the design in corrected

export const selectAllRma = `SELECT * FROM returntable`;




