<style lang="scss" scoped>
  @import '~@/styles/mixins', '~@/styles/variables';
  .add{
    position: absolute;
    right: .4rem;
  }

  .clicked{
    border: 1px solid ;
  }
  .infoList{
    background-color:map-get($color,100D1);
    display: flex;
    justify-content: space-around;
    width: calc(100% - 0.4rem);
    margin: .2rem;
    /*border: 1px red solid;*/
    .left{
      width: 2.5rem;
      height: 2rem;
      /*border: 1px red solid;*/
      padding: .2rem;
      overflow: hidden;
      img{
        width: 100%;
        height: 1.6rem;
      }
    }
    .right{
      width: calc(100% - 2.5rem);
      padding: .2rem;
      .content{
        padding: .1rem 0;
      }
      .title{
        color:map-get($color,300D2) ;
        .toTop{
          display: inline-block;
          color:map-get($color,600S1) ;
          font-weight: bold;
          margin-bottom: .05rem;
          padding: .02rem .05rem;
          vertical-align: middle;
          font-size: .1rem;
          border: 1px solid map-get($color,600S1);
        }
      }
    }
  }
  .timeTip{
    font-size: .18rem;
    display: inline-block;
    vertical-align: middle;
  }
  .deleteListBtn{
    display: inline-block;
    position: absolute;
    right: .6rem;
    color: map-get($color,600S1);
    img{
      vertical-align: top;
    }
  }
  .enb-pagination{
    margin-right: .4rem;
  }
</style>
<template>
  <div class="infoBox">
    <div class="infoList" v-for="list in lists">
      <div class="left">
        <img src="~@/assets/123.jpg" />
      </div>
      <div class="right">
        <div class="title">{{list.title}}<span class="toTop">置顶</span> <span class="timeTip">截止：{{list.end_time}}</span></div>
        <div class="content">
          {{list.content}}
        </div>
        <div class="bottom">
          <span class="timeTip">{{list.created_time}}</span>
          <span class="deleteListBtn" @click="deleteInfo(list.id)"><img src="~@/assets/ic_delete.png" height="30" width="30"/>删除</span>
        </div>
      </div>
    </div>
    <!--<div class="infoList">-->
      <!--<div class="left">-->
        <!--<img src="~@/assets/123.jpg" />-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<div class="title">2017年内蒙古多伦拉力赛落幕</div>-->
        <!--<div class="content">-->
          <!--2017年内蒙古多伦拉力赛落幕2017年内蒙古多伦拉力赛落幕2017年内蒙古多伦拉力赛落幕2017年内蒙古多伦拉力赛落幕2017年内蒙古多伦拉力赛落幕2017年内蒙古多伦拉-->
        <!--</div>-->
        <!--<div class="bottom">-->
          <!--<span class="timeTip">2018年04月05日</span>-->
          <!--<span class="deleteListBtn"><img src="~@/assets/ic_delete.png" height="30" width="30"/>删除</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
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
</template>
<script>
  import { askDialogConfirm,askDialogToast,merge } from '@/utils';
  import moment from 'moment/moment.js';
  import ImgUpload from '../vue-image-crop-upload/upload.vue';
  import { simplePicker } from '@core/simple-picker/simple-picker.js';
  import { MatchFileApi } from '@/services';
  const matchServer = new MatchFileApi();
  export default{
    name: 'noticeInfo',
    props:['model'],
    components:{
    },
    data(){
      return {
        page:1,
        pageSize: 10,
        pageCount: 0,
        MatchApi: new MatchFileApi(),
        lists:[]
      }
    },
    mounted(){
      this.getFileList();
    },
    computed:{

    },
    methods:{
      //时间戳转换
      formatTime(time){
        return moment.unix(time).format('YYYY-MM-DD');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getFileList();
      },
      //获取赛事文件列表
      getFileList(){
        console.log(this.formatTime(''));
        this.lists = [];
        this.$store.dispatch('ajaxRequestStart');
        this.MatchApi.queryId({
            page: this.page,
            //获取当前ID
          "competition_id":this.$route.params.matchId,
          "send_type":"1",
          //3通知
          "type":"3",
        }
        ).then(r=>{
          this.$store.dispatch('ajaxRequestEnd');
          if(r.data.code != 200) return;
          let res = r.data.data;
          //数据绑定
          this.pageCount = res.pageCount;
          this.pageSize = res.pageSize;
          res.list.map(index=>{
            let cur = {
              id: index.id,
              competition_id: index.competition_id,
              type: index.type,
              title: index.title,
              content: index.content,
              content_alert: index.content_alert,
              html_url: index.html_url,
              is_alert: index.is_alert,
              head_end: index.head_end,
              end_time:this.formatTime(index.end_time),
              created_time: this.formatTime(index.created_time),
            };
            this.lists.push(cur);
          })
          // console.log(res)
        },err=>{
          this.$store.dispatch('ajaxRequestEnd');
        })
      },
      //删除当前信息
      deleteInfo(id){
        askDialogConfirm({
          content: `删除该赛事文件后将无法恢复，是否删除?`,
          title: '提示',
          theme:'enb-confirm'
        },(vm)=>{
          this.$store.dispatch('ajaxRequestStart');
          this.MatchApi.remove(id).then(r=>{
            this.$store.dispatch('ajaxRequestEnd');
            if(r.data.code != 200) return;
            vm.close();
            askDialogToast({msg:`已成功删除当前赛事文件！`,time:2000,class:'success'});
            this.getFileList();
          },err=>{
            this.$store.dispatch('ajaxRequestEnd');

          })
        })
      }
    }
  }
</script>
