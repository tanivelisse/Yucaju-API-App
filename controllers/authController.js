const express = require('express')
const router = express.Router();
const session = require('express-session')
const User = require('../models/user')
const bcrypt = require ('bcryptjs')




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