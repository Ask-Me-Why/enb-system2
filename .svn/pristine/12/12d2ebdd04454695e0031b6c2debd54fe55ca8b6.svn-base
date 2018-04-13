<style lang="scss" scoped>
	@import '~@/styles/mixins', '~@/styles/variables';
</style>
<template>
	<div class="mi-tab-pane">
		<div class="mi-group is-top">
			<div class="label"><i></i>logo</div>
			<div class="value">
				<div class="img-box cover" >
					<img :src="model.log_url" alt="图片">
				</div>
				<ask-button class="upload" @click.native="uploadCover">
					<i class="iconfont icon-shangchuan"></i>
					上传
				</ask-button>
			</div>
		</div>
		<div class="mi-group is-top">
			<div class="label"><i></i>图片</div>
			<div class="value">
				<div class="img-box">
					<img :src="model.img_url" alt="图片">
				</div>
				<ask-button class="upload" @click.native="uploadImgOrdinary">
					<i class="iconfont icon-shangchuan"></i>
					上传
				</ask-button>
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i>*</i>名称</div>
			<div class="value">
				<input
					class="mi-input "
					v-model="model.name"
					name="name"
					v-validate="'required'"
					type="text"
					placeholder="输入赛事名称"
					:class="{'error': errors.has('name')}">
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i>*</i>时间</div>
			<div class="value">
				<input
					class="mi-input"
					v-model="timeValue"
					name="time"
					v-validate="'required'"
					:class="{'error': errors.has('time')}"
					type="text"
					placeholder="选择起止时间"
					readonly=""
					@click="openPicker">
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i></i>地点</div>
			<div class="value">
				<input
					class="mi-input"
					v-model="model.site"
					name="site"
					v-validate="'required'"
					:class="{'error': errors.has('site')}"
					type="text"
					placeholder="输入赛事举办地">
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i></i>全程赛段</div>
			<div class="value">
				<input
					class="mi-input small"
					v-model="model.full_stage"
					name="fullStage"
					v-validate="'required'"
					:class="{'error': errors.has('fullStage')}"
					type="text"
					placeholder="输入赛事总里程">
				<div class="text">KM</div>
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i></i>赛事起点</div>
			<div class="value">
				<input
					v-model="model.start_site"
					name="startSite"
					v-validate="'required'"
					:class="{'error': errors.has('startSite')}"
					class="mi-input medium"
					type="text"
					placeholder="输入起点名称">
				<div class="text">经度</div>
				<input
					v-model="model.start_longitude"
					name="startLongitude"
					v-validate="'required'"
					:class="{'error': errors.has('startLongitude')}"
					class="mi-input small"
					type="text">
				<div class="text">纬度</div>
				<input
					v-model="model.start_latitude"
					name="startLatitude"
					v-validate="'required'"
					:class="{'error': errors.has('startLatitude')}"
					class="mi-input small"
					type="text">
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i></i>赛事终点</div>
			<div class="value">
				<input
					v-model="model.end_site"
					name="endSite"
					v-validate="'required'"
					:class="{'error': errors.has('endSite')}"
					class="mi-input medium"
					type="text"
					placeholder="输入起点名称">
				<div class="text">经度</div>
				<input
					v-model="model.end_longitude"
					name="endLongitude"
					v-validate="'required'"
					:class="{'error': errors.has('endLongitude')}"
					class="mi-input small"
					type="text">
				<div class="text">纬度</div>
				<input
					v-model="model.end_latitude"
					name="endLatitude"
					v-validate="'required'"
					:class="{'error': errors.has('endLatitude')}"
					class="mi-input small"
					type="text">
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i></i>赛事状态</div>
			<div class="value">
				<el-select v-model="model.status" placeholder="请选择状态">
				    <el-option v-for="(item,$i) in matchState" :key="$i" :label="item.name" :value="item.value">
				    </el-option>
				</el-select>
			</div>
		</div>
		<div class="mi-group">
			<div class="label"><i></i>赛事电话</div>
			<div class="value">
				<input
					v-model="model.phone_one"
					class="mi-input medium"
					type="text"
					placeholder="输入电话号码">
				<input
					v-model="model.phone_two"
					class="mi-input medium"
					type="text"
					placeholder="输入电话号码">
			</div>
		</div>
		<img-upload
			:url="cover.uploadUrl"
			img-format="png"
			:width="cover.width"
			:height="cover.height"
			@crop-upload-success="coverUploadSuccess"
			field="avatar1"
			v-model="coverShow"
			:no-rotate="false"
			:params="cover.params"></img-upload>
		<img-upload
			:url="imgOrdinary.uploadUrl"
			img-format="png"
			:width="imgOrdinary.width"
			:height="imgOrdinary.height"
			@crop-upload-success="imgOrdinaryUploadSuccess"
			field="avatar1"
			v-model="imgOrdinaryShow"
			:no-rotate="false"
			:no-circle="true"
			:params="imgOrdinary.params"></img-upload>
	</div>
</template>
<script>
import { askDialogToast } from '@/utils';
import moment from 'moment/moment.js';
import ImgUpload from '../vue-image-crop-upload/upload.vue';
import { simplePicker } from '@core/simple-picker/simple-picker.js';
import { MatchApi } from '@/services';
const matchServer = new MatchApi();
let uploadData = matchServer.getUploadData();
	export default{
		name: 'InfoBasic',
		props:['model'],
		components:{
			ImgUpload
		},

		data(){
			return {
				coverShow: false,
				matchState:[
					{ name: '正在报名',value: '1'},
					{ name: '正在堪路',value: '2'},
					{ name: '正在进行',value: '3'},
					{ name: '赛事颁奖',value: '4'}
				],
				cover:{
					uploadUrl: uploadData.url,
					src: '',
					width: 300,
					height: 300,
					params: {
						mode: 1,
						id: this.$route.params.matchId,
						...uploadData.default
					}
				},
				imgOrdinaryShow: false,
				imgOrdinary:{
					uploadUrl: uploadData.url,
					src: '',
					width: 1600,
					height: 1200,
					params: {
						mode: 2,
						...uploadData.default
					}
				}
			}
		},
		computed:{
			timeValue(){
				return `${this.formatTime(this.model.competition_start)}至${this.formatTime(this.model.competition_end)}`;
			}
		},
		methods:{
			formatTime(time){
				return moment.unix(time).format('YYYY-MM-DD');
			},
			uploadCover(){
				let { coverShow } = this;
				this.coverShow = !coverShow;
			},
			uploadImgOrdinary(){
				let { imgOrdinaryShow } = this;
				this.imgOrdinaryShow = !imgOrdinaryShow;
			},
			coverUploadSuccess(resData, field, ki){
				if(resData.code != 200) return;
				this.model.log_url = resData.data.url;
			},
			imgOrdinaryUploadSuccess(resData, field, ki){
				if(resData.code != 200) return;
				this.model.img_url = resData.data.url;
			},
			onSubmit(){
				this.$validator.validateAll().then((result) => {
			        if (result) {
						this.$store.dispatch('ajaxRequestStart');
			        	matchServer.update(this.model).then(r=>{
									this.$store.dispatch('ajaxRequestEnd');
			        		if(r.data.code != 200) return;
			        		askDialogToast({msg:'赛事基础信息修改成功！',time:2000,class:'success'});
			        	},err=>{
							this.$store.dispatch('ajaxRequestEnd');
			        	})
			            return;
			        }
			        askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
			    });
			},
			openPicker(){
				let opt = {
					sure:(vm,data)=>{
						this.model.competition_start = data.start.timestamp;
						this.model.competition_end = data.end.timestamp;
					}
				}
				opt = {
					start: this.model.competition_start && this.formatTime(this.model.competition_start)||'',
					end: this.model.competition_end && this.formatTime(this.model.competition_end) || '',
					...opt
				};
				simplePicker(opt);
			}
		}
	}
</script>
