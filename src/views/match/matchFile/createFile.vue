<style lang="scss" scoped>
  @import '~@/styles/mixins', '~@/styles/variables';
  .ask-tinymce-box{
    width: 12rem!important;
  }
  .matchFile{
    .rightBox{
      position: absolute;
      right: 0;
      width: 3rem!important;
      top:1.2rem;
      height:100%;
      .mi-group{
        margin: .3rem 0;
        padding: 0!important;
        border-bottom:none;
      }
      .checkBox{
        width: 2.1rem!important;
        border: 1px #dcdfe6 solid;
        border-radius: 5px;
        height: .4rem!important;
        .ask-checkbox-box{
          position: relative;
          top:.07rem;
        }
        .checkBoxTip{
          display: inline-block;
          width: 1.6rem!important;
          font-size: 15px;
          color: #c0c4cc;
          text-indent: .15rem;
        }
      }
    }
    .pageBtn{
      width: 2.1rem!important;
      height: .4rem!important;
      line-height: .4rem;
      padding: 0!important;
    }
    .title{
      height: .6rem;
      line-height: .6rem;
      border-left: .2rem map_get($color,400) solid;
      text-indent: .2rem;
    }
    .timeBtn{
      border: 1px solid #c0c4cc;
    }
    .preserve{
      background-color: map_get($color,400);
      color: #fff;
    }
    .blueBtn{
      border: 1px map_get($color,400) solid!important;
      color: map_get($color,400);
    }
    .Time{
      display: block;
      color: map_get($color,400);
      font-size: .15rem;
      padding: .1rem 0;
      img{
        vertical-align: text-top;
      }
    }
    .marginBottom{
      margin-bottom: 0!important;
    }
    .el-input__inner {
      width:2rem!important;
    }
  }
  .mi-group {
    width: 100%;
    @include flexLayout(flex, normal, center);
    border-bottom: 1px solid map-get($color, 200);
    padding: .18rem .82rem .18rem .28rem;
    &.is-top {
      align-items: flex-start;
    }
    .label {
      width: 1.45rem;
      flex: 0 0 1.45rem;
      font-size: .16rem;
      word-break: break-all;
      line-height: 1.4;
      color: map-get($color, 300S3);
      padding-right: .1rem;
      @include flexLayout(inline-flex, normal, center);
      i {
        font: inherit;
        display: inline-block;
        width: .2rem;
        line-height: 1;
        height: .08rem;
        text-align: center;
        color: map-get($color, 600);
      }
    }
    .value {
      width: calc(100% - 1.45rem);
      flex: 0 0 calc(100% - 1.45rem);
      font-size: .16rem;
      position: relative;
      @include flexLayout(flex, normal, center);
      .text {
        padding: 0 .12rem;
        font-size: .16rem;
        color: map-get($color, 300);
      }
      .el-select .el-input.is-focus .el-input__inner, .el-select .el-input__inner:focus {
        border-color: map-get($color, 100D2);
      }
    }
  }
  .hostUnit{
    position: absolute;
    left: 5.95rem;
  }
  .a1{
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: -66;
    opacity: 0;
  }
</style>
<template>
  <div class="matchFile">
    <enb-tab><router-link to="matchfile">赛事文件</router-link> / 新建文件</enb-tab>
    <div class="mi-box">
      <div class="title">编辑窗</div>
      <div class="mi-group">
        <div class="label">标题</div>
        <div class="value">
          <input v-model="title"
                 v-validate="'required'"
                 class="mi-input "
                 maxlength="50"
                 name="filename"
                 type="text"
                 placeholder="输入文件标题"
                 :class="{'error': errors.has('filename')}">
          <span class="hostUnit">{{organizerNum}}</span>
        </div>
      </div>
      <ask-tinymce v-model="yys" :params="params" :url="url"></ask-tinymce>
      <div class="rightBox">
        <div class="mi-group">
          <div class="value">
            <el-select v-model="status" placeholder="文件属性">
              <el-option v-for="(item,$i) in matchState" :key="$i" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="mi-group">
          <div class="checkBox">
            <span class="checkBoxTip">弹窗提示</span>
            <ask-checkbox
              v-model="checked"
              :label="name"
              :value="value">
            </ask-checkbox>
          </div>
        </div>
        <el-date-picker
          ref="input"
          :class="{a1:hide1}"
          @change='getsTime'
          v-model="timeValue"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <div class="mi-group marginBottom">
          <ask-button class="pageBtn timeBtn"
                      @ask-click='getsTime'>置顶截止时间</ask-button>
        </div>
        <div class="Time"><img src="~@/assets/time.png" height="15" width="15"/>{{endTime}} 发</div>
        <div class="doBox">
          <div class="mi-group">
            <ask-button class="preserve pageBtn" @click.native="onSubmit">保存</ask-button>
          </div>
          <div class="mi-group">
            <ask-button class="pageBtn blueBtn" @ask-click="openDialog">预览</ask-button>
          </div>
          <div class="mi-group">
            <ask-button class="pageBtn blueBtn">群发</ask-button>
          </div>
          <div class="mi-group marginBottom">
            <ask-button class="pageBtn blueBtn">定时群发</ask-button>
          </div>
          <div class="Time"><img src="~@/assets/time.png" height="15" width="15"/>2018.04.10 18:18:18 发</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { askDialogConfirm,askDialogToast,merge,askDialogPreview,elementComponents } from '@/utils';
  import { MatchApi } from '@/services';
  import { MatchFileApi } from '@/services';
  const matchServer = new MatchApi();
  const fileApi = new MatchFileApi();
  let uploadData = matchServer.getUploadData();
  import moment from 'moment/moment.js';
  import { mapGetters } from 'vuex';
  export default{
    name: 'createFile',
    components:{

    },
    computed:{
      //标题输入字数检测
      organizerNum () {
        if(this.title == null){
          return  50;
        }else {
          return  50 - this.title.length;
        }
      },
      host_unitNum () {
        if(this.host_unit == null){
          return  50;
        }else {
          return  50 - this.host_unit.length;
        }
      },
    },
    data(){
      return {
        hide1: true,
        endTime:'',
        timeValue:'',
        title:'',
        host_unit:'',
        fileApi: new MatchFileApi(),
        checked:'',
        status:'',
        name:'',
        value:'',
        yys:'',
        url: uploadData.url,
        params: {
          mode: 2,
          token:''
        },
        matchState:[
          { name: '通知',value: '3'},
          { name: '仲裁',value: '4'},
          { name: '公告',value: '1'},
        ],
      }
    },
    watch:{
      'yys'(n,o){
       console.log(n)
      },
    },
    methods:{
      getsTime() {
        this.$refs.input.focus()
      },
      //创建文件
      onSubmit(){
        let checkedStatus;
        if(this.checked){
          checkedStatus = 1
        }else {
          checkedStatus = 0
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.dispatch('ajaxRequestStart');
            fileApi.create({
              "competition_id": this.$route.params.matchId,
              "title":this.title,
              "type" :this.status,
              "content" : this.yys,
              "is_alert" :checkedStatus,
              "end_time" : "",
            }).then(r=>{
              this.$store.dispatch('ajaxRequestEnd');
              if(r.data.code != 200) return;
              askDialogToast({msg:'赛事文件创建成功！',time:2000,class:'success'});
            },err=>{
              this.$store.dispatch('ajaxRequestEnd');
            })
            return;
          }
          askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
        });
      },
      //打开预览框
      openDialog () {
        askDialogPreview({
          content: this.yys,
          title: '内容预览',
          theme:'enb-confirm',
        },(vm)=>{

        })
      },
    }
  }
</script>
