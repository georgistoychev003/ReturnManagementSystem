<script>
    //fetch and select the user
    import UserRoleDropdown from '../components/UserRoleDropdown.svelte';
    import {onMount} from "svelte";
    import page from "page";
    export let params;
    let selectedUserRole; // This will store the selected role from the dropdown


    const fetchReturns = async (userID) => {
        try {
            const response = await fetch(`http://localhost:3000/rma/returns/${userID}`);

            if (response.ok) {
                const returns = await response.json();
                selectedUser.requests = returns; // Update selectedUser.requests with the returns data
                renderUserDetails(); // Call the function to render user details after fetching returns data
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

                // Ensure requests is an array
                selectedUser.requests = selectedUser.requests || [];
                await fetchReturns(userID);

                renderUserDetails(); // Call the function to render user details after fetching data
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };


    // Placeholder for the selected user's details, we neeed to replace with actual database data
    let selectedUser = {
        username: 'USERXX',
        name: 'XXXXXXXXXXXXXXXX',
        role: 'XXXXXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXXXXX',
        address: 'XXXXXXXXXXXXXXXX',
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
        const addressElement = document.querySelector('.details p:nth-of-type(4)');
        const tableBody = document.querySelector('.requests tbody');

        usernameElement.textContent = selectedUser.userID;
        nameElement.textContent = `Name: ${selectedUser.userName}`;
        roleElement.textContent = `Role: ${selectedUser.userRole}`;
        emailElement.textContent = `Email: ${selectedUser.email}`;
        addressElement.textContent = `Address: ${selectedUser.address}`;

        // Clear existing rows
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
    };

    // Function to assign a new role to the user
    const assignRole = async (newRole) => {
        // Make sure `newRole` is the role you want to assign
        if (!newRole) return;  // Return if the newRole is not provided

        try {
            const response = await fetch(`http://localhost:3000/users/${selectedUser.userID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userRole: newRole }) // Send only the userRole field
            });

            if (response.ok) {
                // Re-fetch user details to update the UI reactively
                await fetchUserDetails(selectedUser.userID);
            } else {
                const error = await response.json();
                console.error('Failed to update user role:', error);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    // This function is called when the "Assign Role" button is clicked
    const confirmRoleAssignment = async () => {
        if (!selectedUserRole) {
            console.error('No role selected');
            return;
        }

        await assignRole(selectedUserRole);
    };

    const deleteUser = async (userID) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // User was deleted successfully
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

// for now hard coded
    //todo : database should be done for full functionality
    const userID = '1';
    fetchUserDetails(userID);

</script>

<div class="user-details">
    <div class="header">
        <img class="user-icon" alt="User icon" src="/path-to-user-icon.png">
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
        <p><strong>Address:</strong> {selectedUser.address}</p>
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
    .user-details {
        display: flex;
        flex-direction: column;
        max-width: 960px;
        margin: 2rem auto;
        padding: 1rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
    }

    .user-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #ddd;
      /*  background-image: url('/.png'); /* User icon */
        background-size: cover;
        background-position: center;
    }

    h2 {
        margin: 0;
        font-size: 2rem;
        color: #444;
    }

    .assign-role-button, .delete-user-button {
        padding: 0.5rem 1rem;
        border: none;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
        font-size: 0.875rem;
        border-radius: 4px;
    }

    .assign-role-button {
        background-color: #4CAF50;
    }

    .assign-role-button:hover {
        background-color: #388E3C;
    }

    .delete-user-button {
        background-color: #F44336;
    }

    .delete-user-button:hover {
        background-color: #D32F2F;
    }

    .details p {
        margin: 0.5rem 0;
        font-size: 1rem;
        color: #333;
        display: inline-block; /* To wrap content */
        padding: 0.25rem 0.5rem;
    }

    .requests {
        border: 1px solid #ddd;
        padding: 1rem;
        margin-top: 1rem;
    }

    .requests h3 {
        margin-top: 0;
        color: #333;
        font-size: 1.5rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem; /* Space after section header */
    }

    th, td {
        padding: 0.75rem;
        border-bottom: 1px solid #ddd;
    }

    th {
        text-align: left;
        font-size: 0.875rem;
        color: #555;
        background: #f7f7f7;
    }

    td {
        font-size: 0.875rem;
        color: #666;
    }
</style>
