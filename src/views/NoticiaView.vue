<template>
    <div>
      {{ noticia.title }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'NoticiaView',
    data() {
      return {
        noticia:{}
      }
    },
  };
  </script>
  
  <style scoped>
  </style>
  