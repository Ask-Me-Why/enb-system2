//按钮控件
import askButton from './ask-button/ask-button.vue';
import askRipple from './ask-ripple/ask-ripple.vue';

//模态框控件
import askModal from './ask-modal/ask-modal.vue';
import askOverlay from './ask-overlay/ask-overlay.vue';
import askLoader from './ask-loader/ask-loader.vue';
import askInlineLoader from './ask-loader/ask-inline-lodader.vue';


//swiper模块
import askSwiper from './ask-swiper/ask-swiper.vue';
import askSlide from './ask-swiper/ask-slide.vue';


//tab组件
import askTabComponents from './ask-tab';

//ask-scroll组件
import askScroll from './ask-scroll';

//单选按钮组件
import askRadio from './ask-radio/ask-radio.vue';
//复选按钮组件
import askCheckbox from './ask-checkbox/ask-checkbox.vue';

//input组件
import askInput from './ask-input/ask-input.vue';

//input组件
import askTinymce from './ask-tinymce/ask-tinymce.vue';

const components = {
	'ask-button': askButton,
	'ask-modal': askModal,
	'ask-ripple': askRipple,
	'ask-swiper':askSwiper,
	'ask-slide':askSlide,
	'ask-overlay':askOverlay,
	'ask-loader':askLoader,
	'ask-inline-loader':askInlineLoader,
	'ask-radio':askRadio,
	'ask-input':askInput,
	'ask-checkbox':askCheckbox,
	'ask-tinymce':askTinymce,
}
Object.assign(components,askTabComponents,askScroll);

export default {
	install(Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]));
	}
}
