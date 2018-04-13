/*
* @Author: askMeWhy
* @Date:   2018-03-20 11:47:28
* @Last Modified by:   smile
* @Last Modified time: 2018-03-20 15:25:55
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './dialog-modify-password.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const dialogModifyPassword = (option) => {
	let vm = new VueComponent({router}).$mount();
	if(option){
		vm.title = option.title || '修改密码';
		vm._cancelClose = option.cancel || null;
		vm._sureClose = option.sure || null;
	}
	vm.show = true;
	return vm;
}


import ComponentCompanyTemplate from './dialog-modify-company.vue';
const VueCompanyComponent = Vue.extend(ComponentCompanyTemplate);

export const dialogModifyCompany = (option) => {
	let vm = new VueCompanyComponent({router}).$mount();
	if(option){
		vm.title = option.title || '修改单位';
		vm._cancelClose = option.cancel || null;
		vm._sureClose = option.sure || null;
	}
	vm.show = true;
	return vm;
}