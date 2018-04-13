<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.account-permission{
		width: 100%;
		.enb-tab-nav{
			margin-bottom: .3rem;
		}
		.box{
			padding: 0 .84rem .2rem;
		}
		.per-box{
			padding: .34rem .34rem .5rem;
		}
		.ap-group{
			width: 100%;
			@include flexLayout(flex,normal,center);
			padding: .2rem 0;
			.ap-name{
				width: .7rem;
				flex: 0 0 .7rem;
				font-size: .16rem;
				color: map-get($color,300S3);
				line-height: 1;
				white-space: nowrap;
			}
			.ap-value{
				flex: 0 0 calc(100% - .7rem);
				width: calc(100% - .7rem);
				@include flexLayout(flex,normal,center);
				.ap-text{
					min-width: 1.88rem;
					white-space: nowrap;
					line-height: 1;
					font-size: .16rem;
					color: map-get($color,300);
				}
				.ap-btn{
					font-size: .16rem;
					color: map-get($color,400);
					line-height: 1;
					cursor: pointer;
				}
			}
		}
		.operator-box{
			@include flexLayout(flex,normal,center);
			.detail{
				width: calc(100% - 1.42rem);
				flex: 0 0 calc(100% - 1.42rem);
				@include flexLayout(flex,normal,center);
				.gray{
					padding-left: .45rem;
					color: map-get($color,300S2);
				}
			}
			.btn{
				width: 1.42rem;
				flex: 0 0 1.42rem;
				.ask-button{
					min-width: auto;
					width: 100%;
					display: block;
					background: map-get($color,400);
					color: map-get($color,100);
					font-size: .18rem;
					padding: .08rem .24rem;
					border-radius: .04rem;
				}
			}
		}
	}
</style>
<template>
	<div class="account-permission">
		<enb-tab>权限管理</enb-tab>
		<enb-card title="最高管理员">
			<div class="box">
				<div class="ap-group">
					<div class="ap-name">账号</div>
					<div class="ap-value">
						<div class="ap-text">{{$user.username}}</div>
					</div>
				</div>
				<div class="ap-group">
					<div class="ap-name">密码</div>
					<div class="ap-value">
						<div class="ap-text">xxxxxxxxxxxxxxxxxxxxx</div>
						<div class="ap-btn" @click="modifyPassword">修改</div>
					</div>
				</div>
				<div class="ap-group">
					<div class="ap-name">邮箱</div>
					<div class="ap-value">
						<div class="ap-text">{{$user.email}}</div>
					</div>
				</div>
				<div class="ap-group">
					<div class="ap-name">单位</div>
					<div class="ap-value">
						<div class="ap-text">{{companyValue}}</div>
						<div class="ap-btn" @click="modifyCompany">修改</div>
					</div>
				</div>
			</div>
		</enb-card>
		<enb-card>
			<template slot="title">
				<div class="operator-box">
					<div class="detail">
						<div class="text">运营者管理</div>
						<div class="text gray">*最高管理员可以创建不同角色的运营成员，共同管理平台</div>
					</div>
					<div class="btn">
						<ask-button @click.native="creatOperator">创建运营者</ask-button>
					</div>
				</div>
			</template>
			<div class="per-box">
				<el-table 
					class="enb-gray-table"
					header-cell-class-name="thead-gray"
					cell-class-name="thead-gray-body-cell"
					:data="tableData" border style="width: 100%">
					<el-table-column prop="role" label="角色" width="250">
					</el-table-column>
					<el-table-column prop="site" label="位置" min-width="170">
					</el-table-column>
					<el-table-column prop="username" label="账号" min-width="120">
					</el-table-column>
					<el-table-column prop="password" label="密码" min-width="120">
					</el-table-column>
					<el-table-column label="操作" width="285">
						<template slot-scope="scope">
							<ask-button @click.native="handleEditPeople(scope.row)">编辑</ask-button>
							<ask-button class="del" @click.native="handleDelPeople(scope.row)">删除</ask-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					class="enb-pagination"
				    @current-change="handleCurrentChange"
				    :current-page="page"
				    :page-size="pageSize"
				    layout="prev, pager, next, jumper,slot"
				    :page-count="pageCount">
				</el-pagination>
			</div>
		</enb-card>
	</div>
</template>

<script>

import { askDialogConfirm,askDialogToast,merge,sessionStorage } from '@/utils';
import { dialogModifyPassword,dialogModifyCompany,dialogPermissionForm } from "@core/account";
import { OperatorApi,User } from "@/services";
const userServe = new User();
export default {
	name:"AccountPermission",
	mounted(){
		
	},
	data() {
		return {
			operatorServer: new OperatorApi(),
			companyValue: this.$user.company,
			pageSize: 10,
			pageCount: 0,
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
	mounted(){
		this.getOperatorList();
	},
	beforeRouteLeave(to,from,next){
		sessionStorage.removeItem(this.$route.path);
		next();
	},
	methods: {
		modifyPassword(){
			dialogModifyPassword({
				sure:(vm,model)=>{
					this.$store.dispatch('ajaxRequestStart');
					this.operatorServer.modifyPassword({
						"old_pass" : model.oldPassword, 
					    "new_pass" : model.password, 
					    "repeat_new" : model.passwordSure,
					}).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						askDialogToast({msg:`已成功修改管理员密码！`,time:2000,class:'success'});
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				}
			});
		},
		modifyCompany(){
			dialogModifyCompany({
				sure:(vm,model)=>{
					this.$store.dispatch('ajaxRequestStart');
					this.operatorServer.modifyCompany(model.company).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						this.companyValue = model.company;
						this.$user.company = this.companyValue;
						userServe.setUserInfo({
							email: this.$user.email,
							username: this.$user.username,
							company: this.$user.company,
							token: this.$user.token,
							role_type: this.$user.role
						})
						askDialogToast({msg:`已成功修改单位！`,time:2000,class:'success'});
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				}
			});
		},
		getOperatorList(){
			this.$store.dispatch('ajaxRequestStart');
			this.operatorServer.query({
				page: this.page
			}).then(r=>{
				this.$store.dispatch('ajaxRequestEnd');
				if(r.data.code != 200) return;
				let res = r.data.data;
				this.tableData = res.list;
				this.pageCount = res.pageCount;
			},err=>{
				this.$store.dispatch('ajaxRequestEnd');
			})
		},
		creatOperator(){
			dialogPermissionForm({
				sure:(vm,model)=>{
					this.$store.dispatch('ajaxRequestStart');
					let option = {
							"type" : model.role, 
						    "username" : model.user, 
						    "password" : model.password,
						    "repeat" : model.passwordSure,
					};
					option['site'] = model.role == 3 ? model.site : '';
					this.operatorServer.create(option).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						this.getOperatorList();
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				}
			});
		},
		handleCurrentChange(val){
			this.page = val;
			this.getOperatorList();
		},
		handleEditPeople(item){
			dialogPermissionForm({
				title:'修改运营者',
				item:{
					role: item.role_type,
					site: item.referee_site == '0' ? 1:Number(item.referee_site),
					user: item.username
				},
				sure:(vm,model)=>{
					this.$store.dispatch('ajaxRequestStart');
					let option = {
							"id": item.id,
							"type" : model.role, 
						    "password" : model.password,
						    "repeat" : model.passwordSure,
					};
					option['site'] = model.role == 3 ? model.site : '';
					this.operatorServer.update(option).then(r=>{
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						this.getOperatorList();
					},err=>{
						this.$store.dispatch('ajaxRequestEnd');
					})
				}
			});
		},
		handleDelPeople(item){
			askDialogConfirm({
				content: `您是否确认删除账号为“${item.username}”的${item.role}角色`,
				title: '提示',
				theme:'enb-confirm'
			},(vm)=>{
				this.$store.dispatch('ajaxRequestStart');
				this.operatorServer.remove(item.id).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					vm.close();
					askDialogToast({msg:`已成功删除账号为“${item.username}”的${item.role}角色！`,time:2000,class:'success'});
					this.getOperatorList();
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				})
			})
		}
	}
}

</script>
