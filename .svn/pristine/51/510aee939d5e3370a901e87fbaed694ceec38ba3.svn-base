<style lang="scss">
	@import '~@/styles/mixins', '~@/styles/variables';
	.stat-cartable{
		.smt-card{
			margin: .3rem 0 0;
			&+.smt-card{
				margin: .3rem 0 0;
			}
		}
		.smt-group{
			width: 100%;
			font-size: .18rem;
			color: map-get($color,300D2);
			line-height: 1;
			@include flexLayout(flex,normal,top);
			.smt-label{
				width: 1.04rem;
				padding: .12rem 0;
				margin: .1rem 0 ;
				border: 1px solid transparent;
			}
			.smt-value{
				width: calc(100% - 1.04rem);
				@include flexLayout(flex,normal,center);
				flex-flow: row wrap;
				.ask-button{
					border: 1px solid map-get($color,100D2);
					border-radius: .04rem;
					padding: .12rem .28rem;
					line-height: 1;
					font-size: .18rem;
					margin: .1rem 0 .1rem .1rem ;
					&.active{
						color: map-get($color,400);
						border: 1px solid map-get($color,400);
					}
					&.no-border{
						border: none;
					}
				}
			}
			&+.smt-group{
				margin: .2rem 0 0;
			}
		}
		.box{
			padding: .2rem .42rem;
		}
		.mi-box{
			margin: .3rem 0 0;
			.mi-tab-btns{
				width: 4.56rem;
				.ask-button{
					max-width: 1.04rem;
					padding: 0 .2rem;
				}
			}
			
			.mi-tabs.el-tabs{
				.el-tabs__header{
					margin: 0;
					padding: 0 4.56rem 0 .2rem;
				}
			}
		}
		.smt-body{
			padding: .2rem .16rem;
		}
	}
</style>
<template>
	<div class="stat-cartable">
		<enb-tab>发车表</enb-tab>
		<enb-card class="smt-card">
			<template slot="title">
				<div class="smt-group">
					<div class="smt-label">当前发车表:</div>
					<div class="smt-value">
						<template v-if="carList.length <= 0">
							<ask-button
							:hover="false" 
							:ripple="false"
							class="no-border"
							>
								暂无发车表内容
							</ask-button>
						</template>
						<template v-else>
							<ask-button 
								:hover="false" 
								:class="{active: carListSelected == c.value}"
								v-for="(c,$i) in carList" 
								@click.native="activeStage(c)"
								:key="$i">
								{{c.name}}
							</ask-button>
						</template>
					</div>
				</div>
			</template>
			<div class="box">
				<div class="smt-group" v-for="(item,$i) in sortList">
					<div class="smt-label" :key="$i">排序条件{{$i+1}}:</div>
					<div class="smt-value">
						<ask-button 
							:hover="false" 
							class="no-border"
							:class="{active: sortListSelected[$i] == once.value}"
							v-for="(once,$j) in item" 
							@click.native="activeSort($i,once)"
							:key="$j">{{once.name}}
						</ask-button>
					</div>
				</div>

			</div>
		</enb-card>
		<div class="mi-box">
			<div class="mi-tab-btns">
				<ask-button class="add" @click.native="saveSort">确定</ask-button>
				<ask-button class="add" @click.native="intervalSet">间隔设定</ask-button>
				<ask-button class="add" @click.native="issuedMatch">发布</ask-button>
				<ask-button class="add" @click.native="exportExcel">导出</ask-button>
			</div>
			<el-tabs tab-position="top" class="mi-tabs" v-model="carType" @tab-click="tabClick">
				<template v-for="(menu,$i) in carTypeList">
					<el-tab-pane :key="$i" :name="menu.value">
						<div slot="label" class="mi-tab-label">
							{{menu.name}}
						</div>
						<div class="smt-body">
							<el-table 
								class="enb-gray-table"
								header-cell-class-name="thead-gray"
								cell-class-name="thead-gray-body-cell"
								:data="tableData" border style="width: 100%">
								<el-table-column prop="id" label="ID" width="80"></el-table-column>
								<el-table-column label="顺序" width="80" v-if="sortColumnControll">
									<template slot-scope="scope">
										{{scope.$index+1}}
									</template>
								</el-table-column>
								<el-table-column prop="car_num" label="车号" width="80"></el-table-column>
								<el-table-column prop="driver_name" label="车手" ></el-table-column>
								<el-table-column prop="first_navigator" label="领航" ></el-table-column>
								<el-table-column prop="team_name" label="俱乐部" ></el-table-column>
								<el-table-column prop="car_label" label="厂牌" ></el-table-column>
								<el-table-column prop="car_model" label="车型" ></el-table-column>
								<el-table-column prop="group_type" label="组别" ></el-table-column>
								<el-table-column prop="is_club" label="俱乐部杯" ></el-table-column>
								<el-table-column prop="is_business" label="厂商杯" ></el-table-column>
								<el-table-column prop="car_space" label="发车位" ></el-table-column>
								<el-table-column label="发车时间" >
									<template slot-scope="scope">
										{{formatTime(scope.row.departure_time)}}
									</template>
								</el-table-column>
								<el-table-column label="操作" width="120">
									<template slot-scope="scope">
										<ask-button 
											class="no-border" 
											:hover="false" 
											@click.native="sortLocation(scope.row,scope.$index)">
											排序
										</ask-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-tab-pane>
				</template>
			</el-tabs>
		</div>
	</div>
</template>
<script>

  import { StatisticalApi } from '@/services';
  import { askDialogConfirm,askDialogToast,merge,handlerSingleDigit } from '@/utils';
  import { dialogCarSort } from '@core/match/statistical/dialog-car-sort.js';
  import { dialogIssuedMatch } from '@core/match/statistical/dialog-issued-match.js';
  import { dialogIntervalSet } from '@core/match/statistical/dialog-interval-set.js';
const statisticalServer = new StatisticalApi();
	export default{
		name: "StatisticalCarTable",
		data(){
			return {
				sortColumnControll:false,
				isChangeSort: false,
				carListSelected: -1,
				carList:[],
				sortListSelected: [0,0],
				sortList:[
					[{name:'车号',value: '0'},{name:'上赛段成绩',value: '1'},{name:'当前赛段成绩',value: '2'}],
					[{name:'正序',value: '0'},{name:'倒叙',value: '1'}]
				],
				carType: '1',
				carTypeList:[{name:"汽车",value:'1'},{name:"摩托车",value:'2'}],
				tableData:[],
				intervalDefaultConfig:{
					car:{
						time:'',
						stage: [],
					},
					motor:{
						time:'',
						num: '',
						interval: ''
					}
				},
			}
		},
		computed:{
			matchId(){
				return this.$route.params.matchId;
			}
		},
		mounted(){
			this.initData();
		},
		methods:{
			formatTime(value){
				let _h = parseInt(value/3600,10),
					_m = parseInt((value - _h*3600)/60,10);
				return handlerSingleDigit(_h)+':'+handlerSingleDigit(_m);
			},
			tabClick(){
				this.queryType();
			},
			initData(){
				this.$store.dispatch('ajaxRequestStart');
				statisticalServer.carList(this.matchId).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					this.carList = [];
					if(r.data.data && r.data.data.length > 0){
						r.data.data.map(index=>{
							let cur = {
								value: index.id,
								name: index.name
							}
							this.carList.push(cur);
						})
						this.carListSelected = this.carList[0].value;
					}
					this.queryType();
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				})
			},
			queryType(){
				if(this.carListSelected == -1) return;

				this.isChangeSort = false;
				this.$store.dispatch('ajaxRequestStart');
				statisticalServer.queryType({
					"competition_id": this.matchId,
					// "stage_id": this.carListSelected,
					"stage_id": 14,
					"car_type": this.carType,
				}).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');

					if(r.data.code != 200) return;
					if(r.data.data){
						let {list,sort,config} = r.data.data;
						this.tableData = [];
						if(list && list.length>0){
							this.tableData = list;
						}
						if(config && config.length>0){
							this.intervalDefaultConfig.car.stage = [];
							config.forEach((item)=>{
								if(item.type == '1'){
									this.intervalDefaultConfig.car.time = item.departure_start;
									this.intervalDefaultConfig.car.stage.push({
										max_cn:item.max_cn,
										min_cn:item.min_cn,
										interval: item.interval/60
									})
								}else{
									this.intervalDefaultConfig.motor.time = item.departure_start;
									this.intervalDefaultConfig.motor.num = item.number;
									this.intervalDefaultConfig.motor.interval = item.interval/60;
								}
							});
						}
						this.sortListSelected[0] = sort.sort_condition;
						this.sortListSelected[1] = sort.sort_type;
					}

				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				});
			},
			sortType(){
				if(this.carListSelected == -1) return;
				this.isChangeSort = false;
				this.$store.dispatch('ajaxRequestStart');
				statisticalServer.sortType({
					"competition_id": this.matchId,
					// "stage_id": this.carListSelected,
					"stage_id": 14,
					"sort_condition" : this.sortListSelected[0],
					"sort_type" : this.sortListSelected[1],
					"car_type": this.carType,
				}).then(r=>{
					this.$store.dispatch('ajaxRequestEnd');

					if(r.data.code != 200) return;

					this.tableData = [];
					if(r.data.data && r.data.data.length>0){
						this.tableData = r.data.data;
					}
				},err=>{
					this.$store.dispatch('ajaxRequestEnd');
				});
			},
			activeStage(item){
				if(this.carListSelected == -1) {
					askDialogToast({msg:'请添加发车表',time:2000,class:'danger'});
					return;
				}
				this.carListSelected = item.value;
				this.sortType();
			},
			activeSort(index,item){
				if(this.carListSelected == -1) {
					askDialogToast({msg:'请添加发车表',time:2000,class:'danger'});
					return;
				}
				if(this.sortListSelected[index] == item.value) return;
				this.$set(this.sortListSelected,index,item.value);
				this.sortType();
			},
			sortLocation(item,index){
				this.sortColumnControll = true;
				dialogCarSort({
					title: '手动排序',
					item:{
						maxIndex: this.tableData.length,
						oldIndex: index+1,
						...item
					},
					sure:(vm,model)=>{
						this.$store.dispatch('ajaxRequestStart');
						statisticalServer.singleSort({
							"competition_id": this.matchId,
							// "stage_id": this.carListSelected,
							"stage_id": 14,
							"new_sort" : model.newIndex,
							"old_sort" : index+1,
							"car_type": this.carType,
						}).then(r=>{
							this.$store.dispatch('ajaxRequestEnd');
							if(r.data.code != 200) return;
							this.tableData = [];
							if(r.data.data && r.data.data.length>0){
								this.tableData = r.data.data;
							}
							askDialogToast({msg:'排序成功！',time:2000,class:'success'});
							this.isChangeSort = true;
							vm.close();
						},err=>{
							this.$store.dispatch('ajaxRequestEnd');
						});
					},
		            cancel:(vm)=>{
		            	this.sortColumnControll = false;
		            }
				})
			},
			saveSort(done){
				done&& typeof done == 'function'&&done();
				if(this.isChangeSort){
					askDialogToast({msg:'保存排序成功！',time:2000,class:'success'});
				}
				this.isChangeSort = false;
			},
			intervalSet(){
				if(this.carListSelected == -1) return;
				dialogIntervalSet({
					title: '间隔设定',
					item: this.intervalDefaultConfig,
					sure:async (vm,model)=>{
						this.$store.dispatch('ajaxRequestStart');
						if(vm.carType == 1){
							let {carStage} = model;
							carStage = carStage.map(index=>{
								index.interval = index.interval*60;
								return index;
							});
							let r = await statisticalServer.setCarInterval({
								"competition_id": this.matchId,
								// "stage_id": this.carListSelected,
								"stage_id": 14,
								"car_type": vm.carType,
								"departure_start" : model.carTime,
								"group" : carStage,
							})
							this.$store.dispatch('ajaxRequestEnd');
							if(r.data.code !== 200) return;
							vm.close();
							askDialogToast({msg:'汽车间隔设置成功！',time:2000,class:'success'});
							this.queryType();
						}
						if(vm.carType == 2){
							let r = await statisticalServer.setMotorInterval({
								"competition_id": this.matchId,
								// "stage_id": this.carListSelected,
								"stage_id": 14,
								"car_type": vm.carType,
								"departure_start" : model.motorTime,
								"number" : model.motorNum,
								"motor_interval" : model.motorInterval*60
							})
							this.$store.dispatch('ajaxRequestEnd');
							if(r.data.code !== 200) return;
							vm.close();
							askDialogToast({msg:'摩托车间隔设置成功！',time:2000,class:'success'});
							this.queryType();
						}
					},
		            cancel:(vm)=>{
		            }
				})
				
			},
			exportExcel(){
				if(this.carListSelected == -1) return;

				let _downUrl = statisticalServer.exportExcel({
					// "stage_id": this.carListSelected,
					"stage_id": 14,
					"car_type": this.carType,
				});
				window.open(_downUrl, 'Excel 下载');
			},
			issuedMatch(){
				if(this.carListSelected == -1) return;

				dialogIssuedMatch({
					title: '发车表发布',
					sure:(vm,model)=>{
						this.$store.dispatch('ajaxRequestStart');
						statisticalServer.issuedMatch({
							"competition_id": this.matchId,
							// "stage_id": this.carListSelected,
							"stage_id": 14,
							"title" : model.title,
							"release_date" : model.timeStamp,
							"signature_file" : model.img,
							"car_type": this.carType,
						}).then(r=>{
							this.$store.dispatch('ajaxRequestEnd');
							if(r.data.code != 200) return;
							askDialogToast({msg:'发布成功!',time:2000,class:'success'});
							vm.close();
						},err=>{
							this.$store.dispatch('ajaxRequestEnd');
						});
					},
		            cancel:(vm)=>{
		            }
				})
			}
		}
	}
</script>