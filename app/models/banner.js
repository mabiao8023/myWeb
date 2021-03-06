'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
var BannerSchema = new Schema({
  bannerId:{
  	required:true,
  	type: Number,
  	default: 1,
  },
  // 语言标识
  lang:{
    // 中文标识
    zh:{
      desc:{
        required: true,
        type: String
      },
      title:{
        required: true,
        type: String
      },
    },
    // 英文标识
    en:{
      desc:{
        required: true,
        type: String
      },
      title:{
        required: true,
        type: String
      },
    },
  },
  
  link:{
    type: String
  },
  img_url:{
    required: true,
    type: String
  },
  status:{
    default: 1,
    type: Number
  },
})


/**
 * 定义模型Banner
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
var Banner = mongoose.model('Banner', BannerSchema)

module.exports = Banner
