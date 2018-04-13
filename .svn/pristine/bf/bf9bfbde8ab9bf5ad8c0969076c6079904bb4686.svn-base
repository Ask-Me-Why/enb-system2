<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.register-steps{
		width: 100%;
		svg path { 
			fill: inherit; 
		}
		@include flexLayout(flex,normal,center);
		.register-step{
			width: 3.3rem;
			flex: 0 0 3.3rem;
			height: .45rem;
			@include flexLayout(flex,center,center);
			background: map-get($color,200S2);
			position: relative;
			.icon-left-span{
				display: none;
				width: .22rem;
				height: .45rem;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translate(-100%,-50%);
				overflow: hidden;
				z-index: 2;
				.icon{
					.icon-use{
						fill: map-get($color,200S2);
					}
				}
			}
			.icon-right-span{
				width: .22rem;
				height: .45rem;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translate(100%,-50%);
				overflow: hidden;
				z-index: 2;
				.icon{
					.icon-use{
						fill: map-get($color,200S2);
					}
				}
			}
			&+.register-step{
				margin-left: .26rem;
				.icon-left-span{
					display: block;
				}
			}
			.step-icon{
				width: .26rem;
				height: .26rem;
				border-radius: 50%;
				font-size: .2rem;
				color: map-get($color,100);
				background: map-get($color,400);
				@include flexLayout(inline-flex,center,center);
				position: relative;
				.inner{
					display: inline-block;
					user-select: none;
				    text-align: center;
				    font-weight: 700;
				    line-height: 1;
				    color: inherit;
				}
			}
			.step-text{
				display: inline-block;
				font-size: .2rem;
				height: .26rem;
				padding-left: .26rem;
				color: map-get($color,400);
				.text{
					display: inline-block;
					user-select: none;
				    text-align: center;
				    font-weight: 700;
				    line-height: 1;
				    color: inherit;
				}
			}
			&.is-active{
				background: map-get($color,400);
				transition: background .3s linear;
				.icon-right-span,
				.icon-left-span{
					.icon{
						.icon-use{
							fill: map-get($color,400);
							transition: fill .3s linear;
						}
					}
				}
				.step-icon{
					color: map-get($color,400);
					background: map-get($color,100);
					transition: background .3s linear;
					transition: color .3s linear;
				}
				.step-text{
					color: map-get($color,100);
					transition: color .3s linear;
				}
			}
		}
	}
</style>
<template>
	<div class="register-steps">
		<svg style="display: none">
			<symbol>
				<path id="step_triangle" d="M0 0 L22 22.5 L0 45Z" stroke="none" fill="#000"/>
				<path id="step_triangle_completion" d="M0 0 L22 0 L22 22.5Z M22 22.5 L22 45 L0 45Z" stroke-width="0" stroke="none" fill="#000"/>
			</symbol>
		</svg>
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name:'RegisterSteps'
	}
</script>