<template>
    <div>
        <Banner />
        <div class="container">
            <form v-on:submit.prevent="submitFile" id="form" class="form">
                <div class="form">
                    <label for="title">Titre: </label>
                    <input type="text" name="title" id="title" required>
                </div>
                <div class="form">
                    <label for="description">description: </label>
                    <input type="text" name="description" id="description" required>
                </div>
                <div class="form">
                    <label for="file">fichier: </label>
                    <input type="file" name="file" id="file" required>
                </div>
                <div>
                    <input type="submit" name="image" value="Soumette" />
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
        },
        methods: {
            async submitFile() {
                const token = localStorage.getItem('Token');
                if (token == null) {
                    document.location.href = 'http://localhost:8080/#/auth';
                    return;
                }
                const userId = JSON.parse(token).userId;
                const formData = new FormData();
                const form = document.getElementById('form');
                const payload = JSON.stringify({ 'userId': userId, 'title': form.title.value, 'description': form.description.value });
                formData.append('payload', payload);
                const file = document.getElementById('file');
                formData.append('image', file.files[0]);
                let url = 'http://localhost:3000/api/gag/';
                let options = { method: 'POST', body: formData, headers: { 'authorization': 'Bearer ' + token } };
                const res = await fetch(url, options);
                if (res.status == 201)
                    document.location.href = 'http://localhost:8080/';
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

    .form {
        padding: 10px;
        border: 1px solid grey;
        border-radius: 2px 2px;
    }
</style>