'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')
const Api = require('../app/controllers/api')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  // router.post('/u/signup', App.hasBody, User.signup)
  // router.post('/u/update', App.hasBody, App.hasToken, User.update)

  // DB Interface test
  // router.get('/user/users',User.users)
  // router.post('/test/user/add',User.addUser)
  // router.post('/test/user/delete',User.deleteUser)
  // 修改用户信息接口
  router.post('/user/modify',User.editUser)
  // 登陆接口
  router.post('/user/login',User.userLogin)
  // 上传图片接口
  router.post('/uploadFile',App.uploadImage)



  // 后台轮播图接口
  router.get('/admin/banner/list',Api.getAdminBannerList)
  // 添加轮播图接口
  router.post('/admin/banner/add',Api.addAdminBannerList)
  // 后台冻结轮播图接口
  router.post('/admin/banner/remove',Api.removeAdminBannerList)
   // 后台冻结轮播图接口
  router.post('/admin/banner/edit',Api.editAdminBannerList)

  // 获得后台产品类型接口
  router.get('/admin/product/get',Api.getAdminProduct)
  // 添加产品类型接口
  router.post('/admin/product/add',Api.addAdminProduct)
  // 后台冻结产品类型接口
  router.post('/admin/product/remove',Api.removeAdminProduct)
   // 后台冻结产品类型接口
  router.post('/admin/product/edit',Api.editAdminProduct)

  // 产品列表接口
  // 获得后台产品类型接口
  router.get('/admin/productList/get',Api.getAdminProductList)
  // 添加产品类型接口
  router.post('/admin/productList/add',Api.addAdminProductList)
  // 后台冻结产品类型接口
  router.post('/admin/productList/remove',Api.removeAdminProductList)
   // 后台编辑产品类型接口
  router.post('/admin/productList/edit',Api.editAdminProductList)

  // 前台获取banner图列表
  router.get('/banner/list',Api.getBannerList)

  // 前台获取产品类型列表
  router.get('/product',Api.getProduct)

  return router
}