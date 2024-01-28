<script>
    import { onMount } from "svelte";
    import page from 'page';

    let returnRequests = [];


    onMount(async () => {
        await fetchReturnRequests();
    });

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

    async function fetchReturnRequests() {
        try {
            const response = await fetch(`http://localhost:3000/rma/returns/products`);
            if (response.ok) {
                const requests = await response.json();
                for (const request of requests) {
                    const totalPrice = await fetchTotalPriceOfRMA(request.RMAId);
                    const status = await fetchStatusOfRMA(request.RMAId);
                    const customer = await fetchCustomerOfRMA(request.RMAId);
                    request.email = customer;
                    request.totalReturnPrice = totalPrice;
                    request.statusRMA = status
                }
                const aggregatedRequests = aggregateRequestsByRMA(requests);

                returnRequests = Object.values(aggregatedRequests);

                returnRequests = Object.values(aggregatedRequests)
                    .filter(request => request.totalReturnPrice > 0);

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
        page(`/controller/return-requests-details/${requestId}`);


    };

</script>

<div class="customer-returns">
    <h1>Return Requests</h1>
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
                <td>{request.RMAId}</td>
                <td>{request.email}</td>
                <td>{request.description}</td>
                <td>{request.totalReturnPrice}</td>
                <td>{request.returnedDate}</td>
                <td class="status">{request.statusRMA}</td>
                <td>
                    <button on:click={() => viewDetails(request.RMAId)} class="details-btn">Details</button>
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
