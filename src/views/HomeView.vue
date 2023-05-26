<template>
  <div class="home">
    <div class="columns" id="bienvenida">
      <div class="column is-6">
        <img src="@/assets/old-newspaper-g7ac72a0ea_1280.jpg" alt="">
      </div>
      <div class="column ml-4 cuerpo">
        <h1 class="title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nam et iste quasi
          laudantium nihil distinctio aliquid quisquam vero.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis exercitationem assumenda ad et? Molestiae
          nihil rem labore ducimus rerum quas debitis sunt perferendis nisi optio eos natus saepe, ea porro.
        </p>
      </div>
    </div>

    <section class="noticias">
      <router-link v-for="(noticia, id) in noticias" :key="id"
        :to="{ name: 'NoticiaView', params: { id: id }, props: { noticia: noticia } }" class="noticia box">        
          <h2 class="title is-5">{{ noticia.title }}</h2>
          <img :src="noticia.urlToImage" alt="" class="mb-4">
          <p class="mb-4">{{ noticia.content }}</p>
          <h6>{{ noticia.publishedAt }}</h6>
          <h6>{{ noticia.author }}</h6>        
      </router-link>
    </section>

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      noticias: []
    }
  },
  methods: {
    cargar() {
      let key = '53c051a34b9d494b9d4ae728e97e9b54'
      let country = 'us'
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key}`
      fetch(url).then((response) => response.json()).then(data => {
        console.log(data)
        this.noticias = data.articles
      })
    },
  },
  created() {
    this.cargar()
  }
}
</script>

<style scoped>
* {
  width: 100%;
  height: 100%;
  padding: 0%;
  margin: 0%;
  color: black;
}

#bienvenida {
  width: 80%;
  margin-top: 5%;
  margin-left: 10%;
  text-align: left;  
}

.noticia {
  margin: 3%;
  width: 30%;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.noticia img {
  width: 80%;
}

.noticias {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 1225px) {
  .noticias{
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .noticia{
    width: 80%;
  }
}

</style>
