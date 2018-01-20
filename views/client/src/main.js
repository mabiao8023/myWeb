// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// 初始化
import 'normalize.css'
// 国际化
import VueI18n from 'vue-i18n'
import { 
	Switch,
	Carousel,
  CarouselItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh',  // 语言标识
    messages: {
        'zh': require('./common/lang/zh'),
        'en': require('./common/lang/en')
    }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
});
