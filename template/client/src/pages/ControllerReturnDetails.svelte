<script>
    import {onMount} from "svelte";
    import page from 'page';

    let RMAId;


    let products =[];

    let returnRequests = [];

    let selectedProducts = new Map();

    let email = '';

    let returnedDate = '';

    let returnDescription = '';
    let collectorImageSrc = ''; // This will store the Base64 image data
    let collectorDescription = ''; // This will store the collector's description



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
        await getCollectorImageAndDescription();

    });

    async function handleConfirm() {
        let totalRefundAmount = 0;
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
        console.log(refundPayload)

        for (const product of productsForAction) {
            const productInfo = products.find(p => p.name === product.name);
            if (productInfo) {
                try {
                    const unitPriceResponse = await fetch(`http://localhost:3000/product/${productInfo.orderedProductId}/price`);
                    if (unitPriceResponse.ok) {
                        const unitPriceData = await unitPriceResponse.json();
                        console.log(unitPriceData)
                        totalRefundAmount += unitPriceData.unitPrice * product.quantityToReturn;
                    } else {
                        console.error(`Failed to fetch price for product: ${product.name}`);
                    }
                } catch (error) {
                    console.error(`Error fetching price for product: ${product.name}`, error);
                }
            }
        }

        if (refundPayload.length > 0) {
            const confirmRefund = confirm(`Are you sure you want to refund $${totalRefundAmount.toFixed(2)}?`);
            if (!confirmRefund) {
                return;
            }
        }

        if (damagedPayload.length > 0) {
            const confirmDamaged = confirm(`Are you sure you want to confirm the product as damaged?`);
            if (!confirmDamaged) {
                return;
            }
        }

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

        if (totalRefundAmount > 0) {
            console.log("refund time")
            await updateTotalRefundAmount(RMAId, totalRefundAmount);
        }

        // Redirect to the controller page
        page(`/controller`);
    }

    async function updateTotalRefundAmount(RMAId, amount) {
        const url = `http://localhost:3000/rma/update-total-refund/${RMAId}`;
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalRefundAmount: amount })
        });
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
            const response = await fetch(`http://localhost:3000/rma/rma/${RMAId}`);
            if (response.ok) {
                returnRequests = await response.json();
                console.log(returnRequests)
                if (returnRequests.length > 0) {
                    returnedDate = returnRequests[0].returnedDate;
                    returnDescription = returnRequests[0].description;
                }
                const status = await fetchStatusOfRMA(RMAId);
                const customer = await fetchCustomerOfRMA(RMAId);
                const productsResponse = await fetchProductsOfRMA(RMAId);
                console.log(productsResponse)
                products = productsResponse.map(product => {
                    const correspondingReturnRequest = returnRequests.find(request => request.orderedProductId === product.orderedProductId);
                    console.log(product)
                    const collectorImage = correspondingReturnRequest ? `data:image/png;base64,${correspondingReturnRequest.collectorImage}` : '';
                    const customerImage = correspondingReturnRequest ? `data:image/png;base64,${correspondingReturnRequest.customerImage}` : '';
                    const collectorDescription = correspondingReturnRequest ? correspondingReturnRequest.collectorDescription : 'No description provided from collector.';
                    const customerDescription = correspondingReturnRequest ? correspondingReturnRequest.description : 'No description provided from customer.';

                    return {
                        name: product.name,
                        quantityToReturn: product.quantityToReturn,
                        orderedProductId: product.orderedProductId, // If you need to use this later
                        showDetails: false, // Initial state for showing details
                        collectorImageSrc: collectorImage,
                        collectorDescription: collectorDescription,
                        customerDescription: customerDescription,
                        customerImageSrc:customerImage
                    };
                });
                console.log(products)
                $: if (products.length > 0 && selectedProducts.size === 0) {
                    products.forEach(product => {
                        selectedProducts.set(product.name, { action: null, quantityToReturn: 0, maxQuantity: product.quantityToReturn });
                    });
                }
                returnRequests.customer = customer;
                email=customer;
                returnRequests.status = status
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
                products = data.map(product => ({name: product.name,
                    unitPrice: product.unitPrice}));
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




    async function getCollectorImageAndDescription() {
        try {
            const response = await fetch(`http://localhost:3000/rma/collector/imageAndDescription/${RMAId}`);
            if (response.ok) {
                const data = await response.json();
                collectorImageSrc = 'data:image/png;base64,' + data.collectorImage;
                collectorDescription = data.collectorDescription;
            } else {
                console.error('Failed to fetch collector data.');
            }
        } catch (error) {
            console.error('Error fetching collector data:', error);
        }
    }

    function toggleDetails(index, event) {
        // Check if the clicked element is not an input, label, or button
        if (!['INPUT', 'LABEL', 'BUTTON'].includes(event.target.tagName)) {
            products[index].showDetails = !products[index].showDetails;
            products = products; // Trigger reactivity
        }
    }
    function stopPropagation(event) {
        event.stopPropagation(); // Prevent the event from bubbling up to the parent element
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
            {#each products as product, index}
                <div class="product-row" on:click={() => toggleDetails(index, event)}>
                    <span>{product.name}</span>
                    <span>
            <input type="number" min="0" max={product.quantityToReturn}
                   value={productQuantities[product.name] || 0}
                   on:input={(e) => handleQuantityChange(product.name, +e.target.value)}
                   on:click={stopPropagation} />
        </span>
                    <span>
            <input type="radio" id={`refund-${product.name}`} name={`action-${product.name}`}
                   on:change={() => handleRadioChange(product.name, 'refund')}
                   on:click={stopPropagation} />
            <label for={`refund-${product.name}`} on:click={stopPropagation}>Refund</label>
        </span>
                    <span>
            <input type="radio" id={`damaged-${product.name}`} name={`action-${product.name}`}
                   on:change={() => handleRadioChange(product.name, 'damaged')}
                   on:click={stopPropagation} />
            <label for={`damaged-${product.name}`} on:click={stopPropagation}>Damaged</label>
        </span>
                    <span>
            {#if product.showDetails}
            <div class="details-dropdown">
                <!-- Collector's Section -->
                <div class="collector-section">
                    <h3>Collector's Details</h3>
                    {#if product.collectorImageSrc}
                        <img class="collector-image" src={product.collectorImageSrc} alt="Collector's snapshot" />
                    {/if}
                    <p class="collector-description">{product.collectorDescription || 'No description provided from collector.'}</p>
                </div>
                <!-- Customer's Section -->
                <div class="customer-section">
                    <h3>Customer's Details</h3>
                    {#if product.customerImageSrc}
                        <img class="customer-image" src={product.customerImageSrc} alt="Customer's snapshot" />
                    {/if}
                    <p class="collector-description">{product.customerDescription || 'No description provided from customer.'}</p>
                </div>
            </div>
        {/if}
                </div>
                <br>
<!--                <span>Controller Description: {product.collectorDescription || 'No description'}</span>-->
                <br>
                <br>
            {/each}
            <p>DATE: {returnedDate}</p>
            <p>CUSTOMER NAME: {returnRequests.customer}</p>
<!--            <p>COMMENTS: XXXXXXXX XXXXXXXXX</p>-->
            <div class="qr-code-section">
                <div id="qrCodeContainer"></div>
            </div>
<!--            <div class="collector-panel">-->
<!--                <div id="qrCodeContainer"></div>-->
<!--                <div class="collector-details">-->
<!--                    <h2>Collector Image:</h2>-->
<!--                    {#if collectorImageSrc}-->
<!--                        <img class="collector-image" src={collectorImageSrc} alt="Collector's snapshot" />-->
<!--                    {/if}-->
<!--                    <h2>Collector Comments:</h2>-->
<!--                    <p class="collector-description">{collectorDescription || 'No description provided.'}</p>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <div class="status-section">
            <p>STATUS: {returnRequests.status}</p>
            <div class="image-placeholder"></div>
            <div class="actions">
            </div>
            <button class="confirm-btn" on:click={handleConfirm}>CONFIRM</button>
        </div>
    </div>
</div>

<style>

    .collector-image {
        max-width: 100px; /* Default size */
        max-height: 100px;
        height: auto;
        display: block;
        margin: 0 auto;
    }

    /* Larger images on wider screens */
    @media (min-width: 768px) {
        .collector-image {
            max-width: 150px;
            max-height: 150px;
        }
    }
    .product-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer; /* Change cursor to indicate clickability */
        transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transition for hover effects */
        position: relative; /* For absolute positioning of the details dropdown */
    }

    .product-row:hover {
        background-color: #f5f5f5; /* Light background on hover */
        box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow for depth */
    }

    .product-row span:first-child {
        text-decoration: underline; /* Underline the first span (product name) */
        color: var(--primary-color); /* Change text color to primary color */
        transition: color 0.3s; /* Smooth transition for text color */
    }

    .collector-section, .customer-section {
        margin-bottom: 1rem;
    }

    .collector-section h3, .customer-section h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .product-row:hover span:first-child {
        color: var(--hover-primary-color); /* Darker shade on hover */
    }

    .details-dropdown {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 1rem;
        width: 100%; /* Make it as wide as the product row */
        box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* Optional: add a shadow for better visibility */
        z-index: 10;
        top: 100%; /* Position it right below the product row */
    }

    .collector-image {
        width: 100%;
        max-width: 200px;
        height: auto;
        display: block;
        margin-bottom: 1rem;
    }

    .customer-image {
        width: 100%;
        max-width: 200px;
        height: auto;
        display: block;
        margin-bottom: 1rem;
    }

    .collector-description {
        color: #333;
    }
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
    .collector-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border: 2px solid #ccc;
        margin-top: 1rem;
    }

    #qrCodeContainer {
        max-width: 200px;
        margin: 1rem auto;
    }

    .collector-details {
        text-align: center;
        width: 100%;
    }

    .collector-image {
        max-width: 80%;
        height: auto;
        margin: 1rem 0;
    }

    .collector-description {
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        padding: 1rem;
        margin-top: 1rem;
    }

    .collector-panel h2 {
        color: #0056b3;
        margin-bottom: 0.5rem;
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