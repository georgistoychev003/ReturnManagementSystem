<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import page from "page";
    export let selectedProduct;

    let videoElement;
    let canvasElement;
    let snapshotSrc; // This will hold the image data URL for display purposes

    const dispatch = createEventDispatcher();
    let description = '';
    let productImageDataList = [];
    let selectedFile;
    let selectedImageUrl;


    onMount(() => {
        startCamera();
    });

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
        } catch (error) {
            console.error('Error starting the camera:', error);
        }
    }

    // function takeSnapshot() {
    //     const context = canvasElement.getContext('2d');
    //     canvasElement.width = videoElement.videoWidth;
    //     canvasElement.height = videoElement.videoHeight;
    //     context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
    //     snapshotSrc = canvasElement.toDataURL('image/png');
    //     handleProductInteraction({ product: selectedProduct, imageData: snapshotSrc });
    // }

    function handleProductInteraction({ product, imageData }) {
        const existingIndex = productImageDataList.findIndex(item => item.product.productId === product.productId);
        if (existingIndex !== -1) {
            productImageDataList[existingIndex].imageData = imageData;
        } else {
            productImageDataList.push({ product: product.productId, image: imageData });
        }
        console.log('Product and Image Data List:', productImageDataList);
    }

    function handleFileChange(event) {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                selectedImageUrl = e.target.result;
                snapshotSrc = selectedImageUrl;
            };
            reader.readAsDataURL(selectedFile);
        } else {
            console.log('No file selected');
        }
    }

    async function handleUpload() {
        let imageData = '';
        if (selectedImageUrl) {
            imageData = selectedImageUrl.split(',')[1]; // Get the Base64 encoded string
        }

        // Check if the description is not empty
        if (description.trim() === '') {
            alert('Please add a description before submitting.');
            return false;
        }

        try {
            const response = await fetch(`http://localhost:3000/rma/collector/${selectedProduct.productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    collectorImage: imageData,
                    collectorDescription: description
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Details updated successfully: ' + result.message);
                page('/RMAProducts/' + selectedProduct.rmaId);
                location.reload();
            } else {
                alert('Failed to update details: ' + result.error);
            }
        } catch (error) {
            console.error('Error updating details:', error);
            alert('Error occurred while updating details');
        }

        return true; // Return true to indicate successful processing
    }
    function closeDetails() {
        dispatch('close');
    }


    async function submitDetails() {
        const uploadSuccess = await handleUpload();
        if (uploadSuccess) {
            alert("You successfully processed this product and it will be forwarded to the controller!");
            page('/RMAProducts/' + selectedProduct.rmaId);
        }
    }
</script>

<!-- Camera stream and snapshot section -->
<div class="camera-container">
    <!-- Ensure these elements exist in your markup with the correct classes or IDs -->
    <video class="camera-stream" bind:this={videoElement} autoplay></video>
    <canvas class="snapshot-canvas" bind:this={canvasElement}></canvas>
<!--    <button on:click={takeSnapshot}>Take Snapshot</button>-->
    {#if snapshotSrc}
<!--        <img class="snapshot-image" src={snapshotSrc} alt="Snapshot" />-->
    {/if}
</div>

<!-- Add only one file input for image upload -->
<input type="file" accept="image/*" on:change={handleFileChange}>

<!-- Show the selected image preview -->
{#if selectedImageUrl}
    <img src={selectedImageUrl} alt="Preview" />
{/if}

<!-- Product details section -->
<div class="product-detail-container">
    <button class="close-button" on:click={closeDetails}>Close</button>
    <h2>Product Return Details - {selectedProduct.type}</h2>
    <div class="product-info">
        <!-- Ensure this image src path is correct -->
        <img class="product-image" src={selectedProduct.productImage} alt={`Product ${selectedProduct.productId}`} />
        <p>Type: {selectedProduct.type}</p>
        <p>Quantity: {selectedProduct.quantity}</p>
        <p>Price: ${selectedProduct.price.toFixed(2)}</p>
        <p>Date: {new Date(selectedProduct.date).toLocaleDateString()}</p>
    </div>
    <textarea class="description-input" bind:value={description} placeholder="Add a description for the return"></textarea>
    <button class="submit-button" on:click={submitDetails}>Submit Details</button>
</div>



<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8f9fa;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .product-detail-container {
        max-width: 700px;
        margin: 40px auto;
        padding: 20px;
        background: #ffffff; /* Fallback for older browsers */
        background: linear-gradient(to bottom right, #ffffff, #f1f1f1);
        border-radius: 20px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        color: #212529;
        position: relative;
        transition: all 0.3s ease;
    }

    .close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 8px 20px;
        background-color: #dc3545;
        color: #ffffff;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        transition: background-color 0.2s;
        font-weight: bold;
    }

    .close-button:hover {
        background-color: #c82333;
    }
    /* Image upload styles */
    input[type="file"] {
        width: 100%;
        padding: 0.5em;
        margin-top: 1em;
        border: 1px solid #ced4da;
        border-radius: 0.3em;
        font-size: 1em;
        cursor: pointer;
        box-sizing: border-box;
    }

    /* Image display styles */
    .snapshot-image, .product-image {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        padding: 10px;
    }

    /* Responsive design adjustments */
    @media (max-width: 768px) {
        .product-detail-container {
            margin: 20px;
            padding: 10px;
        }

        .product-info {
            flex-direction: column;
            align-items: flex-start;
        }

        .product-image {
            width: 100%;
            margin-bottom: 20px;
        }

        .description-input, .submit-button {
            width: calc(100% - 20px);
            padding: 15px;
        }
    }

    @media (max-width: 768px) {
        .product-item {
            flex-basis: 100%; /* Full width on small screens */
        }
    }


    .product-info {
        display: flex;
        align-items: center;
        margin-top: 30px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 15px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
    }

    .product-image {
        width: 120px;
        height: auto;
        border-radius: 15px;
        margin-right: 20px;
    }

    .product-info-text {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 5px;
        font-size: 18px;
        color: #495057;
    }

    .product-info-text > div {
        background-color: #e9ecef;
        padding: 10px;
        border-radius: 10px;
    }

    .image-upload-label {
        display: inline-block;
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-top: 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .image-upload-label:hover {
        background-color: #218838;
    }

    .camera-stream {
        width: 50%; /* Set the width as desired */
        display: none; /* Hide the video element by default */
    }

    .snapshot-canvas {
        display: none; /* Hide the canvas element by default */
    }

    .snapshot-image {
        width: 50%; /* Set the width as desired */
        margin-top: 10px;
    }

    input[type="file"] {
        /*display: none;*/
        margin-top: 10px; /* Add some space above the file input */
    }

    .description-input {
        width: calc(100% - 40px);
        height: 120px;
        margin-top: 20px;
        padding: 10px 20px;
        border: 1px solid #ced4da;
        border-radius: 15px;
        background-color: #f8f9fa;
        resize: none;
    }

    .submit-button {
        width: 100%;
        padding: 10px 0;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50px;
        margin-top: 20px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s;
    }

    .submit-button:hover {
        background-color: #0069d9;
    }

    @media (max-width: 768px) {
        .product-info {
            flex-direction: column;
            align-items: flex-start;
        }

        .product-image {
            width: 100%;
            margin-bottom: 20px;
        }

        .description-input, .submit-button {
            width: 100%;
            padding: 15px;
        }
    }

</style>
