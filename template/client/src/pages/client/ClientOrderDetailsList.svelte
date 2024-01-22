
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { selectedProductsStore, orderStore } from '../../Store.js';
    import page from 'page';

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

    export function handleSelection(){
        page(`/rmaClientForm`);
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

</script>

<div class="rma-container">
{#if isLoading}
    <p>Loading orders...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else}
    <div class="client-return-order">
        <h1>Ordered Products</h1>
        <p>Order Id: {order.orderId}</p>
        <p>Order Date: {order.orderDate}</p>
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
                    <td>{orderProducts.quantityToReturn}</td>
                    <!-- Conditional rendering based on product type and quantity -->
                    {#if orderProducts.type !== "Food" && orderProducts.quantity !== orderProducts.quantityToReturn}
                        <td>
                            <input type="number" value="1"  min="1" max={orderProducts.quantity - orderProducts.quantityToReturn}
                                   on:change={(e) => handleQuantityChange(orderProducts.productId, parseInt(e.target.value, 10))} />
                        </td>
                        <td>
                            <input type="checkbox"
                                   on:change={(e) => updateSelectedProducts(orderProducts.productId, e.target.checked)}
                                   class="custom-checkbox" id="checkbox-{orderProducts.productId}">
                        </td>
                    {:else}
                        <td></td>
                        <td>{orderProducts.type === "Food" ? 'Food items cannot be returned' : 'Max returns made'}</td>
                    {/if}
                </tr>
            {/each}
            <td>Total</td>
            <td></td>
            <td></td>
            </tbody>
        </table>
            <button on:click={() => handleSelection()}>Return Selected Products</button>
    </div>

{/if}
    <!--    test purposes will delete when finished-->
    <div class="selected-products">

        <h1 class="return-info">Return Information</h1>
        <p>All returns must be shipped back in their original box, if the packaging was destroyed the customer must use suitable packaging otherwise they may not be refunded.</p>
        <p>Games/DVDs can only be returned if the seal has not been broken. If the seal is broken the customer will not be refunded.</p>
        <p>All returns will be inspected to confirm no damage to the items, if the items are damaged by fault of the customer, they may not be refunded.</p>

    </div>
</div>



<style>
    .rma-container {
        max-width: 90%;
        margin: 40px auto;
        padding: 20px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
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
        color: #333;
    }
    .return-info{
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    th, td {
        text-align: center; /* Centers text horizontally */
        vertical-align: middle;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ccc;
    }

    th {
        color: #555;
        font-size: 1rem;
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
