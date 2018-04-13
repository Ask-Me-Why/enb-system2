<template>
	<form class="r-form" @submit.prevent="onSubmit">
		<div class="r-group">
			<label><i>*</i>邮箱账号</label>
			<div class="g-value" :class="{error: errors.has('email')}">
				<div class="g-line">
					<ask-button type="button">激活邮箱</ask-button>
					<input 
						type="text" 
						name="email" 
						v-model="model.email"
						v-validate="'required|email'"
						placeholder="请输入邮箱账号">
				</div>
				<div class="g-tip">
					<template v-if="errors.has('email')">
						请填写未被平台注册的正确邮箱账号
					</template>
					<template v-else>
						作为登录账号，请填写未被平台注册的邮箱账号
					</template>
					
				</div>
			</div>
		</div>
		<div class="r-group">
			<label><i>*</i>邮箱验证码</label>
			<div class="g-value" :class="{error: errors.has('emailCode')}">
				<div class="g-line">
					<input 
						type="text" 
						name="emailCode" 
						v-model="model.emailCode"
						v-validate="'required|max:6'"
						placeholder="请输入邮箱验证码">
				</div>
				<div class="g-tip">
					<template v-if="errors.has('emailCode:required')">
						请填写验证码
					</template>
					<template v-else-if="errors.has('emailCode:max')">
						验证码最长为6位数
					</template>
					<template v-else>
						激活邮箱后将收到验证邮件，请回填邮件中的6为验证码
					</template>
				</div>
			</div>
		</div>
		<div class="r-group">
			<label><i>*</i>密码</label>
			<div class="g-value" :class="{error: errors.has('password')}">
				<div class="g-line">
					<input 
						type="password" 
						name="password" 
						v-model="model.password"
						v-validate="'required|min:8'"
						placeholder="请输入密码">
				</div>
				<div class="g-tip">
					字母、数字或者英文符号，最短8位，区分大小写
				</div>
			</div>
		</div>
		<div class="r-group">
			<label><i>*</i>密码确认</label>
			<div class="g-value" :class="{error: errors.has('passwordSure')}">
				<div class="g-line">
					<input 
						type="password" 
						name="passwordSure" 
						v-model="model.passwordSure"
						v-validate="'required|min:8|password'"
						placeholder="请再次确认密码">
				</div>
				<div class="g-tip">
					<template v-if="errors.has('passwordSure:min')">
						字母、数字或者英文符号，最短8位，区分大小写
					</template>
					<template v-else-if="errors.has('passwordSure:password')">
						{{errors.first('passwordSure:password')}}
					</template>
					<template v-else>
						请再次输入密码
					</template>
					
				</div>
			</div>
		</div>
		<div class="r-group">
			<label><i></i>单位名称</label>
			<div class="g-value">
				<div class="g-line">
					<input 
						type="text" 
						name="" 
						v-model="model.organization"
						placeholder="填写单位名称">
				</div>
				<div class="g-tip">
					请输入使用该账号的单位名称
				</div>
			</div>
		</div>
		<div class="r-group">
			<ask-button type="submit">下一步</ask-button>
		</div>
	</form>
</template>
<script>
import { askDialogToast } from '@/utils';
import { Validator } from 'vee-validate';
	export default{
		name: "SignUpForm",
		data(){
			return{
				model:{
					email:'',
					emailCode: '',
					password: '',
					passwordSure: '',
					organization: '',
				}
			}
		},
		created(){
			Validator.extend('password', {
				getMessage(field, args) {
				    return '两次密码不一致';
			    },
				validate: value => {
				    return this.model.password == value;
				}
			});
		},
		methods:{
			onSubmit(){
				this.$validator.validateAll().then((result) => {
			        if (result) {
			        	this.$emit('on-submit',this.model);
			            return;
			        }
			        askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
			    });
			}
		}
	}
</script>