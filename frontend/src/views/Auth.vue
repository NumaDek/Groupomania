<template>
    <div class="container">
        <img src="@/assets/icon-left-font-monochrome-white.png" alt="Groupomania Logo" class="Logo" />
        <div class="form-div">
            <h2>Authentification</h2>
            <form action="http://localhost:3000/api/auth/login" method="post" class="form">
                <div class="form">
                    <label for="lemail">Adresse mail: </label>
                    <input type="email" name="email" id="lemail" required>
                </div>
                <div class="form">
                    <label for="lpassword">Mot de passe: </label>
                    <input type="password" name="password" id="lpassword" required>
                </div>
                <div>
                    <input type="submit" value="S'authentifier" />
                </div>
            </form>
        </div>
        <div class="form-div">
            <h2>Inscription</h2>
            <form action="http://localhost:3000/api/auth/signup" method="post" class="form">
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
        name: 'Auth'
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