<script>
    // Sample data
    import {onMount} from "svelte";
    import page from 'page';
    import {RMAId as RMAIdFromStore, userEmail} from "../../Store.js";

    let products =[];
    let returnRequests = [];
    let errorMessage = '';
    let isLoading = true;
    let RMAId;

    RMAIdFromStore.subscribe(value => {
        console.log(value)
        RMAId = value;
    });


    onMount(async () => {
        returnRequests = await fetchReturnRequests();
    });

    async function fetchReturnRequests() {
        try {
            const response = await fetch(`http://localhost:3000/rma/${RMAId}`);
            if (response.ok) {
                console.log(returnRequests)
                return await response.json();
            } else {
                console.error('Failed to fetch return requests');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            isLoading = false;
            console.log(returnRequests)
        }
    }


</script>

{#if isLoading}
    <p>Loading orders...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else if returnRequests.length === 0}
    <p>No return requests found.</p>
{:else}
    <!-- Rest of your code remains the same -->
    <table>
        <thead>
        <tr>
            <th>Return id</th>
            <th>Image</th>
            <th>QUANTITY</th>
            <th>PRODUCT NAME</th>
            <th>TYPE</th>
            <th>PRICE</th>
            <th>RETURN STATUS</th>
            <th>RETURN DATE</th>
            <th>RETURN REASON</th>
            <th></th>
        </tr>
        </thead>
    <tbody>
    {#each returnRequests as returnReq}
        <tr>
            <td>{returnReq.RMAId}</td>
            <td><img src={returnReq.imageURL} alt="Product Image" style="width: 50px; height: 50px;"></td>
            <td>{returnReq.quantity}</td>
            <td>{returnReq.name}</td>
            <td>{returnReq.type}</td>
            <td>{returnReq.price}</td>
            <td>{returnReq.statusProduct}</td>
            <td>{returnReq.returnedDate}</td>
            <td>{returnReq.description}</td>
        </tr>
    {/each}
    </tbody>
    </table>
{/if}

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
