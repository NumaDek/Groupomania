<template>
    <div class="home">
        <Banner />
        <Content/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Banner from '@/components/Banner.vue'
    import Content from '@/components/Content.vue'

    export default {
        name: 'Home',
        components: {
            Banner,
            Content,
        }
    }
</script>
