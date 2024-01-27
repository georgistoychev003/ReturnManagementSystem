<script>
    export let currentStep = 1;
    const totalSteps = 5; // Total number of steps

    let progressPercentage = (currentStep / totalSteps) * 100;
</script>

<div class="progress-bar-container">
    <div class="progress-bar" style="width: {progressPercentage}%;"></div>
    {#each Array(currentStep) as _, index}
        <div class="progress-label-container" style="left: calc({(index + 1) * 100 / totalSteps}% - 15px);">
            <div class="progress-label">{index + 1}</div>
        </div>
    {/each}
</div>

<style>
    .progress-bar-container {
        position: relative;
        width: 100%;
        background-color: #f2f2f2;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .progress-bar {
        height: 20px;
        background-color: #007BFF;
        transition: width 0.3s;
    }

    .progress-label-container {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .progress-label {
        display: inline-block;
        font-size: 18px; /* Adjust the font size as needed */
        color: #fff; /* White color */
        background-color: #007BFF; /* Blue color for the circle */
        border-radius: 50%; /* Creates a circular shape */
        padding: 8px; /* Adjust the padding as needed */
    }
</style>