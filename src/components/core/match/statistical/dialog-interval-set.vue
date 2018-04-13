<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-modal-box.custom-enb-confirm.interval {
		.ask-modal-wrapper {
			width: 8.34rem;
			.ask-modal-body .ask-group .g-line{
				&.row{
					flex-flow: row;
				}
				.ask-button.dashed{
					margin: 0;
					padding: .12rem .68rem;
					border: 1px dashed map-get($color,400);
					width: auto;
				}
			}
		}
		.ask-modal-body{
			padding: 0;
		}
		.interval-tabs.el-tabs{
			.el-tabs__header{
				margin: 0;
				padding: 0 2.8rem 0 .2rem;
				&::after{
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: .01rem;
					background-color: map-get($color,100D2);
					z-index: 1;
				}
				.el-tabs__nav-wrap::after{
					display: none;
				}
				.el-tabs__nav-next, .el-tabs__nav-prev{
					line-height: .64rem;
				}
				.el-tabs__item{
					font-size: .18rem;
					line-height: 1;
					color: map-get($color,300S3);
					padding-top: .22rem;
					padding-bottom: .22rem;
					height: .6rem;
					&.is-active{
						color: map-get($color,300);
					}
					&:focus.is-active.is-focus:not(:active){
						-webkit-box-shadow: none;
						        box-shadow: none;
					}
				}
				.el-tabs__active-bar{
					background-color: map-get($color,400);
				}
			}
			.interval-tab-label{
				padding: 0 .1rem;
			}
		}
		.stage-box{
			width: 100%;
			@include flexLayout(flex,normal,center);
			& input:not([type^='checkbox']) {

				font-size: .18rem;
				line-height: 1;
				display: block;
				width: .72rem;
				margin: 0;
				padding: .1rem .24rem;
				color: map-get($color, 400);
				border: 1px solid map-get($color, 100D2);
				border-radius: .04rem;
				outline: none;
				background: transparent;
				-webkit-box-flex: 0;
				-ms-flex: 0 0 auto;
				flex: 0 0 auto;
				@include inputPlaceholder(map-get($color, 300S2));
				&.time{
					width: 1.2rem;
				}
				&:focus {
					-webkit-transition: border .3s;
					transition: border .3s;
					border: 1px solid map-get($color, 400);
				}
				&.error {
					-webkit-transition: border .3s;
					transition: border .3s;
					border: 1px solid map-get($color, 600);
				}
			}
			.num-box{
				@include flexLayout(flex,normal,center);
				margin-right: .54rem;
				&>span{
					display: block;
					width: .22rem;
					margin: 0 .26rem;
					height: .02rem;
					background: map-get($color,300);
				}
			}
			.interval{
				@include flexLayout(flex,normal,center);
				span{
					white-space: nowrap;
					font-size: .2rem;
					line-height: 1;
					color: map-get($color, 300);
					margin: 0 .12rem;
				}
			}
		}
	}
</style>
<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title"
		@close="_closeModal"
		class="custom-enb-confirm interval">
		<el-tabs tab-position="top" class="interval-tabs" v-model="carType">
			<template v-for="(menu,$i) in carTypeList">
				<el-tab-pane :key="$i" :name="menu.value">
					<div slot="label" class="interval-tab-label">
						{{menu.name}}
					</div>
					<template v-if="carType == '1'">
						<form class="ask-form">
							<div class="ask-group">
								<label class="g-name"><i></i>首发时间</label>
								<div class="g-value">
									<div class="g-line" >
										<input v-model="model.carTime" type="text">
									</div>
									<div class="g-tip">
										<template>
											请填写首发时间
										</template>
									</div>
								</div>
							</div>
							<template v-for="(s,$i) in carStage">
								<div class="ask-group" :key="$i">
									<label class="g-name"><i></i>第{{buildStageZh($i)}}阶段</label>
									<div class="g-value">
										<div class="g-line">
											<div class="stage-box">
												<div class="num-box">
													<input v-model="s.min_cn" type="" name="">
													<span></span>
													<input v-model="s.max_cn" type="" name="">
												</div>
												<div class="interval">
													<span>每车间隔</span>
													<input v-model="s.interval" type="" name="" class="time">
													<span>分钟</span>
												</div>
											</div>
										</div>
										<div class="g-tip">
										</div>
									</div>
								</div>
							</template>
							<div class="ask-group">
								<label class="g-name"><i></i></label>
								<div class="g-value">
									<div class="g-line row">
										<ask-button class="dashed" @click.native="addStage">添加阶段</ask-button>
									</div>
									<div class="g-tip">
									</div>
								</div>
							</div>
						</form>
					</template>

					<template v-if="carType == '2'">
						<form class="ask-form">
							<div class="ask-group">
								<label class="g-name"><i></i>首发时间</label>
								<div class="g-value">
									<div class="g-line" >
										<input v-model="model.motorTime" type="text">
									</div>
									<div class="g-tip">
										<template>
											请填写首发时间
										</template>
									</div>
								</div>
							</div>
							<div class="ask-group">
								<label class="g-name"><i></i>多车同发</label>
								<div class="g-value">
									<div class="g-line" >
										<input v-model="model.motorNum" type="text">
									</div>
									<div class="g-tip">
										<template>
											设定多个车组，共同发车
										</template>
									</div>
								</div>
							</div>
							<div class="ask-group">
								<label class="g-name"><i></i>每组间隔</label>
								<div class="g-value">
									<div class="g-line">
										<div class="stage-box">
											<div class="interval">
												<input v-model="model.motorInterval" type="" name=""  class="time">
												<span>分钟</span>
											</div>
										</div>
									</div>
									<div class="g-tip">
									</div>
								</div>
							</div>
						</form>
					</template>
				</el-tab-pane>
			</template>
		</el-tabs>
		<ask-button slot="footer" @ask-click="onSubmit">确定</ask-button>
	</ask-modal>
</template>
<script>

import { askDialogToast,handlerSingleDigit } from '@/utils';

	export default{
		name: "DialogIntervalSet",
		data(){
			return {
				show: false,
				item: null,
				theme:'',
				title:'车队信息',
				_cancelClose: null,
				_sureClose: null,
				setType: '1',
				carType: '1',
				carTypeList:[{name:"汽车",value:'1'},{name:"摩托车",value:'2'}],
				stageZh:['一','二','三','四','五','六','七','八','九','十'],
				carStage:[{
						"min_cn" : "", 
			            "max_cn" : "", 
			            "interval" : "" 
					},{
						"min_cn" : "", 
			            "max_cn" : "", 
			            "interval" : "" 
					}],
				model:{
					carTime:'',
					carStage: [],
					motorTime:'',
					motorNum: '',
					motorInterval: ''
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
			formatTime(value){
				let _h = parseInt(value/3600,10),
					_m = parseInt((value - _h*3600)/60,10);
				return handlerSingleDigit(_h)+':'+handlerSingleDigit(_m);
			},
			formatTimeToSecend(value){
				let t = value.split(':');
				return t[0]*3600+t[1]*60;
			},
			buildModelData(){
				this.model.carTime = this.formatTime(this.item.car.time);
				this.item.car.stage.map((item,index)=>{
					this.$set(this.carStage,index,item);
				})
				this.model.motorTime = this.formatTime(this.item.motor.time);
				this.model.motorNum = this.item.motor.num;
				this.model.motorInterval = this.item.motor.interval;
			},
			close(){
				this.show = false;
				this._closeModal();
			},
			buildStageZh(index){
				if(index <= 9){
					return this.stageZh[index];
				}else{
					let _i = index+1;
					if(_i%10 == 0){
						return this.stageZh[_i/10 - 1]+this.stageZh[9];
					}else{
						let num = ''+_i;
						return num.charAt(0) == 1 ? this.stageZh[9]+this.stageZh[num.charAt(1) - 1]:this.stageZh[num.charAt(0) - 1]+this.stageZh[9]+this.stageZh[num.charAt(1) - 1];
					}
				}
			},
			_closeModal(){
				this._cancelClose && this._cancelClose(this);
			},
			onSubmit(){
				this.model.carStage = [];
				this.carStage.forEach( (item)=> {
					if(item.min_cn && item.max_cn && item.interval){
						this.model.carStage.push(item);
					}
				});
				this._sureClose && this._sureClose(this,{
					...this.model,
					carTime: this.formatTimeToSecend(this.model.carTime),
					motorTime: this.formatTimeToSecend(this.model.motorTime)
				});
			},
			addStage(){
				this.carStage.push({
					"min_cn" : "", 
		            "max_cn" : "", 
		            "inteval" : "" 
				})
			}
		}
	}
</script>
