import Vue from 'vue'
import ComponentTemplate from './ask-alert.vue';
const VueComponent = Vue.extend(ComponentTemplate);
import {merge} from '@/utils';

export const askAlert = (option, onOk, onClose) => {
	let vm = new VueComponent().$mount();
	let opt = {
		content: '内容',
		title: '警示框',
		btnText: '确定',
		showClose: true,
		shade: true,
		shadeClick: true,
		class: '',
		transition:"ask-modal-fill"
	}

	opt = merge(true,opt, option);
	vm.content = opt.content;
	vm.transition = opt.transition;
	vm.title = opt.title;
	vm.showClose = opt.showClose;
	vm.btnText = opt.btnText;
	vm.shadeClick = opt.shadeClick;
	if (opt.class == '') {
		vm.theme = '';
	}
	if (opt.class == 'info' || opt.class == 'success' || opt.class == 'danger') {
		vm.theme = ['ask-alert-theme-' + opt.class];
	} else {
		vm.theme = [opt.class];
	}
	if (!opt.shade) {
		vm.shade = 0;
		vm.shadeClick = false;
	}
	vm.$on('onok', () => {
		if (onOk) onOk(vm);
	});
	vm.$on('onclose', () => {
		vm.close();
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
	return vm;
}
