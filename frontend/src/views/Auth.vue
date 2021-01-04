<template>
    <div class="container">
        <img src="@/assets/icon-left-font-monochrome-white.png" alt="Groupomania Logo" class="Logo" />
        <div class="form-div">
            <h2>Authentification</h2>
            <form v-on:submit.prevent="login" class="form" id="login">
                <div class="form">
                    <label for="lemail">Adresse mail: </label>
                    <input type="email" name="lemail" id="lemail" required>
                </div>
                <div class="form">
                    <label for="lpassword">Mot de passe: </label>
                    <input type="password" name="lpassword" id="lpassword" required>
                </div>
                <div>
                    <input  type="submit" value="S'authentifier" />
                </div>
            </form>
        </div>
        <div class="form-div">
            <h2>Inscription</h2>
            <form v-on:submit.prevent="signUp" class="form" id="signup">
                <div class="form">
                    <label for="lastname">Nom: </label>
                    <input type="text" name="lastname" id="lastname" required>
                </div>
                <div class="form">
                    <label for="fistname">Pr&#233;nom: </label>
                    <input type="text" name="firstname" id="firstname" required>
                </div>
                <div class="form">
                    <label for="email">Adresse mail: </label>
                    <input type="email" name="email" id="email" required>
                </div>
                <div class="form">
                    <label for="password">Mot de passe: </label>
                    <input type="password" name="password" id="password" required>
                </div>
                <div>
                    <input type="submit" value="S'inscrire" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Auth',
        computed: {

        },
        methods: {
            async login() {
                const form = document.getElementById('login');
                const payload = JSON.stringify({ 'email': form.lemail.value, 'password': form.lpassword.value });
                let url = 'http://localhost:3000/api/auth/login';
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload };
                const res = await fetch(url, options);
                const data = await res.json();
                if (res.status == 200) {
                    localStorage.setItem('Token', JSON.stringify(data));
                    document.location.href = "http://localhost:8080/";
                }
                else
                    alert('Email ou mot de passe incorrect.')
            },
            async signUp() {
                const form = document.getElementById('signup');
                const payload = JSON.stringify({ 'email': form.email.value, 'password': form.password.value, 'lastname' : form.lastname.value, 'firstname' : form.firstname.value});
                let url = 'http://localhost:3000/api/auth/signup';
                let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload };
                const response = await fetch(url, options);
                await response.json();
            }
        }
    }
</script>

<style lang="scss">
    body {
        background-color: black;
        color: white;
    }

    .container {
        display: flex;
        flex-direction:column;
        align-items: center;
    }

    .Logo {
        max-height: 310px;
        max-width: 310px;
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

    .form-div {
        padding: 10px;
        border: 1px solid grey;
        border-radius: 2px 2px;
        margin-bottom: 100px;
        width: 315px;
    }
</style>