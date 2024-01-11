<script>
    import { onMount } from 'svelte';

    let newPassword = '';
    let confirmPassword = '';
    let message = '';
    let token = '';

    onMount(() => {
        const queryParams = new URLSearchParams(window.location.search);
        token = queryParams.get('token');
    });

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            message = 'Passwords do not match.';
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword, token })
            });

            const result = await response.json();
            message = result.message;
        } catch (error) {
            message = 'Failed to reset password.';
        }
    };
</script>

<div>
    <h2>Reset Password</h2>
    <input type="password" bind:value={newPassword} placeholder="New password" />
    <input type="password" bind:value={confirmPassword} placeholder="Confirm new password" />
    <button on:click={resetPassword}>Reset Password</button>
    <p>{message}</p>
</div>


<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f7f7f7;
        font-family: 'Arial', sans-serif;
    }

    h2 {
        color: #333;
        margin-bottom: 20px;
    }

    input[type="password"] {
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 80%;
        max-width: 300px;
        box-sizing: border-box;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #5c6bc0;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #3f51b5;
    }

    p {
        color: #888;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        input[type="password"] {
            width: 90%;
        }
    }
</style>
