<script>
    // once the authorization with a token is donee, this will be replaced to obtain the username of the user
    // from the payload of the token stored in a tokenstore here on the client side
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

    <div class="inbox">
        <h2>Inbox:</h2>
        <div class="message-preview">
            Congratulations! Your return is successful. You will get...
            <button on:click={seeMore}>See More</button>
        </div>
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

    .inbox h2, .discover h2 {
        margin-bottom: 1rem;
    }

    .message-preview {
        background-color: #f0f0f0;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
    }

    button {
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 1rem;
    }

    button:hover {
        background-color: #0056b3;
    }

    .discover a {
        color: #007BFF;
        text-decoration: none;
    }

    .discover a:hover {
        text-decoration: underline;
    }
</style>
