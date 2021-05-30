<template>
  <main>
    <header>
    </header>

      <div class="container">

        <div class="movies">
          <div class="state-movie">MOVIES :
          </div>
            <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>TMDb ID</th>
                <th>TITLE</th>
                <th>TAGLINE</th>
                <th>RELEASE DATE</th>
                <th>DIRECTORS</th>
                <th>GENRES</th>
                <th>RESUME</th>
                <th>POSTER</th>
                <th>RATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="movies of movielist" :key="movies">
                <td style="width:30%" >{{ movies.id }}</td>
                <td style="width:30%" >{{ movies.movieid }}</td>
                <td>{{ movies.title }}</td>
                <td>{{ movies.tagline }}</td>
                <td style="width:50%">{{ movies.release }}</td>
                <td>{{ movies.directors }}</td>
                <td>{{ (movies.genre).split(",") }}</td>
                <td>"{{ movies.overview }}..."</td>
                <td> <a :href="`https://image.tmdb.org/t/p/w300${movies.poster}`">
                    <div style="height:100%;width:100%">
                      POSTER
                    </div>
                    </a>
                </td>
                <td class="tdID" >{{ movies.note }}</td>
                <td>
                  <button class="moviebutton" v-on:click="AddToDB()">EDIT</button>
                  <button class="moviebutton" v-on:click="Delete(movies.id)">DELETE</button>

                </td>
            </tr>
            <tr>
            <td>
            <input style="width:30%" v-model="myid" type="number" placeholder="AUTOINCREMENTED">
            </td>
            <td>
            <input style="width:30%" v-model="mytmdbid" type="number" placeholder="TMDB ID">
            </td>
            <td>
            <input v-model="mytitle" type="text" placeholder="TITLE">
            </td>
            <td>
            <input v-model="mytagline" type="text" placeholder="TAGLINE">
            </td>
            <td>
            <input style="width:60%" v-model="myrelease" type="date" placeholder="RELEASE DATE">
            </td>
            <td>
            <input v-model="mydirector" type="text" placeholder="DIRECTOR">
            </td>
            <td>
            <input v-model="mygenre" type="text" placeholder="GENRES">
            </td>
            <td>
            <input v-model="myresume" type="text" placeholder="RESUME">
            </td>
            <td>
            <input v-model="myposter" type="text" placeholder="POSTER URL">
            </td>
            <td>
            <input v-model="mygrade" type="number" placeholder="GRADE">
            </td>
            <td>
            <button class="moviebutton" v-on:click="Create()">CREATE</button>
            </td>
            </tr>
            </tbody>
            </table>
        </div>
                <!-- TEST -->
        <div class="mymovies">

          <button class="moviebutton" v-on:click="fetchMyMovies()">FIND</button>


        </div>
        <!-- TEST -->
      </div>

    <footer>
    </footer>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movielist: [],
      genre: "",
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    fetchAll() {
      axios
        .get(
          'http://localhost:3000/api/allmovies'
        )
        .then((res) => {
          console.log("DATA :")
          console.log(res.data);
          this.movielist = res.data
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    },

    fetchMyMovies(movID, authID) {
      axios.get('/api/isitmymovie',
      {
        params: {
          movieid: movID,
          authorId: authID,
        }
      }
      )
      .then((res) => {
        console.log("DATA :")
        console.log(res);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    },

    GoTo(movieID) {
      this.$router.push({ name: "movie", params: { id: movieID } });
    },

    async Create() {
            var resume = (this.myresume).substr(0, 180)
            var directors = this.mydirector
            var genres = this.mygenre
            var title = this.mytitle
            var movieid = this.mytmdbid
            var poster = this.myposter
            var release = this.myrelease
            var note = this.mygrade
            var tagline = this.mytagline

            await axios.post('/api/createmovie', {
              title: title,
              movieid: movieid,
              overview: resume,
              directors: directors,
              tagline: tagline,
              genre: genres,
              poster: poster,
              release: release,
              note: note,
              })
              .then((res) => {
                console.log("DATA :")
                console.log(res);
              })
              .catch(error => {
                console.log("ERROR: ", error);
              });

    },

    async Delete(arg) {
      console.log(arg)
      await axios.post('/api/deletemovie', {
              id: arg,
              })
              .then((res) => {
                console.log("DATA :")
                console.log(res);
              })
              .catch(error => {
                console.log("ERROR: ", error);
              });
      this.fetchAll();
    }
  },
};
</script>

<style scoped>

.container{
  margin-top: 10%;
}

.movies {
  text-align: center;
  font-family: "Stellar-Regular";
}

.state-movie {
  font-family: "Stellar-Bold";
  height: 30px;
  font-size: 20px;
  color: ivory;
  text-shadow: 2px 2px 5px grey;
}

td {

  justify-content: center;
  align-items: center;
}

.tdID {
  width: 30%;
}

.moviebutton {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  font-family: "Stellar-Regular";
  color: ivory;
  background-color: rgb(235, 32, 32);
  text-decoration: none;
  padding-left: 1%;
  padding-bottom: 1%;
  margin: 5px;
  font-size: 20px;
  width: 100%;
}

.moviebutton:hover {
  color: #fff;
  background-color:lightpink;
}

</style>
