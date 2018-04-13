<style lang="scss">
	/* @import '~@/styles/mixins', '~@/styles/variables'; */
</style>
<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title"
		@close="_closeModal"
		class="custom-enb-confirm">
		<form class="ask-form">
			<div class="ask-group">
				<label class="g-name"><i>*</i>赛事名称</label>
				<div class="g-value" :class="{error: errors.has('name')}">
					<div class="g-line">
						<input 
							type="text" 
							name="name" 
							v-model="model.name"
							v-validate="'required'"
							placeholder="请输入赛事名称">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('name')">
							请输入赛事名称
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>赛事区域</label>
				<div class="g-value">
					<div class="g-line">
						<input 
							type="text" 
							name="address" 
							v-model="model.address"
							placeholder="请输入赛事区域的地点名称">
					</div>
					<div class="g-tip">
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i>*</i>赛事日期</label>
				<div class="g-value" :class="{error: errors.has('time')}">
					<div class="g-line" @click="openPicker">
						<input 
							readonly="" 
							type="text" 
							name="time" 
							v-model="model.time"
							v-validate="'required'"
							placeholder="请选择赛事的日期">
						<span class="time-icon">
							<i class="iconfont icon-rili"></i>
						</span>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('time:required')">
							请选择赛事的日期
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="isEdit">
				<label class="g-name"><i></i>上线</label>
				<div class="g-value ">
					<div class="g-line checkbox">
						<ask-checkbox v-model="model.online">赛事在APP内上线</ask-checkbox>
					</div>
					<!-- <div class="g-tip">
						<template v-if="errors.has('time:required')">
							请选择赛事的日期
						</template>
					</div> -->
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
import moment from 'moment/moment.js';
import { askDialogToast } from '@/utils';
import { simplePicker } from '@core/simple-picker/simple-picker.js';
	export default{
		name: "DialogMatchForm",
		data(){
			return{
				show: false,
				isEdit: false,
				item: null,
				theme:'',
				title:'创建赛事',
				_cancelClose: null,
				_sureClose: null,
				model:{
					name:'',
					address:'',
					time:'',
					startStamp: '',
					endStamp:'',
					online: false
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
				this.model.name = this.item.name;
				this.model.address = this.item.area;
				this.model.startStamp = this.item.competition_start;
				this.model.endStamp = this.item.competition_end;
				this.model.time = `${this.formatTime(this.model.startStamp)}至${this.formatTime(this.model.endStamp)}`;
				this.model.online = (this.item.is_online && this.item.is_online == 1) ? true:false;
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
			},
			openPicker(){
				let opt = {
					sure:(vm,data)=>{
						this.model.time = `${data.start.time} 至 ${data.end.time}`;
						this.model.startStamp = data.start.timestamp;
						this.model.endStamp = data.end.timestamp;
					}
				}
				if(this.isEdit){
					opt = {
						start: this.model.startStamp && this.formatTime(this.model.startStamp)||'',
						end: this.model.endStamp && this.formatTime(this.model.endStamp) || '',
						...opt
					};
				}
				simplePicker(opt);
			},
		}
	}
</script>