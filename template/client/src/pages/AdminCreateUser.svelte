<script>


    let userName = '';
    let email = '';
    let password = '';
    let repeatPassword = '';
    // let address = '';
    let isAdmin = false;
    let userRole = '';

    let selectedRole = '';




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
        userName = escapeHTML(userName);
        email = escapeHTML(email);
        userRole = 'client';
        isAdmin = 'false';
       let userId = 100;



        // Create user object
        const user = {  email, userName, password, userRole, isAdmin };
        console.log('Creating user:', user);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('User created:', data);
                alert('User created successfully!');
            })
            .catch(error => {
                console.error('There was a problem creating the user:', error);
                alert('Failed to create user. Please try again.');
            });
    };

</script>

<div class="registration-form">
    <h2>USER REGISTRATION</h2>
    <input type="text" bind:value={userName} placeholder="Username" required>
    <input type="email" bind:value={email} placeholder="Email" required>
    <input type="password" bind:value={password} placeholder="Password" required>
    <input type="password" bind:value={repeatPassword} placeholder="Repeat Password" required>
    <select bind:value={userRole} on:change={assignUserRole}>
        <option value="">Select User Role</option>
        <option value= "admin"> Admin </option>
        <option value="collector">Collector</option>
        <option value="controller">Controller</option>
        <option value="customer">Customer</option>
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


