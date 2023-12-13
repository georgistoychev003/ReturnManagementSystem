<script>
    let name = 'COLLECTOR NAME'; // You can set a default name here

    function greet() {
        alert(`HELLO COLLECTOR NAME ${name}`);
    }
    async function scanBarcode() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.setAttribute('autoplay', '');
            document.body.appendChild(videoElement);
        } catch (err) {
            console.error('Error accessing the camera: ', err);
        }
    }

</script>


<div>
    <h1>HELLO {name}</h1>
    <div class="separator"></div>
    <div class="buttons-container">
        <button class="button" on:click={scanBarcode}>Scan Barcode</button>
        <button class="button" on:click={() => console.log('Fill in returnId')}>Fill-in return id</button>
    </div>
    <p class="text-below-button">PLEASE HOLD THE CAMERA 2 CM AWAY FROM BARCODE</p>
</div>

<style>


    h1 {
        size: 1vh;
        font-size: 4vh;

    }
    .separator {
        border-top: 2px solid lightblue;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    .buttons-container {
        display: flex;
        justify-content: center;
        margin-top: 25vh;
    }

    .button {
        margin: 0 4vh;
        padding: 2vh 3vw;
        background-color: red;
        color: white;
        border: none;
        border-radius: 0px;
        cursor: pointer;
    }

    .text-below-button {
        text-align: center;
        margin-top: 1vh;
    }
</style>