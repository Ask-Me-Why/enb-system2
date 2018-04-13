<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.enb-tab-nav{
		position: relative;
		width: 100%;
		font-size: .30rem;
		color: map-get($color,300);
		padding-left: .16rem;
		line-height: 1;
		&::after{
			content:'';
			width: .04rem;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 12;
			pointer-events: none;
			background: map-get($color,400);
			border-radius: 50%/.02rem;
		}
	}
</style>
<template>
	<div class="enb-tab-nav">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: 'EnbTab'
}
</script>
