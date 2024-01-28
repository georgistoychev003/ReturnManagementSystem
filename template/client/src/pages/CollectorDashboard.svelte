<script>
    import {onMount} from "svelte";
    import page from 'page';
    import jsQR from 'jsqr';
    let videoElement;
    let canvasElement;
    let canvasContext;

    let isCameraModalOpen = false;



    let videoElementCreated = false; // Flag to track whether the video element is created
    let barcode;
    function greet() {
        alert(`HELLO COLLECTOR NAME ${userName}`);
    }
    let userName = "Mr Zanoni"; // Temporary placeholder


    onMount(() => {
        canvasElement = document.createElement('canvas');
        canvasContext = canvasElement.getContext('2d');
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // Decoding from Base64URL
                userName = payload.userName;
            } catch (e) {
                console.error('Error parsing the token', e);
            }
        } else {
            userName = "Guest"; // Fallback if there is no token or it's invalid
        }
    });

    async function scanBarcode() {

            isCameraModalOpen = true;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.setAttribute('autoplay', '');
                videoElement.setAttribute('playsinline', ''); // needed for iOS
                videoElement.addEventListener('loadeddata', onCameraStreamReceived);
                //document.body.appendChild(videoElement);
                document.getElementById('camera-modal').appendChild(videoElement);

            } catch (err) {
                console.error('Error accessing the camera: ', err);
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

    function closeCameraModal() {
        isCameraModalOpen = false;

        if (videoElement) {
            videoElement.srcObject.getTracks().forEach(track => track.stop());
            videoElement.remove();


        }
    }
    function toggleMenu() {
        var menu = document.getElementById('instructionsMenu');
        if (menu.style.opacity === "0") {
            menu.style.opacity = "1";
            menu.style.visibility = "visible";
            menu.style.transform = "translateY(0)";
        } else {
            menu.style.opacity = "0";
            menu.style.visibility = "hidden";
            menu.style.transform = "translateY(100%)";
        }
    }
</script>

<div>
    <h1> {userName}, welcome to your collector's dashboard</h1>
    <div class="separator"></div>
    <div class="buttons-container">
        <button class="button" on:click={scanBarcode}>Scan Barcode</button>
    </div>

    <p class="text-below-button">PLEASE HOLD THE CAMERA 2 CM AWAY FROM BARCODE</p>
    {#if isCameraModalOpen}
        <div id="camera-modal" class="camera-modal">
            <div class="modal-frame">

                <!-- Add a cancel button to close the modal -->
                <button class="button cancel-button" on:click={closeCameraModal}>Cancel</button>
                <!-- Add other camera modal content here -->
            </div>
        </div>
    {/if}
    <button class="menu-toggle" on:click={toggleMenu}>Handling Instructions</button>
    <div class="menu" id="instructionsMenu">
        <div class="menu-header">Handling Instructions</div>
        <ul class="menu-list">
            <li>Scan Barcode</li>
            <li>Click on a product from the fetched RMA</li>
            <li>Upload an image of the product and a description of its state</li>
            <li>Press the Submit Details button</li>
        </ul>
    </div>
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
    .menu-toggle {
        background-color: #ff6f61;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.3s;
        font-weight: bold;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 100;
    }

    .menu-toggle:hover {
        background-color: #e85a50;
    }

    .menu {
        position: fixed;
        right: 20px;
        bottom: 70px;
        background: white;
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        width: 300px;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
        opacity: 0;
        visibility: hidden;
    }

    .menu-header {
        background: #ff6f61;
        color: white;
        padding: 10px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        font-weight: bold;
    }

    .menu-list {
        list-style: none;
        padding: 20px;
        margin: 0;
    }

    .menu-list li {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .menu-list li:last-child {
        border: none;
    }


    @media only screen and (max-width: 600px) {
        .menu-toggle {
            padding: 5px 10px;
            font-size: 12px;
        }

        .menu {
            width: 90%;
            right: 5%;
            bottom: 60px;
        }
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

    #returnIdInput {
        padding: 1vh;
        font-size: 1.5vh;
    }

    .text-below-button {
        text-align: center;
        margin-top: 1vh;
        font-size: 1.5vh;
    }

    .camera-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        transition: opacity 0.5s ease;
        border: 2px solid red;
    }

    .modal-frame {
        background-color: white;
        padding: 0px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        position: relative;

    }

    .cancel-button {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>