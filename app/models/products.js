'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductListSchema = new Schema({
	id:Number,
	productId:{
		required:true,
		type:Number
	},
	zh:{
		title:String,
		desc:String,
	},
	en:{
		title:String,
		desc:String,
	},
	img_url:[],
	status:{
		required:true,
		default:1,
		type:Number
	}
})

let ProductList = mongoose.model('ProductList',ProductListSchema)

module.exports = ProductList
