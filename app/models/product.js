'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	id:Number,
	zh:{
		title:String
	},
	en:{
		title:String
	},
	status:{
		required:true,
		default:1,
		type:Number
	}
})

let Product = mongoose.model('Product',ProductSchema)

module.exports = Product
