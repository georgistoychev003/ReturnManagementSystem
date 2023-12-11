<script>
    let selectedAction = null;

    const selectAction = (action) => {
        selectedAction = action;
    };
</script>

<div class="request-card">
    <div class="request-header">
        REQUEST XX
    </div>
    <div class="details-section">
        <div class="details">
            <h2>DETAILS:</h2>
            <p>PRODUCTS: XXXXXX XXXXXX</p>
            <p>DATE: XXXXXX</p>
            <p>CUSTOMER NAME: XXXXXXX</p>
            <p>COMMENTS: XXXXXXXX XXXXXXXXX</p>
            <div class="label">
                <img src="barcode.png" alt="Barcode" />
            </div>
        </div>
        <div class="status-section">
            <p>STATUS: XXXXXXXXX</p>
            <div class="image-placeholder"></div>
            <p>DESCRIPTION: XXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            <div class="actions">
                <button
                        class="action-btn"
                        class:selected={selectedAction === 'refund'}
                        on:click={() => selectAction('refund')}>
                    REFUND CUSTOMER, SEND TO STOCK
                </button>
                <button
                        class="action-btn"
                        class:selected={selectedAction === 'damage'}
                        on:click={() => selectAction('damage')}>
                    PRODUCT DAMAGED, NOTIFY CUSTOMER
                </button>
            </div>
            <button class="confirm-btn">CONFIRM</button>
        </div>
    </div>
</div>

<style>
    .request-card {
        display: flex;
        flex-direction: column;
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
    }
    .request-header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .details-section {
        display: flex;
    }
    .details {
        flex: 1;
    }
    .status-section {
        flex: 1;
        padding-left: 20px;
        border-left: 1px solid #ccc;
    }
    .image-placeholder {
        width: 100px;
        height: 100px;
        background-color: #eee;
        margin: 10px 0;
    }
    .label img {
        width: 100%;
    }
    .actions {
        display: flex;
        flex-direction: column;
    }
    .action-btn {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }
    .action-btn.selected {
        background-color: #007BFF;
        color: white;
        transform: scale(1.05);
    }
    .confirm-btn {
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>