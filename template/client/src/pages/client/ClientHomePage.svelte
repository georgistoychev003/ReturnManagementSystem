<script>
    import { onMount } from 'svelte';

    let userName = "Mr Zanoni"; // Temporary placeholder

    onMount(() => {
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
</script>


<div class="client-home-page">
    <div class="greeting">
        <h1>Hello {userName}!</h1>
        <hr>
    </div>

    <div class="rma-steps">
        <h2>Return Process:</h2>
        <ol>
            <li>Navigate to "My Orders" page.</li>
            <li>Select the order you want to return by clicking on Order Details.</li>
            <li>Select quantity, click on "Return Selected Products".</li>
            <li>Add a comment regarding the return.</li>
            <li>Print and attach the label to your package</li>
        </ol>
    </div>
</div>

<style>
    .client-home-page {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
        text-align: center;
        box-sizing: border-box; /* Ensure padding is included in the width */
    }

    .greeting h1 {
        margin-bottom: 1rem;
        font-size: 2rem; /* Larger text by default */
    }

    hr {
        margin-bottom: 2rem;
    }

    .rma-steps h2 {
        margin-bottom: 1rem;
    }

    ol {
        counter-reset: step;
        text-align: left;
        padding-left: 0;
        margin-left: 0; /* Reset default margin */
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
        .greeting h1 {
            font-size: 1.5rem; /* Smaller text for small screens */
        }

        ol li {
            padding: 0.75rem; /* Smaller padding for small screens */
        }

        ol li::before {
            left: -25px; /* Position the counter closer to the edge */
            width: 25px;
            height: 25px;
            font-size: 0.75rem; /* Smaller font size for the counter */
        }
    }
</style>