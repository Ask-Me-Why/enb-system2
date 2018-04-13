/*
* @Author: askMeWhy
* @Date:   2018-03-19 11:31:20
* @Last Modified by:   bigWave
* @Last Modified time: 2018-03-19 15:49:16
*/

import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './dialog-match-form.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const dialogMatchForm = (option) => {
	let vm = new VueComponent({router}).$mount();
	if(option){
		vm.title = option.title || '创建赛事';
		vm.theme = option.class || '';
		vm.item = option.item || null;
		if(option.transition) vm.transition = option.transition;

		vm._cancelClose = option.cancel || null;
		vm._sureClose = option.sure || null;
	}
	vm.show = true;
	return vm;
}