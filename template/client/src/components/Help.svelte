<!-- HelpPopup.svelte -->
<script>
    export let visible = false;
    export let content = '';
    export let closePopup = () => visible = false;
</script>

{#if visible}
    <div class="help-popup">
        <div class="help-content" ></div>
        <div>{content}</div>
        <button on:click={closePopup}>Close</button>
    </div>
{/if}

<style>
    .help-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .help-content {
        margin-bottom: 1rem;
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
</style>
