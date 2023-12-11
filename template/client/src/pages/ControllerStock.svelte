<script>
    // Sample data for return stocks, we should replace it with the database contents when database is setup
    let returnStock = [
        { id: 'S001', name: 'Wireless Headphones', type: 'Electronics', price: '$150', quantity: '20'},
        { id: 'S002', name: 'Running Shoes', type: 'Footwear', price: '$80', quantity: '35'},
        { id: 'S003', name: 'Smartwatch', type: 'Electronics', price: '$199', quantity: '15'},
        { id: 'S004', name: 'Backpack', type: 'Accessories', price: '$50', quantity: '25'},
        { id: 'S005', name: 'Tablet', type: 'Electronics', price: '$300', quantity: '10'},
    ];

    const updateStockQuantity = (stockId) => {
        const stock = returnStock.find(item => item.id === stockId);
        const newQuantity = prompt(`Update quantity for ${stock.name}. Current quantity: ${stock.quantity}`);

        if (newQuantity !== null) {
            // update the stock quantity
            console.log(`Updated stock ID ${stockId} to new quantity ${newQuantity}`);
            stock.quantity = newQuantity;
            // make an API call to update the database
        }
    };
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
