<script>
    import ReturnDetails from "./ReturnDetails.svelte";
    let selectedProduct = null;

    let user = {
        name: 'Michel Bravo',
        comments: 'My items are in perfectly working state and shape. I hope my refund will be processed soon',
    };

    let returns = [
        {
            productId: '12',
            quantity: 2,
            price: 19.99,
            date: '2024-01-01',
            productImage: 'https://imgs.search.brave.com/4RYd4IYiG7_5kosmmEdxPSWYMifrKS79FjdMcpdsBCE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxSll1MDYrRTNM/LmpwZw',
            type: 'Electronics',
        },
        {
            productId: '8',
            quantity: 1,
            price: 89.99,
            date: '2024-01-01',
            productImage: 'https://imgs.search.brave.com/tfCqGefF_xetZESOOBIjRJlm358SRqlNxevCDCUDAss/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdG9y/ZS5zdG9yZWltYWdl/cy5jZG4tYXBwbGUu/Y29tLzQ5ODIvYXMt/aW1hZ2VzLmFwcGxl/LmNvbS9pcy9NVDVO/M3JlZj93aWQ9NTMy/JmhlaT01ODImZm10/PXBuZy1hbHBoYSYu/dj0xNjkyODk5NDIx/MzI3.jpeg',
            type: 'Accessory',
        },
    ];
</script>

{#if selectedProduct}
    <ReturnDetails {selectedProduct} on:close={() => (selectedProduct = null)} />
{:else}
    <div class="return-container">
        <div class="return-header">
            <h2>Return Request for {user.name}</h2>
            <span>Date: {new Date(returns[0].date).toLocaleDateString()}</span>
        </div>
        {#each returns as product}
            <div class="product-card" on:click={() => selectedProduct = product}>
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
