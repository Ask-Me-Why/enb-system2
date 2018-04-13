<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.simple-input{
		width: 100%;
		position: relative;
		padding: .42rem 0;
		text-align: center;
		user-select:none;
		.icon{
			width: .22rem;
			height: .22rem;
			position: absolute;
			left: 50%;
			background: map-get($color,400);
			cursor:pointer;
			&.add{
				top: 0;
				transform: translate(-50%,0);
				border-radius: .04rem .04rem 0 0/.04rem .04rem 0 0;
			}
			&.reduce{
				bottom: 0;
				transform: translate(-50%,0);
				border-radius: 0 0 .04rem .04rem/ 0 0 .04rem .04rem;
			}
		}
		.value{
			min-width: .24rem;
			width: 100%;
			font-size: .18rem;
			color: map-get($color,300);
		}
	}
</style>
<template>
	<div class="simple-input">
		<div class="icon add" @click="add">
			<svg viewBox="0 0 22 22">
				<path d="M4 11 L18 11" stroke-width="2" stroke="#fff" fill="none"/>
				<path d="M11 4 L11 18" stroke-width="2" stroke="#fff" fill="none"/>
			</svg>
		</div>
		<div class="value">{{handlerSingleDigit(model)}}</div>
		<div class="icon reduce" @click="reduce">
			<svg viewBox="0 0 22 22">
				<path d="M4 11 L18 11" stroke-width="2" stroke="#fff" fill="none"/>
			</svg>
		</div>
	</div>
</template>
<script>
	import {handlerSingleDigit} from '@/utils';
	export default{
		name:'SimpleInput',
		props:{
			min:{
				type: Number,
				default: 0
			},
			max:{
				type: Number,
				default: 0
			},
			value: {},
		},
		computed:{
			handlerSingleDigit(){
				return handlerSingleDigit;
			},
			model:{
				get:function(){
					return this.value;
				},
				set:function(val){
					this.$emit('input',val);
					this.$emit('s-change');
				}
			}
		},
		methods:{
			add(){
				let _model = this.model;
				this.model = Math.min(this.max,++_model);
			},
			reduce(){
				let _model = this.model;

				this.model = Math.max(this.min,--_model);
			}
		}
	}
</script>