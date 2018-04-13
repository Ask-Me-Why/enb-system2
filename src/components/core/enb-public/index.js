/*
* @Author: askMeWhy
* @Date:   2018-03-15 18:21:42
* @Last Modified by:   bigWave
* @Last Modified time: 2018-03-19 17:33:45
*/
import Vue from 'vue';
import enbTab from './enb-tab.vue';
import enbCard from './enb-card.vue';
const components = {
	'enb-tab': enbTab,
	'enb-card': enbCard
}
export default {
	install(Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]));
	}
}
