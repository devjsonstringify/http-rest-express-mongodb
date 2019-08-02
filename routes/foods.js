//import packages
const router = require('express').Router()
const food = require('../models/foodModel')

/*http://localhost:5000/foods this will run
WIll display all foods on our database */
router.route('/foods').get(async (req, res) => {
	//Check if has an error otherwise
	try {
		const foods = await food.find()
		res.json(foods)
	} catch (err) {
		res.status(400).json('Error: ' + err)
	}
})

/*GET request all patty
http://localhost:5000/foods/patty/ */
router.route('/foods/patty').get(async (req, res) => {
	const catPatty = { category: 'patty' }
	try {
		const foods = await food.find(catPatty)
		res.json(foods)
	} catch (err) {
		res.status(400).json('Error: ' + err)
	}
})

/*GET request  single patty
http://localhost:5000/foods/patty/id */
router.route('/foods/patty/:id').get(async (req, res) => {
	//Check if has an error otherwise
	const foodId = req.params.id
	try {
		const item = await food.findById(foodId)
		res.json(item)
	} catch (err) {
		res.status(400).json('Error: ' + err)
	}
})

/* POST request to create new patty
http://localhost:5000/foods/patty/create */
router.route('/foods/patty/create').post(async (req, res) => {
	// Get all data from client
	const newAddedItem = new food({
		name: req.body.name,
		category: req.body.category,
		temperature: req.body.temperature
	})

	//Check if has an error otherwise
	try {
		const newFood = await newAddedItem.save()
		res.json('new item added!')
	} catch (err) {
		res.status(400).json('Error: ' + err)
	}
})

/* DELETE request to delete patty
localhost:5000/foods/patty/id/delete */
router.route('/foods/patty/:id/delete').delete(async (req, res) => {
	//Check if has an error otherwise
	const foodId = req.params.id
	try {
		const deleteFood = await food.findByIdAndDelete(foodId)
		res.json('food deleted.')
	} catch (err) {
		res.status(400).json('Error: ' + err)
	}
})

/* UPDATE request of patty specific iD
http://localhost:5000/foods/patty/id/update */
/*
Patch - only update what details provided
Put - update data must submit all details
*/
router.route('/foods/patty/:id/update').put(async (req, res) => {
	//Check if has an error otherwise
	const foodId = req.params.id
	const updatedFood = {
		name: req.body.name,
		category: req.body.category,
		temperature: req.body.temperature
	}
	try {
		const item = await food.updateOne(
			{ _id: foodId },
			{ $set: updatedFood }
		)
		res.json(item)
	} catch (err) {
		res.status(400).json('Error: ' + err)
	}
})

module.exports = router
