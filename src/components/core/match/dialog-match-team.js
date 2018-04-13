/*
* @Author: song
* @Date:   2018-03-27 11:31:20
*/

import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './dialog-match-team.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const dialogMatchTeam = (option) => {
	let vm = new VueComponent({router}).$mount();
	if(option){
		vm.title = option.title;
		vm.theme = option.class || '';
		vm.item = option.item || null;
		if(option.transition) vm.transition = option.transition;

		vm._cancelClose = option.cancel || null;
		vm._sureClose = option.sure || null;
	}
	vm.show = true;
	return vm;
}
