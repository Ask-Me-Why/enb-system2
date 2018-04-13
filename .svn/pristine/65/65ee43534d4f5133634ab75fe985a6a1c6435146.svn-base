<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.enb-card{
		position: relative;
		width: 100%;
		&+.enb-card{
			margin-top: .2rem;
		}
		.ec-header{
			width: 100%;
			padding: .2rem .32rem .2rem .42rem;
			background: map-get($color,100);
			font-size: .18rem;
			color: map-get($color,300);
			white-space: nowrap;
			line-height: 1.4;
			border-bottom: 1px solid map-get($color,100D1);
		}
		.ec-body{
			width: 100%;
			background: map-get($color,100);
		}
	}
</style>
<template>
	<div class="enb-card">
		<div class="ec-header">
			<slot name="title">{{title}}</slot>
		</div>
		<div class="ec-body">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'EnbCard',
	props:{
		title:String
	}
}
</script>
