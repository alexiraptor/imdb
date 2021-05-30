<template>
  <div>
    <h1>Update user</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">name</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name"
            />
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">email</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email"
            />
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">password</label>
            <input
              cols="30"
              rows="4"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password"
            />
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3" />
          <nuxt-link to="/users/list" class="btn btn-secondary mr-3"
            >Cancel</nuxt-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // middleware: "auth",
  created() {
    this.asyncData();
  },
  data() {
    return {
      user: {},
    };
  },

  methods: {
    async asyncData() {
      const data = await axios.get(
        "http://localhost:3000/api/user/" + this.$route.params.userId
      );
      this.user = data.data;
    },
    fillFormData() {
      this.name = this.user.name;
      this.email = this.user.email;
      this.password = this.user.password;
    },
    submitForm() {
      this.$axios
        .put("/api/user/" + this.user.id, {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.id) {
            this.$router.push("/users/list");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>