const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { json } = require('body-parser');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile = require('./Controllers/profileid');
const app = express();
const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'admin',
      database : 'smartbrain'
    }
  });


app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT, () =>{console.log(`App is running on port ${PORT}`);}) //designando a porta 3000 para o server
app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=> {profile.idHandler(req, res, db)})
app.put('/image', (req, res) => {image.imageHandler(req, res, db)})
app.post('/imageurl',(req, res) =>{image.handleApiCall(req, res)})

// Agora vamos criar a API, com os 4 metodos (GET, PUT, POST E DELETE)

/* ROTAS QUE SERÃO USADAS 

/signin --> POST = SUCESS/FAIL
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT (pq vamos atualizar o rank) = user

*/