<script>
    import { onMount } from 'svelte';
    let userName = "Mr Zanoni";

    onMount(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:3000/api/userinfo', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    userName = data.name; // Assuming the response includes a field 'name'
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
</script>

<div class="controller-home">
    <div class="greeting">
        <h1>Hello {userName}!</h1>
        <hr>
    </div>
</div>

<style>
    .controller-home {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
        text-align: center;
    }

    .greeting h1 {
        margin-bottom: 1rem;
    }

    hr {
        margin-bottom: 2rem;
    }

    button {
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 1rem;
    }

    button:hover {
        background-color: #0056b3;
    }

    .discover a {
        color: #007BFF;
        text-decoration: none;
    }

    .discover a:hover {
        text-decoration: underline;
    }
</style>
