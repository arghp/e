const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true,
		min: 0,
		max: 999
	}
});

module.exports = Product = mongoose.model('products', ProductSchema);