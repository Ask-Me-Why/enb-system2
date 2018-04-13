/*
* @Author: song
* @Date:   2018-03-29 13:00:00
*/

import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './dialog-match-team-cars.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const dialogMatchTeamCars = (option) => {
	let vm = new VueComponent({router}).$mount();
	if(option){
		vm.title = option.title || '';
		vm.theme = option.class || '';
		vm.item = option.item || null;
		vm.groupTypes = option.groupTypes;
		if(option.transition) vm.transition = option.transition;
		vm._cancelClose = option.cancel || null;
		vm._sureClose = option.sure || null;
	}
	vm.show = true;
	return vm;
}
