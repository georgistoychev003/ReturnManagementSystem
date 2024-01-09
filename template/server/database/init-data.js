export const usersData =[
    {
        userId: 1,
        email: "customer@email.com",
        password: "password",
        userRole: "customer",
    },
    {
        userId: 2,
        email: "collector@email.com",
        password: "password",
        userRole: "collector",
    },
    {
        userId: 3,
        email: "controller@email.com",
        password: "password",
        userRole: "controller",
    },
    {
        userId: 4,
        email: "admin@email.com",
        password: "admin",
        userRole: "admin",
    }
];

export const productsData = [
    {
    "productId": 1,
    "type": "Electronics",
    "price": 599.99,
    "description": "Smartphone with advanced features",
    "imageURL": "https://example.com/image1.jpg",
    "productWeight": 0.2,
    "inventoryStock": 50
},
    {
        "productId": 2,
        "type": "Clothing",
        "price": 39.99,
        "description": "Casual T-shirt for everyday wear",
        "imageURL": "https://example.com/image2.jpg",
        "productWeight": 0.3,
        "inventoryStock": 100
    },
    {
        "productId": 3,
        "type": "Home & Kitchen",
        "price": 149.99,
        "description": "Coffee maker for brewing fresh coffee",
        "imageURL": "https://example.com/image3.jpg",
        "productWeight": 2.5,
        "inventoryStock": 20
    },
    {
        "productId": 4,
        "type": "Books",
        "price": 24.99,
        "description": "Bestseller mystery novel",
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
        "orderDetailId": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 2,
        "unitPrice": 1.2
    },
    {
        "orderDetailId": 2,
        "orderId": 1,
        "productId": 3,
        "quantity": 1,
        "unitPrice": 1.2
    },
    {
        "orderDetailId": 3,
        "orderId": 2,
        "productId": 2,
        "quantity": 3,
        "unitPrice": 1.2
    },
    {
        "orderDetailId": 4,
        "orderId": 3,
        "productId": 4,
        "quantity": 1,
        "unitPrice": 1.2
    }
];

export const rmaData = [
    {
        "RMAId": 1,
        "barcode": "barcode",
        "statusRma": "Returned"
    },
];

export const returnedProduct = [
    {
        returnedProductId: 1,
        orderedProductId: 1,
        RMAId: 1,
        returnedDate: "2023-01-01",
        description: "Defective item",
        weight: 1.2,
        statusProduct: "Returned"
    },
];

