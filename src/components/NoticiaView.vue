<template>
  <div class="mt-5">
    <h1 class="title is-3">{{ noticia.title }}</h1>
    <h2 class="title is-6 has-text-grey-light">{{ noticia.description }}</h2>
    <div class="columns mx-6">
      <div class="column is-6">
        <img :src="noticia.urlToImage" alt="">
      </div>
      <div class="column is-6 has-text-left is-align-content-space-between" id="content">
        <p>{{ noticia.content }}</p>
        <p>{{ noticia.publishedAt }}</p>
        <p>{{ noticia.author }}</p>
        <a :href="noticia.url">Fuentes</a>
      </div>
    </div>
    <h1 class="title is-5">Discusión</h1>
    <div class="box is-6 mt-3 mx-3 has-background-light rows" style="height: 200px; overflow-y: scroll;">
      <div class="box rounded column is-8" v-for="comentario in comentarios" :key="comentario">
        <h2 class="title is-6">{{ comentario.correo }}</h2>
        <p>{{ comentario.comentario }}</p>
      </div>
    </div>
    <form class="columns mb-5">
      <input class="input is-normal column is-6 ml-5" type="text" placeholder="Ingrese un comentario"
        v-model="comentario">
      <button type="button" @click="agregarComentario" class="button is-primary column is-2 ml-3">Ingresar
        comentario</button>
    </form>

  </div>
</template>
  
<script>
import { getAuth } from "firebase/auth"
import { db } from '../initFB'
import { collection, addDoc, getDocs } from "firebase/firestore";
export default {
  name: 'NoticiaView',
  data() {
    return {
      noticia: JSON.parse(this.$route.params.id),
      comentario: "",
      email: "",
      id_articulo:JSON.parse(this.$route.params.id).title,
      datosRegistro: {
        comentario: "",
        correo: this.email,
        id_articulo: JSON.parse(this.$route.params.id).title
      },
      comentarios: []
    }
  },
  methods: {
    obtenerInformacionUsuario() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        this.email = user.email;
        this.datosRegistro.correo = this.email;
      }
    },
    async agregarComentario() {
      try {
        const docRef = await addDoc(collection(db, "comentarios"), {
          comentario: this.comentario,
          correo: this.datosRegistro.correo,
          id_articulo: this.datosRegistro.id_articulo
        });
        console.log("Document written with ID: ", docRef.id);
        this.comentario = ""
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async obtenerComentarios() {
      this.comentarios = []
      const querySnapshot = await getDocs(collection(db, "comentarios"));
      querySnapshot.forEach((doc) => {        
        this.comentarios.push(doc.data())
      });
      this.comentarios = this.comentarios.filter((comment)=>{
        return comment.id_articulo === this.id_articulo
      })
      console.log(this.comentarios)
    }
  },
  created() {
    this.obtenerInformacionUsuario()
    this.obtenerComentarios()
  }
}
</script>
  
<style scoped>
#content p:not(:first-child) {
  margin-top: 3%;
}
</style>
  