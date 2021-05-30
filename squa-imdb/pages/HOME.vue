<template>
  <main>
    <div class="container movies">
      <div class="subcontainer">
        <div class="tools">
          <div>
          <label for="begin-datepicker" class="begin">FROM ...</label>
          <b-form-datepicker id="begin-datepicker" v-model="bdate" class="mb-2"></b-form-datepicker>
          </div>

          <div>
          <label for="end-datepicker" class="end">... TO</label>
          <b-form-datepicker id="end-datepicker" v-model="edate" class="mb-2"></b-form-datepicker>
          </div>
          <button class="moviebutton" v-on:click="SortByDate()">SORT BY DATE</button>

          <select id="selectgenre" class="custom-select">
            <option selected>ANY GENRES</option>
            <option value="28">ACTION</option>
            <option value="12">AVENTURE</option>
            <option value="16">ANIMATION</option>
            <option value="35">COMEDY</option>
            <option value="99">DOCUMENTARY</option>
            <option value="18">DRAMA</option>
            <option value="27">HORROR</option>
            <option value="878">SF</option>
          </select>

          <button class="moviebutton" v-on:click="SortByGenre()">SORT BY</button>

        </div>
      </div>

      <div class="state-movie">MOVIES :</div>
      <div class="subcontainerMovies">
        <div v-for="movies of movielist.results" :key="movies">
          <div class="movie-box">
            <div class="card">
              <div class="movie-poster">
              <img
              :src="`https://image.tmdb.org/t/p/w300${movies.poster_path}`"
              v-on:click="GoTo(movies.id)"
              alt="Poster"
              />
              </div>
              <div class="card-body">
              <div class="movie-title">{{ movies.title }}</div>
              <div class="movie-date"> {{ movies.release_date }}</div>
              <div class="movie-resume-title">RESUME :</div>
              <div class="movie-resume">{{ movies.overview }}</div>
              <button class="moviebutton" v-on:click="GoTo(movies.id)">GO TO</button>
              </div>
            </div>
          </div>
        </div>
        <div v-for="mymovies of mymovielist" :key="mymovies">
        <div class="movie-box">
            <div class="card">
              <div class="movie-poster">
              <img
              :src="`https://image.tmdb.org/t/p/w300${mymovies.poster}`"
              alt="Poster"
              />
              </div>
              <div class="card-body">
              <div class="movie-title">{{ mymovies.title }}</div>
              <div class="movie-date">{{ mymovies.tagline }}</div>
              <div class="movie-resume-title">DIRECTORS :</div>
              <div class="movie-date">{{ mymovies.directors }}</div>
              <div class="movie-resume-title">RELEASE DATE :</div>
              <div class="movie-date"> {{ mymovies.release }}</div>
              <div class="movie-resume-title">RESUME :</div>
              <div class="movie-resume">{{ mymovies.overview }}</div>
              <div class="movie-resume-title">GENRE :</div>
              <div class="movie-resume">{{ mymovies.genre }}</div>
              <div class="movie-resume-title">RATE :</div>
              <div class="movie-resume">{{ mymovies.note }}</div>
              <button class="moviebutton" v-on:click="GoTo(mymovies.id, mymovies.movieid)">GO TO</button>

        </div>
        </div>
        </div>
        </div>
      </div>
    </div>

    <footer>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" v-on:click="NewPage(page - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item active" aria-current="page">
          <span class="page-link">{{page}}</span>
        </li>
        <li class="page-item"><a class="page-link" v-on:click="NewPage(page + 1)">{{page + 1}}</a></li>
        <li class="page-item"><a class="page-link" v-on:click="NewPage(page + 2)">{{page + 2}}</a></li>
        <li class="page-item">
          <a class="page-link" v-on:click="NewPage(page + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    </footer>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movielist: [],
      mymovielist: [],
      genre: "",
      bdate: "",
      edate: "",
      date: "",
      page: 1,
    };
  },
  created() {
    this.fetchAll();
    this.myfetchAll();
  },
  methods: {
    fetchAll(genre = "0", date = "0", page = "&page=" + this.page) {
      // console.log("FETCH ALL");
      // console.log(genre);
      // console.log(date);
      // console.log(page);
      if (genre === "0") {
        genre = ""
      }
      if (date === "0") {
        date = ""
      }
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=cc2d59a69cdae36210c1fb8484c2246c&language=fr-FR&sort_by=popularity.desc${date}${genre}${page}`
        )
        .then((res) => {
          // console.log("DATA :")
          // console.log(res.data);
          this.movielist = res.data
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    },

    // myfetchAll(genre = "0", date = "0", page = "&page=" + this.page) {
      // console.log("FETCH ALL");
      // console.log(genre);
      // console.log(date);
      // console.log(page);
      // if (genre === "0") {
      //   genre = ""
      // }
      // if (date === "0") {
      //   date = ""
      // }
      myfetchAll() {
      axios
        .get('/api/allmovies')
        .then((res) => {
          console.log("DATA :")
          console.log(res.data);
          this.mymovielist = res.data
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    },

    fetchMyMovies() {
      axios.get('/api/isitmymovie',
      // {
      //   params: {
      //     movieid:
      //     authorId:
      //   }
      // }
      )
      .then((res) => {
        console.log("DATA :")
        console.log(res);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    },

    GoTo(movieID, tmdbID = "0") {
      this.$router.push({ name: "movie", params: { id: movieID, movieid: tmdbID} });
    },

    SortByGenre() {
      var e = document.getElementById("selectgenre");
      var strUser1 = e.value;
      var strUser2 = e.options[e.selectedIndex].text;
      this.genre = this.genre + "&with_genres=" + strUser1;
      // console.log("THIS GENRE")
      // console.log(this.genre)
      this.fetchAll(this.genre, this.date);
    },
    SortByDate() {
      // console.log(this.bdate)
      // console.log(this.edate)
      this.date = this.date + "&primary_release_date.gte=" + this.bdate + "&primary_release_date.lte=" + this.edate;
      this.fetchAll(this.genre, this.date);
    },
    NewPage(p) {
      // console.log("THIS PAGE :")
      // console.log(p)
      if (p === 0) {
        this.page = 1
        this.fetchAll(this.genre, this.date)
      }
      else {
        console.log(p)
        this.page = p
        this.fetchAll(this.genre, this.date)
      }
    }
  },
};
</script>

<style scoped>
.subcontainer {
  border-color: blue;
  background-color: rgb(235, 32, 32);
}

.subcontainerMovies{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.begin{
  color:ivory;
  font-family: "Stellar-Regular";
  text-shadow: 2px 2px 5px grey;
}

.end{
  color:ivory;
  font-family: "Stellar-Regular";
  text-shadow: 2px 2px 5px grey;
}

.movies {
  text-align: center;
  font-family: "Stellar-Regular";
}

.state-movie {
  font-family: "Stellar-Bold";
  margin-top: 2%;
  margin-bottom: 2%;
  font-size: 60px;
  color: ivory;
  text-shadow: 2px 2px 5px grey;
}

.tools {
  text-align: center;
  font-family: "Stellar-Bold";
  font-size: 20px;
}

.card {
  display: inline-block;
  border: solid 3px black;
  box-shadow: 6px 6px 30px #fa2a2a;
  max-height: 100%;
  max-width: 100%;
}

.movie-title {
font-family: "Stellar-Bold";
font-size: 35px;
}

.movie-box {
margin: 20px;
}

.card-body {
    width: 400px;
    float: right;
    height: 450px;
    overflow-y: scroll;

}

.movie-poster {
    width: 100%;
}

.movie-date {
  font-family: "Stellar-Bold";
  font-size: 20px;
}

.movie-resume {
  font-family: "Stellar-Light";
  margin-bottom: 25px;
  font-size: 16px;
}

.movie-resume-title {
  margin-top: 20px;
  margin-bottom: 10px;
}

.moviebutton {
  display: inline-block;
  border-radius: 4px;
  border: 0.5px solid ivory;
  color: ivory;
  background-color: #fa2a2a;
  text-decoration: none;
  padding: 10px 30px;
  margin: 15px;
  font-size: 20px;
}

.moviebutton:hover {
  color: #fff;
  background-color: pink;
}

footer {
  text-align: center;
  font-family: "Stellar-Bold";
}

.pagination > li > a
{
    background-color: ivory;
    color: #5A4181;
}

.pagination > li > a:focus,
.pagination > li > a:hover,
.pagination > li > span:focus,
.pagination > li > span:hover
{
    color: ivory;
    background-color: pink;
    border-color: solid 1px #ddd;
}

.pagination > .active > span
{
    color: ivory;
    background-color: #fa2a2a !Important;
    border: solid 1px#ddd !Important;
}

.pagination > .active > span:hover
{
    color: darkorange;
    background-color:pink !Important;
    border: solid 1px #35495e;
}

</style>
