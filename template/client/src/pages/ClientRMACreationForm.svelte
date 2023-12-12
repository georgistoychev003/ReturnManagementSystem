<script>

    //this again we need to update with actual contents from the back end once it is setup
    let availableProducts = [
        { name: 'Product 1', quantity: 0 },
        { name: 'Product 2', quantity: 0 },
        { name: 'Product 3', quantity: 0 },
        { name: 'Product 4', quantity: 0 }
    ];

    let selectedProducts = [];
    let comment = '';

    const updateQuantity = (product, quantity) => {
        product.quantity = quantity;
        selectedProducts = availableProducts.filter(p => p.quantity > 0);
    };

    const createRMARequest = () => {
        if (selectedProducts.length === 0) {
            console.error('Please select at least one product.');
            return;
        }
        console.log('Creating RMA request:', { selectedProducts, comment });
        // Submit to backend here
    };
</script>

<div class="rma-container">
    <h1>Create a RMA Request</h1>
    <div class="form-container">
        <div class="select-products">
            {#each availableProducts as product, index}
                <div class="product-entry">
                    <input type="number" placeholder={product.name} min="0" bind:value={product.quantity} on:input={() => updateQuantity(product, product.quantity)}>
                </div>
            {/each}
        </div>
        <div class="selected-products">
            <h2>Selected Products</h2>
            <ul>
                {#each selectedProducts as product}
                    <li>{product.quantity} x {product.name}</li>
                {/each}
            </ul>
        </div>
        <div class="comment-section">
            <textarea bind:value={comment} rows="4" placeholder="Add any relevant information here..."></textarea>
        </div>
    </div>
    <button on:click={createRMARequest} class="create-request-btn">Create Request</button>
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

    .create-request-btn:hover {
        background-color: #0056b3;
        box-shadow: 0 8px 15px rgba(0, 123, 255, 0.3);
        transform: translateY(-2px);
    }
</style>
