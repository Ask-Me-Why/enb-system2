<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
$bg: #fff #474443 #999 #333;
$color: #474443 #7e848c #474a4f;
	.ask-modal-box{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		pointer-events:none;
		@include flexLayout(flex,center,center);
		.ask-modal-wrapper{
			width: 80%;
			max-width: 800px;
			max-height: 800px;
			overflow: hidden;
			pointer-events: auto;
			background-color: nth($bg,1);
			box-shadow: 0 19px 38px rgba(0, 0, 0, .3), 0 15px 12px rgba(0, 0, 0, .22);
			border-radius: 4px;
		}
		.ask-modal-header{
			padding: 14px 14px;
			position: relative;
			.ask-modal-title{
				font-size: 1.8rem;
				@include textEllipsis(1);
				color: nth($color,1);
				padding-right: 28px;
			}
			.ask-close-icon{
				position: absolute;
				top: 50%;
				right: 0;
				transform: translate(-80%,-50%) rotate(45deg);
				z-index: 2;
				cursor: pointer;
				.icon{
					display: block;
					width: 24px;
					height: 24px;
					position: relative;
					&::after,
					&::before{
						position: absolute;
						content: '';
						transition: background .2s;
						border-radius: 100%;
						background: nth($bg,3);
					}
					&::before{
						top: 50%;
						left: 0;
						width: 100%;
						height: 2px;
						margin-top: -1px;
					}
					&::after{
						top: 0;
						left: 50%;
						width: 2px;
						height: 100%;
						margin-left: -1px;
					}
					&:hover::after,
					&:hover::before{
						background: nth($bg,4);
					}
				}
			}
		}
		.ask-modal-body{
			font-size: 1.6rem;
			word-break: break-all;
			white-space: normal;
			color: nth($color,1);
			padding: 0 10px;
		}
		.ask-modal-footer{
			width: 100%;
			padding: 14px 14px;
			@include flexLayout(flex,right,center);
		}
		
		/* 进入过渡的状态 */
		.ask-modal-fill-enter-active{
	        animation: modal-fill-enter .5s both cubic-bezier(.4, 0, 0, 1.5);
		}
		@keyframes modal-fill-enter{
			0%{
				transform: scale(1.2);
				opacity: 0;
			}
			100%{
				transform: scale(1);
				opacity: 1;
			}
		}
		/* 离开过渡的状态 */
		.ask-modal-fill-leave-active{
	        animation: modal-fill-leave .5s both;
		}

		@keyframes modal-fill-leave{
			0%{
				transform: scale(1);
				opacity: 1;
			}
			100%{
				transform: scale(1.1);
				opacity: 0;
			}
		}
	}
</style>
<template>
	<div class="ask-modal-box" :style="style">
		<transition :name="transition" @after-enter="afterEnter" @after-leave="afterLeave">
			<div class="ask-modal-wrapper" v-if="show">
				<div class="ask-modal-header" v-if="showHeader">
					<div class="ask-modal-title" v-if="title">{{title}}</div>
					<div class="ask-close-icon" v-if="showClose" @click="close">
						<span class="icon"></span>
					</div>
				</div>
				<div class="ask-modal-body">
					<slot></slot>
				</div>
				<div class="ask-modal-footer" v-if="showFooter">
					<slot name="footer">
						<ask-button text="关闭" @ask-click="close"></ask-button>
					</slot>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import askOverlay from '../ask-overlay/ask.overlay.js';
let TIMER_CLOSE = null;
export default {
	props: {
		show: {
			type: Boolean,
			default: false //是否显示，默认不显示
		},
		showHeader:{
			type: Boolean,
			default: true //是否显示头部，默认显示
		},
		showFooter:{
			type: Boolean,
			default: true //是否显示底部，默认显示
		},
		title: {
			type: String,
			default: '' //是否有标题，默认没有
		},
		showClose: {
			type: Boolean,
			default: true //是否显示关闭icon,默认显示
		},
		shade: {
			type: Number,
			default: .4  //遮罩层透明度
		},
		shadeColor: {
			type: String,
			default: '#000' //遮罩层颜色
		},
		shadeClick: {
			type: Boolean,
			default: true //是否可以点击触发关闭事件
		},
		beforeClose: {
			type: Function,
			default:null
		},
		afterClose: {
			type: Function,
			default:null
		},
		transition: {
			type: String,
			default: 'ask-modal-fill' //弹框进场和离场样式名
		},
		time:{
			type:Number,
			default:null
		}
	},
	data() {
		return {
			zIndex: null,
			theme: '',
			currentChange: false
		}
	},
	computed: {
		style() {
			return {
				'z-index': this.zIndex === null ? 'auto' : this.zIndex
			}
		}
	},
	methods: {
		close() {
			if(TIMER_CLOSE) clearTimeout(TIMER_CLOSE);
			if(this.beforeClose &&　Object.prototype.toString.call(this.beforeClose) === '[object Function]'){
				this.beforeClose(this.closeModal);
			}else{
				this.closeModal();
			}
		},
		closeModal(){
			this.$emit('update:show',false);
		},
		afterEnter() {
			this.$emit('open');
		},
		afterLeave() {
			this.$nextTick(function() {
				this.$el.remove&&this.$el.remove();
				this.afterClose&&this.afterClose(this);
				askOverlay.close(this, 'des');
			})
		},
		open(){
			if(this.time != null){
				TIMER_CLOSE = setTimeout(() => {
					this.close();
				}, this.time)
			}
			askOverlay.open(this);
			document.body.appendChild(this.$el);
			this.$emit('update:show',true);
		}
	},
	mounted() {
		if (this.show) {
			this.open();
		}
	},
	destroyed() {
		this.$nextTick(function() {
			askOverlay.close(this, 'des');
		})
	},
	watch: {
		show: function(n, o) {
			if (n) {
				this.open();
			}else{
				this.close();
				this.$emit('close');
			}	
		}
	}
}
</script>
