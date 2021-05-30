<template>
  <div>
    <h1>user Details</h1>

    <hr />

    <div class="alert alert-success" v-if="$route.params.updated == 'yes'">
      Record updated successfully
    </div>

    <td contenteditable @blur="nameChanged">Name : {{ user.name }}</td>
    <!-- <p>Name : {{ user.name }}</p> -->

    <p>Email : {{ user.email }}</p>

    <p>Password : {{ user.password }}</p>

    <p>Admin : {{ user.admin }}</p>

    <p>Comment : {{ user.comment }}</p>

    <hr />
    <button class="btn" v-on:click="SaveUpdate(user.id)">Save</button>
    <div class="d-flex justify-content-between">
      <div>
        <!-- <nuxt-link
          :to="'/user/' + this.$route.params + '/update'"
          class="btn btn-primary mr-3"
          >Update</nuxt-link
        > -->
        <button class="btn btn-danger" @click="deleteRecord()">Delete</button>
      </div>
      <nuxt-link to="/users/list" class="btn btn-secondary mr-3"
        >Back to users</nuxt-link
      >
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
    nameChanged($event) {
      this.user.name = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
    SaveUpdate(id) {
      console.log("HEY");
      //var token =localStorage.getItem("authtoken")
      axios
        .patch("http://localhost:3000/api/user/" + this.$route.params.userId, {
          name: `${this.user.name}`,
          // description: `${this.concert.description}`,
          // genre: `${this.concert.genre}`,
          // artiste: `${this.concert.artiste}`,
          // date: `${this.concert.date}`,
          // price: `${this.concert.price}`,
        })
        .then((res) => {
          console.log(res.data);
          console.log("HO");
        })
        .catch((error) => {
          console.log("AH");
          console.log(error.message);
        });
      console.log("HE");
    },
    deleteRecord() {
      if (confirm("Are you sure?") === true) {
        axios
          .delete("/api/user/" + this.user.id)
          .then((response) => {
            if (response.data.id) {
              this.$router.push("/users/list");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>