<script>
    // once the authorization with a token is donee, this will be replaced to obtain the username of the user
    // from the payload of the token stored in a tokenstore here on the client side
    import Header from "../../components/Header.svelte";

    let userName = "Mr Zanoni";


    const seeMore = () => {
        // here the logic to show more inbox messages will be put
    };

    // Function to handle the discover items action
    const shopOnline = () => {

    };
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
    }

    .greeting h1 {
        margin-bottom: 1rem;
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
</style>