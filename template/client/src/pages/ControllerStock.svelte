<script>
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
                console.log(data)
                returnStock = data.map(item => ({
                    id: item.productId,
                    name: item.name,
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

    :root {
        --primary-color: #0056b3;
        --hover-color: #003d82;
        --text-color: #333;
        --border-color: #ddd;
        --background-color: #f4f4f4;
        --container-bg-color: #ffffff;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Arial', sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
    }

    .stock {
        max-width: 96%;
        margin: 2rem auto;
        padding: 1rem;
        background: var(--container-bg-color);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        overflow-x: auto;
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        color: var(--text-color);
        font-weight: 300;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    th, td {
        text-align: left;
        padding: 0.75rem;
        border-bottom: 1px solid var(--border-color);
        word-break: break-word;
    }

    th {
        background-color: var(--primary-color);
        color: white;
    }

    /* Buttons */
    .update-btn {
        padding: 0.5rem 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
        white-space: nowrap;
    }

    .update-btn:hover {
        background-color: var(--hover-color);
        transform: scale(0.98);
    }

    @media only screen and (max-width: 768px) {
        h1 {
            font-size: 1.5rem;
        }

        th, td {
            padding: 0.5rem;
            font-size: 0.9rem;
        }

        .update-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
        }
    }

    @media only screen and (max-width: 480px) {
        h1 {
            font-size: 1.2rem;
        }

        th, td {
            padding: 0.4rem;
            font-size: 0.8rem;
        }

        .update-btn {
            padding: 0.25rem 0.5rem;
            font-size: 0.7rem;
        }
    }

</style>
