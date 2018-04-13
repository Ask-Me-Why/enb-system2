<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title"
		@close="_closeModal"
		class="custom-enb-confirm">
			<form class="ask-form">
				<div class="ask-group">
					<label class="g-name"><i>*</i>原始密码</label>
					<div class="g-value" :class="{error: errors.has('oldPassword')}">
						<div class="g-line">
							<input 
								type="password" 
								name="oldPassword" 
								v-model="model.oldPassword"
								v-validate="'required|min:8'"
								placeholder="请输入原始密码">
						</div>
						<div class="g-tip">
							字母、数字或者英文符号，最短8位，区分大小写
						</div>
					</div>
				</div>
				<div class="ask-group">
					<label class="g-name"><i>*</i>新密码</label>
					<div class="g-value" :class="{error: errors.has('password')}">
						<div class="g-line">
							<input 
								type="password" 
								name="password" 
								v-model="model.password"
								v-validate="'required|min:8'"
								placeholder="请输入新密码">
						</div>
						<div class="g-tip">
							<template v-if="errors.has('password:min')">
								字母、数字或者英文符号，最短8位，区分大小写
							</template>
							<template v-else-if="errors.has('password:password')">
								{{errors.first('password:password')}}
							</template>
							<template v-else>
								请输入新密码
							</template>
						</div>
					</div>
				</div>
				<div class="ask-group">
					<label class="g-name"><i>*</i>确认新密码</label>
					<div class="g-value" :class="{error: errors.has('passwordSure')}">
						<div class="g-line">
							<input 
								type="password" 
								name="passwordSure" 
								v-model="model.passwordSure"
								v-validate="'required|min:8|password'"
								placeholder="请再次输入新密码">
						</div>
						<div class="g-tip">
							<template v-if="errors.has('passwordSure:min')">
								字母、数字或者英文符号，最短8位，区分大小写
							</template>
							<template v-else-if="errors.has('passwordSure:password')">
								{{errors.first('passwordSure:password')}}
							</template>
							<template v-else>
								请再次输入新密码
							</template>
						</div>
					</div>
				</div>
			</form>
			<ask-button slot="footer" @ask-click="onSubmit">
				确定
			</ask-button>
			<ask-button slot="footer" class="gray" @ask-click="close">
		    	取消
		    </ask-button>
	</ask-modal>
</template>
<script>
import { askDialogToast } from '@/utils';
import { Validator } from 'vee-validate';
	export default{
		name: "DialogModifyPassword",
		data(){
			return{
				show: false,
				theme:'',
				title:'修改密码',
				_cancelClose: null,
				_sureClose: null,
				model:{
					oldPassword:'',
					password:'',
					passwordSure:''
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
			close(){
				this.show = false;
				this._closeModal();
			},
			_closeModal(){
				this._cancelClose && this._cancelClose(this);
			},
			onSubmit(){
				this.$validator.validateAll().then((result) => {
			        if (result) {
			        	this._sureClose && this._sureClose(this,this.model);
			            return;
			        }
			        askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
			    });
			}
		}
	}
</script>