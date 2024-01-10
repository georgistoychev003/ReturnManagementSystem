<script>
    import { onMount } from 'svelte';

    import About from "../About.svelte";

    let orders = [];
    let isLoading = true;
    let errorMessage = '';
    let orderId = 1;


    onMount(async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/details/1`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            orders = await response.json();

            orders.forEach(product => {
                product.quantityToReturn = 0;
                product.selected = false;
            });
            console.log(orders);
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
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
            {#each orders as orderProducts}
                <tr>
                    <td>{orderProducts.quantity}</td>
                    <td>{orderProducts.name}</td>
                    <td>{orderProducts.price}</td>
                    <td>{orderProducts.returnDate}</td>
                    <td>{orderProducts.returnStatus}</td>
                    <td>{orderProducts.returnReason}</td>
                    <td>
                        {#if orderProducts.credit === null}
                            -
                        {:else}
                            {orderProducts.credit}
                        {/if}
                    </td>
                    {#if orderProducts.type !== "Food"}

                    <td><input type="checkbox" bind:checked={orderProducts.selected}></td>
                    {/if}
                    {#if orderProducts.type === "Food"}
                        <p>** Food Items Cannot Be Returned</p>
                    {/if}
            {/each}
            </tbody>
        </table>

            <button id="returnButton">Return Selected Products</button>
    </div>

    <div class="selected-products">
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
        max-width: 960px;
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
</style>
