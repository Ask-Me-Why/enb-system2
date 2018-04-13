<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title"
		@close="_closeModal"
		class="custom-enb-confirm">
		<form class="ask-form">
			<div class="ask-group">
				<label class="g-name"><i>*</i>俱乐部名称</label>
				<div class="g-value" :class="{error: errors.has('name')}">
					<div class="g-line">
						<input 
							type="text" 
							name="name" 
							v-model="model.name"
							v-validate="'required'"
							placeholder="俱乐部名称">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('name')">
							请输入俱乐部名称
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>报名人</label>
				<div class="g-value" :class="{error: errors.has('manager')}">
					<div class="g-line">
						<input 
							type="text" 
							name="manager" 
							v-model="model.manager"
							placeholder="此处为报名人姓名">
					</div>
					<div class="g-tip">
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>手机号</label>
				<div class="g-value" :class="{error: errors.has('phone')}">
					<div class="g-line">
						<input 
							type="text" 
							name="phone" 
							v-model="model.phone"
							v-validate="'numeric'"
							placeholder="此处为报名人手机号">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('phone')">
							报名人手机号格式不正确
						</template>
					</div>
				</div>
			</div>
		</form>
		<ask-button slot="footer" @ask-click="onSubmit">确定</ask-button>
		<ask-button slot="footer" class="gray" @ask-click="close">取消</ask-button>
	</ask-modal>
</template>
<script>
import moment from 'moment/moment.js';
import { askDialogToast } from '@/utils';

	export default{
		name: "DialogMatchTeam",
		data(){
			return {
				show: false,
				isEdit: false,
				item: null,
				theme:'',
				title:'车队信息',
				_cancelClose: null,
				_sureClose: null,
				model:{
					id:'',
					name:'',
					manager:'',
					phone:''
				}
			}
		},
		created(){
			if(this.item != null) {
				this.buildModelData();
				this.isEdit = true;
			}
		},
		watch:{
			item:{
				handler(){
					if(this.item != null) {
						this.buildModelData();
						this.isEdit = true;
					}
				},
				deep:true
			}
		},
		methods:{
			formatTime(time){
				return moment.unix(time).format('YYYY-MM-DD');
			},
			buildModelData(){
				this.model.id = this.item.id;
				this.model.name = this.item.name;
				this.model.manager = this.item.manager;
				this.model.phone = this.item.phone;
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
