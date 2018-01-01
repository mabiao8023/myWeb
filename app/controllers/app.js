'use strict'

// 用于封装controllers的公共方法

var mongoose = require('mongoose')
var uuid = require('uuid')
var User = mongoose.model('User')
// var Banner = mongoose.model('Banner');
var uploadFile = require('../service/upload.js').uploadFile;
var path = require('path');

// 上传图片
exports.uploadImage = async (ctx,next) => {
  // 上传文件请求处理
    let result = { code: 0 }
    let serverFilePath = path.join( __dirname, '../../static' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'uploadImage',
      path: serverFilePath
    })
    ctx.body = result
}
