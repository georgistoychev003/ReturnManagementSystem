<script>
    // once the authorization with a token is donee, this will be replaced to obtain the username of the user
    // from the payload of the token stored in a tokenstore here on the client side
    let userName = "Mr Zanoni";
</script>

<div class="controller-home">
    <div class="greeting">
        <h1>Hello {userName}!</h1>
        <hr>
    </div>
</div>

<style>
    .controller-home {
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
