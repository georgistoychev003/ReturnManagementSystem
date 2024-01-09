<script>
    // Sample data for return requests, we should replace it with the database contents when database is setup
    import {onMount} from "svelte";

    let returnRequests = [
        { id: 'R001', customer: 'John Doe', overview: 'Defective electronic item', price: '$299', date: '2023-12-01', status: 'APPROVED' },
        { id: 'R002', customer: 'Jane Smith', overview: 'Wrong size clothing', price: '$45', date: '2023-12-03', status: 'APPROVED' },
        { id: 'R003', customer: 'Alice Johnson', overview: 'Damaged during shipping', price: '$120', date: '2023-12-05', status: 'APPROVED' },
        { id: 'R004', customer: 'Bob Brown', overview: 'Missing accessories', price: '$60', date: '2023-12-07', status: 'APPROVED' },
        { id: 'R005', customer: 'Emily White', overview: 'Not as described', price: '$85', date: '2023-12-10', status: 'APPROVED' },
    ];

    const viewDetails = (requestId) => {
        console.log(`View details for request ID: ${requestId}`);

    };

    onMount(async () => {
        await fetchReturnRequests();
    });

    async function fetchReturnRequests() {
        try {
            const response = await fetch('http://localhost:3000/rma/');
            if (response.ok) {
                returnRequests = await response.json();
            } else {
                console.error('Failed to fetch return requests');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<div class="customer-returns">
    <h1>Customer Requests</h1>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>CUSTOMER</th>
            <th>OVERVIEW</th>
            <th>PRICE</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each returnRequests as request}
            <tr>
                <td>{request.id}</td>
                <td>{request.customer}</td>
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
    .customer-returns {
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
