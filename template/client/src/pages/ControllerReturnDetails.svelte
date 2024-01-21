<script>
    import {onMount} from "svelte";
    import page from 'page';

    let RMAId;

    let selectedAction = null;

    let products =[];

    let returnRequests = [];

    let selectedProducts = new Map();

    let email = '';

    let returnedDate = '';

    let returnDescription = '';

    const selectAction = (action) => {
        selectedAction = action;
    };

    function getRMAIdFromUrl() {
        const path = window.location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 1];
    }

    $: {
        RMAId = getRMAIdFromUrl();
    }

    onMount(async () => {
        await fetchReturnRequests();
        await displayQRCode();
    });

    async function handleConfirm() {
        // Preparing payload for refund or damaged
        console.log(selectedProducts.entries())
        const productsForAction = Array.from(selectedProducts.entries())
            .filter(([_, value]) => value.action === 'refund' || value.action === 'damaged')
            .map(([productName, value]) => ({
                name: productName,
                action: value.action,
                quantity: value.quantity
            }));

        // Check if there are any products selected
        if (productsForAction.length === 0) {
            alert("No products selected.");
            return;
        }

        // Separate payloads for refund and damaged
        const refundPayload = productsForAction.filter(product => product.action === 'refund');
        const damagedPayload = productsForAction.filter(product => product.action === 'damaged');

        // Process refund if any
        if (refundPayload.length > 0) {
            try {
                await sendActionRequest('refund', refundPayload);
                updateProductQuantities(refundPayload);
                alert("Refund processed successfully.");
            } catch (error) {
                console.error('Error processing refund:', error);
            }
        }

        // Process damaged if any
        if (damagedPayload.length > 0) {
            try {
                await sendActionRequest('damaged', damagedPayload);
                updateProductQuantities(damagedPayload);
                alert("Damaged items processed successfully.");
            } catch (error) {
                console.error('Error processing damaged items:', error);
            }
        }

        // Redirect to the controller page
        page(`/controller`);
    }

    // Helper function to send action request
    async function sendActionRequest(actionType, payload) {
        const url = `http://localhost:3000/users/${actionType}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, products: payload })
        });

        if (!response.ok) {
            throw new Error(`Failed to process ${actionType}`);
        }
        return await response.json();
    }

    function updateProductQuantities(processedProducts) {
        processedProducts.forEach(async productInfo => {
            await updateReturnedProductQuantitiesInDB(productInfo.name, productInfo.quantity);
        });
    }

    async function updateReturnedProductQuantitiesInDB(productName, newQuantity) {
        console.log(productName+newQuantity)
        const url = `http://localhost:3000/rma/update-returned-product-quantity`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productName, quantity: newQuantity, RMAId })
        });

        if (!response.ok) {
            throw new Error(`Failed to update returned product quantity for ${productName}`);
        }
    }

    async function displayQRCode() {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/barcode/generateBarcode/${token}/${RMAId}`);
        if (response.ok) {
            const qrCodeSVG = await response.text();
            document.getElementById('qrCodeContainer').innerHTML = qrCodeSVG;
        } else {
            console.error('Failed to fetch QR code');
        }

    }


    const handleRadioChange = (productName, action) => {
        const currentInfo = selectedProducts.get(productName) || {};
        selectedProducts.set(productName, { ...currentInfo, action: action });
    };


    async function fetchReturnRequests() {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}`);
            if (response.ok) {
                returnRequests = await response.json();
                if (returnRequests.length > 0) {
                    returnedDate = returnRequests[0].returnedDate;
                    returnDescription = returnRequests[0].description;
                }
                const status = await fetchStatusOfRMA(RMAId);
                const customer = await fetchCustomerOfRMA(RMAId);
                const productsResponse = await fetchProductsOfRMA(RMAId);
                console.log(productsResponse)
                products = productsResponse.map(product => {
                    const matchingReturnRequest = returnRequests.find(req => req.orderedProductId === product.orderedProductId);
                    return {
                        name: product.name,
                        quantity: matchingReturnRequest ? matchingReturnRequest.quantity : 0,
                        orderedProductId: product.orderedProductId // If you need to use this later
                    };
                }).filter(product => product.quantity > 0);
                $: if (products.length > 0 && selectedProducts.size === 0) {
                    products.forEach(product => {
                        selectedProducts.set(product.name, { action: null, quantity: 0, maxQuantity: product.quantity });
                    });
                }
                returnRequests.customer = customer;
                email=customer;
                returnRequests.status = status
                console.log(products)
            } else {
                console.error('Failed to fetch return requests');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    let productQuantities = {};

    $: {
        productQuantities = products.reduce((acc, product) => {
            acc[product.name] = selectedProducts.get(product.name)?.quantity || 0;
            return acc;
        }, {});
    }

    const handleQuantityChange = (productName, newQuantity) => {
        const productInfo = selectedProducts.get(productName) || { action: null, quantity: 0 };
        const maxQuantity = products.find(product => product.name === productName).quantity;
        const clampedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

        selectedProducts.set(productName, { ...productInfo, quantity: clampedQuantity });
        productQuantities[productName] = clampedQuantity; // Ensure this updates the reactive variable
    };





    async function fetchStatusOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/status`);
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data.statusRma;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }

    async function fetchCustomerOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/customer`);
            if (response.ok) {
                const data = await response.json();
                return data.email;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }
    async function fetchProductsOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/products`);
            if (response.ok) {
                const data = await response.json();
                products = data.map(product => ({name: product.name}));
                return data;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }
</script>



<div class="request-card">
    <div class="request-header">
        REQUEST {RMAId}
    </div>
    <div class="details-section">
        <div class="details">
            <h2>DETAILS:</h2>
            <div class="product-header">
                <span>Product</span>
                <span>Quantity</span>
                <span>Refund</span>
                <span>Damaged</span>
            </div>
            {#each products as product}
                <div class="product-row">
                    <span>{product.name}</span>
                    <span>
                <input type="number" min="0" max={product.quantity}
                       value={productQuantities[product.name] || 0}
                       on:input={(e) => handleQuantityChange(product.name, +e.target.value)} />


            </span>
                    <span>
                    <input type="radio" id={`refund-${product.name}`} name={`action-${product.name}`}
                           on:change={() => handleRadioChange(product.name, 'refund')} />
                    <label for={`refund-${product.name}`}>Refund</label>
                </span>
                    <span>
                    <input type="radio" id={`damaged-${product.name}`} name={`action-${product.name}`}
                           on:change={() => handleRadioChange(product.name, 'damaged')} />
                    <label for={`damaged-${product.name}`}>Damaged</label>
                </span>
                </div>
            {/each}
            <p>DATE: {returnedDate}</p>
            <p>CUSTOMER NAME: {returnRequests.customer}</p>
<!--            <p>COMMENTS: XXXXXXXX XXXXXXXXX</p>-->
            <div class="qr-code-section">
                <div id="qrCodeContainer"></div>
            </div>
        </div>
        <div class="status-section">
            <p>STATUS: {returnRequests.status}</p>
            <div class="image-placeholder"></div>
            <p>DESCRIPTION: {returnedDate}</p>
            <div class="actions">
                <button
                        class="action-btn"
                        class:selected={selectedAction === 'refund'}
                        on:click={() => selectAction('refund')}>
                    REFUND CUSTOMER, SEND TO STOCK
                </button>
                <button
                        class="action-btn"
                        class:selected={selectedAction === 'damage'}
                        on:click={() => selectAction('damage')}>
                    PRODUCT DAMAGED, NOTIFY CUSTOMER
                </button>
            </div>
            <button class="confirm-btn" on:click={handleConfirm}>CONFIRM</button>
        </div>
    </div>
</div>

<style>
    .request-card {
        display: flex;
        flex-direction: column;
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
    }
    .confirm-btn {
        /* Adjust padding and margins as needed */
        padding: 0.5rem 1rem;
        margin-top: 1rem; /* Space between buttons and the rest of the form */
        width: auto; /* Adjust width as needed */
    }
    .request-header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .details-section {
        display: flex;
    }
    .details {
        flex: 1;
    }
    .status-section {
        flex: 1;
        padding-left: 20px;
        border-left: 1px solid #ccc;
    }
    .image-placeholder {
        width: 100px;
        height: 100px;
        background-color: #eee;
        margin: 10px 0;
    }
    .label img {
        width: 100%;
    }
    .actions {
        display: flex;
        flex-direction: column;
    }
    .action-btn {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }
    .action-btn.selected {
        background-color: #007BFF;
        color: white;
        transform: scale(1.05);
    }
    .confirm-btn {
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }
    .product-header, .product-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        align-items: center;
    }
    .product-header {
        background-color: #f0f0f0; /* A light grey header to distinguish it */
        font-weight: bold;
    }
    .product-row {
        border-bottom: 1px solid #ccc; /* Separate product rows */
    }
    .product-row span {
        flex: 1; /* Distribute space equally */
        text-align: center; /* Align text in the center */
    }
    .qr-code-section {
        text-align: right; /* Center align the QR code */
        padding: 10px;
    }
    #qrCodeContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 250px;
        height: 250px;
        text-align: right;
    }
</style>