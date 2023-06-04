<template>
  <div class="about">
    <h1 class="title is-4">Foro de discusión</h1>

    <div class="columns mt-6" style="flex-direction: column;">
      <router-link :to="{ name: 'ArticuloView', params: { id: JSON.stringify(articulo) }}" class="box column is-6 has-text-left" v-for="articulo in articulos" :key="articulo" style="margin-left: 25%;">
        <h1 class="title is-5">{{articulo.titulo}}</h1>
        <p>{{articulo.cuerpo}}</p>
        <p class="mt-2"><strong>{{ articulo.email }}</strong></p>
      </router-link>
    </div>
  </div>
</template>


<script>
import { db } from '../initFB'
import { collection,getDocs } from "firebase/firestore";
export default {
  name: 'AboutView',
  data() {
    return {
      articulos:[],      
    }
  },
  methods: {
    async Articulos() {
      this.articulos = []
      const querySnapshot = await getDocs(collection(db, "articulos"));
      querySnapshot.forEach((doc) => {    
        let article = doc.data()
        article.id = doc.id    
        this.articulos.push(article)
        article = null        
      });
      console.log(this.articulos)
    }
  },
  created() {    
    this.Articulos()
  }
}
</script>
  
<style scoped>
#content p:not(:first-child) {
  margin-top: 3%;
}
</style>