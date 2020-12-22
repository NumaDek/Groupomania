<template>
    <main>
        <Banner />
        <section class="container">
            <article class="post">
                <h2>{{ title }}</h2>
                <img :src="getImgUrl(file)" alt="post" class="img-file" />
                <div class="container-a">
                    <button v-on:click="points += 1" class="like"></button>
                    <button v-on:click="points -= 1" class="dislike"></button>
                    <span>{{ points }} points</span>
                    <span>{{ comments }} commentaires</span>
                </div>
            </article>
        </section>
        <Comments />
    </main>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Comments from "@/components/Comments.vue"

    export default {
        name: 'Content',
        data() {
            return {
                id: 1,
                title: "Titre du post",
                file: "test.jpg",
                points: 420,
                comments: 69
            }
        },
        computed: {

        },
        props: {

        },
        methods: {
            getImgUrl(file) {
                return require('../assets/' + file)
            },
            updatePoints() {
                this.points += 1;
            }
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
        max-width: 500px;
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
</style>