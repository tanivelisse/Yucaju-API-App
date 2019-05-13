const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');
const User = require('../models/user');

//RESOURCES INDEX ROUTE
router.get('/', async(req,res, next)=>{
	try {
		const foundResources = await Resource.find({});

		res.json({
			status: 200,
			data: foundResources
		})
	} catch(err){
		next(err);
	}
})

//RESOURCES CREATE ROUTE
router.post('/new', async(req,res,next)=>{
	try { 
		const createdResource = await Resource.create(req.body)
		res.json({
			status: 200,
			data: createdResource
		})

	} catch(err) {
		next(err);
	}

})

//RESOURCES SHOW ROUTE
router.get('/:id', async(req,res,next)=>{
	try {
		const foundResource = await Resource.findById(req.params.id);
		res.json({
			status: 200,
			data: foundResource
		})

	}catch(err){
		next(err)
	}
})

//REASOURCES UPDATE ROUTE
router.post('/:id/update', async(req,res,next)=>{
	try {
		const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
			status: 200,
			data: updatedResource
		})
	}catch(err){
		next(err);
	}
})

//RESOURCES DELETE ROUTE
router.delete('/:id', async(req, res, next)=>{
	try{
		const deletedResource = await Resource.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: "deleted resource"
		})
	}catch(err){
		next(err);
	}
})


module.exports = router;