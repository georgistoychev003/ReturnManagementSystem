
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
    userName TEXT NOT NULL, 
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
    statusRma TEXT NOT NULL,
    controllerId INT,
    lockTimestamp DATETIME,
    FOREIGN KEY (controllerId) REFERENCES "user"(userID)                                 
    )`

export const createReturnedProductTable = `CREATE TABLE IF NOT EXISTS returnedProduct(
    returnedProductId INTEGER PRIMARY KEY AUTOINCREMENT,
    orderedProductId INT NOT NULL,
    RMAId INT,
    quantityToReturn INT,
    returnedDate DATE,
    description TEXT,
    weight DOUBLE,
    statusProduct TEXT,
    quantity INT,
    FOREIGN KEY (orderedProductId) REFERENCES orderedProduct(orderedProductId),
    FOREIGN KEY (RMAId) REFERENCES returntable(RMAId)
    )`;


export const countUsers = `SELECT count(email) FROM user`

export const countOrderDetails = `SELECT count(orderId) FROM orderedProduct`
export const countOrders = `SELECT count(orderId) FROM "order"`
export const countProducts = `SELECT count(productId) FROM product`
export const countReturns = `SELECT count(RMAId) FROM returntable`
export const countReturnedProducts = `SELECT count(returnedProductId) FROM returnedProduct`

export const createUser = `INSERT INTO user (userID, userName, email, password, userRole) VALUES (?, ?, ?, ?, ?)`
export const createRma = `INSERT INTO returntable (barcode, statusRma) VALUES (?, ?)`;
export const createReturnedProduct = `INSERT INTO returnedProduct (returnedProductId, orderedProductId, RMAId, quantityToReturn,  returnedDate, description, weight, statusProduct, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`
export const createProduct = `INSERT INTO product (type, price, name, imageURL, productWeight, inventoryStock) VALUES (?, ?, ?, ?, ?, ?)`
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
export const updateUserRoleById = `UPDATE user SET userRole = ? WHERE userID = ?`;
export const updateUserById = `UPDATE user SET email = ?, password = ?, userRole = ?, isAdmin = ? WHERE userID = ?`;
export const updateProductById = `UPDATE product SET type = ?, price = ?, name = ?, imageURL = ?, productWeight = ?, inventoryStock = ? WHERE productId = ?`;
export const updateOrderByOrderId = `UPDATE "order" SET userId = ?, orderDate = ?, totalPrice = ? WHERE orderId = ?`;
export const updateOrderDetailById = `UPDATE orderDetail SET orderId = ?, productId = ?, quantity = ? WHERE orderDetailId = ?`;
export const updateRmaById = `UPDATE returntable SET RMAId = ?, returnedProductId = ?, barcode = ?, statusRma = ? WHERE RMAId = ?`;
export const updateReturnedProduct = `UPDATE returnedProduct SET returnedProductId = ?, orderedProductId = ?, RMAId = ?, returnedDate = ?,description = ?, weight = ?, statusProduct = ? WHERE RMAId = ? AND returnedProductId = ? AND orderedProductId = ?`;
//export const updateUserCreditLine = `UPDATE user SET creditLine = ? WHERE userID = ?`;

export const selectAllUsers = `SELECT * FROM user`;
export const selectUserByEmail = `SELECT * FROM user WHERE email = ?`;
export const selectUserById = `SELECT * FROM user WHERE userID = ?`;
export const selectAllProducts = `SELECT * FROM product`;
export const selectProductById = `SELECT * FROM product WHERE productId = ?`;
export const selectAllOrders = `SELECT * FROM "order"`;
export const selectOrderById = `SELECT * FROM "order" WHERE OrderId = ?`;
export const selectOrderByUserId = `SELECT * FROM "order" WHERE userId = ?`;
export const selectOrderByDate = `SELECT * FROM "order" WHERE orderDate = ?`;
export const selectOrderDetailById = `SELECT * FROM orderedProduct WHERE orderId = ?`;
export const selectAllOrderDetails = `SELECT * FROM orderProduct`;
export const selectAllReturns =  `SELECT * FROM returntable`;
export const selectStatusById =  `SELECT statusRma FROM returntable WHERE RMAId = ?`;
export const selectAllReturnedProducts =  `SELECT * FROM returnedProduct`;
export const selectAllReturnedProductById = `SELECT * FROM returnedProduct 
                                            JOIN orderedProduct ON returnedProduct.orderedProductId = orderedProduct.orderedProductId
                                            JOIN product ON orderedProduct.productId = product.productId
                                            WHERE RMAId = ?`;
export const selectAllRMAbyCustomersEmail = `SELECT * FROM user
                                                JOIN "order" o ON user.userId = o.userId
                                                JOIN orderedProduct ON o.orderId = orderedProduct.orderId
                                                JOIN returnedProduct ON orderedProduct.orderedProductId = returnedProduct.orderedProductId
                                                JOIN returntable ON returnedProduct.RMAId = returntable.RMAId
                                                WHERE email = ?`
export const selectReturnedProductQuantityByRMAId = `
    SELECT rp.quantityToReturn
    FROM returnedProduct rp
    JOIN returntable r ON rp.RMAId = r.RMAId
    WHERE r.RMAId = ?;
`;
//TODO check once the design in corrected

export const selectOrderedProducts = `SELECT "order".orderId, "order".orderDate ,orderedProduct.productId, orderedProduct.quantity, product.name, product.price, product.type FROM "order" 
           INNER JOIN orderedProduct ON "order".orderId = orderedProduct.orderId 
           INNER JOIN product ON orderedProduct.productId = product.productId
                     WHERE "order".orderId = ?;`;

export const selectAllRMAByUserId = `SELECT rp.returnedProductId, rp.orderedProductId, rp.RMAId, rp.returnedDate, rp.description, rp.weight, rp.statusProduct FROM returnedProduct rp
JOIN orderedProduct op ON op.orderedProductId = rp.orderedProductId
JOIN "order" o ON op.orderId = o.orderid
JOIN user u ON o.userId = u.userId 
WHERE u.userId = ?`
export const selectAllRma = `SELECT * FROM returntable`;

export const selectProductByBarcode = `SELECT * FROM product WHERE barcode = ?`;


export const selectCustomerEmailByRMAId = `
    SELECT u.email
    FROM user u
    JOIN "order" o ON u.userID = o.userId
    JOIN orderedProduct op ON o.orderId = op.orderId
    JOIN returnedProduct rp ON op.orderedProductId = rp.orderedProductId
    JOIN returntable r ON rp.RMAId = r.RMAId
    WHERE r.RMAId = ?;
`;

export const selectProductDescriptionsByRMAId = `
    SELECT *
    FROM returnedProduct rp
    JOIN orderedProduct op ON rp.orderedProductId = op.orderedProductId
    JOIN product p ON op.productId = p.productId
    JOIN returntable r ON rp.RMAId = r.RMAId
    WHERE r.RMAId = ?;
`;

export const updateProductStockById = `UPDATE product SET inventoryStock = ? WHERE productId = ?`;


export const updateUserPasswordById = `UPDATE user SET password = ? WHERE userID = ?`;


export const getAllRmaDetails = `SELECT
r.RMAId,
    r.barcode,
    r.statusRma,
    GROUP_CONCAT(p.name) AS productNames,
    GROUP_CONCAT(rp.quantityToReturn) AS quantities,
    SUM(rp.quantityToReturn * product.price) AS totalReturnPrice
FROM
returntable r
JOIN
returnedProduct rp ON r.RMAId = rp.RMAId
JOIN
orderedProduct op ON rp.orderedProductId = op.orderedProductId
JOIN
product p ON op.productId = p.productId
GROUP BY
r.RMAId, r.barcode, r.statusRma`;


export const listOfRMAWithStaffInfo = `
SELECT
    r.RMAId,
    r.barcode,
    r.statusRma,
    rp.returnedProductId,
    rp.orderedProductId,
    rp.quantityToReturn,
    rp.returnedDate,
    rp.description,
    rp.weight,
    rp.statusProduct,
    rp.quantity,
    u.userName AS staffName,
    u.email AS staffEmail
FROM
    returntable r
JOIN
    returnedProduct rp ON r.RMAId = rp.RMAId
JOIN
    orderedProduct op ON rp.orderedProductId = op.orderedProductId
JOIN
    "order" o ON op.orderId = o.orderId
JOIN
    user u ON o.userId = u.userId`;

export const getRMAandDATE = `SELECT DISTINCT RMAId, returnedDate FROM returnedProduct`;

export const getRMACountByMonth = `
    SELECT
        strftime('%Y-%m', returnedDate) AS monthYear,
        COUNT(DISTINCT RMAId) AS RMACount
    FROM
        returnedProduct
    GROUP BY
        monthYear
    ORDER BY
        monthYear;
`;

export const assignRmaToControllerQuery = `UPDATE returntable SET controllerId = ?, lockTimestamp = ? WHERE RMAId = ?`;

export const getRmaDetailsQuery = `SELECT * FROM returntable WHERE RMAId = ?`;