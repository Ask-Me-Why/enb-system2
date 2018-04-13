// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import store from './store';
import router from './router';
import ASKComponents from './components/ask'
import VeeValidate from 'vee-validate'
import "./utils/polyfill.js";
import './utils/element-components.js';
import EnbPublic from '@core/enb-public';
Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(EnbPublic);
Vue.use(ASKComponents);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {
		App
	}
})