<template>
	<div id="app" class="wrapper">
		<nav-bar v-if="$route.meta.showNavBar"></nav-bar>
		<content-area>
			<transition name="ask-switch">
				<router-view/>
			</transition>
		</content-area>
		<ask-loader :show="ajaxLoader"></ask-loader>
	</div>
</template>
<style src="./assets/font/iconfont.css" lang="css"></style>
<style src="./styles/base.scss" lang="scss"></style>
<script>
import Vue from 'vue';
import channel from '@/components/channel.js';
import navBar from '@core/nav-bar/nav-bar.vue';
import contentArea from '@core/content-area/content-area.vue';
import askOverlay from '@/components/ask/ask-overlay/ask.overlay.js';
import { mapState } from 'vuex';

export default {
	name: 'app',
	components:{
		'nav-bar':navBar,
		'content-area':contentArea,
	},
	computed:{
		...mapState({
		    ajaxLoader: state => state.ajaxLoader
		})
	},
	watch:{
		'$route' (to, from) {
			askOverlay.closeAll();
		}
	}
}
</script>
