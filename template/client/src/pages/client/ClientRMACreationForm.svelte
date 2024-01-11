<script>
    import { selectedItemsStore } from '../../Store.js';
    import {onDestroy, onMount} from "svelte";

    // Subscribe to changes in the selectedItemsStore
    let selectedItems = [];
    let availableProducts = []; // This will be fetched from the backend
    const unsubscribe = selectedItemsStore.subscribe(value => {
        selectedItems = value;
        console.log(selectedItems);

    });

    // Unsubscribe when the component is destroyed to prevent memory leaks
    onDestroy(() => {
        unsubscribe();
    });

    // Fetch available products on component mount with returnable status
    // onMount(async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/products');
    //         const products = await response.json();
    //         availableProducts = products.map(product => ({
    //             ...product,
    //             isReturnable: checkReturnEligibility(product)
    //         }));
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // });
    //
    let selectedProducts = [];
    let comment = '';

    const updateQuantity = (product, quantity) => {
        product.quantity = parseInt(quantity);
        selectedProducts = availableProducts.filter(p => p.quantity > 0);
    };


    let counter = 10001;

    function generateId() {
        return (counter++).toString();
    }
    const checkReturnEligibility = (product) => {
        const purchaseDateLimit = new Date();
        purchaseDateLimit.setDate(purchaseDateLimit.getDate() - 14);

        return product.type !== 'food' &&
            (product.type !== 'video games' || product.isSealed) &&
            new Date(product.orderDate) >= purchaseDateLimit;
    };

    const createRMARequest = async () => {
        const dataToSend = selectedItems.map(item => ({
            returnedProductId: generateId(),
            orderedProductId: item.orderedProductId,
            RMAId: generateId(),
            productName: item.productName,
            quantity: item.quantity,
            date: new Date().toISOString(),
            description: 'Your Description Here'
        }));

        console.log(dataToSend);

        try {
            const response = await fetch('http://localhost:3000/returns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //here we will need the bearer authorization header when the jwt is done
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error(`Failed to create RMA request: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('RMA request created', result);
            // Handle success, maybe clear the form or redirect, we have to discuss with client how he wants us to handle this
        } catch (error) {
            console.error('Error creating RMA request:', error);
            throw error;
        }
    };
</script>

<div class="rma-container">
    <h1>Create a RMA Request</h1>
    <div class="form-container">
        <h2>Return Request ID: </h2>
        <h2>Order ID: </h2>


        <div class="selected-products">
            <h2>Selected Products</h2>
            <table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <!-- Add more columns as needed -->
                </tr>
                </thead>
                <tbody>
                {#each selectedItems as item}
                    <tr>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <!-- Render other item details in respective columns -->
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
        </div>

    <div class="comment-section">
        <textarea bind:value={comment} rows="4" placeholder="Add any relevant information here..."></textarea>
    </div>
    <a href="/myReturns">
    <button on:click={createRMARequest} class="create-request-btn">Create Request</button>
    </a>
    <a href="orderDetails/1">
    <button class="create-request-btn" id="cancel-btn">Cancel Request</button>
    </a>
</div>

<style>
    .rma-container {
        max-width: 800px;
        margin: 40px auto;
        padding: 20px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .form-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 20px;
    }

    .select-products {
        display: grid;
        gap: 15px;
    }

    .product-entry input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .selected-products, .comment-section {
        width: 100%;
        background-color: #f7f7f7;
        padding: 15px;
        border-radius: 8px;
    }

    .selected-products h2, .comment-section textarea {
        margin-bottom: 15px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        background-color: #fff;
        margin-bottom: 5px;
        padding: 10px;
        border-radius: 4px;
    }

    .comment-section textarea {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        height: 120px;
        resize: none;
    }

    .create-request-btn {
        width: 100%;
        padding: 15px 0;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
    }
    #cancel-btn {
        background-color: #cccccc;
        color: #333333;
    }

    .create-request-btn:hover {
        background-color: #0056b3;
        box-shadow: 0 8px 15px rgba(0, 123, 255, 0.3);
        transform: translateY(-2px);
    }
</style>
