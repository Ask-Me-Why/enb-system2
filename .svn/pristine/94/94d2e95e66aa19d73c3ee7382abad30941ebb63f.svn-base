<style lang="scss">
	.item{
		width: 100%;
		padding: 10px 0;
		text-align: center;
		font-size: 1.6rem;
		color: #333;
		&:nth-child(2n+1){
			background-color: rgba(#e67e22,.3);
		}
		&:nth-child(2n+2){
			background-color: rgba(#91ABFA,.3);
		}
	}
</style>
<template>
	<div class="ask-view" v-nav="{hideNavbar: true,showBack:true,title: $route.meta.title}">
		<ask-scroll class="ask-view-box" :on-refresh="onRefresh" :on-infinite="onInfinite">
			<div class="item" v-for="i in items" :key="i">
				{{i}}
			</div>
			<template slot="refresh">
				<scroll-before>下拉啊傻逼</scroll-before>
				<scroll-loosen>松手啊傻逼</scroll-loosen>
				<scroll-in>我在刷新啊傻逼</scroll-in>
				<scroll-end>刷新完了啊傻逼</scroll-end>
			</template>
			<template slot="infinite">
				<div v-if="last">全部数据</div>
			</template>
		</ask-scroll>
	</div>
</template>
<script>
import askScroll from '@/components/ask-scroll/index.js';
export default {
	name: 'scroll',
	components: askScroll,
	data() {
		return {
			items: [],
			last: false
		}
	},
	mounted() {
		for (let i = 1; i <= 20; i++) {
			this.items.push(i+'我是测试yeah！！！')
		}
		this.$nextTick(()=>{
			
			this.$children[0].slideToEnd();
		})
	},
	methods: {
		onRefresh(done) {
			setTimeout(() => {
			   done('很舒服')
			}, 1000);
		},
		onInfinite(done) {
			setTimeout(() => {
			    done('呀咿呀')
			    setTimeout(() => {
			     	this.last = true;
			    }, 500);
			}, 1000);
		}
	}
}

</script>
