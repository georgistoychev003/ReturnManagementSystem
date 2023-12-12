<script>
    // Placeholder for the selected user's details, we neeed to replace with actual database data
    let selectedUser = {
        username: 'USERXX',
        name: 'XXXXXXXXXXXXXXXX',
        role: 'XXXXXXXXXXXXXXXX',
        email: 'XXXXXXXXXXXXXXXX',
        address: 'XXXXXXXXXXXXXXXX',
        requests: [
            { id: 'XX', products: 'XXXXXX', date: 'XXXX', price: 'XXX' },

        ]
    };

    // Function to assign a new role to the user, to be implemented
    const assignRole = () => {
        console.log(`Assign new role to user: ${selectedUser.username}`);
    };

    // Function to delete the user, to be implemented
    const deleteUser = () => {
        console.log(`Delete user: ${selectedUser.username}`);
    };
</script>

<div class="user-details">
    <div class="header">
        <img class="user-icon" alt="User icon" src="/path-to-user-icon.png">
        <h2>{selectedUser.username}</h2>
        <button class="assign-role-button" on:click={assignRole}>Assign Role</button>
        <button class="delete-user-button" on:click={deleteUser}>Delete User</button>
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
                    <td>{request.id}</td>
                    <td>{request.products}</td>
                    <td>{request.date}</td>
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
        background-image: url('/.png'); /* User icon */
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
