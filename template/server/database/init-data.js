export const usersData =[
    {
        userId: 1,
        userName : "Pablo",
        email: "customer@email.com",
        password: "password",
        userRole: "customer",
    },
    {
        userId: 2,
        userName : "Georgi",
        email: "collector@email.com",
        password: "password",
        userRole: "collector",
    },
    {
        userId: 3,
        userName: "Desmond",
        email: "controller@email.com",
        password: "password",
        userRole: "controller",
    },
    {
        userId: 4,
        userName : "Badr",
        email: "admin@email.com",
        password: "admin",
        userRole: "admin",
    },
    {
        userId: 5,
        userName: "TestAccount",
        email: "mitkopetrovich2021@gmail.com",
        password: "password",
        userRole: "customer",
    }
];

export const productsData = [
    {
    "productId": 1,
    "type": "Electronics",
    "price": 599.99,
    "name": "Smartphone",
    "imageURL": "https://c8.alamy.com/comp/DH80YG/iphone-5-smartphone-DH80YG.jpg",
    "productWeight": 0.2,
    "inventoryStock": 50
    },
    {
        "productId": 2,
        "type": "Clothing",
        "price": 40,
        "name": "T-shirt",
        "imageURL": "https://media.idkids.fr/media/productstorage/images/okaidi/0702494/thumbs/0474699_500.jpg",
        "productWeight": 0.3,
        "inventoryStock": 100
    },
    {
        "productId": 3,
        "type": "Home & Kitchen",
        "price": 149.99,
        "name": "Coffee Machine",
        "imageURL": "https://www.ariete.net/media/images/product/main/1312-350e46c5447ef57cad7c33a460f37d2c.jpg",
        "productWeight": 2.5,
        "inventoryStock": 20
    },
    {
        "productId": 4,
        "type": "Food",
        "price": 24.99,
        "name": "Frikandelbroodje",
        "imageURL": "https://lekkerland.blob.core.windows.net/images/dejongkatwijk/product/frikandelbroodje_22b9cb_lg.jpg?v=a89615144377c6620a617b67950baa05",
        "productWeight": 0.8,
        "inventoryStock": 30
    },
    {
        "productId": 5,
        "type": "Electronics",
        "price": 35,
        "name": "Keyboard",
        "imageURL": "https://imgs.search.brave.com/fir_6Ow1ZPL2GBjMsUxYy8rXFxLXsY3sRL5WNOjInsU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZS5sb2dpdGVj/aGcuY29tL3dfMzg2/LGFyXzEuMCxjX2xp/bWl0LGZfYXV0byxx/X2F1dG8sZHByXzIu/MC9kX3RyYW5zcGFy/ZW50LmdpZi9jb250/ZW50L2RhbS9nYW1p/bmcvZW4vcHJvZHVj/dHMvcHJvLWtleWJv/YXJkL3Byby1rZXli/b2FyZC1nYWxsZXJ5/L3VrLXByby1nYW1p/bmcta2V5Ym9hcmQt/Z2FsbGVyeS10b3Bk/b3duLnBuZz92PTE",
        "productWeight": 1,
        "inventoryStock": 20
    },
    {
        "productId": 6,
        "type": "Game",
        "price": 80,
        "name": "Call of Duty",
        "imageURL": "https://imgs.search.brave.com/7Y8ZhlmEigbROMyJI8I_gLmUry-hdl5B43dJjODpdYA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDU4/Njc2MDM3L3Bob3Rv/L2NhbGwtb2YtZHV0/eS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Q0xnT0E1WTNw/a2ZobnFQOWdfN3Np/cHBDQ1BKQ1M4R0NQ/djBSUTRpVU9kND0",
        "productWeight": 1,
        "inventoryStock": 10
    }
];

export const ordersData = [
    {
        "orderId": 1,
        "userId": 1,
        "orderDate": "2024-01-01",
        "totalPrice": 209.99
    },
    {
        "orderId": 2,
        "userId": 1,
        "orderDate": "2024-01-22",
        "totalPrice": 80
    },
    {
        "orderId": 3,
        "userId": 1,
        "orderDate": "2024-01-22",
        "totalPrice": 944.98
    },
    {
        "orderId": 4,
        "userId": 1,
        "orderDate": "2023-12-22",
        "totalPrice": 944.98
    },
    {'orderId': 101, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 80.00},
    {'orderId': 102, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 24.99},
    {'orderId': 103, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 24.99},
    {'orderId': 104, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 24.99},
    {'orderId': 105, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 240.00},
    {'orderId': 106, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 599.99},
    {'orderId': 107, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 35.00},
    {'orderId': 108, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 35.00},
    {'orderId': 109, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 35.00},
    {'orderId': 110, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 160.00},
    {'orderId': 111, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 70.00},
    {'orderId': 112, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 40.00},
    {'orderId': 113, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 40.00},
    {'orderId': 114, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 80.00},
    {'orderId': 115, 'userId': 5, 'orderDate': '2024-01-20', 'totalPrice': 40.00}

];

export const orderDetailsData = [
    {
        "orderedProductId": 1,
        "orderId": 1,
        "productId": 2,
        "quantity": 2,
        "unitPrice": 40,
        "priceAtTimeOfSale": 40
    },
    {
        "orderedProductId": 2,
        "orderId": 1,
        "productId": 4,
        "quantity": 1,
        "unitPrice": 24.99,
        "priceAtTimeOfSale": 24.99
    },
    {
        "orderedProductId": 3,
        "orderId": 1,
        "productId": 5,
        "quantity": 3,
        "unitPrice": 35,
        "priceAtTimeOfSale": 35
    },

    {
        "orderedProductId": 4,
        "orderId": 2,
        "productId": 6,
        "quantity": 1,
        "unitPrice": 80,
        "priceAtTimeOfSale": 80
    },
    {
        "orderedProductId": 5,
        "orderId": 3,
        "productId": 1,
        "quantity": 2,
        "unitPrice": 599.99,
        "priceAtTimeOfSale": 599.99
    },
    {
        "orderedProductId": 6,
        "orderId": 3,
        "productId": 6,
        "quantity": 2,
        "unitPrice": 80,
        "priceAtTimeOfSale": 80,
    },
    {
        "orderedProductId": 7,
        "orderId": 3,
        "productId": 2,
        "quantity": 2,
        "unitPrice": 40,
        "priceAtTimeOfSale": 80,
    },
    {
        "orderedProductId": 8,
        "orderId": 3,
        "productId": 4,
        "quantity": 2,
        "unitPrice": 24.99,
        "priceAtTimeOfSale": 24.99,
    },
    {"orderedProductId": 10, "orderId": 4, "productId": 2, "quantity": 2, "unitPrice": 40, "priceAtTimeOfSale": 80},
    {"orderedProductId": 11, "orderId": 4, "productId": 6, "quantity": 2, "unitPrice": 80, "priceAtTimeOfSale": 80},
    {"orderedProductId": 12, "orderId": 4, "productId": 1, "quantity": 2, "unitPrice": 599.99, "priceAtTimeOfSale": 599.99},

    {"orderedProductId": 101, "orderId": 101, "productId": 6, "quantity": 1, "unitPrice": 80, "priceAtTimeOfSale": 80.00},
    {"orderedProductId": 105, "orderId": 105, "productId": 2, "quantity": 6, "unitPrice": 40, "priceAtTimeOfSale": 240.00},
    {"orderedProductId": 106, "orderId": 106, "productId": 1, "quantity": 1, "unitPrice": 599.99, "priceAtTimeOfSale": 599.99},
    {"orderedProductId": 107, "orderId": 107, "productId": 5, "quantity": 1, "unitPrice": 35, "priceAtTimeOfSale": 35.00},
    {"orderedProductId": 108, "orderId": 108, "productId": 5, "quantity": 1, "unitPrice": 35, "priceAtTimeOfSale": 35.00},
    {"orderedProductId": 109, "orderId": 109, "productId": 5, "quantity": 1, "unitPrice": 35, "priceAtTimeOfSale": 35.00},
    {"orderedProductId": 110, "orderId": 110, "productId": 2, "quantity": 4, "unitPrice": 40, "priceAtTimeOfSale": 40.00},
    {"orderedProductId": 111, "orderId": 111, "productId": 5, "quantity": 2, "unitPrice": 35, "priceAtTimeOfSale": 35.00},
    {"orderedProductId": 112, "orderId": 112, "productId": 5, "quantity": 1, "unitPrice": 35, "priceAtTimeOfSale": 35.00},
    {"orderedProductId": 113, "orderId": 113, "productId": 2, "quantity": 1, "unitPrice": 40, "priceAtTimeOfSale": 40.00},
    {"orderedProductId": 114, "orderId": 114, "productId": 2, "quantity": 2, "unitPrice": 40, "priceAtTimeOfSale": 40.00},
    {"orderedProductId": 115, "orderId": 115, "productId": 2, "quantity": 1, "unitPrice": 40, "priceAtTimeOfSale": 40.00}
];

export const rmaData = [
    {
        "RMAId": 1,
        "barcode": "barcode",
        "statusRma": "Returned",
        "credit": 80
    },
    {"RMAId": 101, "barcode": "barcode101", "statusRma": "Returned", "credit": 29.02},
    {"RMAId": 102, "barcode": "barcode102", "statusRma": "Returned", "credit": 85.76},
    {"RMAId": 103, "barcode": "barcode103", "statusRma": "Returned", "credit": 91.36},
    {"RMAId": 104, "barcode": "barcode104", "statusRma": "Returned", "credit": 25.47},
    {"RMAId": 105, "barcode": "barcode105", "statusRma": "Returned", "credit": 40.04},
    {"RMAId": 106, "barcode": "barcode106", "statusRma": "Returned", "credit": 90.66},
    {"RMAId": 107, "barcode": "barcode107", "statusRma": "Returned", "credit": 21.46},
    {"RMAId": 108, "barcode": "barcode108", "statusRma": "Returned", "credit": 91.04},
    {"RMAId": 109, "barcode": "barcode109", "statusRma": "Returned", "credit": 36.43},
    {"RMAId": 110, "barcode": "barcode110", "statusRma": "Returned", "credit": 59.34},
    {"RMAId": 111, "barcode": "barcode111", "statusRma": "Returned", "credit": 74.20},
    {"RMAId": 112, "barcode": "barcode112", "statusRma": "Returned", "credit": 69.67},
    {"RMAId": 113, "barcode": "barcode113", "statusRma": "Returned", "credit": 25.46},
    {"RMAId": 114, "barcode": "barcode114", "statusRma": "Returned", "credit": 95.81},
    {"RMAId": 115, "barcode": "barcode115", "statusRma": "Returned", "credit": 24.32}

];

export const returnedProduct = [
    {
        "returnedProductId": 1,
        "orderedProductId": 1,
        "RMAId": 1,
        "returnedDate": "2023-01-01",
        "description": "Defective item",
        "weight": 1.2,
        "statusProduct": "Returned",
        "quantityToReturn": "2"
    },
    {"returnedProductId": 101, "orderedProductId": 101, "RMAId": 2, "returnedDate": "2024-02-02", "description": "Wrong item", "weight": 0.84, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 105, "orderedProductId": 105, "RMAId": 6, "returnedDate": "2024-01-16", "description": "wrong size", "weight": 4.75, "statusProduct": "Returned", "quantityToReturn": 6},
    {"returnedProductId": 106, "orderedProductId": 106, "RMAId": 7, "returnedDate": "2024-01-01", "description": "Defective item", "weight": 1.71, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 107, "orderedProductId": 107, "RMAId": 8, "returnedDate": "2024-01-03", "description": "wrong size", "weight": 4.75, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 108, "orderedProductId": 108, "RMAId": 9, "returnedDate": "2024-01-05", "description": "Defective item", "weight": 3.51, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 109, "orderedProductId": 109, "RMAId": 10, "returnedDate": "2024-01-07", "description": "Defective item", "weight": 3.21, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 110, "orderedProductId": 110, "RMAId": 11, "returnedDate": "2024-01-09", "description": "box was damaged", "weight": 1.48, "statusProduct": "Returned", "quantityToReturn": 4},
    {"returnedProductId": 111, "orderedProductId": 111, "RMAId": 12, "returnedDate": "2024-01-10", "description": "did not like", "weight": 4.97, "statusProduct": "Returned", "quantityToReturn": 2},
    {"returnedProductId": 112, "orderedProductId": 112, "RMAId": 13, "returnedDate": "2024-01-20", "description": "wrong size", "weight": 2.27, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 113, "orderedProductId": 113, "RMAId": 14, "returnedDate": "2024-01-21", "description": "wrong size", "weight": 2.92, "statusProduct": "Returned", "quantityToReturn": 1},
    {"returnedProductId": 114, "orderedProductId": 114, "RMAId": 15, "returnedDate": "2024-01-23", "description": "incorrect product", "weight": 1.57, "statusProduct": "Returned", "quantityToReturn": 2},
    {"returnedProductId": 115, "orderedProductId": 115, "RMAId": 16, "returnedDate": "2024-01-02", "description": "wrong size", "weight": 1.57, "statusProduct": "Returned", "quantityToReturn": 1}
];