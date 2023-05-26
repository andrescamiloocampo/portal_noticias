<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      
      <router-link to="/" class="navbar-item">
        <img src="./assets/326663_language_web_icon.png" width="35" height="20">
        <h1 class="title is-5 mx-2">Global news</h1>
      </router-link>
      
      <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-primary" to="/register">
              <strong>Registrarse</strong>
            </router-link>

            <router-link class="button is-light" to="/login">
              Iniciar sesión
            </router-link>
            
            <router-link class="button is-info" to="/user">Perfil</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view v-on:user-logged-in="updateUserLoggedIn" />
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    updateUserLoggedIn(loggedIn) {
      this.loggedIn = loggedIn
    }
  },
  created(){
    
  }
};
</script>

<style>
* {
  margin: 0%;
  padding: 0%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #282a35;
  color: white;
  margin: 0;
  font-size: 10px;
}

header section {
  display: flex;
  flex-direction: row;
  width: 15%;
  justify-content: space-evenly;
  font-size: 14px;
}

#s1 {
  width: 15%;
  align-items: center;
  justify-content: space-evenly;
}

header section a {
  text-decoration: none;
  color: white;
}

#logo {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    height: auto;
  }

  #s1,
  section {
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }

  h1 {
    margin-left: 0;
  }
}

.rl {
  background-color: #333644;
  padding: 1%;
  border-radius: 10px;
}
</style>

