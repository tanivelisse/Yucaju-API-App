const express = require('express')
const router = express.Router();
const session = require('express-session')
const User = require('../models/user')
const bcrypt = require ('bcryptjs')
const superagent = require('superagent')

router.get('/municipality', async (req, res, next) => {
  try {
    const apiRes = await superagent.get(`https://data.pr.gov/api/views/rtan-qj3c/rows.json`)
    console.log(typeof apiRes)
    console.log(Object.keys(apiRes));
    const text = JSON.parse(apiRes.text)
    const data = text.data

    // convert array of arrays 
    // to array of 

    const towns = data.map((barrioArr) => {
      return {
        municipality: barrioArr[barrioArr.length-9],
        barrio: barrioArr[barrioArr.length-10]  
      }
    })

    res.status(200).json({
      status: 200,
      data: towns
    })

  } catch(err){
    next(err)
  }
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
    const newUser = await User.create(userDbEntry);
    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.userDbId = newUser._id;
    console.log(newUser + '<=====');

    res.json({
      status: 200,
      data: 'register successful'
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
          data: 'login successful'
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