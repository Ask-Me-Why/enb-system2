<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-modal-box.simple-picker{
		.ask-modal-wrapper{
			width: 4.56rem;
			.ask-modal-header{
				padding: .2rem .4rem;
				border-bottom: 1px solid map-get($color,100D2);
				.ask-modal-title{
					font-size: .18rem;
					color: map-get($color,300);
				}
			}
			.ask-modal-footer{
				border-top: 1px solid map-get($color,100D2);
				padding: .3rem 0;
				justify-content:center;
				.ask-button{
					width: 1.62rem;
					font-size: .18rem;
					line-height: 1;
					color: map-get($color,100);
					border-radius: .04rem;
					min-width: auto;
					background: map-get($color,400);
				}
			}
		}
		.sp-box{
			font-size: .18rem;
			width: 100%;
			padding: .48rem 0;
			.sp-group{
				width: 80%;
				margin: 0 auto;
				@include flexLayout(flex,normal,center);
				padding: .24rem 0;
				.sp-label{
					width: 1.25rem;
					flex: 0 0  1.25rem;
					text-align: center;
					font-size: .18rem;
					line-height: 1;
					color: map-get($color,300);
				}
				.sp-value{
					width: calc(100% - 1.25rem);
					flex: 0 0 calc(100% - 1.25rem);
					@include flexLayout(flex,normal,center);
					.text{
						font-size: .16rem;
						line-height: 1;
						padding: 0 .04rem;
					}
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
		@close="close"
		:transition="transition"
		class="simple-picker">
		<div class="sp-box">
			<div class="sp-group">
				<div class="sp-label" v-text="type == 'range' ? '开始时间':'选择时间'"></div>
				<div class="sp-value">
					<simple-input 
						:min="startTime.year - 1" 
						:max="endTime.year" 
						v-model="startTime.year" 
						@s-change="startChange">
					</simple-input>
					<div class="text">年</div>
					<simple-input 
						:min="1" 
						:max="12" 
						v-model="startTime.month" 
						@s-change="startChange">
					</simple-input>
					<div class="text">月</div>
					<simple-input 
						:min="1" 
						:max="startTime.maxDay" 
						v-model="startTime.day"
						@s-change="startChange">
					</simple-input>
					<div class="text">日</div>
				</div>
			</div>
			<template v-if="type == 'range'">
				<div class="sp-group">
					<div class="sp-label">结束时间</div>
					<div class="sp-value">
						<simple-input 
							:min="startTime.year" 
							:max="endTime.year + 1" 
							v-model="endTime.year" 
							@s-change="endChange">
						</simple-input>
						<div class="text">年</div>
						<simple-input 
							:min="1" 
							:max="12" 
							v-model="endTime.month" 
							@s-change="endChange">
						</simple-input>
						<div class="text">月</div>
						<simple-input 
							:min="1" 
							:max="endTime.maxDay" 
							v-model="endTime.day" 
							@s-change="endChange">
						</simple-input>
						<div class="text">日</div>
					</div>
				</div>
			</template>
		</div>
	    <!-- <ask-button slot="footer" class="confirm-btn" v-if="cancelBtn" :text="cancelText" @ask-click="cancel"></ask-button> -->
	    <ask-button slot="footer" class="confirm-btn" @ask-click="sure">
	    	确定
	    </ask-button>
	</ask-modal>
</template>
<script>
	import simpleInput from './simple-input.vue';
	import moment from 'moment/moment.js';
	import {handlerSingleDigit} from '@/utils';
	export default{
		name: "SimplePicker",
		components:{
			'simple-input':simpleInput
		},
		data(){
			return{
				show: false,
				title: '时间选择',
				theme: '',
				transition: 'ask-modal-fill',
				type: 'range',
				_afterClose: null,
				_afterSure: null,
				currentTime:{
					year: '',
					month: '',
					day: '',
					moment: null
				},
				startTime:{
					year: '',
					month: '',
					day: '',
					maxDay: '',
					moment: null
				},
				endTime:{
					year: '',
					month: '',
					day: '',
					maxDay: '',
					moment: null
				}
			}
		},
		computed:{
			handlerSingleDigit(){
				return handlerSingleDigit;
			}
		},
		mounted(){
			this.initTime();
		},
		methods:{
			close(){
				this._afterClose && this._afterClose(this);
			},
			sure(){
				this.show = false;
				console.log(this.startTime.day)
				this._sureClose && this._sureClose(this,{
					start:{
						year: this.startTime.year,
						month: this.startTime.month,
						day: this.startTime.day,
						time: `${this.startTime.year}-${this.handlerSingleDigit(this.startTime.month)}-${this.handlerSingleDigit(this.startTime.day)}`,
						timestamp: this.startTime.moment.unix(),
					},
					end:{
						year: this.endTime.year,
						month: this.endTime.month,
						day: this.endTime.day,
						time: `${this.endTime.year}-${this.handlerSingleDigit(this.endTime.month)}-${this.handlerSingleDigit(this.endTime.day)}`,
						timestamp: this.endTime.moment.unix(),
					}
				});
			},
			initTime(){
				let _cur = moment();
				_cur.set('hour',0);
				_cur.set('minute',0);
				_cur.set('second',0);
				_cur.set('millisecond',0);

				let _dopt =  {hour :0, minute :0, second :0, millisecond :0};
				this.currentTime = {
					year:_cur.get('year'),
					month:_cur.get('month') + 1,
					day:_cur.get('date'),
					moment:_cur
				}

				if(!this.startTime.year){
					this.startTime = {
						year: this.currentTime.year,
						month: this.currentTime.month,
						day: this.currentTime.day,
						maxDay: this.currentTime.moment.daysInMonth(),
						moment: this.currentTime.moment
					}
				}else{
					let _start = moment({
						year : this.startTime.year, 
						month : this.startTime.month - 1, 
						day : 1,
						..._dopt
					})
					this.startTime.maxDay = _start.daysInMonth();

					this.startTime.day = this.startTime.day > this.startTime.maxDay ? this.startTime.maxDay : this.startTime.day;
					_start.set('date',this.startTime.day);
					this.startTime.moment = _start;
				}

				if(!this.endTime.year){
					this.endTime = {
						year: this.currentTime.year,
						month: this.currentTime.month,
						day: this.currentTime.day,
						maxDay: this.currentTime.moment.daysInMonth(),
						moment: this.currentTime.moment
					}
				}else{
					let _end = moment({
						year : this.endTime.year, 
						month : this.endTime.month - 1, 
						day : 1,
						..._dopt
					})
					this.endTime.maxDay = _end.daysInMonth();
					this.endTime.day = this.endTime.day > this.endTime.maxDay ? this.endTime.maxDay : this.endTime.day;
					_end.set('date',this.endTime.day);
					this.endTime.moment = _end;
				}
			},
			buildMoment(){
				let _dopt =  {hour :0, minute :0, second :0, millisecond :0};
				let _startTime = moment({ 
						year : this.startTime.year, 
						month : this.startTime.month - 1, 
						day : 1,
						..._dopt
					}),
					_endTime = moment({ 
						year : this.endTime.year, 
						month : this.endTime.month - 1, 
						day : 1,
						..._dopt
					});
				let _sMaxDay = _startTime.daysInMonth();
				_startTime.set('date',this.startTime.day > _sMaxDay ? _sMaxDay:this.startTime.day);

				let _eMaxDay = _endTime.daysInMonth();
				_endTime.set('date',this.endTime.day > _eMaxDay ? _eMaxDay:this.endTime.day);
				return {
					startMoment: _startTime,
					endMoment: _endTime
				}
			},
			startChange(){
				let _currTime = this.currentTime.moment;
				let {startMoment,endMoment}  = this.buildMoment();
				let finalTime = null;

				// finalTime = moment.max(startMoment,_currTime);
				// 如果需要加入当前时间判断则放开上一行，注释下一行
				finalTime = startMoment;

				finalTime = moment.min(endMoment,finalTime);

				this.startTime = {
					year: finalTime.get('year'),
					month: finalTime.get('month') + 1,
					day: finalTime.get('date'),
					maxDay: finalTime.daysInMonth(),
					moment: finalTime
				}
			},
			endChange(){
				let {startMoment,endMoment}  = this.buildMoment();

				let finalTime = null;
				finalTime = moment.max(startMoment,endMoment);
				this.endTime = {
					year: finalTime.get('year'),
					month: finalTime.get('month') + 1,
					day: finalTime.get('date'),
					maxDay: finalTime.daysInMonth(),
					moment: finalTime
				}
			}
		}
	}
</script>