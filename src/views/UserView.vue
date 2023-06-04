<template>
  <div class="usuario">
    <section class="container">
      <h3 class="title is-5" style="margin-top: 3%;">Información</h3>
      <h3 class="title is-6">Email:{{ email }}</h3>
      <h3 class="title is-6">ID:{{ user_id }}</h3>
      <button v-if="email && user_id" @click="activo = !activo" class="button is-dark mt-4 p-2">Hacer redacción</button>
      <button @click="cerrarSesion" class="button is-primary mt-4 p-2">Cerrar sesión</button>
    </section>
    <section class="box mt-6 mb-4 p-5" v-if="activo">
      <h1 class="title is-4">Publicación</h1>
      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input class="input p-3" type="text" placeholder="Ingrese el título de su artículo" v-model="titulo">
        </div>
      </div>
      <div class="field">
        <label class="label">Cuerpo</label>
        <div class="control">          
          <textarea name="" id="" cols="30" rows="10" class="input p-3" placeholder="Ingrese el contenido de su artículo" v-model="cuerpo"></textarea>
        </div>
      </div>
      <button @click="guardarArticulo" class="button is-primary p-2">Realizar Publicación</button>
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

.box {
  width: 50%;
  margin: 0 auto;
}
</style>

<script>
import { getAuth, signOut } from "firebase/auth";
import '../initFB'
import { db } from '../initFB'
import { collection, addDoc } from "firebase/firestore";

export default {
  name: 'UserView',
  data() {
    return {
      email: "",
      user_id: "",
      activo: false,
      titulo:"",
      cuerpo:"",
      comentarios:[
        {
          comentario:"",
          correo:""
        }
      ]
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
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          console.log("Error al cerrar sesión:", error);
        });
    },
    async guardarArticulo(){
      try {
        const docRef = await addDoc(collection(db, "articulos"), {
          titulo: this.titulo,
          cuerpo: this.cuerpo,
          email: this.email,
          comentarios: this.comentarios          
        });
        console.log("Document written with ID: ", docRef.id);
        this.titulo = ""
        this.cuerpo = ""
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  },
  created() {
    this.obtenerInformacionUsuario()
  }
};
</script>