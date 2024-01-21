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
    "imageURL": "https://example.com/image1.jpg",
    "productWeight": 0.2,
    "inventoryStock": 50
    },
    {
        "productId": 2,
        "type": "Clothing",
        "price": 40,
        "name": "T-shirt",
        "imageURL": "https://example.com/image2.jpg",
        "productWeight": 0.3,
        "inventoryStock": 100
    },
    {
        "productId": 3,
        "type": "Home & Kitchen",
        "price": 149.99,
        "name": "Coffee Machine",
        "imageURL": "https://example.com/image3.jpg",
        "productWeight": 2.5,
        "inventoryStock": 20
    },
    {
        "productId": 4,
        "type": "Food",
        "price": 24.99,
        "name": "Frikandelbroodje",
        "imageURL": "https://example.com/image4.jpg",
        "productWeight": 0.8,
        "inventoryStock": 30
    },
    {
        "productId": 5,
        "type": "Electronics",
        "price": 35,
        "name": "Keyboard",
        "imageURL": "https://example.com/image4.jpg",
        "productWeight": 1,
        "inventoryStock": 20
    },
    {
        "productId": 6,
        "type": "Game",
        "price": 80,
        "name": "Call of Duty",
        "imageURL": "https://example.com/image4.jpg",
        "productWeight": 1,
        "inventoryStock": 10
    }
];

export const ordersData = [
    {
        "orderId": 1,
        "userId": 1,
        "orderDate": "2023-12-01",
        "totalPrice": 209.99
    },
    {
        "orderId": 2,
        "userId": 1,
        "orderDate": "2023-12-03",
        "totalPrice": 80
    },
    {
        "orderId": 3,
        "userId": 1,
        "orderDate": "2023-12-05",
        "totalPrice": 944.98
    }
];

export const orderDetailsData = [
    {
        "orderedProductId": 1,
        "orderId": 1,
        "productId": 2,
        "quantity": 2,
        "unitPrice": 5,
        "priceAtTimeOfSale": 40
    },
    {
        "orderedProductId": 2,
        "orderId": 1,
        "productId": 4,
        "quantity": 1,
        "unitPrice": 8,
        "priceAtTimeOfSale": 24.99
    },
    {
        "orderedProductId": 3,
        "orderId": 1,
        "productId": 5,
        "quantity": 3,
        "unitPrice": 2,
        "priceAtTimeOfSale": 35
    },

    {
        "orderedProductId": 4,
        "orderId": 2,
        "productId": 6,
        "quantity": 1,
        "unitPrice": 5,
        "priceAtTimeOfSale": 80
    },
    {
        "orderedProductId": 5,
        "orderId": 3,
        "productId": 1,
        "quantity": 2,
        "unitPrice": 8,
        "priceAtTimeOfSale": 599.99
    },
    {
        "orderedProductId": 6,
        "orderId": 3,
        "productId": 6,
        "quantity": 2,
        "unitPrice": 2,
        "priceAtTimeOfSale": 80,
    },
    {
        "orderedProductId": 7,
        "orderId": 3,
        "productId": 2,
        "quantity": 2,
        "unitPrice": 2,
        "priceAtTimeOfSale": 80,
    },
    {
        "orderedProductId": 7,
        "orderId": 3,
        "productId": 4,
        "quantity": 2,
        "unitPrice": 2,
        "priceAtTimeOfSale": 24.99,
    }
];

export const rmaData = [
    {
        "RMAId": 1,
        "barcode": "barcode",
        "statusRma": "Returned",
        "credit": 80
    }

];

export const returnedProduct = [
    {
        returnedProductId: 1,
        orderedProductId: 1,
        RMAId: 1,
        returnedDate: "2023-01-01",
        description: "Defective item",
        weight: 1.2,
        statusProduct: "Returned",
        quantity: "2"
    }
];

