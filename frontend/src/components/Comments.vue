<template>
    <div class="comment-section" id="comment-section">
        <div class="comments">
            <div class="title">
                <h2>{{ poster }}</h2>
                <button v-on:click="commentPoint += 1; like(commentId, 1)" class="button button-like" aria-label="J'aime" :id="commentId + 'comment+'"></button>
                <button v-on:click="commentPoint -= 1; like(commentId, -1)" class="button button-dislike" aria-label="Je n'aime pas" :id="commentId + 'comment-'"></button>
                <span>{{ commentPoint }} points</span>
                <button v-if="commentOwner == true" v-on:click="deleteComment" class="delete delete-comment">Supprimer</button>
            </div>
            <p class="comment">{{ comment }}</p>
        </div>
    </div>
</template>

<script defer>
    export default {
        name: 'Comments',

        props: {
            poster: String,
            comment: String,
            commentPoints: Number,
            commentId: Number,
            commentUserId : Number
        },
        data() {
            return {
                commentPoint: this.commentPoints,
                commentOwner: false
            }
        },
        computed: {

        },
        methods: {
            async like(commentId, like) {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                const payload = JSON.stringify({ 'commentId': this.commentId, 'like': like });
                let url = 'http://localhost:3000/api/gag/comments/like/' + this.commentId;
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token }, body: payload };
                const res = await fetch(url, options);
                if (res.status == 401)
                    document.location.href = 'http://localhost:8080/#/auth';
                if (like == 1) {
                    const buttonPlus = document.getElementById(commentId + 'comment+');
                    buttonPlus.disabled = true;
                    buttonPlus.style.opacity = 0.3;
                    const buttonMinus = document.getElementById(commentId + 'comment-');
                    buttonMinus.disabled = false;
                    buttonMinus.style.opacity = 1;
                }
                if (like == -1) {
                    const buttonMinus = document.getElementById(commentId + 'comment-');
                    buttonMinus.disabled = true;
                    buttonMinus.style.opacity = 0.3;
                    const buttonPlus = document.getElementById(commentId + 'comment+');
                    buttonPlus.disabled = false;
                    buttonPlus.style.opacity = 1;
                }
            },
            async deleteComment() {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                let url = 'http://localhost:3000/api/gag/comment/delete/' + this.commentId;
                let options = { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token } };
                const res = await fetch(url, options);
                if (res.status == 200) {
                    const section = document.getElementById(this.commentId);
                    section.innerHTML = "";
                }
            }
        },
        created: function () {
            const token = localStorage.getItem('Token');
            if (token == null) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            if (this.commentUserId == JSON.parse(token).userId)
                this.commentOwner = true;

        },
        mounted: function () {
            const section = document.getElementById('comment-section');
            section.id = this.commentId;
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

    .title {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
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
        color : #DDDDDD;
    }

    .delete-comment {
        height: 20px;
    }
</style>