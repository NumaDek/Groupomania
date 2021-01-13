<template>
    <nav class="navigation">
        <router-link to="/">
            <img src="@/assets/icon-left-font-monochrome-white-slim.png" alt="Groupomania Logo" height="100" class="nav-button" />
        </router-link>
        <div class="nav-button">
            <router-link to="/post" class="nav-button">Poster</router-link>
            <router-link :to="'/profile/' + getUserId" class="nav-button">Profil</router-link>
            <button v-on:click="logout" class="logout">Se déconnecter</button>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Banner',
        computed: {
            getUserId() {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                const userId = JSON.parse(token).userId;
                return userId;
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('Token');
                document.location.href = 'http://localhost:8080/#/auth';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navigation {
        background-color: black;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    a {
        color: white;
        text-decoration: none;
    }

    .nav-button {
        margin: 0px 10px;
    }

    .logout {
        background: none;
        color: white;
        border: none;
        font-size: 1.05em;
    }
    .logout:hover {
        cursor: pointer;
    }

    @media (max-width: 425px) {
        .navigation {
            flex-direction: column;
        }
    }
</style>