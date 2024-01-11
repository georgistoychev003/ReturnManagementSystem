<script>
    // Sample data for RMA requests, we need to replace it with a fetching from the backend when database is ready
    let requests = [
        { id: 'XX', user: 'XXXX', title: 'XXXXXXXXX', date: 'XXXXXX', price: 'XXX', returnable: true },

    ];


    const fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:3000/rma/returns/products');

            if (response.ok) {
                const data = await response.json();
                requests = [...requests, ...data]; // Merge the fetched data with existing requests
                renderRequests(); // Call the function to render requests after fetching data
            } else {
                console.error('Failed to fetch requests');
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const renderRequests = () => {
        // Select the tbody element where requests will be rendered
        const tableBody = document.querySelector('tbody');

        // Clear existing rows
        tableBody.innerHTML = '';

        // Populate the table with fetched request data
       requests.forEach(request => {
       /*     const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.returnedProductId}</td>
                <td>${request.user}</td>
                <td>${request.title}</td>
                <td>${request.returnedDate}</td>
                <td>${request.price}</td>
                <td>
                    ${request.returnable ? '<button onclick="requestReturn()">Process Return</button>' : ''}
                </td>
            `;
            tableBody.appendChild(row); */
        });
    };




    const handleMoreClick = () => {
        // here we have to implement the logic to load more RMA requests
        console.log('Load more requests');
    };

    function requestReturn(request) {
        
    }

    // Call fetchRequests function when the page loads to fetch requests from the backend
    window.onload = fetchRequests;
</script>

<div class="admin-requests">
    <h1>REQUESTS</h1>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>USER</th>
            <th>TITLE</th>
            <th>DATE</th>
            <th>PRICE</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each requests as request}
            <tr>
                <td>{request.returnedProductId}</td>
                <td>{request.userId}</td>
                <td>{request.title}</td>
                <td>{request.returnedDate}</td>
                <td>{request.price}</td>
                <td>
                    {#if request.returnable}
                        <button on:click={() => requestReturn(request)}>Process Return</button>
                    {/if}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    <div class="more-button">
        <button on:click={handleMoreClick}>More</button>
    </div>
</div>

<style>
    .admin-requests {
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

    .more-button {
        text-align: right;
        margin-top: 1rem;
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
