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
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const db = knex({
    client: 'pg',
    connection: {
      connectionString: DATABASE_URL,
      ssl: true
    }
  });



app.use(bodyParser.json());
app.use(cors());
// app.listen(3000, () => {console.log(`You're now running on port 3000`) });
app.get('/', (req, res) => {res.send("It's working")})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=> {profile.idHandler(req, res, db)})
app.put('/image', (req, res) => {image.imageHandler(req, res, db)})
app.post('/imageurl',(req, res) =>{image.handleApiCall(req, res)})
app.listen(PORT, () =>{console.log(`App is running on port ${PORT}`)})
// Agora vamos criar a API, com os 4 metodos (GET, PUT, POST E DELETE)

/* ROTAS QUE SERÃO USADAS 

/signin --> POST = SUCESS/FAIL
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT (pq vamos atualizar o rank) = user

*/