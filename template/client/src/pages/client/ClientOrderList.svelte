<script>
    import { onMount } from 'svelte';
    import About from "../About.svelte";
    import {orderStore, userIdStore} from '../../Store.js';
    import Help from "../../components/Help.svelte";
    import page from "page";

    let helpPopupVisible = false;
    let helpContent = 'Select an Order to view the items inside ';
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


    export function handleSelection(orderId, orderDate){
        orderStore.set({orderId: orderId, orderDate:orderDate});
        page(`/orderDetails/${orderId}`);
    }

</script>
<div class="rma-container">
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
                <th>ITEMS RETURNED</th>
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
                        <td> {#if order.totalReturnedQuantity === null}
                            -
                        {:else}
                            {order.totalReturnedQuantity}
                        {/if}
                    </td>
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

                            <button on:click={handleSelection(orders.orderId)}>Order Details</button>

                    </td>
                </tr>
            {:else}
                <p>No orders found.</p>
            {/if}
            </tbody>
        </table>
    </div>
{/if}

    <h5>To start a return, select the Order you wish to return to view the products of the order.</h5>
    <h5>The page will navigate to show a list of products where you can select a quantity and the item you wish to return.</h5>
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
        max-width: 90em;
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

</style>
