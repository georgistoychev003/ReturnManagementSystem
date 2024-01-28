<script>
    export let userName;
</script>

<div class="greeting">
    <h1>Hello {userName}!</h1>
    <hr>
</div>

<style>
    .greeting h1 {
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    hr {
        margin-bottom: 2rem;
    }

    @media (max-width: 600px) {
        .greeting h1 {
            font-size: 1.5rem;
        }
    }
</style>