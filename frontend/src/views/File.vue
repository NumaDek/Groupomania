<template>
    <main>
        <Banner />
        <section class="container">
            <article class="post">
                <h2>{{ file.title }}</h2>
                <p>{{ file.description }}</p>
                <img v-bind:src="file.imageUrl" alt="post" class="img-file" />
                <div class="container-a">
                    <button v-on:click="file.points += 1; like(file.postId, 1)" class="like"></button>
                    <button v-on:click="file.points -= 1; like(file.postId, -1)" class="dislike"></button>
                    <span>{{ file.points }} points</span>
                    <span>{{ file.commentNbr }} commentaires</span>
                </div>
            </article>
        </section>
        <section class="container">
            <article>
                <form v-on:submit.prevent="comment" id="form" class="form">
                    <div class="form">
                        <label for="comment">Commenter :</label><br />
                    </div>
                    <div>
                        <textarea name="comment" id="comment" required></textarea>
                    </div>
                    <div>
                        <input type="submit" name="image" value="Soumette" />
                    </div>
                </form>
            </article>
        </section>
        <section class="container">
            <article v-for="comment in comments" :key="comment.commentId">
                <Comments v-bind:poster="comment.posterName" v-bind:comment="comment.commentValue" v-bind:commentPoints="comment.commentPoints" v-bind:commentId="comment.commentId"/>
            </article>
        </section>
        <footer></footer>
    </main>
</template>

<script>
    import Banner from "@/components/Banner.vue";
    import Comments from "@/components/Comments.vue"

    export default {
        name: 'Content',
        data() {
            return {
                file: {
                    postId: 0,
                    userId: 0,
                    title: '',
                    description: "",
                    imageUrl: '',
                    points: 0,
                    commentNbr: 0
                },
                comments: []
            };
        },
        computed: {

        },
        props: {

        },
        methods: {
            async like(id, like) {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                const payload = JSON.stringify({ 'postId': id, 'like': like });
                let url = 'http://localhost:3000/api/gag/like';
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token }, body: payload };
                const res = await fetch(url, options);
                if (res.status == 401)
                    document.location.href = 'http://localhost:8080/#/auth';
            },
            async comment() {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                let id = window.location.href.split('/');
                id = id[id.length - 1];
                const form = document.getElementById('form');
                const payload = JSON.stringify({ 'userId': JSON.parse(token).userId, 'commentValue': form.comment.value });
                let url = 'http://localhost:3000/api/gag/comments/' + id;
                let options = { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token } };
                const res = await fetch(url, options);
                const comment = await res.json();
                this.comments.push(comment);
                const textarea = document.getElementById('comment');
                textarea.value = "";
            }
        },
        created: async function () {
            const token = localStorage.getItem('Token');
            if (token == null) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            let id = window.location.href.split('/');
            let url = 'http://localhost:3000/api/gag/' + id[id.length - 1];
            let options = { method: 'GET', headers: { 'authorization': 'Bearer ' + token } };
            const res = await fetch(url, options);
            if (res.status == 401) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            const data = await res.json();
            this.file = data;
            //this.id = data.id;
            //this.title = data.title;
            //this.imageUrl = data.imageUrl;
            //this.points = data.points;
            //this.commentNbr = data.commentNbr;

            url = 'http://localhost:3000/api/gag/comments/' + id[id.length - 1];
            options = { method: 'GET', headers: { 'authorization': 'Bearer ' + token } };
            const res1 = await fetch(url, options);
            if (res1.status == 401) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            const commentsList = await res1.json();
            this.comments = commentsList;
        },
        components: {
            Banner,
            Comments
        }
    }
</script>

<style lang="scss">
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: black;
        color: white;
    }

    .container-a {
        display: flex;
        align-items: center;
    }

    .post {
        padding-bottom: 20px;
        border-bottom: 1px solid #808080;
    }

    .img-file {
        width: 500px;
        max-height: 500px;
    }

    @media (max-width: 1024px) {
        .img-file {
            max-width: 310px;
            max-height: 310px;
        }
    }

    a {
        color: white;
        text-decoration: none;
    }

    span {
        margin-right: 20px;
    }

    .like {
        background-image: url('../assets/ArrowUp.png');
        height: 40px;
        width: 54px;
        border: 1px solid white;
        border-radius: 3px 3px;
        margin: 5px 10px 5px 0px;
    }

    .dislike {
        background-image: url('../assets/ArrowDown.png');
        height: 40px;
        width: 54px;
        border: 1px solid white;
        border-radius: 3px 3px;
        margin: 5px 10px 5px 0px;
    }
    textarea {
        background-color: black;
        border: 1px solid #404040;
        padding: 4px;
        color: white;
        width: 490px;
        height: 75px;
    }
    footer {
        height : 200px;
    }
    div .form {
        margin: 10px 10px;
    }
</style>