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
        "price": 39.99,
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
    }
];

export const ordersData = [
    {
        "orderId": 1,
        "userId": 1,
        "orderDate": "2023-12-01",
        "totalPrice": 99.99
    },
    {
        "orderId": 2,
        "userId": 1,
        "orderDate": "2023-12-03",
        "totalPrice": 149.50
    },
    {
        "orderId": 3,
        "userId": 1,
        "orderDate": "2023-12-05",
        "totalPrice": 249.75
    }
];

export const orderDetailsData = [
    {
        "orderedProductId": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 2,
        "unitPrice": 5
    },
    {
        "orderedProductId": 2,
        "orderId": 1,
        "productId": 3,
        "quantity": 1,
        "unitPrice": 8
    },
    {
        "orderedProductId": 3,
        "orderId": 1,
        "productId": 2,
        "quantity": 3,
        "unitPrice": 2
    },
    {
        "orderedProductId": 4,
        "orderId": 1,
        "productId": 4,
        "quantity": 1,
        "unitPrice": 4
    }
];

export const rmaData = [
    {
        "RMAId": 1,
        "barcode": "barcode",
        "statusRma": "Returned"
    },
    {
        "RMAId": 2,
        "barcode": "barcode",
        "statusRma": "Returned"
    },
    {
        "RMAId": 3,
        "barcode": "barcode",
        "statusRma": "Returned"
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
    },
    {
        returnedProductId: 3,
        orderedProductId: 2,
        RMAId: 1,
        returnedDate: "2023-01-01",
        description: "Defective item",
        weight: 1.2,
        statusProduct: "Returned",
        quantity: "2"
    },
    {
        returnedProductId: 2,
        orderedProductId: 2,
        RMAId: 2,
        returnedDate: "2023-01-02",
        description: "Defective item",
        weight: 1.4,
        statusProduct: "Returned",
        quantity: "3"
    },
    {
        returnedProductId: 4,
        orderedProductId: 1,
        RMAId: 3,
        returnedDate: "2023-03-02",
        description: "good state item",
        weight: 1.4,
        statusProduct: "Returned",
        quantity: "3"
    }
];

