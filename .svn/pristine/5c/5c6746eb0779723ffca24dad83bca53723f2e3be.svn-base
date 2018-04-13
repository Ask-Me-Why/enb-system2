<style lang="scss" scoped>
  @import '~@/styles/mixins', '~@/styles/variables';
  .match-logs {
    .mi-box {
      padding: .32rem;
    }
  }
  .filters {
    margin-bottom: .32rem;
    .ask-form {
      display: flex;
      .ask-group {
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .g-name {
          font-size: .2rem;
          margin-right: .2rem;
        }
      }
    }
  }
</style>

<template>
  <div class="match-logs">
    <enb-tab>操作记录</enb-tab>
    <div class="mi-box">
      <div class="filters">
        <form class="ask-form">
          <div class="ask-group">
            <label class="g-name">赛段</label>
            <div class="g-value">
              <div class="g-line">
                <el-select v-model="model.stage_id" placeholder="">
                  <el-option
                    v-for="item in stages"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="ask-group">
            <label class="g-name">位置</label>
            <div class="g-value">
              <div class="g-line">
                <el-select v-model="model.site" placeholder="">
                  <el-option
                    v-for="item in sites"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="ask-group">
            <label class="g-name">操作内容</label>
            <div class="g-value">
              <div class="g-line">
                <el-select v-model="model.operation" placeholder="">
                  <el-option
                    v-for="item in operations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </form>
      </div>
			<el-table 
				class="enb-gray-table"
				header-cell-class-name="thead-gray"
				cell-class-name="thead-gray-body-cell"
				:data="tableData" border style="width: 100%">
				<el-table-column label="赛段" prop="stage_name">
				</el-table-column>
				<el-table-column label="位置" prop="site_des">
				</el-table-column>
				<el-table-column label="操作内容" prop="operation_des">
				</el-table-column>
				<el-table-column label="操作对象" prop="operation">
				</el-table-column>
				<el-table-column label="时间" prop="time">
					<template slot-scope="scope">
						{{formatTime(scope.row.time)}}
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="enb-pagination"
			    @size-change="handleSizeChange"
			    @current-change="handleCurrentChange"
			    :current-page.sync="page"
			    :page-size="pageSize"
			    layout="prev, pager, next, jumper,slot"
			    :page-count="pageCount">
			</el-pagination>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import notice from '@core/matchFile/notice.vue';
  import { askDialogConfirm, askDialogToast,merge } from '@/utils';
  import { MatchLogsApi, StageManageApi } from '@/services';
  import { mapGetters } from 'vuex';

  export default {
		name: 'MatchLogs',
    components: {
    },
    mounted () {
      this.getList()
    },
    data() {
      return {
        logsApi: new MatchLogsApi(),
        stageApi: new StageManageApi(),
        page: 1,
        pageSize: 10,
        pageCount: 0,
        tableData: [],
        model: {
          stage_id: 0,
          site: 0,
          operation: 0
        },
        stages: [{
          name: '无',
          id: 0
        }],
        sites: [{
          name: '全部',
          id: 0
        }, {
          name: 'DSS',
          id: 1
        }, {
          name: 'FF',
          id: 2
        }, {
          name: 'ASS',
          id: 3
        }, {
          name: 'CP1',
          id: 4
        }, {
          name: 'CP2',
          id: 5
        }, {
          name: 'CP3',
          id: 6
        }, {
          name: 'CP4',
          id: 7
        }, {
          name: 'CP5',
          id: 8
        }, {
          name: 'TPA',
          id: 9
        }, {
          name: 'TPB',
          id: 10
        }],
        operations: [{
          name: '全部',
          id: 0
        }, {
          name: '确定发车',
          id: 1
        }, {
          name: '重新发车',
          id: 2
        }, {
          name: '修改时间',
          id: 3
        }, {
          name: '确定通过时间',
          id: 4
        }, {
          name: '确定冲刺时间',
          id: 5
        }]
      }
    },
    computed:{
    },
    watch: {
      'model.stage_id' () {
        this.getList();
      },
      'model.site' () {
        this.getList();
      },
      'model.operation' () {
        this.getList();
      }
    },
    methods: {
			formatTime(time){
				return moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
			},
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList () {
        this.$store.dispatch('ajaxRequestStart');
        this.stageApi.getIndex({
          competition_id: this.$route.params.matchId
        }).then(r => {
          if (r.data.data.stages && r.data.data.stages.length) {
            this.stages = r.data.data.stages;
          }
          if (this.stages.length) {
            if (!this.model.stage_id) {
              this.model.stage_id = this.stages[0].id
            }
            this.logsApi.query({
              stage_id: this.model.stage_id,
              site: this.model.site || undefined,
              operation: this.model.operation || undefined,
              competition_id: this.$route.params.matchId,
              page: this.page
            }).then(r => {
              this.$store.dispatch('ajaxRequestEnd');
              if(r.data.code != 200) return;
              let res = r.data.data;
              this.tableData = res.list;
              this.pageCount = res.pageCount;
            }, err => {
              this.$store.dispatch('ajaxRequestEnd');
            })
          } else {
            this.$store.dispatch('ajaxRequestEnd');
          }
        }, err => {
          this.$store.dispatch('ajaxRequestEnd');
        })
      }
    }
	}
</script>
