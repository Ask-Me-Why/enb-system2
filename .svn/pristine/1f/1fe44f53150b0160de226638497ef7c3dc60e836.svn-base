<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';
@mixin askInputFloatSet($font-scale, $set-padding, $set-margin) {
	width: 100%/$font-scale;
	transform: translateY(-$set-margin - $set-padding) scale($font-scale) perspective(100px) translateZ(.001px);
}

@mixin askInputInit() {
	$set-padding: 8px;
	$set-margin: 16px;
	$color: #333;
	$font-scale: .75;
	.ask-input-label {
		user-select: none;
		display: inline-block;
		vertical-align: bottom;
		width: 200px;
		font-size: 1.6rem;
		position: relative;
		.ask-input-flex {
			text-align: left;
			padding: $set-padding 0;
			border-top: $set-margin solid transparent;
			font: inherit;
			width: 100%;
		}
		.ask-label-wrapper {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			padding: $set-margin 0 0;
			pointer-events: none;
			overflow: hidden;
			.ask-placeholder-label {
				display: block;
				position: absolute;
				top: $set-margin+$set-padding;
				left: 0;
				width: 100%;
				@include textEllipsis(1);
				font: inherit;
				transform: perspective(100px);
				transform-origin: 0 0;
				transition: transform 400ms cubic-bezier(.25, .8, .25, 1), color 400ms cubic-bezier(.25, .8, .25, 1), width 400ms cubic-bezier(.25, .8, .25, 1);
			}
		}
		.ask-input-hare {
			width: 100%;
			margin: 0;
			padding: 0;
			outline: none;
			border: none;
			color: $color;
			resize: vertical;
			vertical-align: bottom;
			font: inherit;
			background: transparent;
			&:-webkit-autofill+.ask-label-wrapper {
				.ask-placeholder-label {
					display: none;
				}
				.ask-float {
					@include askInputFloatSet($font-scale, $set-padding, $set-margin);
				}
			}
		}
	}
	.ask-underline {
		position: relative;
		width: 100%;
		height: 1px;
		&.ask-disabled {
			background-color: transparent;
			background-position: 0;
		}
		.ask-input-ripple {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			visibility: hidden;
			width: 100%;
			height: 1px * 2;
			transition: background-color 400ms cubic-bezier(.25, .8, .25, 1);
			transform: scaleX(.5);
			transform-origin: 50%;
			.ask-focused &, .ask-input-invalid & {
				visibility: visible;
				transition: transform 150ms linear, background-color 400ms cubic-bezier(.25, .8, .25, 1);
				transform: scaleX(1);
			}
		}
	}
	.ask-input-label.ask-float {
		.ail-label {
			@include askInputFloatSet($font-scale, $set-padding, $set-margin);
		}
	}
	$input-placeholder-color: rgba($color, .38);
	$primary:#3f51b5;
	$warn:#e91e63;
	$accent:#ff9800;
	$input-floating-placeholder-color: $primary;
	$input-required-placeholder-color: $warn;
	$input-color-accent: $accent;
	$input-color-warn: $warn;
	/* 默认状态 */
	.ask-placeholder-label {
		color: $input-placeholder-color;
		&.ask-float:not(.ask-empty), .ask-focused &.ask-float {
			@include askInputFloatSet($font-scale, $set-padding, $set-margin);
		}
	}
	/* 获取焦点状态 */
	.ask-focused .ask-placeholder-label {
		color: $input-floating-placeholder-color;
		&.ask-accent {
			color: $input-color-accent;
		}
		&.ask-warn {
			color: $input-color-warn;
		}
	}
	.ask-input-hare:disabled {
		color: $input-placeholder-color;
	}
	.ask-input-ripple {
		background-color: $input-floating-placeholder-color;
		&.ask-accent {
			background-color: $input-color-accent;
		}
		&.ask-warn {
			background-color: $input-color-warn;
		}
	}
	.ask-input-invalid {
		.ask-placeholder-label {
			color: $input-required-placeholder-color;
			&.ask-accent {
				color: $input-required-placeholder-color;
			}
		}
		.ask-input-ripple {
			color: $input-required-placeholder-color;
			background-color: $input-required-placeholder-color;
			&.ask-accent {
				background-color: $input-required-placeholder-color;
			}
		}
	}
	.ask-underline {
		background-color: rgba($color, .12);
		&.ask-disabled {
			$borderColor: rgba($color, .26);
			background-color: transparent;
			background-image: linear-gradient(to right, $borderColor 0, $borderColor 33%, transparent 0);
			background-repeat: repeat-x;
			background-position: 0;
			background-size: 4px 1px;
		}
	}
	$wrapper-bottom: 20px;
	.ask-input-label {
		padding-bottom: $wrapper-bottom;
	}
	.ask-error-tip {
		bottom: 0;
		margin-top: $set-padding - 2px;
		font-size: 1.2rem;
		position: absolute;
		width: 100%;
		word-break: break-all;
		color: $input-required-placeholder-color;
	}
}

@include askInputInit();

</style>
<template>
	<label class="ask-input-label" 
	       :for="`ask_input_${inputId}`" 
	       :class="{'ask-focused': focused,
				    'ask-input-invalid': isError}">
		<div class="ask-input-flex">
			<input class="ask-input-hare" 
			       :type="_inputType" 
			       :value="currentValue" 
			       :name="name" 
			       :id="`ask_input_${inputId}`" 
			       @input="_inputChange" 
			       @focus="_focusChange(true)" 
			       @blur="_focusChange(false)"
			       :disabled="disabled">
			<div class="ask-label-wrapper">
				<span class="ask-placeholder-label" 
				      :class="{'ask-float':_canFloatPlaceholder,
							   'ask-empty': _empty || _shouldAlwaysFloat,
							   'ask-accent': color == 'accent',
							   'ask-warn': color == 'warn'
							   }">
					{{label}}
				</span>
			</div>
		</div>
		<div class="ask-underline" :class="{'ask-disabled': disabled}">
			<span class="ask-input-ripple" 
			    :class="{'ask-accent': color == 'accent',
					     'ask-warn': color == 'warn'}">
			</span>
		</div>
		<span class="ask-error-tip">
			<slot name="error"></slot>
		</span>
	</label>
</template>
<script>
import { getInputId } from '@/utils';
const ASK_INPUT_INVALID_TYPES = [
	'button',
	'checkbox',
	'color',
	'file',
	'hidden',
	'image',
	'radio',
	'range',
	'reset',
	'submit'
];
export default {
	name: "AskInput",
	props: {
		floatPlaceholder: {
			type: String,
			default: "auto"
		},
		color: {
			type: String,
			default: "primary"
		},
		isError: Boolean, //使用vee-validate等验证工具的时候可以使用isError获得错误样式
		disabled: Boolean,
		value: {},
		label: {},
		name: String,
		type: {
			type: String,
			default: 'text'
		}
	},
	data() {
		return {
			focused: false,
			currentValue: this.value
		}
	},
	computed: {
		_canFloatPlaceholder() {
			return this.floatPlaceholder != 'never';
		},
		_shouldAlwaysFloat() {
			return this.floatPlaceholder == 'always';
		},
		_empty() {
			return this.currentValue == null || this.currentValue === '';
		},
		_inputType(){
			let _type ='text';
			if (ASK_INPUT_INVALID_TYPES.indexOf(this.type) > -1) {
				throw Error(`Input type "${this.type}" isn't supported by ask-input.`);
			}
			_type = this.type;
			return _type;
		},
		inputId() {
			return getInputId();
		}
	},
	methods: {
		_focusChange(isFocused) {
			if (isFocused !== this.focused) {
				this.focused = isFocused;
			}
		},
		_inputChange(e) {
			let value = e.target.value;
			this.$emit('input', value);
			this.setCurrentValue(value);
			this.$emit('change', value);
		},
		setCurrentValue(value) {
			this.currentValue = value;
		}
	},
	watch: {
		'value'(val, oldValue) {
		    this.setCurrentValue(val);
		}
	}
}

</script>
