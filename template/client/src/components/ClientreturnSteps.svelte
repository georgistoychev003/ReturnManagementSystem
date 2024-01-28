<script>

</script>

<div class="rma-steps">
    <h2>Return Process:</h2>
    <ol>
        <li>Navigate to "My Orders" page.</li>
        <li>Select the order you want to return by clicking on Order Details.</li>
        <li>Select quantity, click on "Return Selected Products".</li>
        <li>Add a comment regarding the return.</li>
        <li>Print and attach the label to your package.</li>
    </ol>
</div>

<style>
    .rma-steps h2 {
        margin-bottom: 1rem;
    }

    ol {
        counter-reset: step;
        text-align: left;
        padding-left: 0;
        margin-left: 0;
    }

    ol li {
        background-color: #f0f0f0;
        counter-increment: step;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        position: relative;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    ol li::before {
        content: counter(step);
        position: absolute;
        left: -30px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #007BFF;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    ol li:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 600px) {
        ol li {
            padding: 0.75rem;
        }

        ol li::before {
            left: -25px;
            width: 25px;
            height: 25px;
            font-size: 0.75rem;
        }
    }
</style>
