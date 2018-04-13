<template>
	<div class="ask-tab-nav">
		<ask-button :hover="false" @ask-click="onClick">
			<slot></slot>
		</ask-button>
	</div>
</template>
<script>
export default {
	name: "ask-tab-nav",
	props: {
		selected: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentIndex: -1,
			currentSelected: this.selected
		}
	},
	mounted() {
		this.$parent.updateIndex();
	},
	methods: {
		onClick() {
			this.currentSelected = true;
			this.$parent.currentIndex = this.currentIndex;
			this.$nextTick(() => {
				this.$emit('on-click', this.currentIndex);
			})
		}
	},
	watch: {
		currentSelected(val) {
			if (val) {
				this.$parent.index = this.currentIndex;
			}
		},
		selected(val) {
			this.currentSelected = val
		}
	}
}

</script>
