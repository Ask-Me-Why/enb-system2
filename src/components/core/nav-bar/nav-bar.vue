<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.enb-header{
		width: 100%;
		background: map-get($color,100);
		padding: .1rem 0;
		height: .62rem;
		min-width: 1200px;
		.nav-bar{
			@include flexLayout(flex,right,normal);
			width: 100%;
			.info{
				flex: 0 0 auto;
				margin-right: auto;
				padding-left: .16rem;
				@include flexLayout(flex,normal,center);
				.logo{
					width: .42rem;
					padding: .21rem 0;
					position: relative;
					margin: 0 .2rem;
					&>img{
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
					}
				}
				.text{
					font-size: .30rem;
					line-height: 1;
					color: map-get($color,300D2);
					white-space: nowrap;
				}
			}
			.user{
				flex: 0 0 auto;
				cursor: pointer;
				@include flexLayout(flex,normal,center);
				&:focus{
					outline: none;
				}
				.cover{
					width: .42rem;
					padding: .21rem 0;
					position: relative;
					&>img{
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
					}
				}
				.detail{
					padding: 0 .2rem;
					.text{
						white-space: nowrap;
						color: map-get($color,300);
						font-size: .16rem;
						line-height: 1;
						padding: 0 0 .04rem;
						&.large{
							font-size: .18rem;
							padding: .04rem 0 0;
						}
					}
				}
			}
			.exit-btn{
				position: relative;
				border-left: 1px solid map-get($color,100D2);
				.ask-button{
					font-size: .16rem;
					line-height: 1;
					color: map-get($color,300);
					padding: .09rem .25rem;
					@include flexLayout(inline-flex,normal,center);
					.iconfont{
						font:inherit;
						color:inherit;
						font-size: .24rem;
					}
					&>span{
						padding: 0 .12rem 0 .16rem;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="enb-header">
		<div class="nav-bar boundary">
			<div class="info">
				<div class="logo">
					<img src="~@/assets/logo.png" alt="logo">
				</div>
				<div class="text">ENB·赛事管理平台</div>
			</div>
			<!-- top/top-start/top-end/bottom/bottom-start/bottom-end -->
			<template v-if="$user && $user.token && $user.username">
				<el-dropdown trigger="click" placement="bottom">
				    <div class="user">
				    	<div class="cover">
				    		<img src="~@/assets/default_cover.png" alt="头像">
				    	</div>
				    	<div class="detail">
				    		<div class="text">管理员</div>
				    		<div class="text large">{{$user.username}}</div>
				    	</div>
				    </div>
				    <el-dropdown-menu slot="dropdown">
				    	<router-link to="/accountmanage">
				    		<el-dropdown-item>赛事管理</el-dropdown-item>
				    	</router-link>
				    	<router-link to="/accountpermission">
				    		<el-dropdown-item>权限管理</el-dropdown-item>
				    	</router-link>
				        <el-dropdown-item>全年积分</el-dropdown-item>
				    </el-dropdown-menu>
				</el-dropdown>
				<div class="exit-btn">
					<ask-button :hover="false" @click.native="loginOut">
						<i class="iconfont icon-tuichu"></i>
						<span>退出</span>
					</ask-button>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	export default{
		name:"NavBar",
		methods:{
			loginOut(){
				this.$user.loginOut().then(r=>{
					this.$router.replace({ path: '/login' });
				})
			}
		}
	}
</script>