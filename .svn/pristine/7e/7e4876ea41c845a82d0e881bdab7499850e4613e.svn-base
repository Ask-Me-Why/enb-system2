<template>
  <div class="details" style="margin: 0.2rem 0 0 0.3rem;">
    <div class="infoTitle">本届基本信息</div>
    <div class="mi-group">
      <div class="label"><i>*</i>全称</div>
      <div class="value">
        <input v-model="model.full_name"
          class="mi-input medium"
          name="name"
          type="text"
          v-validate="'required'"
          placeholder="输入赛事全称"
          :class="{'error': errors.has('name')}">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">主办单位</div>
      <div class="value">
        <input v-model="model.host_unit"
          maxlength="50"
          class="mi-input "
          name="hostUnit"
          type="text"
          placeholder="输入主办单位"
          :class="{'error': errors.has('hostUnit')}">
        <span class="hostUnit">{{remnant}}</span>
      </div>
    </div>
    <div class="mi-group">
      <div class="label">承办单位</div>
      <div class="value">
        <input v-model="model.undertaker"
          class="mi-input "
          maxlength="50"
          name="organizer"
          type="text"
          placeholder="输入承办单位">
        <span class="hostUnit">{{organizerNum}}</span>
      </div>
    </div>
    <div class="mi-group">
      <div class="label"><i>*</i>时间</div>
      <div class="value">
        <input v-model="model.time_str"
          v-validate="'required'"
          class="mi-input medium"
          name="timeStr"
          :class="{'error': errors.has('timeStr')}"
          type="text"
          placeholder="选择起止时间">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">地点</div>
      <div class="value">
        <input v-model="model.site"
          class="mi-input medium"
          name="site"
          type="text"
          placeholder="输入赛事举办地">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">赛段</div>
      <div class="value">
        <input v-model="model.stage_name"
          class="mi-input medium"
          name="StageName"
          type="text"
          placeholder="输入赛段">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">全程里程</div>
      <div class="value">
        <input v-model="model.full_mileage"
          class="mi-input medium"
          name="mileage"
          type="text"
          placeholder="输入全程里程">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">赛段里程</div>
      <div class="value">
        <input v-model="model.stage_mileage"
               class="mi-input medium"
               name="stageMileage"
               type="text"
               placeholder="输入赛段里程">
      </div>
    </div>
    <div class="infoTitle">报名</div>
    <div class="mi-group">
      <div class="label">报名时间</div>
      <div class="value">
        <input v-model="timeValue"
               v-validate="'required'"
               readonly=""
               class="mi-input medium"
               name="time"
               :class="{'error': errors.has('time')}"
               type="text"
               placeholder="选择起止时间"
               @click="openPicker">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">报名地点</div>
      <div class="value">
        <input v-model="model.join_site"
          class="mi-input"
          name="baoming_site"
          type="text"
          placeholder="请输入报名地点">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">报名方式</div>
      <div class="value">
        <input v-model="model.join_way"
          class="mi-input"
          name="baoming_mode"
          type="text"
          placeholder="不超过10个字符">

      </div>
    </div>
    <div class="infoTitle">联系方式</div>
    <div class="mi-group">
      <div class="label">QQ</div>
      <div class="value">
        <input v-model="model.qq"
          class="mi-input medium"
          name="qq"
          type="text"
          placeholder="请输入QQ账号">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">微信</div>
      <div class="value">
        <input v-model="model.wx"
          class="mi-input medium"
          name="weixin"
          type="text"
          placeholder="请输入微信账号">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">传真</div>
      <div class="value">
        <input v-model="model.fax"
          class="mi-input medium"
          name="chuanzhen"
          type="text"
          placeholder="请输入传真账号">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">电子邮箱</div>
      <div class="value">
        <input v-model="model.email"
          class="mi-input medium"
          name="email"
          :class="{'error': errors.has('email')}"
          type="email"
          placeholder="请输入电子邮箱">
      </div>
    </div>
    <div class="mi-group">
      <div class="label">电话</div>
      <div class="value">
        <input v-model="model.telephone"
          class="mi-input medium"
          name="phone"
          type="text"
          placeholder="请输入电话">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '~@/styles/mixins', '~@/styles/variables';
  .hostUnit{
    position: absolute;
    left: 5.95rem;
  }
  .infoTitle{
    font-size: .18rem;
    color: #333;
    margin-top: .2rem;
  }
</style>

<script>
  import { askDialogToast } from '@/utils';
  import { MatchDetailsApi } from '@/services';
  import moment from 'moment/moment.js';
  import { mapGetters } from 'vuex';
  import { simplePicker } from '@core/simple-picker/simple-picker.js';
  const matchServer = new MatchDetailsApi();
    export default {
      name: "infoDetails",
      props:['model'],
      computed:{
        //起止时间选择
        timeValue(){
          return `${this.formatTime(this.model.join_start)}至${this.formatTime(this.model.join_end)}`;
        },
        //主办单位输入字数检测
        remnant () {
          if(this.model.host_unit == null){
            return  50;
          }else {
            return  50 - this.model.host_unit.length;
          }
        },
        //承办单位输入字数检测
        organizerNum () {
          if(this.model.undertaker == null){
            return  50;
          }else {
            return  50 - this.model.undertaker.length;
          }
        },

      },
      data(){
        return {
          detailApi: new MatchDetailsApi(),
          cbNum:50,
        }
      },
      mounted(){
        this.getDetailInfo();
      },
      methods:{
        //时间选择格式
        formatTime(time){
          return moment.unix(time).format('YYYY-MM-DD');
        },
        //打开时间选择框
        openPicker(){
          let opt = {
            sure:(vm,data)=>{
              this.model.join_start = data.start.timestamp;
              this.model.join_end = data.end.timestamp;
            }
          };
          opt = {
            start: this.model.join_start && this.formatTime(this.model.join_start)||'',
            end: this.model.join_end && this.formatTime(this.model.join_end) || '',
            ...opt
          };
          simplePicker(opt);
        },
        //获取详情
        getDetailInfo(){
          this.$store.dispatch('ajaxRequestStart');
          this.detailApi.queryId(
            //获取当前ID
            this.$route.params.matchId
          ).then(r=>{
            this.$store.dispatch('ajaxRequestEnd');
            if(r.data.code != 200) return;
            let res = r.data.data;
            //数据绑定
            this.model.full_name = res.full_name;
            this.model.site = res.site;
            this.model.time_str = res.time_str;
            this.model.stage_name = res.stage_name;
            this.model.full_mileage = res.full_mileage;
            this.model.stage_mileage = res.stage_mileage;
            this.model.join_start = res.join_start;
            this.model.join_end = res.join_end;
            this.model.join_site = res.join_site;
            this.model.join_way = res.join_way;
            this.model.qq = res.qq;
            this.model.wx = res.wx;
            this.model.fax = res.fax;
            this.model.email = res.email;
            this.model.telephone = res.telephone;
            this.model.host_unit = res.host_unit;
            this.model.undertaker = res.undertaker;
            this.model.id = res.id;
            // console.log(res)
          },err=>{
            this.$store.dispatch('ajaxRequestEnd');
          })
        },
        //点击保存提交数据
        onSubmit(){
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.$store.dispatch('ajaxRequestStart');
              matchServer.update(this.model).then(r=>{
                this.$store.dispatch('ajaxRequestEnd');
                if(r.data.code != 200) return;
                askDialogToast({msg:'赛事详细信息修改成功！',time:2000,class:'success'});
              },err=>{
                this.$store.dispatch('ajaxRequestEnd');
              })
              return;
            }
            askDialogToast({msg:'请确保表单数据有效！',time:2000,class:'danger'});
          });
        },
      }
    }

</script>

