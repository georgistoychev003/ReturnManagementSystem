<script>
    // Sample data for the users, we need to replace this with data fetching from the backend
    let users = [
        { username: 'USER001', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { username: 'USER002', name: 'Michael Jackson', email: 'michael@example.com', role: 'Controller' },
        { username: 'USER003', name: 'Jony Joe', email: 'johny@example.com', role: 'Collector' },

    ];

    // Function to handle more users loading, we need to implement it in accordance to the backend
    const handleMoreUsersClick = () => {
        console.log('Load more users');
    };

    // Function to handle user detail view, we need to implement it in accordance to the backend
    const showUserDetails = (user) => {
        console.log(`Show details for user: ${user.username}`);
    };

    // Function to handle creating a new user, we need to implement it in accordance to the backend
    const createUser = () => {

        console.log('Create user');
    };
</script>

<div class="admin-users">
    <h1>USERS</h1>
    <button class="create-user-button" on:click={createUser}>Create User</button>
    <table>
        <thead>
        <tr>
            <th>USERNAME</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each users as user}
            <tr>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <button on:click={() => showUserDetails(user)}>Details</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    <div class="more-button">
        <button on:click={handleMoreUsersClick}>More</button>
    </div>
</div>

<style>
    .admin-users {
        max-width: 960px;
        margin: 2rem auto;
        padding: 1rem;
    }

    .create-user-button {
        float: right;
        margin-bottom: 1rem;
    }

    h1 {
        text-align: left;
        margin-bottom: 1rem;
        font-size: 2rem;
        color: #333;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    th, td {
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ccc;
    }

    th {
        color: #555;
        font-size: 1rem;
    }

    tbody tr:hover {
        background-color: #f2f2f2;
    }

    .more-button {
        text-align: right;
        margin-top: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }

    button:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
</style>
