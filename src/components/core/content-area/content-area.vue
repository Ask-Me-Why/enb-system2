<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.enb-content{
		width: 100%;
		height: calc(100% - .62rem);
		@include flexLayout(flex,normal,normal);
		overflow: hidden;
		&.no-nav-bar{
			height: 100%;
		}
		.enb-menu-list,
		.enb-section{
			overflow: auto;
			&::-webkit-scrollbar {
				display: none;
			}
		}
		.enb-section{
			&::-webkit-scrollbar {
				display:block;
				width: 10px;
				background-color: transparent;
			}
			&::-webkit-scrollbar-track {
				border-radius: 0;
				background-color: map-get($scrollbar, 600);
				/* -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .2);
			    box-shadow: inset 0 0 3px rgba(0, 0, 0, .2); */
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
		}
		.enb-menu-list{
			width: 2.52rem;
			height: 100%;
			flex: 0 0 2.52rem;
		}
		.enb-section{
			width: calc(100% - 2.52rem);
			height: 100%;
			flex: 0 0 calc(100% - 2.52rem);
			padding: .24rem .32rem;
			&.no-menu-bar{
				width: 100%;
				flex: 0 0 100%;
			}
		}
	}
	
</style>
<template>
	<div class="enb-content boundary" :class="{'no-nav-bar': !$route.meta.showNavBar}">
		<menu-list v-if="$route.meta.showMenuBar"></menu-list>
		<section class="enb-section" :class="{'no-menu-bar': !$route.meta.showMenuBar}">
			<slot></slot>
		</section>
	</div>
</template>

<script>
import menuList from '@core/menu-list/menu-list.vue';
	export default{
		name:"ContentArea",
		components:{
			'menu-list':menuList
		}
	}
</script>