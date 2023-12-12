<script>
    // Sample data for the orders, we should replace that with the database contents once database functions
    let orders = [
        { quantity: 1, product: 'book', price: '23', type: 'books', orderedSince: '1 HOUR', returnable: true },
        { quantity: 3, product: 'bananas', price: '1', type: 'food', orderedSince: '4 DAYS', returnable: false },

    ];

    const requestReturn = (order) => {
        //here we should implement the return order logic once backend is setup
        console.log(`Return requested for order: ${order.product}`);
    };
</script>

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
