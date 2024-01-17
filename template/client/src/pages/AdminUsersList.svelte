<script>
    // Sample data for the users, we need to replace this with data fetching from the backend
    import page from "page";
    import { writable } from 'svelte/store';


    // im creating a writable store to hold the selected user details so i can afterwards be able to navigate to details page for that user
    export const selectedUser = writable(null);
    let users = [];

    const navigateTo = (route) => {
        router.push(route);
    };


    function showUserDetails(user) {
        selectedUser.set(user); // Update the store with the selected user
        page(`/userDetails/${user.userID}`); // Navigate to the details page
    }


    async function getUsers() {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (response.ok) {
                users = await response.json(); //i fill the users array directly
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    // Function to handle more users loading, we need to implement it in accordance to the backend
    const handleMoreUsersClick = () => {
        console.log('Load more users');
    };


    // Function to handle creating a new user, we need to implement it in accordance to the backend
    const createUser = () => {
        navigateTo("/createUser");

        console.log('Create user');
    };


    getUsers();

</script>

<div class="admin-users">
    <h1>USERS</h1>
    <a href="/registerUser"><button class="create-user-button">Create User</button></a>
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
                <td>USER00 {user.userID}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.userRole}</td>
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
