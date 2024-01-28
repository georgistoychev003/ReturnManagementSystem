<script>
    export let shippingInfo;

    import { onMount } from 'svelte';
    import {userIdStore} from "../Store.js";import html2pdf from 'html2pdf.js';

    let contentElement;
    let qrCodeData = 'yourData';
    let qrCodeSVG = '';
    let userId = $userIdStore;
    let showPrintMessage = true;


    function downloadPDF() {
        html2pdf()
            .from(contentElement)
            .toPdf()
            .save('My_shopRMA-label.pdf');
    }

    async function displayQRCode() {
        try {
            // Fetch the last RMA ID
            const response = await fetch(`http://localhost:3000/rma/returns/last/rma`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const rmaId = data.RMAId; // It fetches quicker than the post from the previous page;

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

    onMount(() => {
        displayQRCode();
    });

    function openQRCodeInNewTab() {
        const qrCodeWindow = window.open('', '_blank');
        qrCodeWindow.document.write(qrCodeSVG);
    }

    function printLabel() {
        showPrintMessage = false;
        window.print();
        showPrintMessage = true;
    }
</script>

<h1 class="message">This was your last step, your return request will now be processed!</h1>

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
</div>

<button class="print-button" on:click={printLabel}>Print Label</button>
<button class="print-button" on:click={downloadPDF}>Download as PDF</button>

<h2 class="message">Please print and attach the label to the package</h2>

<style>
    .shipping-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 30em;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #f9f9f9;
    }

    .label-image {
        background-color: white;
        padding: 10px;
        margin-bottom: 20px;
    }

    .recipient-info {
        text-align: left;
        font-size: 25px;
    }

    .recipient-info p {
        margin: 5px 0;
    }

    .label {
        font-weight: bold;
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

    @media print {
        .print-button  {
            display: none;
        }
    }
    @media print {
        .message  {
            display: none;
        }
    }

</style>
