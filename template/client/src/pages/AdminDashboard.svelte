<script>

    import {onMount} from "svelte";

    let numberOfRMA = 3;
    let numberOfUsers = 0; // Initial value

    // Function to fetch number of users
    async function fetchNumberOfUsers() {
        try {
            const response = await fetch('http://localhost:3000/users/count');
            if (response.ok) {
                const data = await response.json();
                // Extracting the count from the response
                numberOfUsers = data['count(email)'] || 0;
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch number of users on component mount
    onMount(fetchNumberOfUsers);
</script>

<style>
    .container {
        max-width: 90%; /* Adjust as needed */
        margin: 0 auto;
        padding: 2%;
    }

    .greeting {
        font-size: 2vw; /* Adjust as needed */
        margin-bottom: 2vw;
    }

    .line {
        width: 80%;
        margin: 0 auto;
        border-top: 0.2vw solid lightblue; /* Adjust as needed */
        margin-bottom: 2vw;
    }

    .red-boxes {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2vw;
    }

    .red-box {
        flex: 1;
        text-align: center;
        background-color: red;
        padding: 2vw;
        color: white;
        margin: 0 2vw; /* Space between red boxes */
    }

    .big-number {
        font-size: 3vw; /* Adjust as needed */
        margin-bottom: 1vw;
    }

    .big-red-rectangle {
        height: 6vw; /* Adjust as needed */
        background-color: red;
        margin-bottom: 2vw;
    }
</style>

<div class="container">
    <div class="greeting">Hello Admin!</div>
    <div class="line"></div>

    <div class="red-boxes">
        <div class="red-box">
            <div>Number of users</div>
            <div class="big-number">{numberOfUsers}</div>
        </div>
        <div class="red-box"></div>
        <div class="red-box">
            <div>Number of RMA</div>
            <div class="big-number">{numberOfRMA < 10 ? `0${numberOfRMA}` : numberOfRMA}</div>
        </div>
    </div>

    <div class="big-red-rectangle"></div>
</div>
