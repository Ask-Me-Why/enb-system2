<style lang="scss">
	
	@import '~@/styles/mixins', '~@/styles/variables';
	$border: #D3D3D3;
	$bg: #fff;
	$color: #333;
	$border-checked: #007AFF;
	$bg-checked: #007AFF;
	$color-checked: #007AFF;
	.ask-radio-box{
		display: inline-block;
		vertical-align: bottom;
		&+.ask-radio-box{
			margin-left: 30px;
		}
		.ask-radio-label{
			width: auto;
			@include flexLayout(inline-flex,normal,center);
			cursor: pointer;
			.arl-icon{
				display: inline-block;
				width: 20px;
				height: 20px;
				border: 1px solid $border;
				border-radius: 4px;
				background-color: $bg;
				transition: border .15s cubic-bezier(.71,-.46,.88,.6);
				overflow: hidden;
				position: relative;
				transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
				&::after{
					content:'';
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: $bg;
					z-index: 4;
				}
				.arl-arrow{
					width: 100%;
					height: 100%;
					display: block;
					position: relative;
					z-index: 2;
					transform: translateY(-12%) rotate(-45deg) ;
					&::after{
						width: 80%;
						height: 50%;
						content:'';
						display: block;
						position: absolute;
						top: 25%;
						left: 10%;
						border-left: 2px solid $border-checked;
						border-bottom: 2px solid $border-checked;
						transform: scale(.8);
					}
				}
			}
			.arl-input{
				display: none;
				opacity: 0;
			}
			.arl-title{
				font-size: .2rem;
				color: $color;
				white-space: nowrap;
				margin-left: 4px;
				transition: color .15s cubic-bezier(.71,-.46,.88,.6);
			}
			&:hover{
				.arl-icon{
					border: 1px solid $border-checked;
					transition: border .15s cubic-bezier(.71,-.46,.88,.6);
				}
			}
			&.is-checked{
				.arl-icon{
					border: 1px solid $border-checked;
					transition: border .15s cubic-bezier(.71,-.46,.88,.6);
					&::after{
						transform: translateX(100%);
						transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
					}
				}
				.arl-title{
					color: $color-checked;
					transition: color .15s cubic-bezier(.71,-.46,.88,.6);
				}
			}
		}
	}
</style>
<template>
	<div class="ask-radio-box">
		<label class="ask-radio-label" :for="'ask_radio_'+radioId"
			:class="{'is-checked': model == label}">
			<span class="arl-icon">
				<span class="arl-arrow"></span>
			</span>
			<input class="arl-input" type="radio" v-model="model" :name="name" :value="label" :id="'ask_radio_'+radioId">
			<span class="arl-title">
				<slot></slot>
			</span>
		</label>
	</div>
</template>
<script>

import { getInputId } from '@/utils';
	export default{
		name:"AskRadio",
		props:{
			value: {},
			label: {},
			name: String
		},
		computed:{
			radioId(){
				return getInputId();
			},
			model:{
				get(){
					return this.value;
				},
				set(val){
					this.$emit('input',val);
				}
			}
		}
	}
</script>
