<script>
    import { selectedProductsStore} from '../../Store.js';
    import ProgressBar from "../../components/ProgressBar.svelte";
    let currentStep = 4;
    let selectedProducts = [];
    let textInputs = {};

    $: selectedProducts = $selectedProductsStore;

    $: if (selectedProducts) {
        textInputs = selectedProducts.reduce((acc, product) => {
            if (!(product.productId in acc)) {
                acc[product.productId] = '';
            }
            return acc;
        }, textInputs);
    }


    async function sendProductDetails(products) {
        try {
            const response = await fetch('http://localhost:3000/rma/returns/return-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(products)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    export function handleSelection(){
        window.open('/printingLabel', '_blank');
        setTimeout(() => {
            window.location.href = '/myOrders';
        }, 100);

    }

    function handleImageChange(event, productId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const customerImage = e.target.result.split(',')[1]; // Extract Base64 data
                // Update the product with its image data
                selectedProducts = selectedProducts.map(product => {
                    if (product.productId === productId) {
                        return { ...product, customerImage  };
                    }
                    return product;
                });
            };
            reader.readAsDataURL(file);
        }
    }


    function prepareAndSendProductDetails() {
        const productsWithDescriptionsAndImages = selectedProducts.map(product => ({
            ...product,
            description: textInputs[product.productId] || '',
            imageBase64: product.customerImage || '' // Use customerImage field
        }));


        sendProductDetails(productsWithDescriptionsAndImages);
        handleSelection();
        clearStore();
    }



    function clearStore() {
        selectedProductsStore.set([]);
    }


</script>

<ProgressBar {currentStep} />

<div class="rma-container">
    <h1>Return Request Details</h1>
    <div class="form-container">
        <h2>Return Request ID: </h2>
        <h2>Order ID: </h2>
    </div>
    <div class="table-of-products">
        <table>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity to Return</th>
                <th>Price</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {#each selectedProducts as product (product.productId)}
                <tr>
                    <td>{product.name}</td>
                    <td>{product.quantityToReturn}</td>
                    <td>{product.price}</td>
                    <td>
                        <input type="text" bind:value={textInputs[product.productId]} />
                    </td>
                    <td>
                        <input type="file" accept="image/*" on:change={event => handleImageChange(event, product.productId)} />
                        {#if product.imageData}
                            <img src={product.imageData} alt="Uploaded Image" style="max-width: 100px;"/>
                        {/if}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

    <div id="buttons">
        <button on:click={prepareAndSendProductDetails} class="create-request-btn">Create Request</button>

        <a href="/myOrders">
            <button class="create-request-btn" id="cancel-btn">Cancel Request</button>
        </a>
    </div>
    <h5>Verify the items you want to return and enter a reason for the return. Once finished, click 'Create Request'</h5>
    <h5>** On 'Create Request' the order can no longer be cancelled</h5>
</div>

<h1>Return Information</h1>
<p>All returns must be shipped back in their original box, if the packaging was destroyed the customer must use suitable packaging otherwise they may not be refunded.</p>
<p>Games/DVDs can only be returned if the seal has not been broken. If the seal is broken the customer will not be refunded.</p>
<p>All returns will be inspected to confirm no damage to the items, if the items are damaged by fault of the customer, they may not be refunded.</p>

<style>
    .rma-container {
        max-width: 70%;
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

    .product-entry input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
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
        width: 200%;
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
    table{
        width: 100%;
    }
</style>
