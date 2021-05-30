<template>
  <div>
    <div class="container">
      <h1>Add New user</h1>
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
                :class="{
                  'is-invalid': errors && errors.password,
                }"
                v-model="password"
              />
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>
            </div>

            <div class="form-group">
              <label for="">admin</label>
              <input
                cols="30"
                rows="4"
                class="form-control"
                :class="{
                  'is-invalid': errors && errors.admin,
                }"
                v-model="admin"
              />
              <div class="invalid-feedback" v-if="errors && errors.admin">
                {{ errors.admin.msg }}
              </div>
            </div>

            <div class="form-group">
              <label for="">comment</label>
              <input
                cols="30"
                rows="4"
                class="form-control"
                :class="{
                  'is-invalid': errors && errors.comment,
                }"
                v-model="comment"
              />
              <div class="invalid-feedback" v-if="errors && errors.comment">
                {{ errors.comment.msg }}
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  // middleware: "auth",
  data() {
    return {
      errors: null,
      name: null,
      email: null,
      password: null,
      admin: null,
      comment: null,
    };
  },
  methods: {
    submitForm() {
      axios
        .post("/api/user", {
          name: this.name,
          email: this.email,
          password: this.password,
          admin: this.admin,
          comment: this.comment,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/users/list");
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

<style scoped>
.container {
  margin-top: 5%;
}
</style>
