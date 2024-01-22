<script>
    export let shippingInfo;

    import { onMount } from 'svelte';
    import {userIdStore} from "../Store.js";import html2pdf from 'html2pdf.js';

    let contentElement;
    let qrCodeData = 'yourData';
    let qrCodeSVG = '';
    let userId = $userIdStore;


    function downloadPDF() {
        html2pdf()
            .from(contentElement)
            .toPdf()
            .save('download.pdf');
    }

    async function displayQRCode() {
        try {
            // Fetch the last RMA ID
            const response = await fetch(`http://localhost:3000/rma/returns/last/rma`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const rmaId = data.RMAId; // It fetches quicker than the post from the prviouse page; // Extract rmaId from response

            console.log("RMA ID:", rmaId);

            // Fetch the QR code using the RMA ID
            const response2 = await fetch(`http://localhost:3000/barcode/generateBarcode/rmaId/${rmaId}`);
            if (!response2.ok) {
                throw new Error(`HTTP error! Status: ${response2.status}`);
            }

            qrCodeSVG = await response2.text();
        } catch (error) {
            console.error('Error fetching RMA ID:', error);
        }
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



<div bind:this={contentElement}>
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

</div>
<h2>Please print and attach the label to the package</h2>
</div>

<button class="print-button" on:click={printLabel}>Print Label</button>
<button class="print-button" on:click={downloadPDF}>Download as PDF</button>

<style>
    .shipping-label {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center align items for better presentation */
        max-width: 30em; /* Adjust as needed */
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc; /* Optional: for visual structure */
        border-radius: 10px; /* Optional: for rounded corners */
        background-color: #f9f9f9; /* Light background */
    }

    .label-image {
        background-color: white;
        padding: 10px; /* Add some padding around QR code */
        margin-bottom: 20px; /* Space between QR code and recipient info */
    }

    .recipient-info {
        text-align: left; /* Align text to the left */
        font-size: 25px;
    }

    .recipient-info p {
        margin: 5px 0; /* Spacing between lines */
    }

    .label {
        font-weight: bold; /* Make label text bold */
    }

    #qrcode-container{
        width: 20em;
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
