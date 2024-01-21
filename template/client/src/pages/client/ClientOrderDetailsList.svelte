
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { selectedItemsStore } from '../../Store.js';

    let orders = [];
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

    function handleSelection(orderProducts) {
        const selectedItems = orderProducts.filter(product => product.selected);
        selectedItemsStore.set(selectedItems);
    }

    onMount(async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/details/${OrderId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            orders = await response.json();


            console.log(orders);
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
            orders.forEach(product => {
                product.quantityToReturn = 0;
                product.selected = false;
            });
        }
    });
    const requestReturn = (order) => {
        console.log(`Return requested for order: ${order.product}`);
        // Implement return logic here
    };


</script>

{#if isLoading}
    <p>Loading orders...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else}
    <div class="client-return-order">
        <h1>Ordered Products</h1>
        <p>Order Id: {orders.orderId}</p>
        <p>Order Date: {orders.orderDate}</p>
        <table>
            <thead>
            <tr>
                <th>QUANTITY</th>
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
                <th>RETURN STATUS</th>
                <th>RETURN DATE</th>
                <th>RETURN REASON</th>
                <th>CREDIT</th>
                <th>QUANTITY TO RETURN</th>
                <th>RETURN (CHECK IF YES)</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {#each orders as orderProducts (orderProducts.productId)}
                <tr>
                    <td>{orderProducts.quantity}</td>
                    <td>{orderProducts.name}</td>
                    <td>{orderProducts.price}</td>
                    <td>{orderProducts.returnedDate}</td>
                    <td>{orderProducts.statusProduct}</td>
                    <td>{orderProducts.description}</td>
                    <td>
                        {#if orderProducts.credit === null}
                            -
                        {:else}
                            {orderProducts.credit}
                        {/if}
                    </td>
                    {#if orderProducts.type !== "Food"}
                        {#if orderProducts.quantity !== 1}
                            <td>
                                <input type="number" min="1" max={orderProducts.quantity} />
                            </td>
                        {:else}
                            <td></td>
                        {/if}

                    {/if}
                    {#if orderProducts.type === "Food"}
                        <p>** Food Items Cannot Be Returned</p>
                    {/if}
                </tr>
            {/each}
            </tbody>
        </table>

        <a href="/rmaClientForm">
            <button on:click={() => handleSelection(orders)}>Return Selected Products</button>
        </a>

    </div>


    <!--    test purposes will delete when finished-->
    <div class="selected-products">
        <p>below is for test purposes will delete when finished </p>
        <h2>Selected Products for Return</h2>
        <ul>
            {#each orders as orderProducts (orderProducts.productId)}
                {#if orderProducts.selected}
                    <li>{orderProducts.name} - Quantity: {orderProducts.quantity}</li>
                {/if}
            {/each}
        </ul>
    </div>
{/if}

<style>
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

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    th, td {
        text-align: left;
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
    .button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
    }

    .normal {
        background-color: blue;
    }

    .clicked {
        background-color: red;
    }
</style>
