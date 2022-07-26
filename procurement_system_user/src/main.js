import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'

// element-ui调用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://116.57.86.53:3001/api'//填写后端接口，后面有后端接口的样例
})


new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
