<template>
  <div class="sousconteneur">
    <div class="registerimg">
      <img alt="register" src="../assets/register.png"/>
    </div>
    <v-container>
      <h1 class="register">Register</h1>
      <UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true" class="btnregister"/>
      <NuxtLink to="/login">Vous avez déjà un compte? cliquez ici</NuxtLink>
    </v-container>
  </div>
</template>

<script>
import UserAuthForm from '../components/UserAuthForm'
import axios from 'axios'
export default {
  components: {
    UserAuthForm,
  },
methods:{
    async registerUser(registrationInfo){
        try{console.log("coucou")
            await axios.post('/api/user', registrationInfo)

            await this.$auth.loginWith('local',{
             data: registrationInfo,
                }, this.$router.push('/login'),
            this.$store.dispatch('snackbar/setSnackBar', {text:'Ca y est vous êtes connecté! Mashallah!, ${this.$auth.user.name}'}))
            }
        catch{
            this.$store.dispatch('snackbar/setSnackBar', {text:'Il faut vous connecter, merci de rééssayer' , color: 'red'})
            }
        }
    }
}
</script>

<style>

.registerimg img{
  height: 30%;
  width: 40%;
  margin-left: 30%;
  margin-top: -1.5%;
}
.sousconteneur{
  width: 100%;
  justify-content: center;
}

.register{
  color:ivory;
  font-family: "Stellar-Regular";
}

.btnregister {
  display: inline-block;
  border-radius: 4px;
  border: 0.5px solid rgb(235, 32, 32);
  padding-left: 1%;
  padding-bottom: 1%;
  width: 100%;
  text-decoration: none;
  color: blue;
}

</style>
