<template>
	<div class="ask-nav-more">
		<ask-button :hover="false">
			<span class="button-text">
				<slot></slot>
				<i class="iconfont icon-arrow-right"></i>
			</span>
		</ask-button>
	</div>
</template>
<script>
export default {
	name: "ask-nav-more"
}

</script>
