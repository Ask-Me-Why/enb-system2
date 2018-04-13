<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
$check: map-get($color,400);
.ask-checkbox-box {
	display: inline-block;
	vertical-align: bottom;
}

.ask-checkbox-box+.ask-checkbox-box {
	margin-left: .1rem;
}

.ask-checkbox-label {
	width: auto;
	cursor: pointer;
	@include flexLayout(inline-flex, normal, center);
	.acl-icon {
		position: relative;
		display: block;
		width: .24rem;
		height: .24rem;
		transition: border 300ms linear, background 0s linear 300ms, transform 300ms linear;
		border: 1px solid #c9c9c9;
		border-radius: .02rem;
		background-color: #fff;
		&::after {
			position: absolute;
			z-index: 4;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
			content: '';
			transition: transform 300ms linear;
			border-radius: .02rem;
			background-color: #fff;
		}
	}
	.acl-title {
		font-size: .18rem;
		line-height: 1;
		white-space: nowrap;
		color: #333;
		margin: .04rem 0 0 .04rem;
		transition: color 300ms linear;
	}
	.acl-input {
		display: none;
		opacity: 0;
	}
	&:hover {
		.acl-icon{
			transition: border 300ms linear, background 0s linear 300ms, transform 300ms linear;
			border: 1px solid $check;
		}
		
	}
	&.is-checked {
		.acl-icon {
			transition: border 300ms linear;
			border: 1px solid $check;
			background: $check;
			&::after {
				transition: transform 300ms linear;
				transform: scale(0);
			}
		}
		.acl-title {
			transition: color 300ms linear;
			color: $check;
		}
	}
}

</style>
<template>
	<div class="ask-checkbox-box">
		<label class="ask-checkbox-label" :for="'ask_checkbox_'+inputId" :class="{'is-checked':  model}">
			<span class="acl-icon">
				<svg viewBox="0 0 40 40">
					<path d="M10 20 L18 28 L32 12" stroke-width="3" stroke="#fff" stroke-linejoin="round" fill="none" />
				</svg>
			</span>
			<input class="acl-input" type="checkbox" v-model="model" :name="name" :id="'ask_checkbox_'+inputId">
			<span class="acl-title">
				<slot></slot>
			</span>
		</label>
	</div>
</template>
<script>
import { getInputId } from '@/utils';
export default {
	name: "AskCheckBox",
	props: {
		value: {},
		name: String
	},
	computed: {
		inputId() {
			return getInputId();
		},
		model: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	}
}

</script>
