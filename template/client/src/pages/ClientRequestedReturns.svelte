<script>
    // Sample data for return requests, we should replace it with the database contents when database is setup
    let returnRequests = [
        { id: 'XX', overview: 'XXXXXXXXXX', price: 'XXX', date: 'XXXXX', status: 'RETURNED' },

    ];

    const viewDetails = (requestId) => {
        // Logic to view details of the return request should go here once backend is setup
        console.log(`View details for request ID: ${requestId}`);

    };
</script>

<div class="client-return-requests">
    <h1>My Requests</h1>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>OVERVIEW</th>
            <th>PRICE</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th></th> <!-- Details column -->
        </tr>
        </thead>
        <tbody>
        {#each returnRequests as request}
            <tr>
                <td>{request.id}</td>
                <td>{request.overview}</td>
                <td>{request.price}</td>
                <td>{request.date}</td>
                <td class="status">{request.status}</td>
                <td>
                    <button on:click={() => viewDetails(request.id)} class="details-btn">Details</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style>
    .client-return-requests {
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

    .status {
        color: #007BFF;
    }

    .details-btn {
        padding: 0.5rem 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }

    .details-btn:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
</style>
