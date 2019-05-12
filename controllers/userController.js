const express = require('express');
const router = express.Router();
const User = require('../models/user');


//USER INDEX ROUTE
router.get('/', async (req,res,next)=>{
	try {
		const foundUsers = await User.find({})
		res.json({
        	status: 200, // everything worked
        	data: foundUsers
      	})
	}catch(err){
		next(err);
	}
})

//SHOW USER ROUTE
router.get('/:id', async(req,res,next)=>{
	try{
		const foundUser = await User.findById(req.params.id);
		res.json({
			status: 200,
			data: foundUser
		})
	}catch(err){
		next(err)
	}
})

//USER MUNICIPALITY AND BARRIO UPDATE ROUTE
router.put('/:id/edit', async(req, res,next)=>{
	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
	res.json({
			status: 200,
			data: updatedUser
		})
})

//USER SAFETY UPDATE ROUTE
router.put('/:id/editsafety', async (req,res,next)=>{
	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
	res.json({
			status: 200,
			data: updatedUser
		})
})

//USER DELETE ROUTE
router.delete('/:id', async (req,res,next)=>{
	const deletedUser = await User.findByIdAndRemove(req.params.id);
	res.json({
		status: 200,
		data: deletedUser
	})
})

module.exports = router;
