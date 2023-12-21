<script>
    // Sample data for return stocks, we should replace it with the database contents when database is setup
    import {onMount} from "svelte";
    let returnStock = [];

    onMount(async () => {
        await fetchStockData();
    });

    async function fetchStockData() {
        try {
            const response = await fetch('http://localhost:3000/product');
            if (response.ok) {
                const data = await response.json();
                returnStock = data.map(item => ({
                    id: item.productId,
                    name: item.description,
                    type: item.type,
                    price: `$${item.price.toFixed(2)}`,
                    quantity: item.inventoryStock
                }));
            } else {
                console.error('Failed to fetch stock data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function updateStockQuantity(stockId) {
        const stock = returnStock.find(item => item.id === stockId);
        const newQuantity = prompt(`Update quantity for ${stock.name}. Current quantity: ${stock.quantity}`);

        if (newQuantity !== null) {
            try {
                const response = await fetch(`http://localhost:3000/product/${stockId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ inventoryStock: newQuantity })
                });

                if (response.ok) {
                    console.log(`Updated stock ID ${stockId} to new quantity ${newQuantity}`);
                    await fetchStockData();
                } else {
                    console.error('Failed to update stock');
                }
            } catch (error) {
                console.error('Error updating stock:', error);
            }
        }
    }
</script>

<div class="stock">
    <h1>Current Stock</h1>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>TYPE</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each returnStock as stock}
            <tr>
                <td>{stock.id}</td>
                <td>{stock.name}</td>
                <td>{stock.type}</td>
                <td>{stock.price}</td>
                <td>{stock.quantity}</td>
                <td>
                    <button on:click={() => updateStockQuantity(stock.id)} class="update-btn">Update</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style>
    .stock {
        max-width: 960px;
        margin: 2rem auto;
        padding: 1rem;
        font-size: 1rem;
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
    }

    .update-btn {
        padding: 0.5rem 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }

    .update-btn:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
</style>
