// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import map from '@/utils/map.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from "@/store/index.js";
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(Vant);
Vue.use(ElementUI);
Vue.prototype.map = map;
Vue.prototype.$axios = axios;    


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
