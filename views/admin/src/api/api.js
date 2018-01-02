import Vue from 'vue';

// import axios from 'axios';
// //http://120.78.193.207
// import qs from 'qs';

// let base = 'http://120.78.193.207';

let base = 'http://127.0.0.1/api';

let myAjax = {
    get( api,data ){
        return new Promise((resolve,reject) => {
            Vue.http.get( api , { params : data } )
                .then( data => {
                    ajaxResHandle(data,resolve,reject);
                })
                .catch( err => {
                    reject(`请求失败`);
                });
        } )
    },
    post( api,data,options = {} ){
        return new Promise( (resolve,reject) => {
            Vue.http.post( api , data ,Object.assign(options,{emulateJSON:true}))
                .then( data => {
                    ajaxResHandle(data,resolve,reject);
                } )
                .catch( err => {
                    reject(`请求失败`);
                } );
        } )
    },
}

// 公共的ajax处理函数
let ajaxResHandle =  ( data,resolve,reject ) => {
    let res = data.body;
    if( res.code == 1 ){
        resolve( res.data )
    }else{
        reject( res.msg );
    }
}

// 接口请求

// 登录
export const requestLogin = params => { return myAjax.post(`${base}/user/login`, params) };

// 上传图片
export const uploadFile = params => {return myAjax.post(`${base}/uploadFile`, params)};

// 轮播图管理
// 增加轮播图
export const addBannerList = params => { return myAjax.post(`${base}/admin/banner/add`,  params)};
// 获取轮播图列表
export const getBannerList = params => { return myAjax.get(`${base}/admin/banner/list`,  params)};
// 编辑轮播图
export const editBannerList = params => { return myAjax.post(`${base}/admin/banner/edit`,params); };
// 冻结轮播图
export const removeBannerList = params => { return myAjax.post(`${base}/admin/banner/remove`,params ); }

// 产品类型管理
// 增加产品类型
export const addProduct = params => { return myAjax.post(`${base}/admin/product/add`,  params)};
// 获取产品类型
export const getProduct = params => { return myAjax.get(`${base}/admin/product/get`,  params)};
// 编辑产品类型
export const editProduct = params => { return myAjax.post(`${base}/admin/product/edit`,params); };
// 冻结产品类型
export const removeProduct = params => { return myAjax.post(`${base}/admin/product/remove`,params ); }

// 产品列表管理
// 增加产品类型
export const addProductList = params => { return myAjax.post(`${base}/admin/productList/add`,  params)};
// 获取产品类型
export const getProductList = params => { return myAjax.get(`${base}/admin/productList/get`,  params)};
// 编辑产品类型
export const editProductList = params => { return myAjax.post(`${base}/admin/productList/edit`,params); };
// 冻结产品类型
export const removeProductList = params => { return myAjax.post(`${base}/admin/productList/remove`,params ); }
