<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
$bg: rgba(0, 0, 0, .3);
.ask-inline-loader-box {
    display: block;
    width: 30px;
    height: 30px;
    position: relative;
    margin: 0 auto;
    @include flexLayout(flex,center,center);
    .circle{
    	font-size: 28px;
	    line-height: 1;
	    color: #ff1744;
	    animation: radar-part-rotate 1s linear infinite;
	    .iconfont{
	    	font: inherit;
    	    color: inherit;
	    }
    }
}
@keyframes radar-part-rotate{
	0% {
	    transform: rotate(0deg);
	}
	100% {
	    transform: rotate(1turn);
	}
}
</style>
<template>
	<div class="ask-inline-loader-box" v-if="show">
		<div class="circle">
			<i class="iconfont icon-loading"></i>
		</div>
	</div>
</template>
<script>
export default {
	name: "askInlineLoader",
	props: ["show"]
}

</script>
