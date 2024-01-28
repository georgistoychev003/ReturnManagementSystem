<script>
    import { onMount } from 'svelte';
    import ProgressBar from "../../components/ProgressBar.svelte";
    import WelcomeGreeting from "../../components/WelcomeGreeting.svelte";
    import ClientreturnSteps from "../../components/ClientreturnSteps.svelte";

    let currentStep = 1;
    let userName = "Mr Zanoni"; // Temporary placeholder

    onMount(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // Decoding from Base64URL
                userName = payload.userName;
            } catch (e) {
                console.error('Error parsing the token', e);
                userName = "Guest"; // Fallback if there's an error
            }
        } else {
            userName = "Guest"; // Fallback if there is no token or it's invalid
        }
    });
</script>

<ProgressBar {currentStep} />
<WelcomeGreeting {userName} />
<ClientreturnSteps />

<style>

</style>
