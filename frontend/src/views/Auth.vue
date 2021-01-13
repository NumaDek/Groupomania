<template>
    <main class="container">
        <img src="@/assets/icon-left-font-monochrome-white-slim.png" alt="Groupomania Logo" class="Logo" />
        <h1>Veuillez-vous incrire ou vous connecter</h1>
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
                    <label for="fistname">Pr&#233;nom: </label>
                    <input type="text" name="firstname" id="firstname" aria-label="Prénom" required>
                </div>
                <div class="form">
                    <label for="lastname">Nom: </label>
                    <input type="text" name="lastname" id="lastname" aria-label="Nom de famille" required>
                </div>
                <div class="form">
                    <label for="email">Adresse mail: </label>
                    <input type="email" name="email" id="email" aria-label="adresse e-mail" required>
                </div>
                <div class="form">
                    <label for="password">Mot de passe: </label>
                    <input type="password" name="password" id="password" aria-label="mot de passe" required>
                </div>
                <div>
                    <input type="submit" value="S'inscrire" aria-label="S'inscrire"/>
                </div>
            </form>
        </div>
    </main>
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
                if (res.status == 201) {
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
                const res = await fetch(url, options);
                if (res.status == 201) {
                    const payload = JSON.stringify({ 'email': form.email.value, 'password': form.password.value });
                    let url = 'http://localhost:3000/api/auth/login';
                    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload };
                    const res = await fetch(url, options);
                    const data = await res.json();
                    if (res.status == 201) {
                        localStorage.setItem('Token', JSON.stringify(data));
                        document.location.href = "http://localhost:8080/";
                    }
                    else
                        alert('Email ou mot de passe incorrect.')
                }
                else
                    alert('An error has occured');
            }
        },
        created: function () {
            const token = localStorage.getItem('Token');
            if (token != null)
                document.location.href = 'http://localhost:8080/';
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
        padding: 1px;
        border: 1px solid grey;
        border-radius: 2px 2px;
        margin-bottom: 100px;
        width: 315px;
    }

    @media (max-width: 425px) {
        .form-div {
            border: none;
        }
    }
</style>