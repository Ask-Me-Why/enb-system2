<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.ask-modal-box.custom-enb-confirm.issued-match {
		.ask-modal-wrapper {
			width: 8.34rem;
			.ask-modal-body .ask-group .g-line{
				&.row{
					flex-flow: row;
				}
				&>textarea{
					font-size: .18rem;
					line-height: 1.4;
					display: block;
					width: 100%;
					resize: none;
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
				.upload-box{
					width: 1.9rem;
					height: 1.9rem;
					background: map-get($color,100S4);
					position: relative;
					input[type^="file"]{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						z-index: 10;
						pointer-events: auto;
						cursor:pointer;
						opacity: 0;
					}
					.img-box{
						width: 100%;
						height: 100%;
						img{
							width: 100%;
							position: relative;
							top: 50%;
							left: 50%;
							display: block;
							transform: translate(-50%,-50%);
						}
					}
					.img-icon{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						@include flexLayout(flex,center,center);
						.text{
							width: 100%;
							font-size: .12rem;
							color: map-get($color,300S2);
							line-height: 1;
							text-align: center;
							.iconfont{
								font-size: .2rem;
								color: map-get($color,400);
							}
							span{
								display: block;
								padding: .08rem 0;
							}
						}
					}
				}
			}
		}
		
		.time-box{
			@include flexLayout(flex,normal,center);
			&>input:not([type^='checkbox']) {
				font-size: .18rem;
				line-height: 1;
				display: block;
				width: 1.2rem;
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
			&>label{
				font-size: .18rem;
				color: map-get($color,300);
				line-height: 1;
				padding: .1rem .18rem;
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
		class="custom-enb-confirm issued-match" >
		<form class="ask-form">
			<div class="ask-group">
				<label class="g-name"><i></i>时间:</label>
				<div class="g-value" :class="{error: errors.has('year') || errors.has('month') || errors.has('day')}">
					<div class="g-line row" >
						<div class="time-box">
							<input type="text"
								name="year" 
								v-model="model.year"
								v-validate="'required'">
							<label>年</label>
						</div>
						<div class="time-box">
							<input type="text"
								name="month" 
								v-model="model.month"
								v-validate="'required'">
							<label>月</label>
						</div>
						<div class="time-box">
							<input type="text" 
								name="day" 
								v-model="model.day"
								v-validate="'required'">
							<label>日</label>
						</div>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('year') || errors.has('month') || errors.has('day')">
							请填写发布日期
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>标题:</label>
				<div class="g-value" :class="{error: errors.has('title')}">
					<div class="g-line">
						<textarea 
								name="title" 
								v-model="model.title"
								v-validate="'required'">
						</textarea>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('title')">
							请填写发布标题
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>赛事主管:</label>
				<div class="g-value" :class="{error: !sourceImgUrl}">
					<div class="g-line row">
						<div class="upload-box">
							<div class="img-box">
								<img :src="sourceImgUrl" v-if="sourceImgUrl" alt="图片">
							</div>
							<div class="img-icon" v-if="!sourceImgUrl">
								<div class="text">
									<span><i class="iconfont icon-add"></i></span>
									<span>{{errorMsg}}</span>
								</div>
							</div>
							<input type="file" @change="handleChange" ref="fileinput">
						</div>
					</div>
					<div class="g-tip">

						<template v-if="!sourceImgUrl">
							请添加赛事主管图片
						</template>
					</div>
				</div>
			</div>
		</form>
		<ask-button slot="footer" @ask-click="onSubmit">确定</ask-button>
	</ask-modal>
</template>
<script>
import moment from 'moment/moment.js';
import { askDialogToast } from '@/utils';
	export default{
		name: "DialogIntervalSet",
		data(){
			return {
				show: false,
				theme:'',
				title:'发车表发布',
				_cancelClose: null,
				_sureClose: null,
				setType: '1',
				errorMsg: '添加图片',
				sourceImgUrl: '',
				model:{
					year:'',
					month: '',
					day: '',
					title: '',
					timeStamp: '',
					img: ''
				}
			}
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
					if (result && this.sourceImgUrl) {
						this.model.img = this.base64UrlToBlob(this.sourceImgUrl);
						this.model.timeStamp = moment(`${this.model.year}-${this.model.month}-${this.model.day}- 00:00`,"YYYY-MM-DD HH:mm").unix();
						this._sureClose && this._sureClose(this,this.model);
						return;
					}
					askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
				});
			},
			handleChange(e) {
				e.preventDefault();
				let files = e.target.files || e.dataTransfer.files;
				if (this.checkFile(files[0])) {
					this.setSourceImg(files[0]);
				}
			},
			checkFile(file) {
				// 仅限图片
				if (file.type.indexOf('image') === -1) {
					this.errorMsg = '仅限图片文件';
					return false;
				}
				return true;
			},
			setSourceImg(file){
				let that = this,
					fr = new FileReader();
				fr.onload = function(e) {
					that.sourceImgUrl = fr.result;
				}
				fr.readAsDataURL(file);
			},
			base64UrlToBlob(urlData){
			    let bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
			     
			    //处理异常,将ascii码小于0的转换为大于0
			    let ab = new ArrayBuffer(bytes.length);
			    let ia = new Uint8Array(ab);
			    for (let i = 0; i < bytes.length; i++) {
			        ia[i] = bytes.charCodeAt(i);
			    }
			 
			    return new Blob( [ia] , {type : 'image/png'});
			}
		}
	}
</script>
