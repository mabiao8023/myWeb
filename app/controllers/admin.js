'use strict'

// 用于封装controllers的后端接口方法

var mongoose = require('mongoose')
var path = require('path')
var Banner = mongoose.model('Banner');


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
