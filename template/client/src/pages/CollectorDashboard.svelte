<script>
    import {onMount} from "svelte";
    import page from 'page';
    import jsQR from 'jsqr';
    let videoElement;
    let canvasElement;
    let canvasContext;


    let name = 'COLLECTOR NAME'; // You can set a default name here
    let videoElementCreated = false; // Flag to track whether the video element is created
    let barcode;
    function greet() {
        alert(`HELLO COLLECTOR NAME ${name}`);
    }

    onMount(() => {
        canvasElement = document.createElement('canvas');
        canvasContext = canvasElement.getContext('2d');
    });

    async function scanBarcode() {
        if (!videoElement) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.setAttribute('autoplay', '');
                videoElement.setAttribute('playsinline', ''); // needed for iOS
                videoElement.addEventListener('loadeddata', onCameraStreamReceived);
                document.body.appendChild(videoElement);
            } catch (err) {
                console.error('Error accessing the camera: ', err);
            }
        }
    }

    function onCameraStreamReceived() {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        scanQRCode();
    }

    function scanQRCode() {
        requestAnimationFrame(scanQRCode);
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        let imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
        let qrCodeData = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCodeData) {
            console.log('QR Code detected: ', qrCodeData.data);
            // Stop the camera and further scanning
            videoElement.srcObject.getTracks().forEach(track => track.stop());
            videoElement.remove();
            // Process the QR code data
            barcode = qrCodeData.data;
            // Continue with our application logic
            page(`/RMAProducts/${barcode}`);
        }
    }

    function submitReturnId() {
        const returnId = document.getElementById('returnIdInput').value;

        // Check if the input field is not empty
        if (returnId.trim() !== '') {
            // Navigate to RMAProducts page
            page('/RMAProducts');
        } else {
            alert("Please enter a Return ID");
        }
    }
    async function fetchUserDetails() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(`http://localhost:3000/rma/${barcode}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    name = data.barcode;
                    barcode = data.barcode;
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
</script>

<div>
    <h1>HELLO {name}</h1>
    <div class="separator"></div>
    <div class="buttons-container">
        <button class="button" on:click={scanBarcode}>Scan Barcode</button>

        <!-- Replace the "Fill in returnId" button with an input field and a submit button -->
        <div class="returnId-container">
            <input type="text" id="returnIdInput" placeholder="Enter Return ID">
            <button class="button submit-button" on:click={submitReturnId}>Submit</button>
        </div>
    </div>

    <p class="text-below-button">PLEASE HOLD THE CAMERA 2 CM AWAY FROM BARCODE</p>
</div>

<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    div {
        text-align: center;
    }

    h1 {
        font-size: 4vh;
        margin-bottom: 1vh;
    }

    .separator {
        border-top: 2px solid lightblue;
        margin: 1vh 5vw;
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3vh;
    }

    .button {
        margin: 1vh;
        padding: 2vh 3vw;
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.5vh;
    }

    .returnId-container {
        display: flex;
        margin-top: 1vh;
    }

    #returnIdInput {
        padding: 1vh;
        font-size: 1.5vh;
    }

    .submit-button {
        margin-left: 1vh;
        background-color: green;
    }

    .text-below-button {
        text-align: center;
        margin-top: 1vh;
        font-size: 1.5vh;
    }
</style>