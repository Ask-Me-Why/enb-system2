<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	$lgLeft: #0E4466;
	$lgRight: #0E1F35;
	body.login{
		background: linear-gradient(to right,$lgLeft 0, $lgLeft 30%, $lgRight 60%,$lgRight 100%,);
	}
	.enb-login{
		width: 100%;
		height: 100%;
		background: no-repeat url('~@/assets/login.png'),
					transparent;
		background-size: cover;
		background-position: center;
		@include flexLayout(flex,center,center);
		min-height: 6.8rem;
	}
	.login-box{
		width: 28.6%;
		background: map-get($color,100S2);
		border-radius: .04rem;
		padding: .18rem 0;
		.lb-icon{
			width: 100%;
			text-align: center;
			font-size: .86rem;
			line-height: 1;
			color: map-get($color,500);
			.iconfont{
				font: inherit;
				color: inherit;
			}
		}
		.lb-title{
			padding: .24rem 0;
			width: 100%;
			font-size: .32rem;
			line-height: 1;
			text-align: center;
			white-space: nowrap;
			color: map-get($color,500);
		}
		.lb-form{
			margin: 0;
			padding: .16rem 1rem;
			width: 100%;
			display: block;
			.lb-fbox{
				width: 100%;
				background: map-get($color,100);
				border: 1px solid map-get($color,100D3);
				border-radius: .04rem;
				padding: 0 0 .5rem;
			}
		}
		.lb-ftitle{
			width: 100%;
			padding: .3rem 0 .2rem;
			font-size: .26rem;
			line-height: 1;
			text-align: center;
			color: map-get($color,300);
			border-bottom: 1px solid map-get($color,100D1);
		}
		.lb-group{
			width: 100%;
			padding: .12rem .2rem 0;
			label{
				display: block;
				font-size: .18rem;
				color: map-get($color,300);
				line-height: 1;
				padding: .09rem 0;
				width: 100%;
			}
			input{
				outline: none;
				border:1px solid map-get($color,200D3);
				width: 100%;
				display: block;
				padding: .12rem .15rem;
				margin: 0;
				font-size: .16rem;
				line-height: 1;
				background: transparent;
				border-radius: .04rem;
				&:focus{
					border: 1px solid map-get($color,500);
					transition: border .3s;
				}
				&.error{
					border: 1px solid map-get($color,600);
					transition: border .3s;
				}
			}
			.ask-button{
				min-width: auto;
				width: 100%;
				display: block;
				background: map-get($color,500);
				color: map-get($color,100);
				font-size: .16rem;
				line-height: 1;
				border-radius: .04rem;
			}
		}
		.lb-ftext{
			width: 100%;
			font-size: 0;
			text-align: right;;
			white-space: nowrap;
			padding: .24rem .2rem;
			span{
				display: inline-block;
				cursor: pointer;
				font-size: .14rem;
				line-height: 1;
				color: map-get($color,300S3);
				&:hover{
					color: map-get($color,500);
					transition: color .3s;
				}
			}
		}
	}
</style>
<template>
	<div class="enb-login">
		<div class="login-box">
			<div class="lb-icon">
				<i class="iconfont icon-saiche"></i>
			</div>
			<div class="lb-title">ENB·赛事管理平台</div>
			<form class="lb-form" @submit.prevent="signIn">
				<div class="lb-fbox">
					<div class="lb-ftitle">登录</div>
					<div class="lb-group">
						<label>账号</label>
						<input  type="text" 
							    placeholder="请输入账号" 
							    v-model="model.username"
							    v-validate="'required'"
							    name="name"
							    :class="{error: errors.has('name')}">
					</div>
					<div class="lb-group">
						<label>密码</label>
						<input  type="password" 
							    placeholder="请输入密码" 
							    v-model="model.password"
							    v-validate="'required'"
							    name="pass"
							    :class="{error: errors.has('pass')}">
					</div>
					<div class="lb-ftext">
						<router-link to="/register" tag="span">注册账号</router-link>
					</div>
					<div class="lb-group">
						<ask-button type="submit">立即登录</ask-button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { addClass,removeClass,hasClass,askDialogToast } from '@/utils';
import { User } from '@/services';
const userServe = new User();
	export default{
		name: 'Login',
		data(){
			return{
				model:{
					username: '',
					password: ''
				}
			}
		},
		beforeCreate(){
			this.$nextTick().then(r=>{
				if(!hasClass(document.body,'login')){
					addClass(document.body,'login')	
				}
			})
		},
		destroyed(){
			if(hasClass(document.body,'login')){
				removeClass(document.body,'login')	
			}
		},
		methods:{
			signIn(){
				this.$validator.validateAll().then((result) => {
			        if (result) {
			        	this.$store.dispatch('ajaxRequestStart');
			        	userServe.login({
			        		username: this.model.username,
			        		password: this.model.password
			        	}).then(r=>{
			        		this.$store.dispatch('ajaxRequestEnd');
			        		if(r.data.code != 200) return;
			        		this.$nextTick(()=>{
			        			if (this.$route.query.redirect) {
			        				this.$router.replace({ path: this.$route.query.redirect });
			        			} else {
			        				this.$router.replace({ path: '/accountmanage' });
			        			}
			        		});
			        	},err=>{
							this.$store.dispatch('ajaxRequestEnd');
			        	})
			            return;
			        }
			        askDialogToast({msg:'请输入账号密码！',time:2000,class:'danger'});
			    });
			}
		}
	}
</script>