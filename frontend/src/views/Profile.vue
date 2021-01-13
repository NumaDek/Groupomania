<template>
    <main>
        <Banner />
        <section v-if="admin == false" class="container">
            <h1>Votre Profil</h1>
            <article v-for="post in fileBank" :key="post.id" class="post">
                <router-link :to="'/gag/' + post.postId"><h2>{{ post.title }}</h2></router-link>
                <router-link :to="'/gag/' + post.postId"><img v-bind:src="post.imageUrl" alt="post" class="img-file" /></router-link>
                <div class="container-a">
                    <button v-on:click="post.points += 1; like(post.postId, 1)" class="button button-like" aria-label="J'aime"></button>
                    <button v-on:click="post.points -= 1; like(post.postId, -1)" class="button button-dislike" aria-label="Je n'aime pas"></button>
                    <span>{{ post.points }} points</span>
                    <span>{{ post.commentNbr }} commentaires</span>
                </div>
            </article>
        </section>
        <div class="container">
            <section v-if="profileOwner == true && admin != true">
                <button v-on:click="deleteProfile(null)" class="delete">Supprimmer le profil</button>
            </section>
        </div>
        <div class="container left">
            <section v-if="admin == true">
                <article>
                   <ul v-for="profile in profiles" :key="profile.userId">
                       <li class="container-a">
                           <span>{{ profile.firstname }}</span>
                           <span>{{ profile.lastname }}</span>
                           <span>{{ profile.email }}</span>
                           <button v-on:click="moveToProfile(profile.userId)" class="delete delete-admin">Profile</button>
                           <button v-on:click="deleteProfile(profile.userId)" class="delete delete-admin">Supprimer</button>
                       </li>
                   </ul>
                </article>
            </section>
        </div>
    </main>
</template>

<script>
    import Banner from "@/components/Banner.vue";

    export default {
        name: 'Profile',
        components: {
            Banner
        },
        data() {
            return {
                fileBank: [],
                profiles: [],
                profileOwner: false,
                admin: false
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
            let id = window.location.href.split('/');
            id = id[id.length - 1];
            let url = 'http://localhost:3000/api/gag/profile/' + id;
            let options = { method: 'GET', headers: { 'authorization': 'Bearer ' + token } };
            let res = await fetch(url, options);
            if (res.status == 401) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            const posts = await res.json();
            this.fileBank = posts;
            if (res.status == 249)
                this.admin = true;
            //------------------------------
            url = 'http://localhost:3000/api/auth/admin/';
            options = { method: 'GET', headers: { 'authorization': 'Bearer ' + token } };
            let res2 = await fetch(url, options);
            if (res2.status == 401) {
                document.location.href = 'http://localhost:8080/#/auth';
                return;
            }
            const profiles = await res2.json();
            this.profiles = profiles;
            if (id == JSON.parse(token).userId)
                this.profileOwner = true;
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
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token }, body: payload };
                const res = await fetch(url, options);
                if (res.status == 401)
                    document.location.href = 'http://localhost:8080/#/auth';
            },
            async deleteProfile(profileId) {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                let id = window.location.href.split('/');
                id = id[id.length - 1];
                if (profileId != null) {
                    id = profileId;

                }
                console.log(id);
                let url = 'http://localhost:3000/api/auth/delete/' + id;
                let options = { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer ' + token } };
                const res = await fetch(url, options);
                if (res.status == 200) {
                    localStorage.removeItem('Token');
                    document.location.href = 'http://localhost:8080/#/auth';
                }
            },
            moveToProfile(userId) {
                document.location.href = 'http://localhost:8080/#/profile/' + userId;
                document.location.reload();
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
    .left {
        justify-content: left;
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

    h1 {
        font-size: 2em;
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
    li {
        display: flex;
    }

    .delete {
        background-color: #FF4C33;
        height: 40px;
        border: 1px solid white;
        border-radius: 3px;
        color: black;
    }

    .delete-admin {
        height: 20px;
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