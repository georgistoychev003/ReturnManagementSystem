
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { selectedProductsStore, orderStore } from '../../Store.js';
    import page from 'page';
    import ProgressBar from "../../components/ProgressBar.svelte";
    let currentStep = 3;

    let order = $orderStore;
    let orders = [];
    let selectedQuantities = {};
    let isLoading = true;
    let errorMessage = '';
    let orderId = 1;
    let isClicked = false;
    let OrderId;

    function getOrderIdFromUrl() {
        const path = window.location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 1];
    }

    $: {
        OrderId = getOrderIdFromUrl();
    }
    function updateSelectedProducts(productId, isSelected) {
        if (isSelected) {
            const quantityToReturn = selectedQuantities[productId] || 1; // Default to 1 if not specified
            const product = orders.find(p => p.productId === productId);
            if (product) {
                selectedProductsStore.update(currentSelected => [
                    ...currentSelected,
                    { ...product, quantityToReturn }
                ]);
            }
        } else {
            selectedProductsStore.update(currentSelected =>
                currentSelected.filter(p => p.productId !== productId)
            );
        }
    }
    function handleQuantityChange(productId, quantity) {
        selectedQuantities[productId] = quantity;
    }

    let showNoItemsPopup = false;

    function handleSelection() {
        $selectedProductsStore.length === 0 ? showNoItemsPopup = true : page(`/rmaClientForm`);
    }

    function closePopup() {
        showNoItemsPopup = false;
    }


    onMount(async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/orderDetails/${OrderId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            orders = await response.json();

        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
            orders.forEach(product => {
                selectedQuantities[product.id] = 0;
            });
        }
    });
    const requestReturn = (order) => {
        console.log(`Return requested for order: ${order.product}`);
        // Implement return logic here
    };

    function isReturnable(orderDate) {
        const today = new Date();
        const orderDateObject = new Date(orderDate);
        const diffTime = Math.abs(today - orderDateObject);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays <= 14;
    }


</script>

<ProgressBar {currentStep} />

<div class="rma-container">
{#if isLoading}
    <p>Loading orders...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else}
    <div class="client-return-order">
        <h1>Ordered Products</h1>
        <table>
            <thead>
            <tr>
                <th>QUANTITY</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th>PREVIOUSLY RETURNED</th>
                <th>QUANTITY TO RETURN</th>
                <th>RETURN (CHECK IF YES)</th>
            </tr>
            </thead>
            <tbody>
            {#each orders as orderProducts (orderProducts.productId)}
                <tr>
                    <!-- Your table cells for each orderProducts -->
                    <td>{orderProducts.quantity}</td>
                    <td>{orderProducts.name}</td>
                    <td>{orderProducts.price}</td>
                    {#if orderProducts.quantityToReturn == null}
                        <td>-</td>
                        {:else}
                    <td>{orderProducts.quantityToReturn}</td>
                        {/if}
                    <!-- Conditional rendering based on product type and quantity -->
<!--                    isReturnable(orderProducts.orderDate) &&-->
                    {#if  orderProducts.type !== "Food" && orderProducts.quantity !== orderProducts.quantityToReturn}
                    <td>
                            <input type="number" value="1"  min="1" max={orderProducts.quantity - orderProducts.quantityToReturn}
                                   on:change={(e) => handleQuantityChange(orderProducts.productId, parseInt(e.target.value, 10))} />
                        </td>
                        <td>
                            <input type="checkbox"
                                   on:change={(e) => updateSelectedProducts(orderProducts.productId, e.target.checked)}
                                   class="custom-checkbox" id="checkbox-{orderProducts.productId}">
                        </td>
                    <!--{:else if !isReturnable(orderProducts.orderDate)}-->
                    <!--    &lt;!&ndash; Non-returnable product due to 14 days limit &ndash;&gt;-->
                    <!--    <td colspan="2">Cannot return after 14 days</td>-->
                    {:else}
                        <td colspan="2">
                            {orderProducts.type === "Food" ? 'Food items cannot be returned' : 'Max returns made'}
                        </td>
                        {/if}
                </tr>
            {/each}
            <td>Total</td>
            <td></td>
            <td></td>
            </tbody>
        </table>

        {#if showNoItemsPopup}
            <div class="popup">
                <p>No items selected.</p>
                <button on:click={closePopup}>Close</button>
            </div>
        {/if}
            <button on:click={() => handleSelection()}>Return Selected Products</button>
    </div>

{/if}
    <!--    test purposes will delete when finished-->
    <div class="selected-products">

        <h5> To start a return, select the quantity and select the checkbox. Once you have decided on all items, click the 'Return Selected Products' button</h5>

    </div>
</div>
<h1 class="return-info">Return Information</h1>
<p> - All returns must be shipped back in their original box, if the packaging was destroyed the customer must use suitable packaging otherwise they may not be refunded.</p>
<p> - Games/DVDs can only be returned if the seal has not been broken. If the seal is broken the customer will not be refunded.</p>
<p> - All returns will be inspected to confirm no damage to the items, if the items are damaged by fault of the customer, they may not be refunded.</p>

<style>

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000; /* Ensure it's above other content */
    }
    :root {
        --primary-color: #0056b3;
        --hover-primary-color: #003d82;
        --hover-secondary-color: #a503f6;
        --text-color: #333;
        --border-color: #ccc;
        --background-color: #f4f4f4;
        --success-color: #28a745;
        --warning-color: #ffc107;
        --error-color: #dc3545;
        --info-color: #17a2b8;
        --light-gray: #eaeaea;
        --dark-gray: #555;
    }
    .rma-container {
        max-width: 90%;
        margin: 2rem auto;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow-x: auto; /* Allow horizontal scrolling */
    }
    .client-return-order {
        max-width: 100em;
        margin: 2rem auto;
        padding: 1rem;
    }

    h1 {
        text-align: left;
        margin-bottom: 1rem;
        font-size: 2rem;
        color: #555;
    }
    .return-info{
        text-align: center;
    }

    /* Table Styles */
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    th, td {
        text-align: left;
        padding: 0.75rem;
        border-bottom: 1px solid var(--border-color);
    }

    th {
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
    }

    td {
        font-size: 1rem;
        word-break: break-word; /* Ensure the text wraps in cells */
    }

    tbody tr:hover {
        background-color: #f2f2f2;
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }

    button:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
    .checkbox-container {
        display: inline-block;
        position: relative;
    }

    .custom-checkbox {
        appearance: none;
        background-color: #fff;
        border: 2px solid #000;
        padding: 10px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    .custom-checkbox:checked {
        background-color: blue;
    }

    /* Optional: style for when the checkbox is focused with keyboard navigation */
    .custom-checkbox:focus {
        outline: none;
        border-color: #3B82F6;
    }

    /* Checkmark to display when the checkbox is checked */
    .custom-checkbox:checked:after {
        content: '';
        position: absolute;
        left: 4px;
        top: 4px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }

</style>
