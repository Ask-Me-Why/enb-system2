<style lang="scss" scoped>
  @import '~@/styles/mixins', '~@/styles/variables';
  .mi-box.team{
    padding:.15rem;
    .mi-tab-btns {
      position: relative;
    }
  }
  .alreadyBtn ,.cancelBtn{
    padding: 0 .6rem!important;
  }
</style>
<template>
  <div class="match-team">
    <enb-tab>车队管理</enb-tab>
    <div class="mi-box team">
      <div class="mi-tab-btns">
        <ask-button class="alreadyBtn white clicked">
         已发布文件
        </ask-button>
        <ask-button class="cancelBtn">
          未发布文件
        </ask-button>
      </div>
    </div>
    <div class="mi-box">
      <div class="mi-tab-btns">
        <router-link to="createFile">
          <ask-button class="add">
            <i class="iconfont icon-add"></i>
            新增
          </ask-button>
        </router-link>
      </div>
      <el-tabs tab-position="top" class="mi-tabs" v-model="selectedTab">
        <template v-for="(menu,$i) in menuList">
          <el-tab-pane :key="$i" v-bind:name="menu.id">
            <div slot="label" class="mi-tab-label">
              {{menu.name}}
            </div>
            <template v-if="menu.type == 'information'">
              <information></information>
            </template>
            <template v-else-if="menu.type == 'arbitration'">
              <arbitration></arbitration>
            </template>
            <template v-else>
              <notice></notice>
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Information from '@core/matchFile/information.vue';
  import Arbitration from '@core/matchFile/arbitration.vue';
  import notice from '@core/matchFile/notice.vue';
  import { askDialogConfirm,askDialogToast,merge } from '@/utils';
  import { TeamManageApi } from '@/services';
  import { mapGetters } from 'vuex';

  export default {
		name: "MatchFile",
    components:{
      Information,
      Arbitration,
      notice
    },
    mounted(){

    },
    data() {
      return {
        selectedTab: '0',
        teamApi: new TeamManageApi(),
        time: "",
        timeList: [],
        tableData: [],
        menuList:[
          { name: '通知', type: 'information'},
          { name: '仲裁', type: 'arbitration'},
          { name: '公告', type: 'notice'}
        ],
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

    }
	}
</script>

<style scoped>

</style>
