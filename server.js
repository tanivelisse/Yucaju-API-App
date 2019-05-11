const express = require('express');
const app = express();
const bodyPaser = require('body-parser')
const session = require('express-session')
const cors = require('cors');


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
  origin: 'http://localhost:3000', // when you deploy your react app, this is where you put the address,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}

app.use(cors(corsOptions));

//AUTH MIDDLEWARE
const authController  = require('./controllers/authController');

app.use('/auth', authController);



app.listen(8000, () => {
  console.log('listening on port 8000');
});