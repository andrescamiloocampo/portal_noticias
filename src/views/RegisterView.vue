<template>
    <div class="registro">
        <div class="container">
            <form action="#" @submit.prevent="register">
                <h1 class="title">Crear una cuenta</h1>

                <div class="field">
                    <label class="label">Correo:</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Ingrese su correo" v-model="email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Contraseña:</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="Ingrese su contraseña" v-model="password">
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <input class="button is-primary" type="submit" value="Registrarse">
                    </div>
                </div>

                <div v-if="error" class="notification is-danger">
                    {{ error }}
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import '../initFB.js'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'RegisterView',
    data() {
        return {
            user: "",
            password: "",
            email: "",
            error: ""
        };
    },
    methods: {
        register() {
            this.error = "";
            if (this.password && this.email) {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then(userCredential => {
                        console.log(userCredential.user);
                        this.user = "";
                        this.password = "";
                        this.email = "";
                    })
                    .catch(error => {
                        this.error = error.message;
                    });
            } else {
                this.error = "Todos los campos son requeridos";
            }
        }
    }
};
</script>

<style scoped>
* {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

#formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    margin-left: 35%;
    margin-top: 5%;
    background-color: #282a35;
    color: white;
    padding: 5%;
    border-radius: 10px;
    justify-content: center;
}

#formulario input {
    margin-top: 10%;
    padding: 2%;
    border: none;
}

#b1 {
    background-color: #04aa6d;
    color: white;
    padding: 4% !important;
    cursor: pointer;
}

#b1:hover {
    background-color: #04c77f;
}

#error {
    background-color: rgba(248, 65, 65, 0.966);
    margin-top: 5%;
    font-size: medium;
    width: 50%;
    padding: 2%;
    border-radius: 5px;
}

.container {
    margin: 0 auto;
    margin-top: 5%;
    padding: 2%;
}

.container input {
    padding: 1%;
}
</style>