<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-modal-box.custom-enb-confirm .ask-modal-wrapper .ask-modal-body .ask-group .g-line.text{
		flex-flow: row;
		height: .44rem;
	}
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
				<label class="g-name"><i></i>车号:</label>
				<div class="g-value">
					<div class="g-line text">
						{{model.carNum}}
					</div>
					<div class="g-tip"></div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>原排序:</label>
				<div class="g-value">
					<div class="g-line text">
						{{model.oldIndex}}
					</div>
					<div class="g-tip"></div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>新排序:</label>
				<div class="g-value" :class="{error: errors.has('newIndex')}">
					<div class="g-line">
						<input 
							type="text" 
							name="newIndex" 
							v-model="model.newIndex"
							v-validate="`required|max_value:${model.maxIndex}|min_value:1`"
							>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('newIndex:min_value')">
							最小排序只能为数字且不能小于1
						</template>
						<template v-else-if="errors.has('newIndex:max_value')">
							最大排序只能为数字且不能超过{{model.maxIndex}}
						</template>
						<template v-else>
							请输入排序位置
						</template>
					</div>
				</div>
			</div>
		</form>
		<ask-button slot="footer" @ask-click="onSubmit">确定</ask-button>
	</ask-modal>
</template>
<script>

import { askDialogToast } from '@/utils';

	export default{
		name: "DialogIntervalSet",
		data(){
			return {
				show: false,
				item: null,
				theme:'',
				title:'手动排序',
				_cancelClose: null,
				_sureClose: null,
				setType: '1',
				model:{
					carNum:'',
					oldIndex: 0,
					maxIndex: 1,
					newIndex: ''
				}
			}
		},
		created(){
			if(this.item != null) {
				this.buildModelData();
			}
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
				this.model.carNum = this.item.car_num;
				this.model.oldIndex = this.item.oldIndex;
				this.model.maxIndex = this.item.maxIndex;
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
