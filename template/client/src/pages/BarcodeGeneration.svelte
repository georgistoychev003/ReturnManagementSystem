<script>

    //once backend is capable of generating barcodes this will be updated and not have hardcoded elements
    let customerName = "Badr Allonso";
    let address = "My shop LTD";
    let returnNumber = "RETURN-NR-1";

    //  function for downloading the label
    const downloadLabel = () => {
        // Logic to download the label
    };

    //  function for confirming the RMA request
    const confirmRequest = () => {
        // Logic to confirm the RMA request
    };
</script>

<div class="rma-barcode-container">
    <h1>Create a RMA Request</h1>
    <div class="barcode-section">
        <div class="customer-info">
            {customerName}<br>
            {address}
        </div>
        <div class="barcode">
            <!-- Here we would render the actual barcode. For now, it's a placeholder -->
            <img src="/barcode.png" alt="Barcode" />
            <p>{returnNumber}</p>
        </div>
    </div>
    <div class="actions">
        <button on:click={downloadLabel} class="download-label">Download Label</button>
        <button on:click={confirmRequest} class="confirm-request">Confirm Request</button>
    </div>
</div>

<style>
    .rma-barcode-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        text-align: center;
    }

    .barcode-section {
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 2rem;
    }

    .customer-info {
        margin-bottom: 1rem;
    }

    .barcode img {
        display: block;
        margin: 0 auto;
        width: 200px;
        height: 60px;
    }

    .barcode p {
        margin-top: 0.5rem;
    }

    .actions button {
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, box-shadow 0.3s;
    }

    .download-label {
        background-color: #e0e0e0;
    }

    .confirm-request {
        background-color: #d32f2f;
        color: white;
    }

    .download-label:hover {
        background-color: #bdbdbd;
    }

    .confirm-request:hover {
        background-color: #b71c1c;
    }
</style>
