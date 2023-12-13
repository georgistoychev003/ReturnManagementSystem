<script>
    import { onMount } from 'svelte';

    let orders = [];
    let isLoading = true;
    let errorMessage = '';

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    };

    onMount(async () => {
        try {
            orders = await fetchOrders();
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
        <h1>My Orders</h1>
        <table>
            <thead>
            <tr>
                <th>QUANTITY</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>TYPE</th>
                <th>ORDERED SINCE</th>
                <th></th> <!-- Return column -->
            </tr>
            </thead>
            <tbody>
            {#each orders as order}
                <tr>
                    <td>{order.quantity}</td>
                    <td>{order.product}</td>
                    <td>{order.price}</td>
                    <td>{order.type}</td>
                    <td>{order.orderedSince}</td>
                    <td>
                        {#if order.returnable}
                            <button on:click={() => requestReturn(order)}>Return</button>
                        {/if}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
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
