<template>
	<div class="register-step" :class="{'is-active': selected}">
		<span class="icon-left-span">
			<svg class="icon" viewBox="0 0 22 45"> 
				<use class="icon-use" xlink:href="#step_triangle_completion" x="0" y="0" /> 
			</svg>
		</span>
		<span class="icon-right-span">
			<svg class="icon" viewBox="0 0 22 45"> 
				<use class="icon-use" xlink:href="#step_triangle" x="0" y="0" /> 
			</svg>
		</span>
		<div class="step-icon" v-if="index">
			<div class="inner">{{index}}</div>
		</div>
		<div class="step-text">
			<div class="text"><slot></slot></div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'RegisterStep',
		props:{
			index: Number|String,
			selected: {
				type: Boolean,
				default:false
			}
		}
	}
</script>