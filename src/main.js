// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SimpleVueValidation from 'simple-vue-validator';
import App from './App'
import router from './router'
import store from '@/store'
import axios from '@/plugin/axios'
import { Base64 } from 'js-base64';
import directive from '@/directive/directive'
import { Lazyload } from 'vant';

Vue.prototype.$axios = axios;
Vue.directive('countdown', directive)
Vue.use(Lazyload);
Vue.use(Base64);
Vue.use(SimpleVueValidation);
Vue.config.productionTip = false

window.Validator = SimpleVueValidation.Validator;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
