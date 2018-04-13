<template>
	<button :type="type" class="ask-button" @click="handlerClick($event)" ref="buttonEvent">
		<slot>
			<span class="button-text" v-if="text">
				{{text}}
			</span>
		</slot>
		<div class="ask-button-focus-overlay" v-if="hover"></div>
		<ask-ripple :color="rippleColor" :triggerEvents="rippleEvent" :ripple="ripple"></ask-ripple>
	</button>
</template>
<style src="./ask-button.scss" lang="scss"></style>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'button'
		},
		text: {
			type: String,
			default: ''
		},
		ripple: {
			type: Boolean,
			default: true
		},
		hover:{
			type: Boolean,
			default: true
		},
		rippleColor: {
			type: String,
			default: 'rgba(0,0,0,.1)'
		}
	},
	data() {
		return {
			rippleEvent: ''
		}
	},
	mounted() {
		this.rippleEvent = this.$refs.buttonEvent;
	},
	methods: {
		handlerClick(event) {
			event.target.blur&&event.target.blur();
			this.$emit('ask-click', event);
		}
	}
}

</script>
