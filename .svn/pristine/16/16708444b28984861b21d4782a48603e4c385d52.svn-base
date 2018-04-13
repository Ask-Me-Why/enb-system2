<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.stat-maketable{
		.smt-card{
			margin: .3rem 0 0;
			&+.smt-card{
				margin: .3rem 0 0;
			}
			.ec-header{
				font-weight: 600;
				font-size: .2rem;
			}
			.box{
				padding: .3rem .4rem;
				.text{
					width: 100%;
					line-height: 1.4;
					font-size: .16rem;
					color: map-get($color,300S3);
					word-break: break-all;
				}
				.btn{
					@include flexLayout(flex,right,center);
					.ask-button{
						min-width: auto;
						font-size: .18rem;
						padding: .06rem .16rem;
						color: map-get($color, 400);
						border-radius: .04rem;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="stat-maketable">
		<enb-tab>表格制作</enb-tab>
		<enb-card class="smt-card" title="发车表">
			<div class="box">
				<div class="text">车组在每个赛道开始前的发车时间表</div>
				<div class="btn">
					<router-link :to="{ name: 'statisticalCarTable' }">
						<ask-button>
							查看详情
						</ask-button>
					</router-link>
				</div>
			</div>
		</enb-card>
		<enb-card class="smt-card" title="罚时表">
			<div class="box">
				<div class="text">车组被罚时的情况记录</div>
				<div class="btn">
					<ask-button>
						查看详情
					</ask-button>
				</div>
			</div>
		</enb-card>
	</div>
</template>
<script>
	export default{
		name: "StatisticalMakeTable",
	}
</script>