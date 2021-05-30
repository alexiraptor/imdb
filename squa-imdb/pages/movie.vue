<template>
  <main>
  <header>
  </header>

    <div class="container movies">

      <div class="movie-box" container>
          <div class="card">
                <div class="row">
                  <div class="movie-poster" col-6>
                    <img v-show="!image"
                    :src="`https://image.tmdb.org/t/p/w500${movies.poster_path}`"
                    />
                    <img v-show="image"
                    :src="`https://image.tmdb.org/t/p/w500${moviesdb.poster}`"
                    />
                  </div>
                  <div class="card-body" col-6>
                    <div class="movie-title">{{ movies.title }} {{ moviesdb.title }}</div>
                    <div class="movie-tagline">{{ movies.tagline }} {{ moviesdb.tagline }}</div>
                    <div class="movie-date"> {{ movies.release_date }} {{ moviesdb.release }}</div>
                    <div class="movie-director-title">DIRECTORS :</div>
                    <div class="movie-director" v-for="director of directors" :key="director">{{ director }}</div>
                    <div class="movie-resume-title">RESUME :</div>
                    <div class="movie-resume">{{ movies.overview }} {{ moviesdb.overview }}</div>
                    <div class="movie-genre-title">GENRES : </div>
                    <div class="movie-genre" v-for="genre of genres" :key="genre">{{ genre }}</div>
                    <div class="tools">
                    <button class="moviebutton" v-on:click="AddToDB()">ADD TO FAVORITE</button>
                    <select id="selectgenre" class="custom-select">
                      <option selected>RATE</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <button class="moviebutton" v-on:click="Rate()">RATE</button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="commentaires" col-12>
                  COMMENTAIRES
                  </div>
                </div>
          </div>
      </div>
    </div>
  <footer></footer>
  </main>
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        movies: "",
        moviesdb: "",
        directors: [],
        genres: [],
        note: 1,
        image: true,
      }
    },
    async fetch() {
      console.log("PARAMS :")
      console.log(this.$route.params.id)
      console.log(this.$route.params.movieid)

      if(this.$route.params.movieid === "0") {
        this.image=false
      this.movies = await fetch(
        'https://api.themoviedb.org/3/movie/' + this.$route.params.id + '?api_key=cc2d59a69cdae36210c1fb8484c2246c&language=fr-FR&append_to_response=credits'
      ).then(res => res.json())
      console.log(this.movies)

        // DIRECTORS
        var directors = [];
        // console.log("CREDITS :")
        // console.log(this.movies.credits)
        this.movies.credits.crew.forEach(function(entry){
        if (entry.job === 'Director') {
            directors.push(entry.name);
            }
        })
        console.log('Director: ' + directors.join(', '));
        this.directors = directors

        //GENRES
        var genres = [];
        this.movies.genres.forEach(function(entry){
            genres.push(entry.name);
        })
        console.log('Genres : ' + genres.join(', '));
        this.genres = genres
        }
        else {
          this.image = true
          var movieID = parseInt(this.$route.params.movieid)
          console.log(movieID)
          axios.post('/api/mymovie',
          {
              movieid: movieID,
          })
          .then((res) => {
            console.log("DATA :")
            console.log(res.data);
            this.moviesdb = res.data
          })
          .catch(error => {
            console.log("ERROR: ", error);
          });
         }
      },

      methods: {
        Rate() {
          console.log("bouton pressey")
          var e = document.getElementById("selectgenre");
          var strUser1 = e.value;
          console.log(strUser1)
          this.note = strUser1
        },
        async AddToDB() {
            var resume = (this.movies.overview).substr(0, 180)
            var directors = (this.directors).toString()
            var genres = (this.genres).toString()
            await axios.post('/api/createmovie', {
              title: this.movies.title,
              movieid: this.movies.id,
              overview: resume,
              directors: directors,
              genre: genres,
              tagline: this.movies.tagline,
              poster: this.movies.poster_path,
              release: this.movies.release_date,
              note: this.note,
              })
              .then((res) => {
                console.log("DATA :")
                console.log(res);
              })
              .catch(error => {
                console.log("ERROR: ", error);
              });

              },
            }
          }

</script>


<style scoped>

.movies {
  text-align: center;
  font-family: "Stellar-Regular";
  background-color: rgb(235, 32, 32);
}

.card-body {
    width: 600px;
    float: right;
    height: 750px;
    width: 50%;
    overflow-y: scroll;
}

.commentaires {
    width: 100%;
    height: 10em;
    overflow-y: scroll;
    background-color: lightpink;
}

.movie-poster {
   /* max-width: 500px;*/
   height: 100%;
   margin-top: 0.5%;
   justify-content: space-evenly;
}

.movie-date, .movie-director {
  font-family: "Stellar-Bold";
  font-size: 30px;
}

.movie-resume {
  font-family: "Stellar-Light";
  margin-bottom: 25px;
  font-size: 20px;
}

.movie-resume-title, .movie-genre-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
}

.movie-director-title {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 20px;
}

.moviebutton {
  display: inline-block;
  border-radius: 4px;
  border: 0.5px solid ivory;
  color: ivory;
  background-color: rgb(235, 32, 32);
  text-decoration: none;
  padding: 10px 30px;
  margin: 15px;
  font-size: 20px;
}

.moviebutton:hover {
  color: #fff;
  background-color: pink;
}

.card {
  display: inline-block;
  border: solid 3px black;
  background-color: coral;
}

.movie-title {
font-family: "Stellar-Bold";
font-size: 60px;
}

.movie-box {
margin: 20px;
}

.movie-tagline {
  font-size: 20px;
  font-family: "Stellar-Light";
}

.movie-genre {
  font-size: 20px;
  font-family: "Stellar-Bold";
}
</style>
