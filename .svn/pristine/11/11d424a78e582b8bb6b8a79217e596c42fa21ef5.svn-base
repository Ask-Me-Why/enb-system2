<style lang="scss" scoped>
.register-steps {
	margin-top: 0.5rem;
}
.mode-select-desc {
	opacity: 0.7;
}
</style>

<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		:title="title || '车辆信息'"
		width="7.5rem"
		@close="_closeModal"
		class="custom-enb-confirm match-cars-modal">
		<register-steps>
			<register-step :selected="step === 0">
				赛车信息
			</register-step>
			<register-step :selected="step === 1">
				选手信息
			</register-step>
		</register-steps>
		<form class="ask-form" v-if="step === 0">
			<div class="ask-group">
				<label class="g-name"><i>*</i>车号</label>
				<div class="g-value" :class="{error: errors.has('car_num')}">
					<div class="g-line">
						<input 
							type="text" 
							name="car_num" 
							v-model="model.car_num"
							v-validate="'required'"
							placeholder="">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('car_num')">
							请输入车号
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="roleType === 0">
				<label class="g-name"><i>*</i>设备号</label>
				<div class="g-value" :class="{error: errors.has('device_num')}">
					<div class="g-line">
						<input 
							type="text" 
							name="device_num" 
							v-model="model.device_num"
							v-validate="'required'"
							placeholder="">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('device_num')">
							请输入设备号
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i>*</i>组别</label>
				<div class="g-value" :class="{error: errors.has('group_type')}">
					<div class="g-line">
						<el-select class="mode-select" v-model="model.group_type" placeholder="">
							<el-option
								v-for="item in groupTypes"
								:key="item.id"
								:label="item.name"
								:value="item.id">
								<span>{{ item.name }}</span>
								<span v-if="item.desc" class="mode-select-desc">({{ item.desc }})</span>
							</el-option>
						</el-select>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('group_type')">
							请选择组别
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>厂牌</label>
				<div class="g-value">
					<div class="g-line">
						<input 
							type="text"
							v-model="model.car_label"
							placeholder="">
					</div>
					<div class="g-tip">
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i></i>车型</label>
				<div class="g-value">
					<div class="g-line">
						<input 
							type="text" 
							name="phone" 
							v-model="model.car_model">
					</div>
					<div class="g-tip">
					</div>
				</div>
			</div>
		</form>
		<form class="ask-form" v-if="step === 1">
			<div class="ask-group" v-if="[0, 1, 2].includes(selectedCarMode)"></div>
			<div class="ask-group" v-if="[0, 1, 2].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>车手</label>
				<div class="g-value" :class="{error: errors.has('driver_name')}">
					<div class="g-line">
						<input 
							type="text" 
							name="driver_name" 
							v-model="model.driver_name"
							v-validate="'required'"
							placeholder="请输入车手名字">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('driver_name')">
							请输入车手名字
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1, 2].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>国籍</label>
				<div class="g-value" :class="{error: errors.has('manager')}">
					<div class="g-line">
						<el-select class="mode-select" v-model="model.driver_nationality" placeholder="请选择国籍">
							<el-option
								v-for="(item, idx) in nationalitys"
								:key="idx + 1"
								:label="item"
								:value="idx + 1">
							</el-option>
						</el-select>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('driver_nationality')">
							请选择国籍
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1, 2].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>手机号</label>
				<div class="g-value" :class="{error: errors.has('driver_phone')}">
					<div class="g-line">
						<input 
							type="text" 
							name="driver_phone" 
							v-model="model.driver_phone"
							v-validate="'required|numeric'"
							placeholder="请输入手机号">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('driver_phone')">
							请输入手机号
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>领航</label>
				<div class="g-value" :class="{error: errors.has('first_navigator')}">
					<div class="g-line">
						<input 
							type="text" 
							name="first_navigator" 
							v-model="model.first_navigator"
							v-validate="'required'"
							placeholder="请输入领航姓名">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('first_navigator')">
							请输入领航姓名
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>国籍</label>
				<div class="g-value" :class="{error: errors.has('first_nationality')}">
					<div class="g-line">
						<el-select class="mode-select" v-model="model.first_nationality" placeholder="请选择国籍">
							<el-option
								v-for="(item, idx) in nationalitys"
								:key="idx + 1"
								:label="item"
								:value="idx + 1">
							</el-option>
						</el-select>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('first_nationality')">
							请选择国籍
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>手机号</label>
				<div class="g-value" :class="{error: errors.has('first_phone')}">
					<div class="g-line">
						<input 
							type="text" 
							name="first_phone" 
							v-model="model.first_phone"
							v-validate="'required|numeric'"
							placeholder="请输入手机号">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('first_phone')">
							请输入手机号
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>第二领航</label>
				<div class="g-value" :class="{error: errors.has('second_navigator')}">
					<div class="g-line">
						<input 
							type="text" 
							name="second_navigator" 
							v-model="model.second_navigator"
							v-validate="'required'"
							placeholder="请输入领航姓名">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('second_navigator')">
							请输入领航姓名
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>国籍</label>
				<div class="g-value" :class="{error: errors.has('second_nationality')}">
					<div class="g-line">
						<el-select class="mode-select" v-model="model.second_nationality" placeholder="请选择国籍">
							<el-option
								v-for="(item, idx) in nationalitys"
								:key="idx + 1"
								:label="item"
								:value="idx + 1">
							</el-option>
						</el-select>
					</div>
					<div class="g-tip">
						<template v-if="errors.has('second_nationality')">
							请选择国籍
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0, 1].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>手机号</label>
				<div class="g-value" :class="{error: errors.has('second_phone')}">
					<div class="g-line">
						<input 
							type="text" 
							name="second_phone" 
							v-model="model.second_phone"
							v-validate="'required|numeric'"
							placeholder="请输入手机号">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('second_phone')">
							请输入手机号
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[0].includes(selectedCarMode)">
				<label class="g-name"><i></i>俱乐部</label>
				<el-radio-group v-model="model.is_club">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</div>
			<div class="ask-group" v-if="[0].includes(selectedCarMode)">
				<label class="g-name"><i></i>厂商队</label>
				<el-radio-group v-model="model.is_business">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</div>
			<div class="ask-group" v-if="[3].includes(selectedCarMode)"></div>
			<div class="ask-group" v-if="[3].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>工作人员</label>
				<div class="g-value" :class="{error: errors.has('driver_name')}">
					<div class="g-line">
						<input 
							type="text" 
							name="driver_name" 
							v-model="model.driver_name"
							v-validate="'required'"
							placeholder="">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('driver_name')">
							请输入工作人员姓名
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[3].includes(selectedCarMode)">
				<label class="g-name"><i>*</i>手机号</label>
				<div class="g-value" :class="{error: errors.has('driver_phone')}">
					<div class="g-line">
						<input 
							type="text" 
							name="driver_phone" 
							v-model="model.driver_phone"
							v-validate="'required|numeric'"
							placeholder="请输入手机号">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('driver_phone')">
							请输入手机号
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[3].includes(selectedCarMode)">
				<label class="g-name"><i></i>工作人员</label>
				<div class="g-value" :class="{error: errors.has('first_navigator')}">
					<div class="g-line">
						<input 
							type="text" 
							name="first_navigator" 
							v-model="model.first_navigator"
							v-validate="'required'"
							placeholder="">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('first_navigator')">
							请输入工作人员姓名
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group" v-if="[3].includes(selectedCarMode)">
				<label class="g-name"><i></i>手机号</label>
				<div class="g-value" :class="{error: errors.has('first_phone')}">
					<div class="g-line">
						<input 
							type="text" 
							name="first_phone" 
							v-model="model.first_phone"
							v-validate="'required|numeric'"
							placeholder="请输入手机号">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('first_phone')">
							请输入手机号
						</template>
					</div>
				</div>
			</div>
		</form>
		<ask-button slot="footer" v-if="step === 1" @ask-click="step = 0">上一步</ask-button>
		<ask-button slot="footer" @ask-click="onSubmit">{{step === 0 ? '下一步' : '完成'}}</ask-button>
	</ask-modal>
</template>
<script>
import moment from 'moment/moment.js';
import { askDialogToast } from '@/utils';
import registerSteps from '@core/user/register-steps/register-steps.vue';
import registerStep from '@core/user/register-steps/register-step.vue';
import askRadio from '@/components/ask/ask-radio/ask-radio.vue';
import { User } from '@/services';

const user = new User()

	export default {
    components: {
			registerSteps,
			registerStep,
			askRadio
    },
		name: "DialogMatchTeam",
		data(){
			return {
				step: 0,
				show: false,
				isEdit: false,
				item: null,
				theme:'',
				title:'',
				roleType: user.auth.type,
				_cancelClose: null,
				_sureClose: null,
				nationalitys: [
					'中国',
					'法国',
					'德国',
					'俄罗斯',
					'日本',
					'其他'
				],
				groupTypes: {},
				model: {
					"device_num" : "", // 设备号
					"car_num" : "", //车号 
					"car_label" : "", //非必须,厂牌 
					"car_model" : "", //非必须,车型 
					"team_id" : this.$route.params.teamId, //车组id 
					"competition_id" : this.$route.params.matchId, 
					"group_type" : 1, //组别 
					"driver_name" : "", //车手 
					"driver_phone" : "", //车手手机 
					"driver_nationality" : 1, //车手国籍 
					"first_navigator" : "", //第一领航员,领航员信息就传,无就不传 
					"first_phone" : "", //第一领航员电话 
					"first_nationality" : 1, //第一领航员国籍 
					"second_navigator" : "", //第二领航员 
					"second_phone" : "", //第二领航员电话 
					"second_nationality" : 1, //第二领航员国籍 
					"is_club" : 0, //是否参加俱乐部 
					"is_business" : 0 //是否参见商家队 
				}
			}
		},
		computed: {
			selectedCarMode () {
				for (const item of this.groupTypes) {
					if (item.id === this.model.group_type) {
						return item.carMode
					}
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
				console.log(this.item)
				this.model = Object.assign(this.model, this.item)
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
						if (this.step === 0) {
							this.step = 1;
						} else {
							this._sureClose && this._sureClose(this,this.model);
						}
						return;
					}
					askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
				});
			}
		}
	}
</script>
