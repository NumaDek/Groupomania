<template>
    <main>
        <Banner />
        <section class="container">
            <article class="post">
                <h2>{{ title }}</h2>
                <img v-bind:src="file" alt="post" class="img-file" />
                <div class="container-a">
                    <button v-on:click="points += 1; like(id, 1)" class="like"></button>
                    <button v-on:click="points -= 1; like(id, -1)" class="dislike"></button>
                    <span>{{ points }} points</span>
                    <span>{{ commentNbr }} commentaires</span>
                </div>
            </article>
        </section>
        <Comments poster="Robert" comment="Scrub"/>
    </main>
</template>

<script>
    import Banner from "@/components/Banner.vue";
    import Comments from "@/components/Comments.vue"

    export default {
        name: 'Content',
        data() {
            return {
                id: 0,
                title: "Title",
                file: "",
                points: 0,
                commentNbr: 0,
                comments: ""
            };
        },
        computed: {

        },
        props: {

        },
        methods: {
            async like(id, like) {
                const payload = JSON.stringify({ 'id': id, 'like': like });
                let url = 'http://localhost:3000/api/gag/like';
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload };
                await fetch(url, options);
            }
        },
        created: async function () {
            let id = window.location.href.split('/');
            let url = 'http://localhost:3000/api/gag/' + id[id.length - 1];
            let options = { method: 'GET' };
            const response = await fetch(url, options);
            const data = await response.json();
            this.id = data.id;
            this.title = data.title;
            this.file = data.imageUrl;
            this.points = data.points;
            this.commentNbr = data.commentNbr;
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
</style>