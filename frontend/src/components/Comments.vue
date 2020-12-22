<template>
    <section class="comment-section">
        <article class="comments">
            <h3>Poster name</h3>
            <p>Salut ! Ceci est un commentaire.</p>
        </article>
    </section>
</template>

<script>
    export default {
        name: 'Comments'
    }
</script>

<style lang="scss" scoped>
    .comment-section {
        display: flex;
        justify-content: center;
    }
    .comments {
        display: flex;
        flex-direction: column;
        color: white;
        width: 480px;
    }
</style>