<template>
  <div class="container">
    <v-container>
      <v-tabs>
        <v-tab to="/admin/Films" class="film">Films</v-tab>
        <v-tab to="/admin/tags" class="tags">Tags</v-tab>
      </v-tabs>
      <v-title class="addUser">Add User</v-title>
      <v-form>
        <v-text-field v-model="username" label="Enter Username"></v-text-field>
        <v-text-field v-model="email" label="Enter E-mail"></v-text-field>
        <v-text-field v-model="password" label="Enter Password"></v-text-field>
      </v-form>
      <v-btn @click.stop="saveBook" color="rgb(235, 32, 32)" class="Add">Add</v-btn>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  // middleware: ["auth-admin"],
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  async asyncData({ error, $axios }) {
    try {
      let { data } = await $axios.get("/api/users");
      return {
        users: data.data,
      };
    } catch (err) {
      // handle errors.
    }
  },
  methods: {
    saveBook() {
      let userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      eventBus.$emit("save-book", userData);
    },
  },
};
</script>

<style scoped>

.container{
  width: 100%;
  justify-content: center;
  margin-top: 4%;
  border-block-color: red;
}

.films{
  font-family: "Stellar-Regular";
  font-size: 15px;

}

.tags{
  font-size: 15px;
  font-family: "Stellar-Regular";
}

.addUser{
  color:ivory;
  font-size: 20px;
  margin-top: 2em;
  font-family: "Stellar-Regular";
  text-shadow: 2px 2px 5px grey;
}
.v-btn {
  display: inline-block;
  border-radius: 4px;
  border: 0.5px solid blue;
  padding-left: 1%;
  padding-bottom: 1%;
  width: 100%;
  color: ivory;
}

</style>

