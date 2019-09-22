const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const authorize = require('../middleware/authorize');
const Roles = require('../config/roles');
const User = require('../models/User');

// @route  GET /users
// @desc   Get all users
// @access Private, Admin
router.get('/', authorize(Roles.Admin), async (req, res) => {
	try {
		const users = await User.find().sort({ date: -1});
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route  GET /users/:id
// @desc   Get user by id
// @access Private, but users can only view their own information
router.get('/:id', authorize(), async (req, res) => {
	try {
		// only admins can access other records
		if (req.user.id !== req.params.id && req.user.role !== Roles.Admin) {
			return res.status(401).json({ msg: 'Authorization denied.' });
		}

		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ msg: 'User not found'});
		}

		res.json(user);
	} catch (err) {
		console.error(err.message);

		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'User not found'});
		}

		res.status(500).send('Server error');
	}
});

// @route  POST /users
// @desc   Register a user
// @access Public
router.post('/', 
	[
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			// check if user already exists
			if (user) {
				return res.status(400).json({ errors: [ { msg: 'User already exists' }]});
			}

			user = new User({
				name,
				email,
				password
			});

			// encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// give admin authorization
			// ONLY FOR TESTING
			if (req.query.hasOwnProperty('role') && req.query.role == 'admin') {
				user.role = 'Admin';
			}

			await user.save();

			// create jsonwebtoken
			const payload = {
				user: {
					id: user.id,
					role: user.role
				}
			}

			// LATE EXPIRATION FOR TESTING
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.status(201).json({ token });
				}
			);

		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;