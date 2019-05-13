const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const superagent = require('superagent')

require('./db/db');

//MIDDLEWARE 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS MIDDLEWARE
const corsOptions = {
  origin: 'http://localhost:3000', // when deploying react app, this is where the address goes,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}

app.use(cors(corsOptions));

//AUTH MIDDLEWARE
const authController  = require('./controllers/authController');
const userController = require('./controllers/userController');

app.use('/auth', authController);
app.use('/users', userController);






app.listen(8000, () => {
  console.log('listening on port 8000');
});