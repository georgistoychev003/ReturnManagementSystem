<script>
    import ReturnDetails from "./ReturnDetails.svelte";
    import { onMount } from "svelte";
    let selectedProduct = null;
    let products = [];
    let user = {};
    let rmaId;
    export let params; // This is set by the parent component or the router

    onMount(() => {
        if (params && params.rmaId) {
            rmaId = params.rmaId;
            fetchRMAProducts(rmaId);
            fetchRMAUser(rmaId);
        } else {
            console.error('RMA ID not provided in the URL params.');
        }
    });

    async function fetchRMAProducts(rmaId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${rmaId}/products`);
            if (response.ok) {
                let data = await response.json();
                products = data.map(product => ({
                    productId: product.returnedProductId,
                    type: product.type,
                    price: product.price,
                    quantity: product.quantityToReturn,
                    productImage: product.imageURL,
                    date: product.returnedDate,
                    rmaId: rmaId
                }));
            } else {
                console.error(`Failed to fetch products for RMA ID: ${rmaId}`);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function fetchRMAUser(rmaId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${rmaId}/customer`);
            if (response.ok) {
                user = await response.json();
            } else {
                console.error(`Failed to fetch user for RMA ID: ${rmaId}`);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid date' : date.toLocaleDateString();
    }
</script>

{#if selectedProduct}
    <ReturnDetails {selectedProduct} on:close={() => (selectedProduct = null)} />
{:else}
    <div class="return-container">
        <div class="return-header">
            <h2>Return Request for {user.userName}</h2>
            {#if products.length > 0 && products[0].date}
                <span>Date: {formatDate(products[0].date)}</span>
            {/if}
        </div>
        {#each products as product}
            <div class="product-card" on:click={() => (selectedProduct = product)}>
                <img class="product-image" src={product.productImage} alt={`Product ${product.productId}`} />
                <div class="product-info">
                    <h3>{product.type}</h3>
                    <p>Product ID: {product.productId}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                </div>
            </div>
        {/each}
        <div class="comments-section">
            <p>Comments: {user.comments}</p>
        </div>
    </div>
{/if}

<style>
    .return-container {
        max-width: 700px;
        margin: 2em auto;
        padding: 2em;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .return-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2em;
    }

    h2 {
        color: #333333;
        font-size: 1.5em;
    }

    .product-card {
        display: flex;
        align-items: center;
        margin-bottom: 1em;
        padding: 1em;
        border: 1px solid #eeeeee;
        border-radius: 8px;
        transition: transform 0.2s ease-in-out;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .product-image {
        width: 100px;
        height: 100px;
        margin-right: 1em;
        border-radius: 8px;
        object-fit: cover;
    }

    .product-info h3 {
        color: #007bff;
        margin: 0 0 0.5em 0;
        font-size: 1.2em;
    }

    .product-info p {
        margin: 0;
        color: #666666;
    }

    .comments-section {
        margin: 1em 0;
        text-align: left;
    }
</style>
