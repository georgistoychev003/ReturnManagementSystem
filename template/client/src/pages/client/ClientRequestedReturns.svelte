<script>
    import { onMount } from 'svelte';
    import page from 'page';
    import {writable} from "svelte/store";
    import {userEmail} from "../../Store.js";

    let returnRequests = [];
    let isLoading = true;
    let errorMessage = '';





    const fetchReturnRequests = async () => {
        try {
            console.log(userEmail)
            const response = await fetch(`http://localhost:3000/rma/email/customer@email.com`);
            if (!response.ok) {
                throw new Error('Failed to fetch return requests');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching return requests:', error);
            throw error;
        }
    };

    onMount(async () => {
        try {
            returnRequests = await fetchReturnRequests();
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    });

    //TODO PABLO
    const viewDetails = (RMAId) => {
        console.log(`View details for request ID: ${RMAId}`);
        //Here we should most likely  redirect the user to a details page or open a modal with more information
        page(`/requestReturnDetail/:${RMAId}`)
    };
</script>

{#if isLoading}
    <p>Loading return requests...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else}
    <div class="client-return-requests">
        <h1>My Requests</h1>
        <table>
            <thead>
            <tr>
                <th>RMA ID</th>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th></th> <!-- Details column -->
            </tr>
            </thead>
            <tbody>
            {#each returnRequests as request}
                <tr>
                    <td>{request.RMAId}</td>
                    <td>{request.orderedProductId}</td>
                    <td>{request.returnedDate}</td>
                    <td>{request.statusProduct}</td>
                    <td class="status">{request.status}</td>
                    <td>
                        <button on:click={() => viewDetails(request.RMAId)} class="details-btn">Details</button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}


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
