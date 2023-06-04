<template>
    <div class="container is-6 has-text-left mt-4">
        <h1 class="title is-4">{{ articulo.titulo }}</h1>
        <p>{{ articulo.cuerpo }}</p>
        <p>{{ articulo.email }}</p>
        <div class="box mt-5 has-background-light" style="overflow-y: scroll; height: 300px;">
            <div v-for="comentario in comentarios" :key="comentario" class="box">
                <p><strong>{{ comentario.comentario }}</strong></p>
                <h1>{{ comentario.correo }}</h1>
            </div>
        </div>
        <div class="columns ml-1">
            <input class="input is-normal column is-6 mr-2" type="text" placeholder="Ingrese un comentario"
                v-model="comentario">
            <button class="button is-primary is-1" @click="agregarComentario">Envíar</button>
        </div>
    </div>
</template>
    
<script>
import { getAuth } from "firebase/auth"
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../initFB"
export default {
    name: 'ArticuloView',
    data() {
        return {
            articulo: JSON.parse(this.$route.params.id),
            comentarios: JSON.parse(this.$route.params.id).comentarios,
            comentario: "",
            email: "",
            ID: JSON.parse(this.$route.params.id).id
        }
    },
    methods: {
        obtenerInformacionUsuario() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                this.email = user.email;
            }
        },
        async actualizarComentarios() {
            this.comentarios = []
            const docRef = doc(db, "articulos", this.ID);            
            this.comentarios = docRef.comentarios            
        },
        async agregarComentario() {
            const docRef = doc(db, "articulos", this.ID);
            let comment = {
                comentario: this.comentario,
                correo: this.email
            }
            updateDoc(docRef, {
                comentarios: arrayUnion(comment)
            }).then(() => {
                console.log("Comentario agregado")
            }).catch((error) => {
                console.log("Error ingresando el comentario:" + error)
            })
            this.comentario = ""
        },
    },
    created() {
        this.obtenerInformacionUsuario()
        
    }
}
</script>
    
<style scoped></style>
    