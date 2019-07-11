const express = require('express')
const router = express.Router();
const session = require('express-session')
const User = require('../models/user')
const Barrio = require('../models/barrio')
const bcrypt = require ('bcryptjs')
const superagent = require('superagent')

//third party API call for Municipality and Barrios data for registration 

router.get('/barrios/api', async (req, res, next) => {
  try {
      const apiRes = await superagent.get(`https://data.pr.gov/api/views/rtan-qj3c/rows.json`);
      //console.log(typeof apiRes)
      //console.log(Object.keys(apiRes));
      const text = JSON.parse(apiRes.text);
      const data = text.data
      const barrioListArr = data.map((barrioArr) => {
        //create municipality array   
        return {
          municipality: barrioArr[barrioArr.length-9],
          barrio: barrioArr[barrioArr.length-10]
        }
      })
      let newBarrio;
      const createModel = barrioListArr.forEach((element)=>{
          newBarrio = new Barrio()
          newBarrio.name = element.barrio
          newBarrio.municipality = element.municipality
          newBarrio.save()
          console.log(newBarrio);
          console.log("============");

      });

        res.json({
          status: 200,
          message: "Barrios call is done, check database"
        });


  } catch(err){
    next(err)
  }
})

router.get('/municipalities-and-barrios', async (req,res,next)=>{
  try{
    const foundBarrios = await Barrio.find({});
    res.json({
      status: 200,
      data: foundBarrios
    })
  }catch(err){
    next(err)
  }
})


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
    if (req.body.username === "" || !req.body.username) {
        res.json({
          status:200,
          message: "Please enter a username"
        })
    } 
      const foundUser = await User.findOne({'username': req.body.username});
      console.log(foundUser + 'foundUser');

      if(foundUser){
        if (bcrypt.compareSync(req.body.password, foundUser.password || req.body.password !== '')) {
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
            message: "Username or Password is incorrect"
          });

        }
      }

  } catch(err){
    next(err);
  }

});



module.exports = router;