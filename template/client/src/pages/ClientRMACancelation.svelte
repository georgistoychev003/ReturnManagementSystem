<script>

    //once database is setup, this will no longer be hardcoded and updated with the actual contents
    let requestData = {
        products: ["Product 1", "Product 2"],
        date: "2023-01-01",
        status: "Pending",
        comment: "Please process my return quickly.",
        label: "RETURN-NR-1"
    };

    const cancelRequest = () => {
        console.log('RMA request cancelled');
        // we should implement cancellation logic here
    };
</script>

<div class="rma-cancel-container">
    <h1>Request Details</h1>
    <div class="rma-details">
        <div class="details">
            <p><strong>Products:</strong> {requestData.products.join(", ")}</p>
            <p><strong>Date:</strong> {requestData.date}</p>
            <p><strong>Status:</strong> {requestData.status}</p>
            <p><strong>Comment:</strong> {requestData.comment}</p>
        </div>
        <div class="barcode-container">

            <img src="" alt="Barcode for RMA Request" />
            <p>{requestData.label}</p>
        </div>
    </div>
    <button on:click={cancelRequest} class="cancel-request-btn">Cancel Request</button>
</div>

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
