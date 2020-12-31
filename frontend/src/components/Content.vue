<template>
    <main class="container">
        <section>
            <article v-for="post in fileBank" :key="post.id" class="post">
                <router-link :to="'/gag/' + post.id"><h2>{{ post.title }}</h2></router-link>
                <router-link :to="'/gag/' + post.id"><img v-bind:src="post.imageUrl" alt="post" class="img-file" /></router-link>
                <div class="container-a">
                    <button v-on:click="post.points += 1; like(post.id, 1)" class="button button-like"></button>
                    <button v-on:click="post.points -= 1; like(post.id, -1)" class="button button-dislike"></button>
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
                fileBank: [
                    {
                        id: 1,
                        title: "Titre du post",
                        file: "test.jpg",
                        points: 420,
                        comments: 69
                    },
                    {
                        id: 2,
                        title: "Titre du post",
                        file: "test.jpg",
                        points: 420,
                        comments: 69
                    },
                    {
                        id: 3,
                        title: "Titre du post",
                        file: "test.jpg",
                        points: 420,
                        comments: 69
                    },
                    {
                        id: 4,
                        title: "Titre du post",
                        file: "test.jpg",
                        points: 420,
                        comments: 69
                    }
                ]
            }
        },
        computed: {
            
        },
        created: async function () {
            let url = 'http://localhost:3000/api/gag/';
            let options = { method: 'GET' };
            const response = await fetch(url, options);
            const posts = await response.json();
            this.fileBank = posts;
        },
        props: {

        },
        methods: {
            async like(id, like) {
                const payload = JSON.stringify({ 'id': id, 'like': like });
                let url = 'http://localhost:3000/api/gag/like';
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body : payload};
                await fetch(url, options);
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
</style>