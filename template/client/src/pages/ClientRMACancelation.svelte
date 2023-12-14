<script>
    import { onMount } from 'svelte';

    let returnRequests = [];
    let isLoading = true;
    let errorMessage = '';

    const fetchReturnRequests = async () => {
        try {
            const response = await fetch('http://localhost:3000/returns');
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

    const cancelRequest = async (requestId) => {
        if (!confirm('Are you sure you want to cancel this RMA request?')) {
            return; // User cancelled the action
        }

        try {
            const response = await fetch(`http://localhost:3000/returns/${requestId}`, {
                method: 'DELETE',
                // Include headers if your API requires them, e.g., Authorization
            });
            if (!response.ok) {
                throw new Error(`Failed to cancel RMA request: ${response.statusText}`);
            }
            const result = await response.json();
            console.log('RMA request cancelled', result);
            // Remove the cancelled request from the list
            returnRequests = returnRequests.filter(request => request.id !== requestId);
        } catch (error) {
            console.error('Error cancelling RMA request:', error);

        }
    };
</script>

{#if isLoading}
    <p>Loading return requests...</p>
{:else if errorMessage}
    <p>Error: {errorMessage}</p>
{:else if returnRequests.length === 0}
    <p>No return requests found.</p>
{:else}
    <div class="rma-cancel-container">
        <h1>My Return Requests</h1>
        {#each returnRequests as request}
            <div class="rma-details">
                <div class="details">
                    <p><strong>Products:</strong> {request.products.join(", ")}</p>
                    <p><strong>Date:</strong> {request.date}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <p><strong>Comment:</strong> {request.comment}</p>
                </div>
                <div class="barcode-container">
                    <!-- Replace the following with your barcode image generation logic -->
                    <img src="/path-to-barcode/{request.label}" alt="Barcode for RMA Request" />
                    <p>{request.label}</p>
                </div>
                {#if request.status !== 'Cancelled' && request.status !== 'Processed'}
                    <button on:click={() => cancelRequest(request.id)} class="cancel-request-btn">Cancel Request</button>
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    .rma-cancel-container {
        max-width: 700px;
        margin: 3rem auto;
        padding: 2rem;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
    }

    h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 2rem;
        text-align: center;
    }

    .rma-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        align-items: flex-start;
    }

    .details {
        max-width: 60%;
        line-height: 1.6;
    }

    .details p {
        margin: 0.5rem 0;
        font-size: 16px;
    }

    .barcode-container {
        max-width: 35%;
        text-align: center;
    }

    .barcode-container img {
        width: 100%;
        margin-bottom: 1rem;
    }

    .cancel-request-btn {
        padding: 10px 30px;
        background-color: #d32f2f;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: background-color 0.2s, transform 0.2s;
        display: block;
        width: fit-content;
        margin: 0 auto;
    }

    .cancel-request-btn:hover, .cancel-request-btn:focus {
        background-color: #b71c1c;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(211, 47, 47, 0.2);
    }
</style>
