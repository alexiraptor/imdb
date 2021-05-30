const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const bcrypt = require('bcrypt')
const salt = 10;

const prisma = new PrismaClient()

//const users =  prisma.user.findUnique()
// [
//   {
//       name: 'john',
//       email: 'john@gmail.com',
//       password: 'password123admin',
//       admin: '1'
//   }, {
//       name: 'anna',
//       email: 'anna@gmail.com',
//       password: 'password123member',
//       admin: '0'
//   }
// ];

const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

const accessTokenSecret = 'youraccesstokensecret';



async function main() {

  app.get('/allmovies', async (req, res) => {
    const allMovies = await prisma.movies.findMany()
    res.json(allMovies)
  });


  app.get('/isitmymovie', async (req, res) => {
    const result = await prisma.movies.findMany({
      where: {
        AND: [
          {
            movieid: parseInt(req.query.movieid),
            // movieid: 460465,
          },
          {
            authorId: parseInt(req.query.authorId),
            // authorId: 1,
          },
        ]
      }
    })
    res.json(result)
  });

  app.post('/mymovie', async (req, res) => {
    const result = await prisma.movies.findUnique({
      where: {
        movieid: parseInt(req.body.movieid),
      },
    })
    res.json(result)
  })

  app.post('/login', (req, res) => {
    // Read username and password from request body
    const { email, password } = req.body;

    // Filter user from the users array by username and password
    const user = prisma.user.findMany(u => { return u.email == email && u.password == password });
    //res.json(user);
    console.log(user)
    if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ email: user.email, admin: user.admin }, accessTokenSecret);

      res.json({
        accessToken
      });
    } else {
      res.send('email or password incorrect');
    }
  });





  app.get('/allusers', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  });

  app.post(`/user`, async (req, res) => {
    const result = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, salt),
      },
    })
    res.json(result)
  });

  app.get('/allusers', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  });

  app.get('/user/:id', async (req, res) => {
    const users2 = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    })

    res.json(users2)
  });

  app.delete('/user/:id', async (req, res) => {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    })

    res.json(deleteUser)
  });

  app.put('/user/:id', async (req, res) => {
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),

      },
      data: {
        name: req.params.name,
      },
    })

    res.json(updateUser)
  });

  app.patch('/user/:id', async (req, res) => {
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),

      },
      data: {
        name: this.user.name,
      },
    })

    res.json(updateUser)
  });

  app.get('/test', function (req, res) {
    res.send('GET request to the homepage');
  });

  app.post('/createmovie', async (req, res) => {

    console.log("BODY :")
    console.log(req.body.title)
    console.log("PARAMS :")
    console.log(req.query)

    // res.send('POST request to the homepage');
    const result = await prisma.movies.create({

      data: {

        title: req.body.title,
        movieid: parseInt(req.body.movieid),
        overview: req.body.overview,
        directors: req.body.directors,
        genre: req.body.genre,
        tagline: req.body.tagline,
        poster: req.body.poster,
        release: req.body.release,
        note: (req.body.note).toString(),

        author: {

          connect: { email: 'admin@gmail.com' },

        },

      },
    })
    res.json(result)
  });

  app.post('/deletemovie', async (req, res) => {
    const deleteMovie = await prisma.movies.delete({
      where: {
        id: parseInt(req.body.id),
      },
    })
    res.json(deleteMovie)
  })
}


main()

  .catch(e => {

    throw e

  })

  .finally(async () => {

    await prisma.$disconnect()

  })

export default {
  path: '/api',
  handler: app
}
