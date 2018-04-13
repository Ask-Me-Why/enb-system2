/*
* @Author: askMeWhy
* @Date:   2018-03-14 17:58:37
* @Last Modified by:   bigWave
* @Last Modified time: 2018-03-21 15:38:02
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './simple-picker.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const simplePicker = (option) => {
	let vm = new VueComponent({router}).$mount();
	if(option){
		vm.title = option.title || '时间选择';
		vm.theme = option.class || '';
		if(option.transition) vm.transition = option.transition;
		vm.type = option.type || 'range';
		vm._afterClose = option.close || null;
		vm._sureClose = option.sure || null;
		if(option.start && typeof option.start == 'string'){
			let _start = option.start.split('-');
			vm.startTime['year'] = Number(_start[0]);
			vm.startTime['month'] = Number(_start[1]);
			vm.startTime['day'] = Number(_start[2]);
			vm.initTime();
		}
		if(option.end && typeof option.end == 'string'){
			let _end = option.end.split('-');
			vm.endTime['year'] = Number(_end[0]);
			vm.endTime['month'] = Number(_end[1]);
			vm.endTime['day'] = Number(_end[2]);
			vm.initTime();
		}
	}
	vm.show = true;
	return vm;
}