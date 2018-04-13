<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';

	.ask-modal-box.dialog-permission-form{
		.ask-modal-wrapper{
			width: 8.34rem;
			.ask-large-form,
			.ask-group.ask-large-form{
				width: 70%;
				margin: 0 auto;
			}
			.ask-modal-footer{
				padding: .42rem .14rem ;
			}
		}
		.register-steps{
			padding: .44rem 0;
			justify-content:center;
		}


	}
</style>
<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title"
		@close="_closeModal"
		class="custom-enb-confirm dialog-permission-form">
			<register-steps>
				<register-step :selected="step >= 1">
					运营角色
				</register-step>
				<register-step :selected="step >= 2">
					角色信息
				</register-step>
			</register-steps>
			<template v-if="step == 1">
				<div class="ask-group ask-large-form">
					<label class="g-name"><i></i>运营角色</label>
					<div class="g-value">
						<div class="g-line">
							<el-select v-model="model.role" placeholder="请选择状态">
							    <el-option v-for="(item,$i) in roleList" :key="$i" :label="item.name" :value="item.value">
							    </el-option>
							</el-select>
						</div>
						<div class="g-tip">
							{{roleList[model.role - 1].des}}
						</div>
					</div>
				</div>
				<ask-button slot="footer" @ask-click="createAccount">
					下一步
				</ask-button>
			</template>
			<template v-if="step == 2">
				<form class="ask-form ask-large-form">
					<div class="ask-group">
						<label class="g-name"><i></i>账号</label>
						<div class="g-value">
							<div class="g-line">
								<input 
									type="text" 
									name="company" 
									v-model="model.user"
									readonly 
									placeholder="请输入账号">
							</div>
							<div class="g-tip">
							</div>
						</div>
					</div>
					<div class="ask-group" v-if="model.role == 3">
						<label class="g-name"><i></i>位置</label>
						<div class="g-value">
							<div class="g-line">
								<el-select v-model="model.site" placeholder="请选择状态">
								    <el-option v-for="(item,$i) in siteList" :key="$i" :label="item.name" :value="item.value">
								    </el-option>
								</el-select>
							</div>
							<div class="g-tip">
								不同位置的计时裁判，通过APP给后台发送时间
							</div>
						</div>
					</div>
					<div class="ask-group">
						<label class="g-name"><i></i>密码</label>
						<div class="g-value" :class="{error: errors.has('password')}">
							<div class="g-line">
								<input 
									type="password" 
									name="password" 
									v-model="model.password"
									v-validate="'required|min:6|password'"
									placeholder="请输入密码">
							</div>
							<div class="g-tip">
								<template v-if="errors.has('password:min')">
									字母、数字或者英文符号，最短6位，区分大小写
								</template>
								<template v-else>
									请输入密码
								</template>
							</div>
						</div>
					</div>
					<div class="ask-group">
						<label class="g-name"><i></i>确认密码</label>
						<div class="g-value" :class="{error: errors.has('passwordSure')}">
							<div class="g-line">
								<input 
									type="password" 
									name="passwordSure" 
									v-model="model.passwordSure"
									v-validate="'required|min:6|password'"
									placeholder="请再次输入密码">
							</div>
							<div class="g-tip">
								<template v-if="errors.has('passwordSure:min')">
									字母、数字或者英文符号，最短6位，区分大小写
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
				</form>
				<ask-button slot="footer" @ask-click="onSubmit">
					完成
				</ask-button>
			</template>
	</ask-modal>
</template>
<script>
import registerSteps from '@core/user/register-steps/register-steps.vue';
import registerStep from '@core/user/register-steps/register-step.vue';
import { askDialogToast } from '@/utils';
import { OperatorApi } from '@/services';
import { Validator } from 'vee-validate';
	export default{
		name: "DialogPermissionForm",
		components:{
			'register-steps': registerSteps,
			'register-step': registerStep
		},
		data(){
			return{
				step: 1,
				show: false,
				theme:'',
				title:'创建运营者',
				_cancelClose: null,
				_sureClose: null,
				item: null,
				roleList:[
					{	name: '媒体',value: 1,des:'只负责平台内，媒体区域的管理' },
					{	name: '成统',value: 2,des:'只负责平台内，成统区域的管理' },
					{	name: '计时裁判',value: 3 ,des:'只可登录计时裁判APP，进行操作'}
				],
				siteList:[
					{	name: 'DSS',value: 1 },
					{	name: 'FF',value: 2 },
					{	name: 'ASS',value: 3 },
					{	name: 'CP1',value: 4 },
					{	name: 'CP2',value: 5 },
					{	name: 'CP3',value: 6 },
					{	name: 'CP4',value: 7 },
					{	name: 'CP5',value: 8 }
				],
				model:{
					role: 1,
					site: 1,
					user: '',
					password: '',
					passwordSure:''
				}
			}
		},
		created(){
			if(this.item != null) {
				this.buildModelData();
			}
			Validator.extend('password', {
				getMessage(field, args) {
				    return '两次密码不一致';
			    },
				validate: value => {
				    return this.model.password == value;
				}
			});
		},
		mounted(){
		},
		watch:{
			item:{
				handler(){
					if(this.item != null) {
						this.buildModelData();
					}
				},
				deep:true
			}
		},
		methods:{
			buildModelData(){
				this.step = 2;
				this.model.role = this.item.role;
				this.model.site = this.item.site;
				this.model.user = this.item.user;
			},
			createAccount(){
				this.$store.dispatch('ajaxRequestStart');
				const operatorServer= new OperatorApi();
				operatorServer.getAccount().then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					this.model.user = r.data.data.username;
					this.step = 2;
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				});
			},
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