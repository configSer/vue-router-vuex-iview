// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import IView from 'iview';
import store from './store'
import md5 from 'js-md5';
import fetch from './utils/fetch'
import 'iview/dist/styles/iview.css'
import './../static/js/rem.js'
import './../static/style/index.scss'
Vue.config.productionTip = false;
Vue.use(IView);
Vue.prototype.$md5 = md5;
Vue.prototype.$fetch = fetch;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
