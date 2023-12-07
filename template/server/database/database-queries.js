
export const createProductTable = `CREATE TABLE IF NOT EXISTS product(
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    price DOUBLE NOT NULL, 
    description TEXT NOT NULL,
    imageURL TEXT NOT NULL,
    productWeight DOUBLE NOT NULL,
    inventoryStock INT NOT NULL
    
`

export const createUserTable = `CREATE TABLE IF NOT EXISTS user(
    userID SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    userRole TEXT NOT NULL,
    isAdmin BOOLEAN NOT NULL
    )`

export const createOrderTable = `CREATE TABLE IF NOT EXISTS order
    orderId SERIAL PRIMARY KEY
    userId INT,
    orderDate DATE,
    totalPrice DOUBLE
    )`

export const createOrderDetailsTable = `CREATE TABLE IF NOT EXISTS orderDetail(
    orderDetailId INT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
--     unitPrice DOUBLE NOT NULL
--     ^^ Not needed as price is in  product and total price in order. 
--     Or is this value the combined value for the quantity?
                                        )`