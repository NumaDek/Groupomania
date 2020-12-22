<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    body {
        background-color: #000000;
        padding: 0;
        margin: 0;
    }

    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      max-width: 70%;
      margin: auto;
    }

    @media (max-width: 1024px) {
        #app {
            max-width: 100%;
        }
    }
</style>
