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
                quantityToReturn: value.quantityToReturn
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
            await updateReturnedProductQuantitiesInDB(productInfo.name, productInfo.quantityToReturn);
        });
    }

    async function updateReturnedProductQuantitiesInDB(productName, newQuantity) {
        console.log(productName+newQuantity)
        const url = `http://localhost:3000/rma/update-returned-product-quantity`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productName, quantityToReturn: newQuantity, RMAId })
        });

        if (!response.ok) {
            throw new Error(`Failed to update returned product quantity for ${productName}`);
        }
    }

    async function displayQRCode() {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/barcode/generateBarcode/rmaId/${RMAId}`);
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
                    console.log(matchingReturnRequest)
                    return {
                        name: product.name,
                        quantityToReturn: matchingReturnRequest ? matchingReturnRequest.quantityToReturn : 0,
                        orderedProductId: product.orderedProductId // If you need to use this later
                    };
                })
                $: if (products.length > 0 && selectedProducts.size === 0) {
                    products.forEach(product => {
                        selectedProducts.set(product.name, { action: null, quantityToReturn: 0, maxQuantity: product.quantityToReturn });
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
            acc[product.name] = selectedProducts.get(product.name)?.quantityToReturn || 0;
            return acc;
        }, {});
    }

    const handleQuantityChange = (productName, newQuantity) => {
        const productInfo = selectedProducts.get(productName) || { action: null, quantityToReturn: 0 };
        const maxQuantity = products.find(product => product.name === productName).quantityToReturn;
        const clampedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

        selectedProducts.set(productName, { ...productInfo, quantityToReturn: clampedQuantity });
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
                <input type="number" min="0" max={product.quantityToReturn}
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
            <p>DESCRIPTION: {returnDescription}</p>
            <div class="actions">
<!--                <button-->
<!--                        class="action-btn"-->
<!--                        class:selected={selectedAction === 'refund'}-->
<!--                        on:click={() => selectAction('refund')}>-->
<!--                    REFUND CUSTOMER, SEND TO STOCK-->
<!--                </button>-->
<!--                <button-->
<!--                        class="action-btn"-->
<!--                        class:selected={selectedAction === 'damage'}-->
<!--                        on:click={() => selectAction('damage')}>-->
<!--                    PRODUCT DAMAGED, NOTIFY CUSTOMER-->
<!--                </button>-->
            </div>
            <button class="confirm-btn" on:click={handleConfirm}>CONFIRM</button>
        </div>
    </div>
</div>

<style>
    :root {
        --primary-color: #0056b3;
        --secondary-color: #ff9500;
        --success-color: #4CAF50;
        --error-color: #FF3B30;
        --background-color: #f4f4f4;
        --text-color: #333;
        --border-color: #ccc;
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
    }

    .request-card {
        max-width: 90%;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-size: 1rem; /* Default font size */
        display: flex;
        flex-direction: column;
        overflow: hidden; /* i make sure nothing spills out */
    }

    /* Header Styles */
    .request-header {
        font-size: 1.5rem; /* Larger font for headers */
        font-weight: bold;
        margin-bottom: 2rem;
        text-align: center;
    }

    /* Details Section */
    .details-section {
        display: flex;
        flex-wrap: wrap; /* Wrap the child elements on smaller screens */
        gap: 2rem; /* Spacing between sections */
    }

    .details, .status-section {
        flex: 1 1 50%; /* Take up half of the container, but also can shrink and grow */
        min-width: 300px; /* Minimum width before wrapping */
    }

    /* Button Styles */
    .action-btn, .confirm-btn {
        padding: 1rem 1.5rem;
        border: none;
        border-radius: 0.3rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
        margin-bottom: 1rem; /* Space between buttons */
    }

    .action-btn {
        background-color: var(--secondary-color);
        color: white;
    }

    .action-btn.selected {
        background-color: var(--primary-color);
        transform: scale(1.02);
    }

    .confirm-btn {
        background-color: var(--success-color);
        color: white;
    }

    /* Input and Label Styles */
    .product-header, .product-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* Four equal columns */
        gap: 1rem; /* Space between grid items */
        align-items: center;
        padding: 1rem 0; /* Padding on top and bottom */
    }

    .product-header {
        background-color: #e7e7e7; /* Distinguish headers with a different color */
        font-weight: bold;
    }

    .product-row {
        border-bottom: 1px solid var(--border-color);
    }

    .product-row span, .product-row input, .product-row label {
        text-align: center;
    }

    /* QR Code Styles */
    .qr-code-section {
        text-align: center; /* Center the QR code */
        padding: 1rem;
        margin-top: 2rem; /* Add some space above the QR code */
    }

    #qrCodeContainer {
        max-width: 200px; /* Set a maximum width for the QR code */
        max-height: 200px; /* Set a maximum height for the QR code */
        margin: 0 auto; /* Center the QR code in the container */
        overflow: hidden;
    }

    /* Adjust QR code size on smaller screens */
    @media (max-width: 768px) {
        #qrCodeContainer {
            max-width: 150px; /* Smaller QR code on medium screens */
            max-height: 150px;
        }
    }

    @media (max-width: 480px) {
        #qrCodeContainer {
            max-width: 100px; /* Even smaller QR code on small screens */
            max-height: 100px;
        }
    }

    /* Media Queries for Responsiveness */
    @media (max-width: 768px) {
        .details, .status-section {
            flex-basis: 100%;
        }

        .request-header {
            font-size: 1.25rem; /* Slightly smaller font for headers */
        }
    }

    @media (max-width: 480px) {
        .action-btn, .confirm-btn {
            padding: 0.75rem; /* Smaller padding for smaller screens */
        }
    }
</style>