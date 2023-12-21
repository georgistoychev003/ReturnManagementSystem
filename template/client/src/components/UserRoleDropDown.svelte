<!-- UserRoleDropdown.svelte -->
<script>
    import { onMount } from 'svelte';

    let roles = [];
    let selectedRole = '';
    let selectedUser = ''; // Assuming there's a way to select a user



    async function assignRole() {
        if (selectedRole && selectedUser) {
            try {
                // Perform API call to assign role to the selected user
                // Example:
                const assignResponse = await fetch('http://localhost:3000/users/assign-role', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: selectedUser,
                        role: selectedRole
                    })
                });
                // Handle assignResponse if needed
                console.log('Role assigned successfully!');
            } catch (error) {
                console.error('Error assigning role:', error);
            }
        } else {
            console.error('Please select both a role and a user to assign the role.');
        }
    }
</script>

<h2>Select User Role</h2>

<select bind:value={selectedRole}>
    <option value= "admin"> Admin </option>
    <option value="collector">Collector</option>
    <option value="controller">Controller</option>
    <option value="customer">customer</option>

</select>

<!-- Add a way to select a user -->

<button on:click={assignRole}>Assign Role</button>
