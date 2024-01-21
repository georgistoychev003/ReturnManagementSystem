<script>
    import { onMount } from 'svelte';
    import About from "../About.svelte";
    import { writable } from 'svelte/store';
    import { userIdStore } from '../../Store.js';


    let orders = [];
    let isLoading = true;
    let errorMessage = '';
    let currentUserId;

    userIdStore.subscribe(value => {
        currentUserId = value;
        console.log(userIdStore)
    });


    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/MyOrders/${currentUserId}`);
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
                <th>ORDER ID</th>
                <th>PRICE</th>
                <th>ORDER DATE</th>
                <th>CREDIT</th>
                <th>RETURN STATUS</th>
                <th></th> <!-- Return column -->
            </tr>
            </thead>
            <tbody>
            {#each orders as order}
                <tr>
                    <td>{order.orderId}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderDate}</td>
                    <td>
                        {#if order.credit === null}
                            -
                        {:else}
                            {order.credit}
                        {/if}
                    </td>
                    <td>
                        {#if order.statusRMA === null}
                            -
                        {:else}
                            {order.statusRMA}
                        {/if}
                    </td>
                    <td>
                        <a href={`/orderDetails/${order.orderId}`}>
                            <button>Order Details</button>
                        </a>
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
