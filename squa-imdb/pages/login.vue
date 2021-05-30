<template>
  <div class="sousconteneur">
    <div class="loginimg">
      <img alt="login" src="../assets/login.png"/>
    </div>
    <v-container>
        <h1 class="login">Login</h1>
        <UserAuthForm buttonText="Login" :submitForm="loginUser" class="btnLogin"/>
        <NuxtLink to="/register"> Pas de compte? par ici</NuxtLink>
    </v-container>
  </div>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
export default {
  // middleware: ['auth-admin'],
  components: {
    UserAuthForm,
  },
methods:{
    async loginUser(loginInfo){
      try{ console.log("coucou")
      //await axios.get('/api/user', loginInfo)
      await this.$auth.loginWith('local',{
        data: loginInfo
      },
      //this.$store.dispatch('snackbar/setSnackBar', {text:'Merci pour votre connection , ${this.$auth.user.name}'}),
      this.$router.push('/HOME')

      )}
      catch{
      //this.$store.dispatch('snackbar/setSnackBar', {text:'Il faut vous enregistrer, merci de rééssayer' , color: 'red'})
    }
  }
}

}
</script>

<style>
.loginimg img{
  height: 30%;
  width: 40%;
  margin-left: 30%;
  margin-top: -1.5%;
}
.sousconteneur{
  width: 100%;
  justify-content: center;
}

.login{
  color:ivory;
  font-family: "Stellar-Regular";
}

.btnLogin {
  display: inline-block;
  border-radius: 4px;
  border: 0.5px solid rgb(235, 32, 32);
  padding-left: 1%;
  padding-bottom: 1%;
  width: 100%;
  color: blue;
  text-decoration: none;
}


</style>
