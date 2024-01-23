<script>
    import { onMount } from "svelte";
    import page from 'page';
    import {writable} from "svelte/store";

    let returnRequests = [];

    const requestsPerPage = 5;
    let currentPage = 1;
    let totalPages;

    // const viewDetails = (requestId) => {
    //     page(`/controller/return-requests-details/${requestId}`);
    // };

    onMount(async () => {
        await fetchReturnRequests();
        calculateTotalPages();
    });

    function calculateTotalPages() {
        totalPages = Math.ceil(rawReturnRequests.length / requestsPerPage);
    }

    function changePage(newPage) {
        currentPage = Math.max(1, Math.min(newPage, totalPages)); // Ensure new page is within valid range
        updatePaginatedRequests();
    }

    function updatePaginatedRequests() {
        const startIndex = (currentPage - 1) * requestsPerPage;
        const endIndex = startIndex + requestsPerPage;
        returnRequests = rawReturnRequests.slice(startIndex, endIndex);
    }

    function getUserIdFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id;
    }

    async function fetchTotalPriceOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/total-price`);
            if (response.ok) {
                const data = await response.json();
                return data.TotalReturnPrice || 0;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }

    async function fetchStatusOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/status`);
            if (response.ok) {
                const data = await response.json();
                return data.statusRma;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }
    async function getTotalRefundAmount(RMAId) {
        try {
            console.log(RMAId)
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/refund`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data.totalRefundAmount;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }

    async function fetchCustomerOfRMA(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/customer`);
            if (response.ok) {
                const data = await response.json();
                return data.email;
            } else {
                console.error('Failed to fetch total price for RMA', RMAId);
                return 0;
            }
        } catch (error) {
            console.error('Error:', error);
            return 0;
        }
    }

    // This function fetches the controller's information for a specific RMA.
    async function fetchControllerInfo(RMAId) {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}/controller`);
            if (response.ok) {
                const data = await response.json();
                return {
                    controllerId: data.controllerId,
                    controllerName: data.userName // Assuming the API returns a userName field
                };
            } else {
                console.error('Failed to fetch controller info for RMA', RMAId);
                return { controllerId: null, controllerName: 'nobody' }; // Default values
            }
        } catch (error) {
            console.error('Error:', error);
            return { controllerId: null, controllerName: 'Error' }; // Error values
        }
    }


    async function fetchReturnRequests() {

        try {
            const response = await fetch(`http://localhost:3000/rma/returns/products`);
            if (response.ok) {
                const requests = await response.json();
                for (const request of requests) {
                    const totalPrice = await fetchTotalPriceOfRMA(request.RMAId);
                    const status = await fetchStatusOfRMA(request.RMAId);
                    const customer = await fetchCustomerOfRMA(request.RMAId);
                    const controllerInfo = await fetchControllerInfo(request.RMAId); // Fetch controller info for each RMA
                    request.totalRefund = await getTotalRefundAmount(request.RMAId);
                    request.email = customer;
                    request.totalReturnPrice = totalPrice;
                    request.statusRMA = status
                    request.controllerInfo = controllerInfo; // Add the controller info to the request object
                    request.statusRMA = request.totalReturnPrice === 0 ? 'Finished' : status;
                }
                const aggregatedRequests = aggregateRequestsByRMA(requests);

                rawReturnRequests = Object.values(aggregatedRequests);

                returnRequests = Object.values(aggregatedRequests);

                console.log(returnRequests);
            } else {
                console.error('Failed to fetch return requests');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    function aggregateRequestsByRMA(requests) {
        const aggregated = {};

        for (const request of requests) {
            if (!aggregated[request.RMAId]) {
                aggregated[request.RMAId] = { ...request, products: [] };
            }
            aggregated[request.RMAId].products.push(request.product); // Assuming 'product' field exists
        }

        return aggregated;
    }

    const viewDetails = async (requestId) => {
        const controllerId = getUserIdFromToken();

        if (!controllerId) {
            console.error("Controller ID not found");
            return;
        }

        console.log("Locking RMA ID:", requestId, "with Controller ID:", controllerId);

        try {
            const lockResponse = await fetch(`http://localhost:3000/rma/assign/${requestId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ controllerId })
            });

            if (lockResponse.ok) {
                page(`/controller/return-requests-details/${requestId}`);
            } else {
                const errorMessage = await lockResponse.json();
                console.error('Error response:', errorMessage);
                alert(`Error: ${errorMessage.message}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while locking the RMA.');
        }
    };
    const showFinished = writable(false);
    function toggleShowFinished() {
        showFinished.update(value => !value);
    }

    let rawReturnRequests = [];
    $: updatePaginatedRequests();

    $: returnRequests = $showFinished
        ? rawReturnRequests
        : rawReturnRequests.filter(req => req.statusRMA !== 'Finished');


</script>

<div class="customer-returns">
    <h1>Customer Requests</h1>
    <button class="toggle-btn" on:click={toggleShowFinished}>Toggle Finished RMAs</button>


    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>CUSTOMER</th>
            <th>OVERVIEW</th>
            <th>PRICE</th>
            <th>DATE</th>
            <th>REFUND</th>
            <th>STATUS</th>
            <th>CONTROLLER</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each returnRequests as request}
            <tr>
                <td>{request.RMAId}</td>
                <td>{request.email}</td>
                <td>{request.description}</td>
                <td>{request.totalReturnPrice}</td>
                <td>{request.returnedDate}</td>
                <td>${request.totalRefund.toFixed(2)}</td>
                <td class="status">{request.statusRMA}</td>
                <td class="controller-cell">
                <span class="controller-label {request.controllerInfo.controllerName && request.controllerInfo.controllerName !== 'nobody' ? 'assigned' : 'not-assigned'}">
                    Assigned to: {request.controllerInfo.controllerName || 'N/A'}
                </span>

                </td>
                <td>
                    {#if request.statusRMA !== 'Finished'}
                        <button class="details-btn" on:click={() => viewDetails(request.RMAId)}>Details</button>
                    {/if}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    <div class="pagination-controls">
        <button on:click={() => changePage(1)}>First</button>
        <button on:click={() => changePage(currentPage - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button on:click={() => changePage(currentPage + 1)}>Next</button>
        <button on:click={() => changePage(totalPages)}>Last</button>
    </div>
</div>

<style>
    :root {
        --primary-color: #0056b3;
        --hover-primary-color: #003d82;
        --hover-secondary-color: #a503f6;
        --text-color: #333;
        --border-color: #ccc;
        --background-color: #f4f4f4;
        --success-color: #28a745;
        --warning-color: #ffc107;
        --error-color: #dc3545;
        --info-color: #17a2b8;
        --light-gray: #eaeaea;
        --dark-gray: #555;
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

    .customer-returns {
        max-width: 90%;
        margin: 2rem auto;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow-x: auto; /* Allow horizontal scrolling */
    }

    h1 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2.25rem;
        color: var(--dark-gray);
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

    .status {
        font-weight: bold;
        color: var(--info-color);
    }
    .controller-cell {
        display: flex;
        align-items: center;
        justify-content: flex-end; /* Aligns items to the right */
        gap: 10px;
    }

    .controller-label {
        padding: 2px 8px;
        border-radius: 5px;
        font-weight: bold;
        white-space: nowrap;
    }

    .assigned {
        background-color: var(--error-color); /* Red label for assigned RMAs */
    }

    .not-assigned {
        background-color: var(--success-color); /* Green label for unassigned RMAs */
    }

    .details-btn {
        padding: 0.5rem 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .details-btn:hover {
        background-color: var(--hover-secondary-color);
        transform: scale(0.98);
    }
    /* Responsive Design */
    @media (max-width: 768px) {
        .customer-returns {
            margin: 1rem;
            padding: 0.5rem;
        }

        h1 {
            font-size: 2rem;
        }

        th, td {
            padding: 0.5rem; /* Smaller padding for smaller screens */
            font-size: 0.9rem;
        }

        .details-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 1.5rem;
        }

        th, td {
            padding: 0.4rem; /* Even smaller padding for mobile screens */
            font-size: 0.8rem;
        }

        .details-btn {
            padding: 0.25rem 0.5rem;
            font-size: 0.7rem;
        }
    }

    .toggle-btn {
        padding: 0.5rem 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s, box-shadow 0.3s;
        margin-bottom: 1rem; /* Space below the button */
    }

    .toggle-btn:hover {
        background-color: var(--hover-primary-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-btn:active {
        background-color: var(--hover-secondary-color);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Responsive Design for Button */
    @media (max-width: 768px) {
        .toggle-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        .toggle-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
        }
    }

    .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .pagination-controls button {
        padding: 0.5rem 1rem;
        margin: 0 5px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .pagination-controls button:hover {
        background-color: var(--hover-primary-color);
    }

    .pagination-controls button:disabled {
        background-color: var(--light-gray);
        cursor: default;
    }

    .pagination-controls span {
        margin: 0 10px;
    }
</style>
