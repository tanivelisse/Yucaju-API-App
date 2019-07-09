const express = require('express')
const router = express.Router();
const session = require('express-session')
const User = require('../models/user')
const bcrypt = require ('bcryptjs')
const superagent = require('superagent')

// router.get('/municipalities', async (req, res, next) => {
//   try {
//       const apiRes = await superagent.get(`https://data.pr.gov/api/views/rtan-qj3c/rows.json`);
//       //console.log(typeof apiRes)
//       //console.log(Object.keys(apiRes));
//       const text = JSON.parse(apiRes.text);
//       const data = text.data
//       const towns = data.map((barrioArr) => {
//         return {
//           municipality: barrioArr[barrioArr.length-9],
//           barrio: barrioArr[barrioArr.length-10]
//         }
//       })
//       console.log(towns);
//     res.status(200).json({
//       status: 200,
//       data: towns
//     });

//   } catch(err){
//     next(err)
    
//   }
// })



router.post('/register', async (req, res, next) => {
  //console.log(req.body, ' this is session')

  try {

    if (req.body.username === "" || !req.body.username) {
        res.json({
          status:200,
          message: "Please enter a username"
        })
    } else if (req.body.password === "" || !req.body.password) {
      res.json({
          status:200,
          message: "Please enter a password"
        })
    } else if (req.body.name === "" || !req.body.name) {
      res.json({
          status:200,
          message: "Please enter your name"
        })
    } else if (req.body.municipality === "Select Municipality"|| !req.body.municipality) {
      res.json({
          status:200,
          message: "Please select your municipality"
        })
    } else if (req.body.barrio === "Select Barrio" || !req.body.barrio) {
      res.json({
          status:200,
          message: "Please select your barrio"
        })
    } else {
      const password = req.body.password
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const userDbEntry = {};

      const foundUser = await User.findOne({'username': req.body.username});

      if (!foundUser) {
        userDbEntry.username = req.body.username;
        userDbEntry.password = passwordHash;
        userDbEntry.name = req.body.name;
        userDbEntry.municipality = req.body.municipality;
        userDbEntry.barrio = req.body.barrio;

        const newUser = await User.create(userDbEntry);
        req.session.logged = true;
        req.session.username = req.body.username;
        req.session.userDbId = newUser._id;
        //console.log(newUser + '<=====');


        res.json({
          status: 200,
          data: newUser
        });

      } else if (foundUser){
        res.json({
          status:200,
          message: "Sorry,this username is already taken!"
        })
      }
    }
  } catch(err){
    console.log(err);
    next(err);
    }

});

router.post('/login', async (req, res, next) => {
  console.log(req.body, ' this is session')

  try {
    //console.log(foundUser + 'foundUser');
    if (req.body.username === "" || !req.body.username) {
        res.json({
          status:200,
          message: "Please enter your username"
        })
    } else if (req.body.password === "" || !req.body.password) {
      res.json({
          status:200,
          message: "Please enter your password"
        })

    } else {

      const foundUser = await User.findOne({'username': req.body.username});
      
      if(foundUser){
        if (bcrypt.compareSync(req.body.password, foundUser.password)=== true) {
          req.session.logged = true;
          req.session.userDbId = foundUser._id;
          //console.log(req.session, ' logged in!');

          res.json({
            status: 200,
            data: foundUser
          });

        } else if (bcrypt.compareSync(req.body.password, foundUser.password)!== true) {
          res.json({
            status: 200,
            data: "Username or password is incorrect"
          });

        }

      } else if (!foundUser) {

          res.json({
            status: 200,
            data: `User ${req.body.username} not found`
          });
      }
    }

  } catch(err){
    next(err);
  }

});



module.exports = router;