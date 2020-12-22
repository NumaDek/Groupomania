<template>
    <div>
        <Banner />
        <div class="container">
            <form action="http://localhost:3000/api/gag/" method="post" enctype="multipart/form-data" class="form">
                <div class="form">
                    <label for="title">Titre: </label>
                    <input type="text" name="title" id="title" required>
                </div>
                <div class="form">
                    <label for="desc">description: </label>
                    <input type="text" name="desc" id="desc" required>
                </div>
                <div class="form">
                    <label for="file">fichier: </label>
                    <input type="file" name="file" id="file" required>
                </div>
                <div>
                    <input type="submit" value="Soumette" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Banner from "@/components/Banner.vue"

    export default {
        name: 'Post',
        components: {
            Banner
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

    form.form {
        display: table;
    }

    div.form {
        display: table-row;
    }

    label, input {
        display: table-cell;
        margin: 10px 0px 10px 10px;
    }
</style>