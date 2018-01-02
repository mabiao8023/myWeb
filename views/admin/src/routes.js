import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import BannerList from './views/banner/bannerList.vue'
import Product from './views/product/product'
import ProductList from './views/product/productList'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '业务管理',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点
        children: [
            { path: '/bannerList', component: BannerList, name: '轮播图管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '产品管理',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点
        children: [
            { path: '/product', component: Product, name: '产品类别管理' },
            { path: '/productList/:id', component: ProductList, name: '产品类别管理',hidden:true },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;