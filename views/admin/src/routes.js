import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import BannerList from './views/nav3/bannerList.vue'

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
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '用户管理',
    //     iconCls: 'fa el-icon-message',//图标样式class
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/table', component: Table, name: '用户管理' },
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/form', component: Form, name: '用户渠道',hidden: true },
    //         { path: '/user', component: user, name: '列表',hidden:true },
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '业务管理',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/bannerList', component: BannerList, name: '轮播图管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;