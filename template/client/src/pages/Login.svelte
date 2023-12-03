<script>

    import page from 'page';

    let username = '';
    let password = '';



</script>

<div class="auth-container">
    <h2>Login</h2>
    <form>
        <div class="input-group">
            <label for="username">Username</label>
            <input type="username" bind:value={username} id="username" placeholder="Enter your username" required />
        </div>

        <div class="input-group">
            <label for="password">Password</label>
            <input type="password" bind:value={password} id="password" placeholder="Enter your password" required />
        </div>

    </form>
</div>



<style>
    main{
        width: 90%;
        height: 90%;
        margin: 5% 5% 5% 5%;
    }
    .auth-container {
        background-color: var(--secondary-bg);
        color: var(--secondary-txt);
        max-width: 400px;
        margin: 4em auto;
        padding: 2em;
        border: 1px solid var(--highlight);
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    h2 {
        text-align: center;
        margin-bottom: 1em;
        color: var(--highlight);
    }

    .input-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        padding: 10px 15px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>



