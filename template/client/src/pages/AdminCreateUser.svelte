<script>
    import { onMount } from 'svelte';

    let username = '';
    let email = '';
    let password = '';
    let repeatPassword = '';
    let address = '';
    let isAdmin = false;
    let userRole = '';
    let roles = [];
    let selectedRole = '';



    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/users/roles');
            if (response.ok) {
                const data = await response.json();
                roles = data.roles; // Assuming the response contains a "roles" array
            } else {
                console.error('Failed to fetch user roles');
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
    });

    const assignUserRole = (event) => {
        userRole = event.target.value; // Update the userRole variable with the selected role
    };
    const createUser = () => {
        // Function to validate email format
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Function to escape HTML characters
        const escapeHTML = (unsafe) => {
            return unsafe.replace(/[&<"']/g, (m) => ({
                '&': '&amp;',
                '<': '&lt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m]));
        };

        // Validate inputs
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Escape HTML characters
        username = escapeHTML(username);
        email = escapeHTML(email);
        address = escapeHTML(address);
        userRole = 'client';
        isAdmin = false;



        // Create user object
     //   const user = { username, email, password, address };
        const user = {  email, password, userRole, isAdmin };
        console.log('Creating user:', user);

        // Send request to backend to create the user
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle successful creation (you may add further logic here)
                console.log('User created:', data);
                alert('User created successfully!');
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem creating the user:', error);
                alert('Failed to create user. Please try again.');
            });
    };

</script>

<div class="registration-form">
    <h2>USER REGISTRATION</h2>
    <input type="text" bind:value={username} placeholder="Username" required>
    <input type="email" bind:value={email} placeholder="Email" required>
    <input type="password" bind:value={password} placeholder="Password" required>
    <input type="password" bind:value={repeatPassword} placeholder="Repeat Password" required>
    <input type="text" bind:value={address} placeholder="Address" required>
    <select bind:value={userRole} on:change={assignUserRole}>
        <option value="">Select User Role</option>
        <!-- Fetch and populate options dynamically from user roles -->
        {#each roles as role}
            <option value={role}>{role}</option>
        {/each}
    </select>
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

    select {
        padding: 10px;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>


