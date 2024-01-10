<script>
    let email = '';

    const requestPasswordReset = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            console.log(data);
            // Handle response, show confirmation message, etc.
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };
</script>

<div class="auth-container">
    <h2>Forgot Password</h2>
    <p>Please enter your email address to request a password reset link.</p>
    <form on:submit|preventDefault={requestPasswordReset}>
        <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" bind:value={email} id="email" placeholder="Enter your email" required />
        </div>
        <button type="submit" class="login-btn">Send Reset Link</button>
    </form>
</div>

<style>
    :root {
        --gradient-start: #87e8ff;
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


