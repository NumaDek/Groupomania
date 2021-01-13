<template>
    <main>
        <section class="container">
            <article v-for="post in fileBank" :key="post.id" class="post">
                <router-link :to="'/gag/' + post.postId"><h1>{{ post.title }}</h1>
                <img v-bind:src="post.imageUrl" alt="post" class="img-file" /></router-link>
                <div class="container-a">
                    <button v-on:click="post.points += 1; like(post.postId, 1)" class="button button-like" aria-label="J'aime" :id="post.postId + '+'"></button>
                    <button v-on:click="post.points -= 1; like(post.postId, -1)" class="button button-dislike" aria-label="Je n'aime pas" :id="post.postId + '-'"></button>
                    <span>{{ post.points }} points</span>
                    <span>{{ post.commentNbr }} commentaires</span>
                </div>
            </article>
        </section>
    </main>
</template>

<script>
    export default {
        name: 'Content',
        data() {
            return {
                fileBank: []
            }
        },
        computed: {

        },
        created: async function () {
            const token = localStorage.getItem('Token');
            if (token == null) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            let url = 'http://localhost:3000/api/gag/';
            let options = { method: 'GET', headers: { 'authorization': 'Bearer ' + token } };
            const res = await fetch(url, options);
            if (res.status == 401) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            const posts = await res.json();
            this.fileBank = posts;
        },
        props: {

        },
        methods: {
            async like(postId, like) {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                const payload = JSON.stringify({ 'postId': postId, 'like': like });
                let url = 'http://localhost:3000/api/gag/like';
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token }, body : payload};
                const res = await fetch(url, options);
                if (res.status == 401)
                    document.location.href = 'http://localhost:8080/#/auth';
                let file;
                for (file of this.fileBank) {
                    if (file.postId == postId) {
                        file = {
                            ...file,
                            liked: like
                            
                        }
                    }
                }
                if (like == 1) {
                    const buttonPlus = document.getElementById(postId + '+');
                    buttonPlus.disabled = true;
                    buttonPlus.style.opacity = 0.3;
                    const buttonMinus = document.getElementById(postId + '-');
                    buttonMinus.disabled = false;
                    buttonMinus.style.opacity = 1;
                }
                if (like == -1) {
                    const buttonMinus = document.getElementById(postId + '-');
                    buttonMinus.disabled = true;
                    buttonMinus.style.opacity = 0.3;
                    const buttonPlus = document.getElementById(postId + '+');
                    buttonPlus.disabled = false;
                    buttonPlus.style.opacity = 1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        background-color: black;
        color: white;
        padding-bottom: 80px;
    }

    .container-a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .post {
        padding-bottom: 20px;
        border-bottom: 1px solid #808080;
    }

    .img-file {
        width: 500px;
        max-height: 500px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    span {
        margin-right: 20px;
    }

    .button {
        height: 40px;
        width: 54px;
        border: 1px solid white;
        border-radius: 3px 3px;
        margin: 5px 10px 5px 0px;
    }


    .button-like {
        background-image: url('../assets/ArrowUp.png');
    }

    .button-dislike {
        background-image: url('../assets/ArrowDown.png');
    }

    @media (max-width: 1024px) {
        .img-file {
            max-width: 310px;
            max-height: 310px;
        }
    }

    @media (max-width: 320px) {
        .img-file {
            max-width: 100%;
        }
        .post {
            width: 94%;
        }
    }
</style>