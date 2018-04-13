<style lang="scss" scoped>
	@import '~@/styles/mixins', '~@/styles/variables';
	.mi-box.team{
		padding: .32rem;
		.mi-tab-btns {
			position: relative;
		}
	}
</style>

<template>
	<div class="match-team">
		<enb-tab>车队管理</enb-tab>
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
				<el-table-column label="俱乐部名称" width="458" prop="name">
					<template slot-scope="scope">
						<router-link :to="`team/${scope.row.id}`">{{scope.row.name}}</router-link>
					</template>
				</el-table-column>
				<el-table-column label="注册人" min-width="120" prop="manager">
				</el-table-column>
				<el-table-column label="移动电话" min-width="120" prop="phone">
				</el-table-column>
				<el-table-column label="全部车辆" width="170" prop="cars">
				</el-table-column>
				<el-table-column label="操作" width="285">
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
import { dialogMatchTeam } from '@core/match/dialog-match-team';
import { TeamManageApi } from '@/services';
import { mapGetters } from 'vuex';

export default {
	name:"TeamManage",
	mounted(){
		this.getList();
	},
	data() {
		return {
			teamApi: new TeamManageApi(),
			pageSize: 10,
			pageCount: 0,
			time: "",
			timeList: [],
			tableData: []
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
		popupCreateDialog () {
			dialogMatchTeam({
				title: '车队信息',
				sure: (vm, model) => {
					this.$store.dispatch('ajaxRequestStart');
					this.teamApi.create({
						name: model.name,
						manager: model.manager,
						phone: model.phone,
						competition_id: this.$route.params.matchId
					}).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						askDialogToast({msg:`已成功创建"${model.name}"车队！`,time:2000,class:'success'});
						this.getList();
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				},
				cancel:(vm)=>{}
			})
		},
		popupUpdateDialog (item) {
			dialogMatchTeam({
				title: '车队信息',
				item,
				sure: (vm, model) => {
					this.$store.dispatch('ajaxRequestStart');
					this.teamApi.update({
						id: model.id,
						name: model.name,
						manager: model.manager,
						phone: model.phone,
						competition_id: this.$route.params.matchId
					}).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						askDialogToast({msg:`已成功修改"${model.name}"车队！`,time:2000,class:'success'});
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
				content: `删除“${item.name}”车队将会删除车队内的车辆信息，是否删除?`,
				title: '提示',
				theme:'enb-confirm'
			},(vm)=>{
				this.$store.dispatch('ajaxRequestStart');
				this.teamApi.remove(item.id).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					vm.close();
					askDialogToast({msg:`已成功删除"${item.name}"车队！`,time:2000,class:'success'});
					this.getList();
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				})
			})
		},
		getList(){
			this.$store.dispatch('ajaxRequestStart');
			this.teamApi.query({
				competition_id: this.$route.params.matchId,
				page: this.page,
				time: this.time
			}).then(r=>{
				this.$store.dispatch('ajaxRequestEnd');
				if(r.data.code != 200) return;
				let res = r.data.data;
				this.tableData = res.list;
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
