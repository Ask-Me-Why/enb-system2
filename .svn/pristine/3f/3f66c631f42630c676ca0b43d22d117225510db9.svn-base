<style lang="scss" scoped>
	@import '~@/styles/mixins', '~@/styles/variables';
	.mi-box.team{
		padding: .32rem;
		.mi-tab-btns {
			position: relative;
		}
	}
	.view-more {
		cursor: pointer;
	}
</style>

<template>
	<div class="match-team">
		<enb-tab><router-link :to="{name: 'matchTeam'}">车队管理</router-link> / 车辆管理</enb-tab>
		<div class="mi-box team">
			<div class="mi-tab-btns">
				<ask-button class="white add" @ask-click="popupCreateDialog">
					<i class="iconfont icon-add"></i>
					添加
				</ask-button>
			</div>
			<el-table 
				class="enb-gray-table"
				header-cell-class-name="thead-gray"
				cell-class-name="thead-gray-body-cell"
				:data="tableData" border style="width: 100%">
				<el-table-column label="ID" width="150" prop="id">
				</el-table-column>
				<el-table-column label="设备号" prop="device_num">
				</el-table-column>
				<el-table-column label="车号" prop="car_num">
				</el-table-column>
				<el-table-column label="厂牌" prop="car_label">
				</el-table-column>
				<el-table-column label="车型" prop="car_model">
				</el-table-column>
				<el-table-column label="组别" prop="group_type">
					<template slot-scope="scope">
						{{mapGroupTypes(scope.row.group_type)}}
					</template>
				</el-table-column>
				<el-table-column label="车手" prop="driver_name">
					<template slot-scope="scope">
						{{scope.row.driver_name}}{{scope.row.driver_des ? `(${scope.row.driver_des})` : ''}}
					</template>
				</el-table-column>
				<el-table-column width="140" label="手机号" prop="driver_phone">
				</el-table-column>
				<el-table-column v-if="more" label="第一领航" prop="first_navigator">
					<template slot-scope="scope">
						{{scope.row.first_navigator}}{{scope.row.first_navigator_des ? `(${scope.row.first_navigator_des})` : ''}}
					</template>
				</el-table-column>
				<el-table-column width="140" v-if="more" label="手机号" prop="first_phone">
				</el-table-column>
				<el-table-column v-if="more" label="第二领航" prop="second_navigator">
				</el-table-column>
				<el-table-column width="140" v-if="more" label="手机号" prop="second_phone">
				</el-table-column>
				<el-table-column fixed="right" :label="more ? '收起' : '更多》'" width="200" :render-header="renderMore">
					<template slot-scope="scope">
						<ask-button @click.native="popupUpdateDialog(scope.row)">修改</ask-button>
						<ask-button @click.native="popupRemoveDialog(scope.row)" class="del">删除</ask-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { askDialogConfirm,askDialogToast,merge } from '@/utils';
import { dialogMatchTeamCars } from '@core/match/dialog-match-team-cars';
import { TeamCarsManageApi } from '@/services';
import { mapGetters } from 'vuex';

export default {
	name:"TeamCarsManage",
	mounted(){
		this.getList();
	},
	data() {
		return {
			more: false,
			teamCarsApi: new TeamCarsManageApi(),
			pageSize: 10,
			pageCount: 0,
			time: "",
			timeList: [],
			tableData: [],
			groupTypes: [{
				id: 1,
				name: 'T1.1',
				desc: '4x4汽油',
				carMode: 0,
			}, {
				id: 2,
				name: 'T1.2',
				desc: '4x4柴油',
				carMode: 0
			}, {
				id: 3,
				name: 'T1.3',
				desc: '4x2汽油',
				carMode: 0
			}, {
				id: 4,
				name: 'T1.4',
				desc: '4x2柴油',
				carMode: 0
			}, {
				id: 5,
				name: 'T2.1',
				desc: '4x4汽油',
				carMode: 0
			}, {
				id: 6,
				name: 'T2.2',
				desc: '4x4柴油',
				carMode: 0
			}, {
				id: 7,
				name: 'T3',
				desc: '轻型越野车组（UTV）',
				carMode: 0
			}, {
				id: 8,
				name: '公开',
				desc: '',
				carMode: 0
			}, {
				id: 9,
				name: '新能源',
				desc: '',
				carMode: 0
			}, {
				id: 10,
				name: 'T4.1',
				desc: '10000cc及以上',
				carMode: 1
			}, {
				id: 11,
				name: 'T4.2',
				desc: '10000cc以下',
				carMode: 1
			}, {
				id: 12,
				name: '两轮摩托车',
				desc: '',
				carMode: 2
			}, {
				id: 13,
				name: 'ATV',
				desc: '全地形车',
				carMode: 2
			}, {
				id: 14,
				name: '媒体',
				desc: '',
				carMode: 3
			}, {
				id: 15,
				name: '救援',
				desc: '',
				carMode: 3
			}, {
				id: 16,
				name: '其它',
				desc: '',
				carMode: 3
			}]
		}
	},
	computed:{
		page:{
			get(){
				return Number(sessionStorage.getItem(this.$route.path) || 1);
			},
			set(val){
				sessionStorage.setItem(this.$route.path,val);
			}
		}
	},
	methods: {
		mapGroupTypes (id) {
			for (const item of this.groupTypes) {
				if (item.id === id) {
					return item.name
				}
			}
		},
		viewMore () {
			this.more = !this.more
		},
		renderMore (h, { column, $index }) {
			return h('a', {
				class: 'view-more',
				on: {
					click: this.viewMore
				}
			}, [column.label])
		},
		popupCreateDialog () {
			dialogMatchTeamCars({
				groupTypes: this.groupTypes,
				sure: (vm, model) => {
					this.$store.dispatch('ajaxRequestStart');
					this.teamCarsApi.create(model).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						askDialogToast({msg:`已成功创建车辆！`,time:2000,class:'success'});
						this.getList();
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				},
				cancel:(vm)=>{}
			})
		},
		popupUpdateDialog (item) {
			dialogMatchTeamCars({
				title: '修改车辆信息',
				item,
				groupTypes: this.groupTypes,
				sure: (vm, model) => {
					this.$store.dispatch('ajaxRequestStart');
					this.teamCarsApi.update(model).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						askDialogToast({msg:`已成功修改车辆！`,time:2000,class:'success'});
						this.getList();
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				},
				cancel:(vm)=>{}
			})
		},
		popupRemoveDialog(item) {
			askDialogConfirm({
				content: `是否删除车辆的所有信息?`,
				title: '提示',
				theme:'enb-confirm'
			},(vm)=>{
				this.$store.dispatch('ajaxRequestStart');
				this.teamCarsApi.remove(item.id).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					vm.close();
					askDialogToast({msg:`已成功删除车辆！`,time:2000,class:'success'});
					this.getList();
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				})
			})
		},
		getList(){
			this.$store.dispatch('ajaxRequestStart');
			this.teamCarsApi.query({
				competition_id: this.$route.params.matchId,
				team_id: this.$route.params.teamId,
				page: this.page,
				time: this.time
			}).then(r=>{
				this.$store.dispatch('ajaxRequestEnd');
				if(r.data.code != 200) return;
				let res = r.data.data;
				this.tableData = res.list.sort((a, b) => {
					return b.id - a.id
				});
				this.pageCount = res.pageCount;
				let _min = Number(res.min), _max = Number(res.max);
				let _list = []
				for(let i = _min,l = _max; i <= l ; i++){
					_list.push(i);
				}
				this.timeList = [..._list];
			},err=>{
				this.$store.dispatch('ajaxRequestEnd');
			})
		}
	}
}

</script>
