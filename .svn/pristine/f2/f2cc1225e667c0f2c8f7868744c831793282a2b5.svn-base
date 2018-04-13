/*
* @Author: askMeWhy
* @Date:   2018-03-19 11:31:20
* @Last Modified by:   smile
* @Last Modified time: 2018-03-20 17:09:39
*/

import Vue from 'vue'
import router from '@/router';
import store from '@/store';
import ComponentTemplate from './dialog-permission-form.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const dialogPermissionForm = (option) => {
	let vm = new VueComponent({router,store}).$mount();
	if(option){
		vm.title = option.title || '创建运营者';
		vm.theme = option.class || '';
		if(option.transition) vm.transition = option.transition;
		vm.item = option.item || null;
		vm._cancelClose = option.cancel || null;
		vm._sureClose = option.sure || null;
	}
	vm.show = true;
	return vm;
}