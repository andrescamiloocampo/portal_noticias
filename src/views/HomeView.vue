<template>
  <div class="home">
    <div class="columns" id="bienvenida">
      <div class="column is-6">
        <img src="@/assets/old-newspaper-g7ac72a0ea_1280.jpg" alt="">
      </div>
      <div class="column ml-4 cuerpo">
        <h1 class="title">Bienvenidos a nuestra página web de noticias, tu fuente confiable para mantenerte informado
          sobre los acontecimientos más relevantes.</h1>
        <p>
          Desde noticias locales hasta eventos internacionales, te ofrecemos información actualizada y objetiva. Explora
          nuestras secciones y mantente al tanto de todo lo que sucede en el mundo.
        </p>
        <router-link to="about" class="button is-primary p-2 mt-5"><strong>Foro de discusión</strong></router-link>     
      </div>
    </div>

    <section class="noticias">
      <router-link v-for="noticia in noticias" :key="noticia"
        :to="{ name: 'NoticiaView', params: { id: JSON.stringify(noticia) }, props: { noticia: noticia } }"
        class="noticia box">
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
  .noticias {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .noticia {
    width: 80%;
  }
}
</style>
