<template>
  <v-app>
    <v-app-bar app color="#fa2a2a">
    <Header/>
    <!-- <v-btn text to="/home">home</v-btn> -->
    <v-btn text to="/admin/films" v-if="$auth.user && $auth.user.admin"  >
    CRUD Films
    </v-btn>
    <!-- <v-btn text to="admin/films" v-if="$auth.user && $auth.user.admin"></v-btn> -->

    <v-spacer />
    <!-- <div v-if="$auth.loggedIn">
      {{$auth.user.email}} -->
      <NuxtLink to="/login">
      <v-btn class="btn1" text @click="$auth.logout()">LogOut</v-btn></NuxtLink>
    <!-- </div> -->
    <!-- <div v-else> -->
       <!-- login Button
      register Button -->
      <v-btn class="btn1" text to="/login">LogIn</v-btn>
      <v-btn class="btn1" text to="/register">Register</v-btn>

<!--
  <button class="moviebutton" v-on:click="SortByGenre()">SORT BY</button>

-->

    <!-- </div> -->
    </v-app-bar>
    <v-content>
    <Nuxt />
    </v-content>
    <Footer/>

  </v-app>

</template>
<script>
import Header from '../components/header';
import Footer from '../components/Footer';
export default {
  components: {Header, Footer},
  data(){
      return{
        snackbar: false,
        snackbarText: "",
      }
    }

}

</script>

<style>
.container {
  background-color: coral;
}

.btn{
  border-radius: 4px;
  border: 0.5px solid ivory;
  color: ivory;
  background-color: #fa2a2a;
}

.btn1{
  border-radius: 4px;
  border: 0.5px solid coral;
  background-color: ivory;
  /*margin-top: 5%;*/
}
</style>
