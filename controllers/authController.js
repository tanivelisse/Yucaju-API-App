const express = require('express')
const router = express.Router();
const session = require('express-session')
const User = require('../models/user')
const bcrypt = require ('bcryptjs')
const superagent = require('superagent')

router.get('/municipalities', async (req, res, next) => {
  try {
    const apiRes = await superagent.get(
      `https://data.pr.gov/resource/bq3m-25mu.json`,{
        data: {
      "$limit" : 1000,
      "$$app_token" : process.env.APP_TOKEN
    }
      }
    )

  } catch(err){
    next(err)
  }
})

router.get('/code', (req,res)=>{
  console.log('runing');
  console.log(req.query.code);
  res.send("runing faster")
})


router.post('/register', async (req, res, next) => {
  console.log(req.body, ' this is session')
  
  const password = req.body.password
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  userDbEntry.name = req.body.name
  userDbEntry.municipality = req.body.municipality
  userDbEntry.barrio = req.body.barrio

  try {

    // will want to check to make sure that a user with the same username does not exist 
    // in the database 

    const newUser = await User.create(userDbEntry);
    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.userDbId = newUser._id;
    console.log(newUser + '<=====');


    res.json({
      status: 200,
      data: newUser
    });

  } catch(err){
    console.log(err);
    next(err);
    }

});

router.post('/login', async (req, res, next) => {
  console.log(req.body, ' this is session')

  try {
    const foundUser = await User.findOne({'username': req.body.username});
    console.log(foundUser + 'foundUser');

    if(foundUser){
      if (bcrypt.compareSync(req.body.password, foundUser.password)=== true) {
        req.session.message = '';
        req.session.logged = true;
        req.session.userDbId = foundUser._id;
        console.log(req.session, ' logged in!');

        res.json({
          status: 200,
          data: foundUser
        });

      }else{

        res.json({
          status: 202,
          data: "Username or Password is incorrect"
        });
      }
    }

  } catch(err){
    next(err);
  }

});



module.exports = router;