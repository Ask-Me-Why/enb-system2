<template>
	<form class="r-form" @submit.prevent="onSubmit">
		<div class="r-group">
			<label><i>*</i>赛事名称</label>
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
		<div class="r-group">
			<label><i></i>赛事区域</label>
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
		<div class="r-group">
			<label><i>*</i>赛事日期</label>
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
		<div class="r-group">
			<ask-button type="submit">下一步</ask-button>
		</div>
	</form>
</template>
<script>
import { askDialogToast } from '@/utils';
import { simplePicker } from '@core/simple-picker/simple-picker.js';
	export default{
		name: "SignUpForm",
		data(){
			return{
				model:{
					name:'',
					address:'',
					time:'',
					startStamp: '',
					endStamp:''
				}
			}
		},
		mounted(){
		},
		methods:{
			openPicker(){
				simplePicker({
					sure:(vm,data)=>{
						this.model.time = `${data.start.time} 至 ${data.end.time}`;
						this.model.startStamp = data.start.timestamp;
						this.model.endStamp = data.end.timestamp;
					}
				});
			},
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