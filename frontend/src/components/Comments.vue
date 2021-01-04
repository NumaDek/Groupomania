<template>
    <section class="comment-section">
        <article class="comments">
            <div class="title">
                <h3>{{ poster }}</h3>
                <button v-on:click="commentPoint += 1; like(0, 1)" class="button button-like"></button>
                <button v-on:click="commentPoint -= 1; like(0, -1)" class="button button-dislike"></button>
                <span>{{ commentPoint }} points</span>
            </div>
            <p class="comment">{{ comment }}</p>
        </article>
    </section>
</template>

<script>
    export default {
        name: 'Comments',

        props: {
            poster: String,
            comment: String,
            commentPoints: Number,
            commentId: Number
        },
        data() {
            return { commentPoint: this.commentPoints }
        },
        computed: {

        },
        methods: {
            async like(id, like) {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                const payload = JSON.stringify({ 'id': id, 'like': like });
                let url = 'http://localhost:3000/api/gag/comments/like/' + this.commentId;
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token }, body: payload };
                const res = await fetch(url, options);
                if (res.status == 401)
                    document.location.href = 'http://localhost:8080/#/auth';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-section {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #404040;
    }
    .comments {
        display: flex;
        flex-direction: column;
        color: white;
        width: 480px;
    }

    .title {
        display: flex;
        align-items: center;
    }

    .button {
        height: 20px;
        width: 26px;
        border: none;
        margin: 5px 10px 5px 0px;
    }


    .button-like {
        background-image: url('../assets/ArrowUp-tiny.png');
    }

    .button-dislike {
        background-image: url('../assets/ArrowDown-tiny.png');
    }
    .comment {
        padding-left: 15px;
        margin: 10px 0px;
        color : #BBBBBB;
    }

    h3 {

    }
</style>