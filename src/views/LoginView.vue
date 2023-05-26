<template>
    <div class="login">
      <div class="container">
            <form action="#" @submit.prevent="login">
                <h1 class="title">Iniciar sesión</h1>
                <div class="field">
                    <label class="label">Correo:</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Ingrese su correo" v-model="user">
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
                        <input class="button is-primary" type="submit" value="Iniciar sesión">
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
import { getAuth, signInWithEmailAndPassword,setPersistence,browserSessionPersistence } from "firebase/auth";
  
  export default {
    name: 'LoginView',        
    data() {
      return {
        user: "",
        password: "",
        error: false,
        error_message: "",    
        loggedUser:{}    
      }
    },
    methods: {
      login() {
        if (this.user && this.password) {
          const auth = getAuth();
          setPersistence(auth, browserSessionPersistence)
          .then(()=>{
            signInWithEmailAndPassword(auth, this.user, this.password)
              .then(userCredential => {              
                const user = userCredential.user;                             
                this.$emit('user-logged-in',user)                               
                this.$router.push({name:'home'})
                console.log('Inicio de sesión exitoso:', user);              
                this.user = "";
                this.password = "";
              })
              .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error durante el inicio de sesión:', errorCode, errorMessage);
                this.error = true;
                this.error_message = errorMessage;
              });
          })
          .catch((error)=>{
            console.log(error)
          })
        } else {
          this.error = true;
          this.error_message = "Todos los campos son requeridos";
        }
      },
    }
  }
  </script>
  
<style scoped>
*{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
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