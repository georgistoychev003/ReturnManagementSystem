<script>
    let username = '';
    let email = '';
    let password = '';
    let repeatPassword = '';
    let address = '';

    const createUser = () => {
        // we have to implement user creation logic
        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Creating user:', { username, email, password, address });
        // send request to back to create the user
    };
</script>

<div class="registration-form">
    <h2>USER REGISTRATION</h2>
    <input type="text" bind:value={username} placeholder="Username" required>
    <input type="email" bind:value={email} placeholder="Email" required>
    <input type="password" bind:value={password} placeholder="Password" required>
    <input type="password" bind:value={repeatPassword} placeholder="Repeat Password" required>
    <input type="text" bind:value={address} placeholder="Address" required>
    <button class="create-user-button" on:click={createUser}>Create User</button>
</div>

<style>
    .registration-form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 2rem auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h2 {
        text-align: center;
        margin-bottom: 1rem;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
        padding: 10px;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .create-user-button {
        padding: 10px;
        background-color: #d9534f;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        text-transform: uppercase;
        font-weight: bold;
    }

    .create-user-button:hover {
        background-color: #c9302c;
    }
</style>


