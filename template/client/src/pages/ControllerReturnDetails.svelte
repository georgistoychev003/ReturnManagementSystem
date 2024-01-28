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
    let collectorDescription = '';



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
        console.log(selectedProducts.entries())
        const productsForAction = Array.from(selectedProducts.entries())
            .filter(([_, value]) => value.action === 'refund' || value.action === 'damaged')
            .map(([productName, value]) => ({
                name: productName,
                action: value.action,
                quantityToReturn: value.quantityToReturn
            }));

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
                        orderedProductId: product.orderedProductId,
                        showDetails: false,
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
        productQuantities[productName] = clampedQuantity;
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

        if (!['INPUT', 'LABEL', 'BUTTON'].includes(event.target.tagName)) {
            products[index].showDetails = !products[index].showDetails;
            products = products;
        }
    }
    function stopPropagation(event) {
        event.stopPropagation();
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
                <div class="collector-section">
                    <h3>Collector's Details</h3>
                    {#if product.collectorImageSrc}
                        <img class="collector-image" src={product.collectorImageSrc} alt="Collector's snapshot" />
                    {/if}
                    <p class="collector-description">{product.collectorDescription || 'No description provided from collector.'}</p>
                </div>
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

                <br>
                <br>
            {/each}
            <p>DATE: {returnedDate}</p>
            <p>CUSTOMER NAME: {returnRequests.customer}</p>
            <div class="qr-code-section">
                <div id="qrCodeContainer"></div>
            </div>
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
    :root {
        --primary-color: #0056b3;
        --secondary-color: #4CAF50;
        --accent-color: #ff9500;
        --background-color: #f4f4f4;
        --text-color: #333;
        --border-color: #ddd;
        --font-family: 'Arial', sans-serif;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: var(--font-family);
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
    }

    .request-card {
        max-width: 80%;
        margin: 30px auto;
        padding: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .request-header {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        color: var(--primary-color);
    }

    .details-section {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .details, .status-section {
        flex: 1 1 45%;
        min-width: 300px;
        background: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .product-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 10px;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s;
    }

    .product-row:hover {
        background-color: #f5f5f5;
    }

    input[type='number'], input[type='radio'], label {
        text-align: center;
    }

    .action-btn, .confirm-btn {
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .confirm-btn {
        background-color: var(--secondary-color);
        color: white;
    }

    .details-dropdown {
        position: absolute;
        background-color: white;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        padding: 15px;
        width: 100%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 10;
        top: 100%;
        display: none; /* Initially hidden */
    }

    .product-row:hover .details-dropdown {
        display: block; /* Show on hover */
    }

    .collector-image, .customer-image {
        width: 100%;
        max-width: 200px;
        height: auto;
        display: block;
        margin: 10px auto;
        border-radius: 5px;
    }

    .collector-description, .customer-description {
        color: #333;
        margin: 5px 0;
    }

    .qr-code-section {
        text-align: center;
        padding: 20px;
        margin-top: 20px;
    }

    #qrCodeContainer {
        max-width: 200px;
        margin: auto;
    }

    @media (max-width: 768px) {
        .details-section {
            flex-direction: column;
        }

        .product-row {
            grid-template-columns: 1fr;
        }

        #qrCodeContainer {
            max-width: 150px;
        }
    }

    @media (max-width: 480px) {
        .request-header {
            font-size: 1.5rem;
        }

        .action-btn, .confirm-btn {
            padding: 8px 10px;
        }

        #qrCodeContainer {
            max-width: 100px;
        }
    }

</style>