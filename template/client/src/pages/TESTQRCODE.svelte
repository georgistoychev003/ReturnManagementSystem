
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Example</title>
</head>
<body>
<div id="qrcode-container">
    <!-- The QR code will be displayed here -->
</div>
<button onclick="generateQRCode()">Generate QR Code</button>
<script src="https://cdn.jsdelivr.net/qrcode/1.4.4/qrcode.min.js"></script>
<script>
    // Function to fetch QR code from the server and display it
    async function displayQRCode() {
        const data = 'yourData'; // Replace with the actual data you want in the QR code
        const response = await fetch(`http://localhost:3000/barcode/generateBarcode/user/1`);
        const qrCodeSVG = await response.text();

        // Display the QR code in the specified container
        const container = document.getElementById('qrcode-container');
        container.innerHTML = qrCodeSVG;
    }

    // Function to be called when the button is clicked
    function generateQRCode() {
        displayQRCode();
    }
</script>
</body>

