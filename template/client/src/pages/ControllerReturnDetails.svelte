<script>
    import {onMount} from "svelte";
    import page from 'page';

    let RMAId;

    let selectedAction = null;

    let returnRequests = [];

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
    });

    async function handleConfirm() {
        alert("Customer has been notified, email sent.");
        page(`/controller`);
    }

    async function fetchReturnRequests() {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}`);
            if (response.ok) {
                returnRequests = await response.json();
                const status = await fetchStatusOfRMA(returnRequests.RMAId);
                const customer = await fetchCustomerOfRMA(returnRequests.RMAId);
                const products = await fetchProductsOfRMA(returnRequests.RMAId);
                returnRequests.customer = customer;
                returnRequests.status = status
                returnRequests.products = products
                console.log(returnRequests)
            } else {
                console.error('Failed to fetch return requests');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function fetchStatusOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/status`);
            if (response.ok) {
                const data = await response.json();
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
                console.log(data)
                return data.description;
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
<!--            <p>PRODUCTS: {returnRequests.products}</p>-->
            <p>DATE: {returnRequests.returnedDate}</p>
            <p>CUSTOMER NAME: {returnRequests.customer}</p>
<!--            <p>COMMENTS: XXXXXXXX XXXXXXXXX</p>-->
            <div class="label">
                <img src="barcode.png" alt="Barcode" />
            </div>
        </div>
        <div class="status-section">
            <p>STATUS: {returnRequests.status}</p>
            <div class="image-placeholder"></div>
            <p>DESCRIPTION: {returnRequests.description}</p>
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
</style>