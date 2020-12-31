<template>
    <section class="comment-section">
        <article class="comments">
            <h3>{{ poster }}</h3>
            <p>{{ comment }}</p>
        </article>
    </section>
</template>

<script>
    export default {
        name: 'Comments',
        props: {
            poster: String,
            comment : String
        }
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