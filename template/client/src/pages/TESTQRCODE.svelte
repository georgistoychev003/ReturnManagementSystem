<script>
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
</script>

<div id="qrcode-container">
    <!-- Display the QR code here -->
    {@html qrCodeSVG}
</div>

<button on:click={generateQRCode}>Generate QR Code</button>
<button on:click={openQRCodeInNewTab}>Open QR Code in New Tab</button>

<style>
    /* Add your CSS styles here */
</style>