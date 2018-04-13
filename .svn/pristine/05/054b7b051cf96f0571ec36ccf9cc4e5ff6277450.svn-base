<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
.ask-scroll {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		width: 2px;
		background-color: transparent;
	}
	&.noscroll::-webkit-scrollbar{
		display:none;
	}
	&::-webkit-scrollbar-track {
		border-radius: 0;
		background-color: map-get($scrollbar, 600);
		-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .2);
		box-shadow: inset 0 0 3px rgba(0, 0, 0, .2);
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 4px;
		background-color: rgba(map-get($scrollbar, 200), .4);
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(map-get($scrollbar, 200), .6);
	}
	&::-webkit-scrollbar-thumb:active {
		background-color: rgba(map-get($scrollbar, 200), 1);
	}
	.ask-scroll-body {
		position: absolute;
		top: 0;
		width: 100%;
		transition-duration: 300ms;
		.ask-scroll-header {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 40px;
			transform: translate3d(0, -100%, 0);
			color: #aaa;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.ask-scroll-footer {
			height: 40px;
			color: #aaa;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

.ask-refresh-lodaer {
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	@include flexLayout(flex, center, center);
	transform: translate(0, -50%);
	z-index: 2;
	margin-top: -20px;
	&>div {
		font-size: 1.8rem;
		font-weight: 900;
		margin: 0 2px;
		&:nth-child(3n+1) {
			color: map-get($loader, 100);
			animation: ask-loader-bounce 1.2s ease-in-out infinite;
		}
		&:nth-child(3n+2) {
			color: map-get($loader, 200);
			animation: ask-loader-bounce 1.2s .2s ease-in-out infinite;
		}
		&:nth-child(3n+3) {
			color: map-get($loader, 500);
			animation: ask-loader-bounce 1.2s .6s ease-in-out infinite;
		}
		&:nth-child(3n+4) {
			color: map-get($loader, 600);
			animation: ask-loader-bounce 1.2s .8s ease-in-out infinite;
		}
	}
}

.scroll-before,
.scroll-loosen,
.scroll-in,
.scroll-end{
	display: none;
	text-align: center;
}
.ask-scroll {
	&.touching {
		.ask-scroll-body {
			transition-duration: 0ms;
		}
	}
	&.refresh-before .ask-scroll-header .scroll-before,
	&.refresh-loosen .ask-scroll-header .scroll-loosen,
	&.refresh-in .ask-scroll-header .scroll-in,
	&.refresh-end .ask-scroll-header .scroll-end,
	&.infinite-before .ask-scroll-footer .scroll-before,
	&.infinite-in .ask-scroll-footer .scroll-in,
	&.infinite-end .ask-scroll-footer .scroll-end{
		display: block;
	}
}

</style>
<template>
	<div class="ask-scroll" :class="{
				'refresh-before': (state == 0),
				'refresh-loosen' : (state == 1),
				'refresh-in': (state == 2),
				'refresh-end': (state == 3),
				'infinite-before': (infiniteState == 0),
				'infinite-in': (infiniteState == 1),
				'infinite-end': (infiniteState == 2),
				'touching': touching
			}" 
			@touchstart="onRefresh ? touchStart($event) : undefined" 
			@touchmove="onRefresh ? touchMove($event) : undefined" 
			@touchend="onRefresh ? touchEnd($event) : undefined" 
			@mousedown="onRefresh ? mouseDown($event) : undefined" 
			@mousemove="onRefresh ? mouseMove($event) : undefined" 
			@mouseup="onRefresh ? mouseUp($event) : undefined" 
			@scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined"
		>
		<div class="ask-scroll-body" :style="style">
			<div class="ask-scroll-header" v-if="onRefresh">
				<slot name="refresh">
					<div class="scroll-before">下拉刷新</div>
					<div class="scroll-loosen">松开你的爪子</div>
					<div class="scroll-in">正在刷新</div>
					<div class="scroll-end">刷新成功</div>
				</slot>
			</div>
			<slot></slot>
			<div class="ask-scroll-footer" v-if="onInfinite">
				<slot name="infinite">
					<div class="scroll-before">上拉加载</div>
					<div class="scroll-in">正在加载</div>
					<div class="scroll-end">加载成功</div>
				</slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "ask-scroll",
	props: {
		offset: {
			type: Number,
			default: 44
		},
		onRefresh: {
			type: Function,
			default: undefined,
			required: false
		},
		onInfinite: {
			type: Function,
			default: undefined,
			required: false
		},
		chat:{
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			infiniteState: 0,
			state: 0,
			top: 0,
			start: {
				x: 0,
				y: 0
			},
			touching: false,
			infiniteLoading: false,
			scrollMove: 0
		}
	},
	computed: {
		style() {
			return { transform: `translate3d(0,${this.top}px,0)` };
		}
	},
	methods: {
		touchStart(e) {
			this.start = this.getPosition(e);
			this.touching = true;
		},
		touchMove(e) {
			if (this.$el.scrollTop > 0 || !this.touching) {
				return;
			}
			const move = this.getPosition(e);
			const diff = {
				x: move.x - this.start.x,
				y: move.y - this.start.y,
			}

			if (diff.y > 0) {
				if (e.preventDefault) e.preventDefault();
				else e.returnValue = false;
			}
			this.top = Math.pow(diff.y, 0.8) + (this.state == 2 ? this.offset : 0);

			if (this.state == 2) return;
			if (this.top >= this.offset) {
				this.state = 1;
			} else {
				this.state = 0;
			}
		},
		touchEnd(e) {
			this.touching = false;
			if (this.state == 2) {
				this.state = 2;
				this.top = this.offset;
				return;
			}
			if (this.top >= this.offset) {
				this.refresh();
			} else {
				this.state = 0;
				this.top = 0;
			}
		},
		mouseDown(e) { this.touchStart(e) },
		mouseMove(e) { this.touchMove(e) },
		mouseUp(e) { this.touchEnd(e) },
		onScroll(e) {
			if (this.infiniteLoading) {
				return;
			}
			let outerHeight = this.$el.clientHeight;
			let bodyHeight = this.$el.querySelector('.ask-scroll-body').clientHeight;
			let scrollTop = this.$el.scrollTop;

			let ashHeight = this.onRefresh ? this.$el.querySelector('.ask-scroll-header').clientHeight : 0;
			let asfHeight = this.$el.querySelector('.ask-scroll-footer').clientHeight;
			let bottom = bodyHeight - outerHeight - scrollTop - ashHeight;

			if (bottom < asfHeight) this.infinite();
		},
		getPosition(e) {
			e = e.originalEvent || e;

			if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
				return {
					x: e.targetTouches[0].pageX,
					y: e.targetTouches[0].pageY
				};
			} else {
				return {
					x: e.pageX,
					y: e.pageY
				};
			}
		},
		refresh() {
			this.state = 2;
			this.top = this.offset;
			if(this.chat){
				this.scrollMove = this.$el.scrollHeight;
			}
			this.onRefresh(this.refreshDone);
		},
		refreshDone() {
			this.state = 3;
			setTimeout(() => {
				this.state = 0;
				this.top = 0;
				if(this.chat){
					this.$el.scrollTop = this.$el.scrollHeight - this.scrollMove - 100;
				}
			}, 500);
		},
		infinite() {
			this.infiniteState = 1;
			this.infiniteLoading = true;
			this.onInfinite(this.infiniteDone);
		},
		infiniteDone() {
			this.infiniteState = 2;
			setTimeout(() => {
				this.infiniteState = 0;
				this.infiniteLoading = false;
			}, 500)
		},
		slideToEnd(){
			let outerHeight = this.$el.clientHeight;
			let bodyHeight = this.$el.querySelector('.ask-scroll-body').clientHeight;
			let asfHeight = this.onInfinite?this.$el.querySelector('.ask-scroll-footer').clientHeight:0;

			this.$el.scrollTop = bodyHeight - outerHeight - asfHeight;
		}
	}
}

</script>
