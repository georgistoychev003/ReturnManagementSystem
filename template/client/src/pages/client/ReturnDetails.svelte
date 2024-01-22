<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import page from "page";
    export let selectedProduct;

    let videoElement;
    let canvasElement;
    let imageData; // This will hold the Blob data of the image
    let snapshotSrc; // This will hold the image data URL for display purposes


    const dispatch = createEventDispatcher();
    let images = [];
    let description = '';

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

    function takeSnapshot() {
        const context = canvasElement.getContext('2d');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
        snapshotSrc = canvasElement.toDataURL('image/png'); // For displaying the snapshot on the page
        // Convert canvas to Blob and store in imageData
        canvasElement.toBlob(blob => {
            imageData = blob;
        }, 'image/png');
    }
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // we need to handle the file upload to the server here too
            images.push(URL.createObjectURL(file));
        }
    }



    function closeDetails() {
        dispatch('close');
    }

    function submitDetails() {
        // Here we should handle the submission logic
        alert("You successfully processed this product and it will be forwarded to the controller!")
        page('/RMAProducts/' + selectedProduct.rmaId);
    }

    async function handleUpload() {
        const formData = new FormData();
        // Omit the image data since you're not sending an actual image file for now
        // formData.append('image', 'hardcoded_image_string');
        formData.append('collectorDescription', description);

        try {
            const response = await fetch(`http://localhost:3000/rma/collector/${selectedProduct.productId}`, {
                method: 'PUT',
                headers: {
                    // If you're sending a JSON object now, you need to set the header accordingly
                    'Content-Type': 'application/json'
                },
                // Convert your formData to a JSON string
                body: JSON.stringify({
                    collectorImage: 'hardcoded_image_string',
                    collectorDescription: description
                })
            });

            if (response.ok) {
                const result = await response.json();
                alert('Details updated successfully: ' + result.message);
                page('/RMAProducts/' + selectedProduct.rmaId);
                location.reload();

            } else {
                const errorResult = await response.json();
                alert('Failed to update details: ' + errorResult.error);
            }
        } catch (error) {
            console.error('Error updating details:', error);
            alert('Error occurred while updating details');
        }
    }


</script>
<!-- Camera stream and snapshot section -->
<div class="camera-container">
    <video class="camera-stream" bind:this={videoElement} autoplay></video>
    <canvas class="snapshot-canvas" bind:this={canvasElement} style="display: none;"></canvas>
    <button on:click={takeSnapshot}>Take Snapshot</button>
    {#if snapshotSrc}
        <img class="snapshot-image" src={snapshotSrc} alt="Snapshot" />
        <button on:click={handleUpload}>Upload Snapshot</button>
    {/if}
</div>

<!-- Product details section -->
<div class="product-detail-container">
    <button class="close-button" on:click={closeDetails}>Close</button>
    <h2>Product Return Details - {selectedProduct.type}</h2>
    <div class="product-info">
        <img class="product-image" src={selectedProduct.productImage} alt={`Product ${selectedProduct.productId}`} />
        <p>Type: {selectedProduct.type}</p>
        <p>Quantity: {selectedProduct.quantity}</p>
        <p>Price: ${selectedProduct.price.toFixed(2)}</p>
        <p>Date: {new Date(selectedProduct.date).toLocaleDateString()}</p>
    </div>
    <div class="image-upload-section">
        <label for="image-upload" class="image-upload-label">Upload Product Image</label>
        <input id="image-upload" type="file" on:change={handleImageUpload} />
        {#each images as image, index (image)}
            <img class="uploaded-image" src={image} alt={`Uploaded ${index}`} />
        {/each}
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
        display: none;
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
