<script>
    import { onMount } from 'svelte';
    import About from "../About.svelte";
    import { userIdStore } from '../../Store.js';


    let orders = [];
    let isLoading = true;
    let errorMessage = '';
    let currentUserId;

    userIdStore.subscribe(value => {
        console.log(value)
        currentUserId = value;
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

    import Help from "../../components/Help.svelte";

    let helpPopupVisible = false;
    let helpContent = 'This is some helpful information...';


</script>

{#if isLoading}
    <p>Loading orders...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else}
    <div class="client-return-order">
        <h1>My Orders</h1>
        <Help
                visible={helpPopupVisible}
                content={helpContent}
                closePopup={() => helpPopupVisible = false}
        />
        <table>
            <thead>
            <tr>
                <th>ORDER ID</th>
                <th>PRICE</th>
                <th>ORDER DATE</th>
                <th>CREDIT</th>
                <th>RETURN STATUS</th>
                <th>QUANTITY RETURNED</th>
                <th></th> <!-- Return column -->
            </tr>
            </thead>
            <tbody>
            {#if orders.length > 1}
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
                            {#if order.statusRma === null}
                                -
                            {:else}
                                {order.statusRma}
                            {/if}
                        </td>
                        <td>{order.totalReturnedQuantity}</td>
                        <td>
                            <a href={`/orderDetails/${order.orderId}`}>
                                <button>Order Details</button>
                            </a>
                        </td>
                    </tr>
                {/each}
            {:else if orders.length === 1}
                <tr>
                    <td>{orders.orderId}</td>
                    <td>{orders.totalPrice}</td>
                    <td>{orders.orderDate}</td>
                    <td>
                        {#if orders.credit === null}
                            -
                        {:else}
                            {orders.credit}
                        {/if}
                    </td>
                    <td>
                        {#if orders.statusRMA === null}
                            -
                        {:else}
                            {orders.statusRMA}
                        {/if}
                    </td>
                    <td>
                        <a href={`/orderDetails/${orders.orderId}`}>
                            <button>Order Details</button>
                        </a>
                    </td>
                </tr>
            {:else}
                <p>No orders found.</p>
            {/if}
            </tbody>
        </table>
        <button on:click={() => helpPopupVisible = true}>Help</button>
    </div>
{/if}

<style>
    .client-return-order {
        max-width: 90em;
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
