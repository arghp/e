const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const authorize = require('../middleware/authorize');
const Roles = require('../config/roles');
const Product = require('../models/Product');

// get all
// get by id
// post new product
// update a product
// delete a product

// @route  GET /products
// @desc   Get all products
// @access Public

// GET /products?page=2&per_page=20
// GET /products?sortBy=date:desc
router.get('/', async (req, res) => {
	// default values
	let limit = 100;
	let skip = 0;
	let sort = {};

	// both queries need to be provided
	if (req.query.page && req.query.per_page) {
		const per_page = parseInt(req.query.per_page);
		const page = parseInt(req.query.page);

		// for non-numeric queries
		if (Number.isNaN(per_page) || Number.isNaN(page)) {
			res.status(400).send('Invalid query');
		}

		if ((per_page > 0 && per_page <= 100) && (page > 0)) {
			limit = per_page;
			skip = (page - 1) * per_page;
		}
	}

	if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

	try {
		const products = await Product.find({}, null, {limit, skip, sort});
		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route  GET /products/:id
// @desc   Get product by id
// @access Public
router.get('/:id', async (req, res) => {
	try {

		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ msg: 'Product not found'});
		}

		res.json(product);
	} catch (err) {
		console.error(err.message);

		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Product not found'});
		}

		res.status(500).send('Server error');
	}
});

// @route  POST /products
// @desc   Create a new product
// @access Private, admin
router.post('/', 
	[
		authorize(Roles.Admin),
		[
		check('name', 'Name is required').not().isEmpty(),
		check('description', 'Description is required').not().isEmpty(),
		check('quantity', 'Quantity is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, description, quantity } = req.body;

		try {
			let product = new Product({
				name,
				description,
				quantity
			});

			await product.save();
			res.status(201).send(product);
		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route  PUT /products/:id
// @desc   Update a product
// @access Private, admin
router.put('/:id', 
	[
		authorize(Roles.Admin),
		[
		check('name', 'Name is required').not().isEmpty(),
		check('description', 'Description is required').not().isEmpty(),
		check('quantity', 'Quantity is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const product = await Product.findById(req.params.id);
			if (!product) {
				return res.status(404).json({ msg: 'Product not found'});
			}

			product.name = req.body.name;
			product.description = req.body.description;
			product.quantity = req.body.quantity;

			await product.save()
			res.json(product);
		} catch (err) {
			console.error(err.message);

			if (err.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Product not found'});
			}

			res.status(500).send('Server error');
		}
	}
);

// @route  DELETE /products/:id
// @desc   Delete a product
// @access Private
router.delete('/:id', authorize(Roles.Admin), async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ msg: 'Product not found'});
		}
		
 		await product.remove();
		res.json({ msg: 'Product removed' });
	} catch (err) {
		console.error(err.message);

		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Product not found'});
		}

		res.status(500).send('Server error');
	}
});

module.exports = router;