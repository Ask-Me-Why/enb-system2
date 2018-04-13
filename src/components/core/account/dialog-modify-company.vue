<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title"
		@close="_closeModal"
		class="custom-enb-confirm">
			<form class="ask-form">
				<div class="ask-group">
					<label class="g-name"><i></i>单位名称</label>
					<div class="g-value" :class="{error: errors.has('company')}">
						<div class="g-line">
							<input 
								type="text" 
								name="company" 
								v-model="model.company"
								v-validate="'required'"
								placeholder="请输入新的单位名称">
						</div>
						<div class="g-tip">
							<template v-if="errors.has('company')">
								请输入使用该账号的单位名称
							</template>
							<template v-else>
								使用该账号的单位名称
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
	export default{
		name: "DialogModifyCompany",
		data(){
			return{
				show: false,
				theme:'',
				title:'修改密码',
				_cancelClose: null,
				_sureClose: null,
				model:{
					company: this.$user.company||""
				}
			}
		},
		created(){
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