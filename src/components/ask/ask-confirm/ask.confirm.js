import Vue from 'vue'
import ComponentTemplate from './ask-confirm.vue';
const VueComponent = Vue.extend(ComponentTemplate);
import {merge} from '@/utils';

export const askConfirm = (option, onOk, onCancel, onClose) => {
	let vm = new VueComponent().$mount();
	let opt = {
		content: '',
		title: '信息',
		cancel: true,
		sure: true,
		shadeClick: true,
		showClose: true,
		theme: '',
		transition:"ask-modal-fill"
	}

	opt = merge(true, opt, option);
	vm.content = opt.content;
	vm.transition = opt.transition;
	vm.title = opt.title;
	vm.showClose = opt.showClose;
	vm.shadeClick = opt.shadeClick;
	vm.theme = opt.theme||'';
	if(Object.prototype.toString.call(opt.cancel) == '[object Boolean]'){
		vm.cancelBtn = opt.cancel;
	}else{
		vm.cancelBtn = true;
		vm.cancelText = opt.cancel;
	}
	if(Object.prototype.toString.call(opt.sure) == '[object Boolean]'){
		vm.sureBtn = opt.sure;
	}else{
		vm.sureBtn = true;
		vm.sureText = opt.sure;
	}

	vm.$on('onok', () => {
		if (onOk) onOk(vm);
	});
	vm.$on('oncancel', () => {
		vm.close();
		if (onCancel) onCancel(vm);
	});
	vm.$on('onclose', () => {
		vm.close();
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}
