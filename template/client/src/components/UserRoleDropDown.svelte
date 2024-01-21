<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let roles = ['admin', 'collector', 'controller', 'customer'];
    let selectedRole = '';

    // Emit the selected role when it changes
    function handleRoleChange() {
        dispatch('roleSelected', selectedRole);
    }

</script>

<h2>Select User Role</h2>

<select bind:value={selectedRole} on:change={handleRoleChange}>
    {#each roles as role}
        <option value="{role}">{role.charAt(0).toUpperCase() + role.slice(1)}</option>
    {/each}
</select>
