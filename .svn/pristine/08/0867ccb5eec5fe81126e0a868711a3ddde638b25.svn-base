<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ask-tab {
	width: 100%;
	overflow-x: auto;
	background-color: map-get($askTab, 300);
	padding: 0 10px;
	&::-webkit-scrollbar {
		display: none;
	}
	.tab-container {
		padding: 4px 0;
		@include flexLayout(inline-flex, normal, center);
		position: relative;
	}
	.ask-tab-nav {
		padding: 0 4px;
		.ask-button {
			min-width: auto;
		}
	}
	.tab-ink-bar {
		position: absolute;
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #ff1744;
		text-align: center;
		&.ink-bar-transition-forward {
			transition: right .3s cubic-bezier(0.35, 0, 0.25, 1), left .3s cubic-bezier(0.35, 0, 0.25, 1) .3s*0.3;
		}
		&.ink-bar-transition-backward {
			transition: right .3s cubic-bezier(0.35, 0, 0.25, 1) .3s*0.3, left .3s cubic-bezier(0.35, 0, 0.25, 1);
		}
	}
	&.ask-tab-vertical{
		overflow-x:visible;
		overflow-y:auto;
		padding: 0;
		width: 100%;
		.tab-container{
			display: block;
			padding: 0;
			height: auto;
			width: 100%;
		}
		.ask-tab-nav{
			padding: 0;
			text-align: center;
			.ask-button{
				width: 100%;
			}
		}
		.tab-ink-bar{
			height: auto;
			width: 2px;
			bottom: 0;
			left: 0;
			&.ink-bar-transition-forward {
				transition: bottom .3s cubic-bezier(0.35, 0, 0.25, 1), top .3s cubic-bezier(0.35, 0, 0.25, 1) .3s*0.3;
			}
			&.ink-bar-transition-backward {
				transition: bottom .3s cubic-bezier(0.35, 0, 0.25, 1) .3s*0.3, top .3s cubic-bezier(0.35, 0, 0.25, 1);
			}
		}
	}
}

</style>
<template>
	<div class="ask-tab" :class="{'ask-tab-vertical':vertical}">
		<div class="tab-container">
			<slot></slot>
			<div class="tab-ink-bar" :class="barClass" :style="barStyle"></div>
		</div>
	</div>
</template>
<script>
/*
 *	插件源文件Demo地址:https://vux.li/demos/v2/?x-page=v2-doc-home#/component/tab
 * 	感谢作者无私的开源
 */
export default {
	name: "ask-tab",
	props: {
		lineWidth: {
			type: Number,
			default: 2
		},
		vertical:{
			type: Boolean,
			default:false
		}
	},
	computed: {
		barLeft() {
			return `${this.currentIndex * (100 / this.number)}%`
		},
		barRight() {
			return `${(this.number - this.currentIndex - 1) * (100 / this.number)}%`
		},
		barStyle() {
			let commonStyle;
			if(this.vertical){
				commonStyle = {
					top: this.barLeft,
					bottom: this.barRight,
					display: 'block',
					width: this.lineWidth + 'px'
				}
			}else{
				commonStyle = {
					left: this.barLeft,
					right: this.barRight,
					display: 'block',
					height: this.lineWidth + 'px'
				}
			}

			return commonStyle;
		},
		barClass() {
			return {
				'ink-bar-transition-forward': this.direction === 'forward',
				'ink-bar-transition-backward': this.direction === 'backward'
			}
		}
	},
	data() {
		return {
			direction: "forward",
			index: -1,
			currentIndex: this.index,
			number: this.$children.length
		}
	},
	mounted() {
		this.updateIndex();
	},
	methods: {
		updateIndex() {
			if (!this.$children || !this.$children.length) return;
			this.number = this.$children.length;
			let children = this.$children;
			for (let i = 0, l = children.length; i < l; i++) {
				children[i].currentIndex = i;
				if (children[i].currentSelected) {
					this.index = i;
				}
			}
		}
	},
	watch: {
		index(val) {
			this.currentIndex = val;
		},
		currentIndex(n, o) {
			this.direction = n > o ? 'forward' : 'backward';
		}
	}
}

</script>
