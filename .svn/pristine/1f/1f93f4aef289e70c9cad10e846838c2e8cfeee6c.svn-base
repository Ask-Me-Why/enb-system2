<style lang="scss" scoped>
	@import '~@/styles/mixins', '~@/styles/variables';
	.mi-box {
		padding: .32rem;
	}
	.header {
		font-size: .18rem;
		display: flex;
		align-items: center;
		.stages {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: .1rem;
			.stage {
				font-size: .15rem;
				border-radius: 3px;
				padding: 4px 25px;
				margin-right: .2rem;
				border: 1px solid map-get($color, 200);
				color: map-get($color, 200D3);
				&.active {
					color: map-get($color, 400);
					border: 1px solid map-get($color, 400);
				}
			}
		}
	}
	.action {
		margin-bottom: .2rem;
		position: relative;
		.action-group {
			position: absolute;
			right: 0;
			top: 0;
			.ask-button {
				padding: .05rem .1rem;
				font-size: .15rem;
			}
		}
	}
	.editText{
		color: map-get($calendar,200 );
	}
</style>

<template>
	<div class="match-team">
		<enb-tab><router-link :to="{name: 'matchScore'}">赛事成绩</router-link> / 赛段详情</enb-tab>
		<div class="mi-box">
			<div class="header">
				赛段：
				<ul class="stages">
					<li :key="item.id" v-for="item in stages">
						<router-link class="stage" :to="{ name: 'matchScoreStageDetail', params: { stageId: item.id } }" active-class="active">{{item.name}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="mi-box" v-if="$route.params.stageId">
			<div class="action">
				<el-tabs v-model="activeTab">
					<el-tab-pane label="汽车" name="car"></el-tab-pane>
					<el-tab-pane label="摩托车" name="moto"></el-tab-pane>
				</el-tabs>
				<div class="action-group">
					<ask-button class="blue">刷新</ask-button>
					<ask-button class="blue" @click.native="popupPunishSettingDialog">罚时设置</ask-button>
					<ask-button class="blue">导出</ask-button>
				</div>
			</div>
			<el-table 
				class="enb-gray-table"
				header-cell-class-name="thead-gray"
				cell-class-name="thead-gray-body-cell"
				:data="tableData" border style="width: 100%">
				<el-table-column fixed="left" label="ID" prop="id">
				</el-table-column>
				<el-table-column fixed="left" width="100" label="车号" prop="car_id">
				</el-table-column>
				<el-table-column fixed="left" width="120" label="车手" prop="driver_name">
				</el-table-column>
				<el-table-column fixed="left" width="120" label="领航" prop="navigator">
				</el-table-column>
				<el-table-column width="120" :key="item.site_id" :label="item.site_name" v-for="item in dynamicLabel" prop="">
					<template slot-scope="scope">{{getSiteVaue(String(scope.row.car_id), String(item.site_id))}}</template>
				</el-table-column>
				<el-table-column width="120" label="赛道用时" prop="">
				</el-table-column>
				<el-table-column width="120" label="自动罚时" prop="">
					<template slot-scope="scope"><a @click="openPunishView">{{formatDuration(scope.row.auto_punish_time)}}</a></template>
				</el-table-column>
				<el-table-column width="120" label="手动罚时" prop="">
					<template slot-scope="scope"><a>{{formatDuration(scope.row.manual_punish)}}</a></template>
				</el-table-column>
				<el-table-column width="120" label="补时" prop="">
					<template slot-scope="scope"><a>{{formatDuration(scope.row.compensation)}}</a></template>
				</el-table-column>
				<el-table-column width="120" label="合计用时" prop="">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="110">
					<template slot-scope="scope">
						<ask-button> <a @click='dataEdit(scope.row,scope.$index)' class="editText"> 编辑 </a> </ask-button>
					</template>
				</el-table-column>
				<el-table-column
				 	fixed="right"
					type="selection"
					width="55">
				</el-table-column>
			</el-table>
			<!-- <el-pagination
				class="enb-pagination"
			    @size-change="handleSizeChange"
			    @current-change="handleCurrentChange"
			    :current-page.sync="page"
			    :page-size="pageSize"
			    layout="prev, pager, next, jumper,slot"
			    :page-count="pageCount">
			</el-pagination> -->
		</div>
	</div>
</template>

<script>
import { dialogMatchScoreStagePunish } from '@core/match/dialog-match-score-stage-punish';
import { dialogMatchScorePunishView } from '@core/match/dialog-match-score-punish-view';
import { dialogMatchScoreStageDataEdit } from '@core/match/dialog-match-score-stage-dataEdit'
import { StageManageApi, ScoreStageApi } from '@/services';
import moment from 'moment'

export default {
	name:"MatchScoreStage",
	mounted(){
		this.getStageList();
	},
	data() {
		return {
			scoreStageApi: new ScoreStageApi(),
			stageApi: new StageManageApi(),
			activeTab: 'car',
			more: false,
			page: 1,
			pageSize: 10,
			pageCount: 0,
			stages: [],
			rawListData: {}
		}
	},
	watch: {
		'$route.params.stageId' () {
			this.getScoreStageList()
		}
	},
	computed:{
		tableData () {
			return this.rawListData.staticList || []
		},
		dynamicLabel () {
			return this.rawListData.dynamicLabel
		},
		dynamicList () {
			return this.rawListData.dynamicList
		}
	},
	methods: {
		dataEdit (row,index) {
			dialogMatchScoreStageDataEdit({
				sure: (vm, model) => {
				},
				cancel:(vm) => {}
			})
		},
		openPunishView () {
			dialogMatchScorePunishView({
				sure: (vm, model) => {
				},
				cancel:(vm) => {}
			})
		},
		popupPunishSettingDialog () {
			dialogMatchScoreStagePunish({
				sure: (vm, model) => {
					// this.$store.dispatch('ajaxRequestStart');
					// this.teamCarsApi.create(model).then(r=>{
					// 	this.$store.dispatch('ajaxRequestEnd');
					// 	if(r.data.code != 200) return;
					// 	vm.close();
					// 	askDialogToast({msg:`已成功创建车辆！`,time:2000,class:'success'});
					// 	this.getList();
					// },err=>{
					// 	this.$store.dispatch('ajaxRequestEnd');
					// })
				},
				cancel:(vm) => {}
			})
		},
		formatDuration(seconds) {
			return moment.utc(moment.duration(seconds, 'seconds').asMilliseconds()).format('HH:mm:ss')
		},
		getSiteVaue(carId, siteId) {
			if (this.dynamicList[carId]) {
				if (this.dynamicList[carId][siteId]) {
					if (this.dynamicList[carId][siteId].pass_time) {
						return moment.unix(this.dynamicList[carId][siteId].pass_time).format('HH:mm:ss')
					}
				}
			}
			return ''
		},
		getScoreStageList () {
			if (!this.$route.params.stageId) {
				return
			}
			this.$store.dispatch('ajaxRequestStart');
			this.scoreStageApi.getList({
				competition_id: 26, // this.$route.params.matchId,
				stage_id: 14, // this.$route.params.stageId,
				car_type: 1
			}).then(r => {
				this.$store.dispatch('ajaxRequestEnd');
				if(r.data.code != 200) return;
				this.rawListData = r.data.data
			}, err => {
				this.$store.dispatch('ajaxRequestEnd');
			})
		},
		getStageList () {
			this.$store.dispatch('ajaxRequestStart');
			this.stageApi.getIndex({
				competition_id: this.$route.params.matchId
			}).then(r => {
				this.$store.dispatch('ajaxRequestEnd');
				if(r.data.code != 200) return;
				this.stages = r.data.data.stages;
				this.getScoreStageList()
			}, err => {
				this.$store.dispatch('ajaxRequestEnd');
			})
		}
	}
}

</script>
