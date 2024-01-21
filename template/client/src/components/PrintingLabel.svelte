<script>
    export let shippingInfo;

    import { onMount } from 'svelte';

    let qrCodeData = 'yourData'; // Replace with the actual data you want in the QR code
    let qrCodeSVG = ''; // Variable to store the generated QR code SVG

    async function displayQRCode() {
        const response = await fetch(`http://localhost:3000/barcode/generateBarcode/user/1`);
        qrCodeSVG = await response.text();
    }

    function generateQRCode() {
        displayQRCode();
    }

    // Call displayQRCode when the component is mounted
    onMount(() => {
        displayQRCode();
    });

    function openQRCodeInNewTab() {
        const qrCodeWindow = window.open('', '_blank');
        qrCodeWindow.document.write(qrCodeSVG);
    }

    function printLabel() {
        // Use the browser's print functionality to print the shipping label
        window.print();
    }
</script>




<div class="shipping-label">
    <div class="label-image" style="background-color: white;">
        <div id="qrcode-container">
            <!-- Display the QR code here -->
            {@html qrCodeSVG}
        </div>
    </div>

    <div class="recipient-info">
        <p class="label">Recipient:</p>
        <p>{shippingInfo.recipientName}</p>
        <p>{shippingInfo.recipientAddress}</p>
        <p>{shippingInfo.recipientCity}, {shippingInfo.recipientState} {shippingInfo.recipientZip}</p>
    </div>

    <div class="sender-info">
        <p class="label">Sender:</p>
        <p>{shippingInfo.senderName}</p>
        <p>{shippingInfo.senderAddress}</p>
        <p>{shippingInfo.senderCity}, {shippingInfo.senderState} {shippingInfo.senderZip}</p>
    </div>
</div>
<h2>Please print and attach the label to the package</h2>


<button class="print-button" on:click={printLabel}>Print Label</button>

<style>
    .shipping-label {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30em;
        width: 90em;
    }

    .label-image {
        flex: 1; /* Make the barcode section expand to fill available space */
        margin-left: 2em;


    }

    #qrcode-container{
        width: 30em;
    }

    .label-image img {
        max-width: 100%;
        height: 100%;
        object-fit: cover; /* Ensure the image shrinks to fit within the container's height */
    }
    .recipient-info,
    .sender-info {
        margin: 5em;
        font-size: larger;
    }

    .label {
        font-weight: bold;
    }

    .print-button {
        padding: 10px 15px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
    }

    /* Hide the button when printing */
    @media print {
        .print-button {
            display: none;
        }
    }
</style>
