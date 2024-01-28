<script>
    import UserRoleDropdown from '../components/UserRoleDropdown.svelte';
    import {onMount} from "svelte";
    import page from "page";
    export let params;
    let selectedUserRole;


    const fetchReturns = async (userID) => {
        try {
            const response = await fetch(`http://localhost:3000/rma/returns/${userID}`);

            if (response.ok) {
                const returns = await response.json();
                selectedUser.requests = returns;
                renderUserDetails();
            } else {
                console.error('Failed to fetch returns');
            }
        } catch (error) {
            console.error('Error fetching returns:', error);
        }
    };
    const fetchUserDetails = async (userID) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userID}`);

            if (response.ok) {
                selectedUser = await response.json();
                selectedUser.requests = selectedUser.requests || [];
                await fetchReturns(userID);

                renderUserDetails();
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };


    let selectedUser = {
        username: 'USERXX',
        name: 'XXXXXXXXXXXXXXXX',
        role: 'XXXXXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXXXXX',
        requests: [
            { id: 'XX', products: 'XXXXXX', returnedDate: 'XXXX', price: 'XXX' },

        ]
    };

    //render
    const renderUserDetails = () => {
        // Update UI with selected user's details
        const usernameElement = document.querySelector('h2');
        const nameElement = document.querySelector('.details p:nth-of-type(1)');
        const roleElement = document.querySelector('.details p:nth-of-type(2)');
        const emailElement = document.querySelector('.details p:nth-of-type(3)');
        const tableBody = document.querySelector('.requests tbody');
        const assignRoleButton = document.querySelector('.assign-role-button');
        const deleteUserButton = document.querySelector('.delete-user-button');
        const roleDropdown = document.querySelector('.role-dropdown'); // Make sure this is the correct class for your dropdown

        usernameElement.textContent = selectedUser.userID;
        nameElement.textContent = `Name: ${selectedUser.userName}`;
        roleElement.textContent = `Role: ${selectedUser.userRole}`;
        emailElement.textContent = `Email: ${selectedUser.email}`;

        tableBody.innerHTML = '';

        // Populate the table with fetched user requests data
        selectedUser.requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${request.returnedProductId}</td>
            <td>${request.description}</td>
            <td>${request.returnedDate}</td>
            <td>${request.statusProduct}</td>
        `;
            tableBody.appendChild(row);
        });

        // Hide the Assign Role, Delete User buttons and Assign Role dropdown menu for admin users
        // and hide the Assign Role dropdown, for customers as well
        const isAdmin = selectedUser.userRole && selectedUser.userRole.toLowerCase() === 'admin';
        const isCustomer = selectedUser.userRole && selectedUser.userRole.toLowerCase() === 'customer';

        if (isAdmin || isCustomer) {
            assignRoleButton.style.display = 'none';
            deleteUserButton.style.display = isAdmin ? 'none' : 'inline-block';
            roleDropdown.style.display = 'none';
        } else {
            assignRoleButton.style.display = 'inline-block';
            deleteUserButton.style.display = 'inline-block';
            roleDropdown.style.display = 'block';
        }
    };


    const assignRole = async (newRole) => {
        if (!newRole) return;

        try {
            const response = await fetch(`http://localhost:3000/users/${selectedUser.userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userRole: newRole })
            });

            if (response.ok) {
                await fetchUserDetails(selectedUser.userID);
            } else {
                const error = await response.json();
                console.error('Failed to update user role:', error);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const confirmRoleAssignment = async () => {
        if (!selectedUserRole) {
            console.error('No role selected');
            return;
        }

        await assignRole(selectedUserRole);
    };

    const deleteUser = async (userID) => {
        // Display a confirmation dialog box
        const isConfirmed = confirm('Are you sure you want to delete this user?');
        if (!isConfirmed) {
            console.log('User deletion cancelled.');
            return;
        }

        // If the user clicks "OK", proceed with deletion
        try {
            const response = await fetch(`http://localhost:3000/users/${userID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('User deleted successfully');
                page('/users');
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    onMount(() => {
        if (params && params.userID) {
            fetchUserDetails(params.userID);
        } else {
            console.error('User ID not provided in the URL params.');
        }
    });
</script>

<div class="user-details">
    <div class="header">
        <h2>{selectedUser.username}</h2>

        <div class="role-dropdown">
            <UserRoleDropdown on:roleSelected={(event) => selectedUserRole = event.detail} />
        </div>

        <button class="assign-role-button" on:click={confirmRoleAssignment}>Assign Role</button>
        <button class="delete-user-button" on:click={() => deleteUser(selectedUser.userID)}>Delete User</button>
    </div>
    <div class="details">
        <p><strong>Name:</strong> {selectedUser.name}</p>
        <p><strong>Role:</strong> {selectedUser.role}</p>
        <p><strong>Email:</strong> {selectedUser.email}</p>
    </div>
    <div class="requests">
        <h3>REQUESTS:</h3>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>PRODUCTS</th>
                <th>DATE</th>
                <th>PRICE</th>
            </tr>
            </thead>
            <tbody>
            {#each selectedUser.requests as request}
                <tr>
                    <td>{request.RMAId}</td>
                    <td>{request.products}</td>
                    <td>{request.returnedDate}</td>
                    <td>{request.price}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    :root {
        --bg-color: #f8f9fa;
        --text-color: #212529;
        --text-color-secondary: #adb5bd;
        --text-color-header: #495057;
        --border-color: #dee2e6;
        --primary-color: #007bff;
        --primary-color-hover: #0069d9;
        --danger-color: #dc3545;
        --danger-color-hover: #c82333;
        --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        --border-radius: 0.25rem;
        --box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        --transition-speed: 0.3s;
        --spacing-unit: 1rem;
        --input-padding: 0.5rem 1rem;
        --input-border-radius: var(--border-radius);
        --input-border: 1px solid var(--border-color);
        --input-background: #ffffff;
        --input-hover-border: 1px solid var(--primary-color);

    }

    * {
        box-sizing: border-box;
    }

    .user-details {
        background: var(--bg-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        font-family: var(--font-family);
        margin: 2rem auto;
        max-width: 100%;
        padding: 2rem;
        transition: box-shadow var(--transition-speed);
        width: 90%;
    }

    .user-details:hover {
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
    }

    .header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 1.5rem;
        align-items: center;
        text-align: left;
    }

    @media (min-width: 768px) {
        .header {
            flex-direction: row;
        }
    }

    h2 {
        color: var(--text-color-header);
        font-size: 1.75rem;
        margin: 0 0 1rem 0;
        padding: 0;
    }

    .role-dropdown,
    button {
        margin-top: 1rem;
        width: 100%;
    }

    @media (min-width: 768px) {
        .role-dropdown,
        button {
            margin-top: 0;
            width: auto;
        }
    }
    @media (min-width: 768px) {
        .details {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .role-dropdown select {
        padding: var(--input-padding);
        border-radius: var(--input-border-radius);
        border: var(--input-border);
        background-color: var(--input-background);
        width: 100%;
        max-width: 300px;
        box-shadow: var(--box-shadow);
        transition: border var(--transition-speed);
    }

    .role-dropdown select:hover,
    .role-dropdown select:focus {
        border: var(--input-hover-border);
        outline: none;
    }

    .details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--spacing-unit);
        background: var(--input-background);
        padding: var(--spacing-unit);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        margin-bottom: var(--spacing-unit);
    }

    .details p {
        margin: 0;
        padding: var(--input-padding);
        background: var(--bg-color);
        border: var(--input-border);
        border-radius: var(--border-radius);
        color: var(--text-color-header);
        font-weight: bold;
    }


    button {
        background-color: var(--primary-color);
        border: none;
        border-radius: var(--border-radius);
        color: white;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        transition: background-color var(--transition-speed), transform var(--transition-speed);
    }

    button:hover {
        background-color: var(--primary-color-hover);
        transform: translateY(-2px);
    }

    .delete-user-button {
        background-color: var(--danger-color);
        margin-left: 1rem;
    }

    .delete-user-button:hover {
        background-color: var(--danger-color-hover);
    }

    .details,
    .requests {
        background: white;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        margin-top: 2rem;
        padding: 1rem;
    }

    .details p,
    .requests th,
    .requests td {
        color: var(--text-color);
        font-size: 1rem;
    }

    .details p {
        margin: 0.5rem 0;
    }

    .requests table {
        border-collapse: collapse;
        width: 100%;
    }

    .requests th,
    .requests td {
        border-bottom: 1px solid var(--border-color);
        padding: 0.75rem;
        text-align: left;
    }

    .requests th {
        background-color: var(--bg-color);
        color: var(--text-color-header);
    }

    .requests tr:last-child td {
        border-bottom: none;
    }
</style>
