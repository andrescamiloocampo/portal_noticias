<template>
  <div class="usuario">
    <section class="container">
      <h3 class="title is-5" style="margin-top: 3%;">Información</h3>
      <h3 class="title is-6">Email:{{ email }}</h3>
      <h3 class="title is-6">ID:{{ user_id }}</h3>
      <button @click="cerrarSesion" class="button is-primary mt-4 p-2">Cerrar sesión</button>
    </section>
  </div>
</template>

<style scoped>
* {
  width: 100%;
  height: 100%;
  margin: 0%;
  padding: 0%;
}

.container {
  width: 50%;
  margin: 0 auto;
  margin-top: 10%;
}
</style>

<script>
import { getAuth, signOut } from "firebase/auth";
import '../initFB'

export default {
  name: 'UserView',
  data() {
    return {
      email: "",
      user_id: ""
    };
  },
  methods: {
    obtenerInformacionUsuario() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        this.email = user.email;
        this.user_id = user.uid;
      }
    },
    cerrarSesion() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Cierre de sesión exitoso");
          this.$router.push({name:'login'})          
        })
        .catch((error) => {
          console.log("Error al cerrar sesión:", error);
        });
    }
  },
  created(){
    this.obtenerInformacionUsuario()
  }
};
</script>