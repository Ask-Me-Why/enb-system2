<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.enb-register{
		width: 72.5%;
		margin: .32rem auto;
		background: map-get($color,100);
		border-radius: .04rem;
		padding: 0 .34rem;
		.r-title{
			padding: .35rem .2rem .45rem;
			border-bottom: 1px solid map-get($color,100S1);
			font-size: .28rem;
			line-height: 1;
			font-weight: 900;
			white-space: nowrap;
			color: map-get($color,300);
		}
		.register-steps{
			justify-content:center;
			padding: .38rem 0;
		}
		.r-form{
			width: 58.974%;
			margin: .3rem auto 0;
			padding:  0 0 .2rem;
		}
		.r-group{
			width: 100%;
			@include flexLayout(flex,normal,top);
			padding-bottom: .48rem;
			&>.ask-button[type^="submit"]{
				min-width: auto;
				width: 4.18rem;
				display: block;
				margin: 0 auto;
				color: map-get($color,100);
				background: map-get($color,400);
				font-size: .18rem;
				line-height: 1;
				border-radius: .04rem;
			}
			label{
				display: block;
				width: 2rem;
				flex:0 0 2rem;
				font-size: .2rem;
				height: .44rem;
				color: map-get($color,300);
				line-height: 1;
				vertical-align: middle;
				@include flexLayout(inline-flex,normal,center);
				i{
					display: inline-block;
					text-align: center;
					width: .75rem;
					height: .08rem;
					font: inherit;
					color: map-get($color,600);
				}
			}
			.g-value{
				width: calc(100% - 2rem);
				flex: 0 0 calc(100% - 2rem);
			}
			.g-line{
				width: 100%;
				@include flexLayout(flex,normal,center);
				flex-flow: row-reverse;
				position: relative;
				.time-icon{
					position: absolute;
					top: 50%;
					right: .1rem;
					width: .3rem;
					height: .3rem;
					cursor: pointer;
					z-index: 2;
					color: map-get($color,400);
					font-size: .3rem;
					line-height: 1;
					overflow: hidden;
					margin-top: -.15rem;
					.iconfont{
						font: inherit;
						color: inherit;
					}
				}
				input{
					width: 100%;
					flex: 0 0 auto;
					display: block;
					margin: 0;
					border: 1px solid map-get($color,100D2);
					padding: .1rem .24rem;
					border-radius: .04rem;
					color: map-get($color,400);
					background: transparent;
					font-size: .18rem;
					line-height: 1;
					outline: none;
					@include inputPlaceholder(map-get($color,300S2));
					&:focus{
						border: 1px solid map-get($color,400);
						transition: border .3s;
					}
					&.error{
						border: 1px solid map-get($color,600);
						transition: border .3s;
					}
				}
				.ask-button{
					width: 1.24rem;
					flex: 0 0 1.24rem;
					min-width: auto;
					margin-left: .2rem;
					padding: .12rem 0 ;
					font-size: .18rem;
					line-height: 1;
					border: 1px solid map-get($color,400);
					color: map-get($color,400);
					border-radius: .04rem;
					&+input{
						width: calc(100% - 1.24rem - .2rem);
						flex: 0 0 calc(100% - 1.24rem - .2rem);
					}
				}
			}
			.g-tip{
				padding: .15rem 0 0;
				width: 100%;
				word-break: break-all;
				line-height: 1.4;
				font-size: .14rem;
				min-height: .35rem;
				color: map-get($color,300S2);
			}
			.g-value.error{
				input{
					border: 1px solid map-get($color,600);
					transition: border .3s;
				}
				.g-tip{
					color:map-get($color,600);
					transition: color .3s; 
				}
			}
		}
		.r-form.complete{
			text-align: center;
			.r-result{
				display: block;
				.r-ricon{
					padding-bottom: .34rem;
					span{
						display: inline-block;
						width: .92rem;
						height: .92rem;
						.circle{
							fill: map-get($color,600S3);
						}
					}
				}
				.r-rtext{
					font-size: .36rem;
					color: map-get($color,600S3);
					font-weight: 700;
					line-height: 1;
					padding: 0 0 .52rem;
				}
			}
			.r-user-box{
				display: inline-block;
				padding-bottom: 1.15rem;
				.r-text{
					white-space: nowrap;
					font-size: .2rem;
					line-height: 1;
					padding: .15rem 0;
					text-align: left;
					color: map-get($color,300);
				}
			}
		}
	}
</style>
<template>
	<div class="enb-register">
		<div class="r-title">注册</div>
		<div class="r-box">
			<register-steps>
				<register-step index="1" :selected="step >= 1">
					注册信息
				</register-step>
				<register-step index="2" :selected="step >= 2">
					创建赛事
				</register-step>
				<register-step index="3" :selected="step >= 3">
					注册成功
				</register-step>
			</register-steps>
			<template v-if="step == 1">
				<signup-form @on-submit="signUp"></signup-form>
			</template>
			<template v-if="step == 2">
				<creatematch-form @on-submit="createMatch"></creatematch-form>
			</template>
			<template v-if="step == 3">
				<form class="r-form complete" @submit.prevent="onComplete">
					<div class="r-result">
						<div class="r-ricon">
							<span>
								<svg viewBox="0 0 92 92">
									<circle class="circle" r="46" cx="46" cy="46" fill="#000" stroke="none"/>
									<path d="M16 42 L42 64 L78 30" 
										stroke-width="6" stroke="#fff" 
										fill="none" 
										stroke-linecap="round"
										stroke-linejoin="round"/>
								</svg>
							</span>
						</div>
						<div class="r-rtext">
							账户申请成功,请记录
						</div>
					</div>
					<div class="r-user-box">
						<div class="r-text">请记录您的账号：</div>
						<div class="r-text">账号：{{model.username}}</div>
					</div>
					<div class="r-group">
						<ask-button type="submit">完成</ask-button>
					</div>
				</form>
			</template>
		</div>
	</div>
</template>
<script>
import registerSteps from '@core/user/register-steps/register-steps.vue';
import registerStep from '@core/user/register-steps/register-step.vue';
import signUpForm from '@core/user/sign-up-form.vue';
import createMatchForm from '@core/user/create-match-form.vue';
import { RegisterAndEmailValidate,MatchManageApi,User } from '@/services';
const userServe = new User();
	export default{
		name:'Register',
		components:{
			'register-steps': registerSteps,
			'register-step': registerStep,
			'signup-form': signUpForm,
			'creatematch-form': createMatchForm
		},
		data(){
			return{
				step: 1,
				model:{
					username: ''
				}
			}
		},
		methods:{
			signUp(model){
				this.$store.dispatch('ajaxRequestStart');
				RegisterAndEmailValidate({
					"email" : model.email,
					"password" : model.password,
					"repeat_pw" : model.passwordSure,
					"email_code" : model.emailCode,
					"company_name" : model.organization,
				}).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					this.step = 2;
					userServe.setUserInfo({
						email: r.data.data.email,
						username: r.data.data.username,
						company: r.data.data.company,
						token: r.data.data.token,
						role_type: r.data.data.role_type
					})
					this.model.username = r.data.data.username;
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				})
			},
			createMatch(model){
				let matchManageServer = new MatchManageApi();
				this.$store.dispatch('ajaxRequestStart');
				matchManageServer.create({
					"competition_name": model.name,
					"competition_start": model.startStamp,
					"competition_end": model.endStamp,
					"competition_area": model.address,
				}).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					this.step = 3;
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				})
			},
			onComplete(){
				this.$router.replace({ path: '/accountmanage' });
				return false;
			}
		}
	}
</script>