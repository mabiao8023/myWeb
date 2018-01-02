'use strict'

// 用于封装controllers的后端接口方法

var mongoose = require('mongoose')
var path = require('path')
var Banner = mongoose.model('Banner');
var Product = mongoose.model('Product');
var ProductList = mongoose.model('ProductList');

/**
 * 前台获取banner图接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getBannerList = async(ctx,next) => {
	let banners = await Banner.find({status:1});
	ctx.body = {
		code:1,
		msg:'请求成功',
		data:banners
	}
}

/**
 * 后台获取banner图接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getAdminBannerList = async(ctx,next) => {
	let banners = await Banner.find();
	ctx.body = {
		code:1,
		msg:'请求成功',
		data:banners
	}
}
/**
 * 后台添加banner图接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.addAdminBannerList = async (ctx,next) => {
	let body = ctx.request.body;
	let bannerId = await Banner.find().count() + 1;
	let banner = new Banner(Object.assign({
		bannerId:bannerId,
		status:1
	},body));
	await banner.save( (err,doc) => {
		if(err){
			ctx.body = {
				code:0,
				msg:'添加失败',
				data:[]
			}
		}else{
			ctx.body = {
			code:1,
			msg:'添加成功',
			data:[]
		}
		}
	} );
}

/**
 * 后台冻结banner图接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.removeAdminBannerList = async (ctx,next) => {
	let body = ctx.request.body;
	await Banner.update({"bannerId":Number(body.bannerId)},{status:0})
			.exec()
			.then( res => {
				ctx.body = {
						code:1,
						msg:'操作成功',
						data:{}
					}
			})
			.catch( err => {
				ctx.body = {
						code:0,
						msg:'操作失败',
						data:{}
					}
				} );
	return next();
}

/**
 * 后台编辑banner图接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.editAdminBannerList = async (ctx,next) => {
	let body = ctx.request.body;
	await Banner.update({bannerId:Number(body.bannerId)},body)
		.exec()
		.then( res => {
			ctx.body = {
				code:1,
				msg:'操作成功',
				data:[]
			}
		} ).catch( err => {
			ctx.body = {
				code:0,
				msg:'操作失败',
				data:[]
			}	
		});
}


/**
 * 前台获取产品类型接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getProductList = async(ctx,next) => {
	let products = await Product.find({status:1});
	ctx.body = {
		code:1,
		msg:'请求成功',
		data:products
	}
}

/**
 * 后台获取产品类型接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getAdminProduct = async(ctx,next) => {
	let products = await Product.find();
	ctx.body = {
		code:1,
		msg:'请求成功',
		data:products
	}
}
/**
 * 后台添加产品类型接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.addAdminProduct = async (ctx,next) => {
	let body = ctx.request.body;
	let id = await Product.find().count() + 1;
	let product = new Product(Object.assign({
		id:id,
		status:1
	},body));
	await product.save( (err,doc) => {
		if(err){
			ctx.body = {
				code:0,
				msg:'添加失败',
				data:[]
			}
		}else{
			ctx.body = {
			code:1,
			msg:'添加成功',
			data:[]
		}
		}
	} );
}

/**
 * 后台冻结产品类型接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.removeAdminProduct = async (ctx,next) => {
	let body = ctx.request.body;
	await Product.update({"id":Number(body.id)},{status:0})
			.exec()
			.then( res => {
				ctx.body = {
						code:1,
						msg:'操作成功',
						data:{}
					}
			})
			.catch( err => {
				ctx.body = {
						code:0,
						msg:'操作失败',
						data:{}
					}
				} );
	return next();
}

/**
 * 后台编辑产品类型接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.editAdminProduct = async (ctx,next) => {
	let body = ctx.request.body;
	await Product.update({id:Number(body.id)},body)
		.exec()
		.then( res => {
			ctx.body = {
				code:1,
				msg:'操作成功',
				data:[]
			}
		} ).catch( err => {
			ctx.body = {
				code:0,
				msg:'操作失败',
				data:[]
			}	
		});
}



// 具体产品列表
/**
 * 后台获取产品列表接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getAdminProductList = async(ctx,next) => {
	let query = ctx.query;
	console.dir(query);
	let products = await ProductList.find({productId:query.productId});
	ctx.body = {
		code:1,
		msg:'请求成功',
		data:products
	}
}
/**
 * 后台添加产品列表接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.addAdminProductList = async (ctx,next) => {
	let body = ctx.request.body;
	let id = await ProductList.find().count() + 1;
	let productList = new ProductList(Object.assign({
		id:id
	},body));
	await productList.save( (err,doc) => {
		if(err){
			ctx.body = {
				code:0,
				msg:'添加失败',
				data:[]
			}
		}else{
			ctx.body = {
			code:1,
			msg:'添加成功',
			data:[]
		}
		}
	} );
}

/**
 * 后台冻结产品列表接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.removeAdminProductList = async (ctx,next) => {
	let body = ctx.request.body;
	await ProductList.remove({"id":Number(body.id)})
			.exec()
			.then( res => {
				ctx.body = {
						code:1,
						msg:'操作成功',
						data:{}
					}
			})
			.catch( err => {
				ctx.body = {
						code:0,
						msg:'操作失败',
						data:{}
					}
				} );
	return next();
}

/**
 * 后台编辑产品列表接口
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.editAdminProductList = async (ctx,next) => {
	let body = ctx.request.body;
	await ProductList.update({id:Number(body.id)},body)
		.exec()
		.then( res => {
			ctx.body = {
				code:1,
				msg:'操作成功',
				data:[]
			}
		} ).catch( err => {
			ctx.body = {
				code:0,
				msg:'操作失败',
				data:[]
			}	
		});
}

