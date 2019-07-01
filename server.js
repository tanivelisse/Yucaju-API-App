const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const superagent = require('superagent')

require('dotenv').config()

require('./db/db');

//MIDDLEWARE 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS MIDDLEWARE
const corsOptions = {
  origin: process.env.REACT_URL, // when deploying react app, this is where the address goes,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}

app.use(cors(corsOptions));

//AUTH MIDDLEWARE
const authController  = require('./controllers/authController');
const userController = require('./controllers/userController');
const resourceController = require('./controllers/resourceController');

app.get('/', (req,res)=>{
	res.send("running")
})
app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController);
app.use('/api/v1/resources', resourceController);






app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});