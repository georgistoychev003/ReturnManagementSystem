<script>
    import page from 'page';
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import {userEmail} from "../Store.js";


    onMount(() => {
        clearToken();
    });

    function clearToken() {
        localStorage.removeItem('token');
    }

    let username = '';
    let password = '';
    let userId = '';

    const login = async () => {
        const response = await fetch('http://localhost:3000/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username, // Change to 'username' if your backend expects a username
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.token)
            localStorage.setItem('token', data.token);
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            userId = payload.id; // Extract the user ID from the token payload
            username = payload.email;
            //userEmail.set(username);
            redirectToRolePage(payload.role);
        } else {
            console.error(data.error);
        }
    };

    function redirectToRolePage(role) {
        console.log("switching")
        switch(role) {
            case 'customer':
                console.log("switched")
                window.location.href='/client';
                break;
            case 'admin':
                window.location.href='/admin';
                break;
            case 'collector':
                window.location.href='/collector';
                break;
            case 'controller':
                window.location.href='/controller';
                break;
            default:
                page('/');
        }
    }
</script>

<div class="auth-container">
    <div class="logo">
        <img class="logo" src="https://myshop.s3-external-3.amazonaws.com/shop6116500.images.logo-myshop.webp" alt="Logo">
    </div>
    <h2>LOGIN</h2>
    <form on:submit|preventDefault={login}>
        <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" bind:value={username} id="username" placeholder="Enter your username" required />
        </div>

        <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" bind:value={password} id="password" placeholder="Enter your password" required />
        </div>

        <div class="forgot-password">
            <a href="/forgot-password" on:click|preventDefault={() => page('/forgot-password')}>Forgot your password?</a>
        </div>

        <button type="submit" class="login-btn">Login</button>
    </form>
</div>

<style>
    :root {
        --gradient-start: #6dd5ed;
        --gradient-end: #000000;
        --btn-hover: #880000;
        --btn-active: rgba(231, 72, 36, 0.2);
        --input-focus: rgba(255, 255, 255, 0.8);
        --input-color: rgb(136, 0, 0);
    }

    .auth-container {
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        max-width: 400px;
        margin: 10vh auto;
        padding: 2em;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        overflow: hidden;
        position: relative;
    }

    .auth-container:before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        background: linear-gradient(45deg, rgba(2, 32, 84, 0.5) 0%, rgba(22, 99, 232, 0.5) 99%, rgba(158, 183, 225, 0.5) 100%);
        animation: rotate 8s linear infinite;
        transition: opacity 0.3s ease-in-out;
        border-radius: 50%;
        z-index: 0;
    }

    .logo img {
        max-width: 150px;
        margin-bottom: 1em;
        animation: float 6s ease-in-out infinite;
    }

    h2 {
        margin-bottom: 1em;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }

    .input-group {
        position: relative;
        z-index: 1;
    }

    label {
        display: block;
        margin-bottom: 0.5em;
        opacity: 0.9;
    }

    input {
        width: 100%;
        padding: 15px 20px;
        border: none;
        border-radius: 25px;
        margin-bottom: 1em;
        font-size: 1.1em;
        color: var(--input-color);
        background: var(--input-focus);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s, box-shadow 0.3s;
    }

    input:focus {
        outline: none;
        background: white;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
    }

    .forgot-password {
        position: relative;
        margin-bottom: 1em;
    }

    .login-btn {
        padding: 15px 20px;
        width: 100%;
        background-color: var(--btn-hover);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
        position: relative;
        z-index: 1;
    }

    .login-btn:hover {
        background-color: var(--btn-active);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .forgot-password a {
        color: white;
        text-decoration: none;
        transition: color 0.3s;
    }

    .forgot-password a:hover {
        text-decoration: underline;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg) scale(1);
        }
        50% {
            transform: rotate(180deg) scale(1.5);
        }
        100% {
            transform: rotate(360deg) scale(1);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
</style>

