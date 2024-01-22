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
        "price": 39.99,
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
        "orderDate": "2024-22-03",
        "totalPrice": 80
    },
    {
        "orderId": 3,
        "userId": 1,
        "orderDate": "2024-22-05",
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
        "orderedProductId": 8,
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
        quantityToReturn: "2"
    }
];

