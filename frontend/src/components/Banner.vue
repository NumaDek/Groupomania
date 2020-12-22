<template>
    <nav class="navigation">
        <router-link to="/">
            <img src="@/assets/icon-left-font-monochrome-white.png" alt="Groupomania Logo" height="100" class="nav-button" />
        </router-link>
        <div class="nav-button">
            <router-link to="/post" class="nav-button">Poster</router-link>
            <router-link to="/profile" class="nav-button">Profil</router-link>
            <router-link to="/auth">Login</router-link>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Banner'
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
        margin: 0px 20px;
    }
</style>