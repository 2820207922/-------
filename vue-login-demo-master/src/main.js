import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'
import * as ecStat from 'echarts-stat'
import 'echarts-gl'
// 关闭 Vue 的生产提示
Vue.config.productionTip = false
// vant2库
import Vant from 'vant'
import 'vant/lib/index.css'
import { Picker } from 'vant';
import { Calendar } from 'vant';


Vue.use(Calendar);
// 使用插件
Vue.use(ElementUI) // element ui 插件
Vue.prototype.$echarts = echarts
Vue.prototype.ecStat = ecStat
Vue.use(Picker);
// 使用vant2库
Vue.use(Vant)
Vue.use(VueRouter) // 路由插件
Vue.use(VueAxios, axios) // 使用 axios 插件

// Vue.config.productionTip = false
//创建 Vue 实例对象
new Vue({
  render: h => h(App),  // render 函数将帮助解析模板，传入的参数 h 为一个函数，该函数可用来解析 App 这个组件
  router,
  beforeCreate() {
  Vue.prototype.$bus = this
  }
}).$mount('#app') // 将 App.vue 组件挂载到 index.html 中的 id 为 app 的 div 标签上
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>',
//   beforeCreate() {
//     Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
//   }
// })
