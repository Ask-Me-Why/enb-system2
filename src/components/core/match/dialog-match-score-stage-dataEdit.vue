<style lang="scss" scoped>
  .el-tabs {
    padding: .2rem;
  }
  .ask-form {
    padding: .22rem 0 !important;
  }
  .info {
    text-align: center;
    margin-bottom: .3rem;
    opacity: 0.7;
  }
  .g-name {
    flex: 0 0 1.1rem !important;
    justify-content: flex-end !important;
  }
  .g-value.tca .g-line {
    display: flex;
    justify-content: center;
    flex-direction: row !important;
    input {
      padding: .1rem 0 !important;
      float: none;
      width: 1rem !important;
      max-width: 1.5rem;
      text-align: center;
      display: inline-block;
    }
    .label {
      display: block;
      margin: 0 .2rem;
      font-size: .2rem;
    }
    .desc {
      margin-left: 0.1rem;
      opacity: 0.5;
    }
    .timePut{
        width:2rem;
    }
  }
  .tareaOne{
      margin: .12rem .3rem;
  }
  .reasonOne{
      margin: 1.2rem 0;
  }
  .zifu{
      color:red;
      font-size: .3rem;
      padding-top: .15rem;
      padding-left: .4rem;
  }
  .drop{
      display: flex;
      align-items: center;
      height: .3rem;
      margin-bottom:.1rem; 
    .out{
      padding-left: .3rem;
    }
    .allFont{
      font-size: .2rem;
    }
    .computT{
      font-size: .2rem;
      padding-left: .4rem;
      color: rgb(163, 159, 159);
    }
  }
  .achieve{
      padding-left: .5rem;
  }
  .achieve input{
      width: 4rem;
      height: .5rem;
      margin-left: .75rem;
      margin-top: .1rem;
      border-radius: 5px;
      border: 1px solid rgba(177, 173, 173, 0.5);
      font-size: 19px;
  }
  .infoOther{
      opacity: 0.7;
      padding: .2rem 0 .2rem 2.2rem; 
  }
  .achieveTwo input{
      width: 4rem;
      height: .5rem;
      border-radius: 5px;
      border: 1px solid rgba(177, 173, 173, 0.5);
      font-size: 19px;
      margin-left: .75rem;
  }
  .dropTime{
      margin-top: .1rem;
  }
  .areaOne{
      margin-top: .2rem;

  }
  .areaNumberOne{
      margin-top: .3rem;
  }
  .textareaOne{
      width: 4rem;
      margin-left: .5rem;
  }
  .textareaTwo{
      width: 4.1rem;   
      padding-left: .1rem;
  }
  .areaNumberTwo{
      margin-top: .2rem;
      padding-bottom: .5rem;
  }
  .infoThree{
      opacity: .7;
      padding: .4rem 0 .2rem 2.2rem;
  }
  .infoTwo{
      padding: 0.2rem  0 0 2.2rem;
      opacity: .7;
  }
  .infoFour{
      padding: .1rem 0 .1rem 2.2rem;
      opacity: .7;
  }
  .dropLast{
      margin-top: .3rem;
      margin-bottom: .3rem;
      padding-bottom: .1rem;
  }
  .textareaThree{
      width: 4rem;  
      margin: .2rem 0 .2rem .8rem;
  }
  .backBit{
      margin:.3rem 0 .8rem 0; 
      padding-top: .3rem;
  }
  .textareaFive{
      width: 5rem;
      padding: .7rem 0 .1rem .3rem;
  }
  .infoFive{
      padding: .2rem 0 0 1.6rem;
      opacity: .7;
  }
  .bottomBtn{
      margin: -.2rem 0 0 0;
  }
  .backBit{
      margin-top: .08rem;
  }
  .punTime{
    margin:0 0 .1rem -.3rem;
  }
  .timeInput{
    margin-left: .6rem;
    padding-left: .2rem;
  }
  .bTime{
    font-size: .2rem;
    padding: 0 .1rem;
  }
  .allBox{
    margin-left:.1rem;
  }
  .bFont{
    opacity: .7;
  }
  .boxFrom{
    margin: 0 .1rem;
  }
  .passWord{
    font-size: .2rem;
    margin: 0 .05rem;
  }
</style>

<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		title="数据编辑"
		width="8rem"
		@close="_closeModal"
		class="custom-enb-confirm">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="罚时" name="normal">
        <form class="ask-form">
          <div class="ask-group">
            <label class="g-name"> <b>罚时</b></label>
            <div class="g-value tca" :class="{error: errors.has('normal.tca')}">
              <div class="g-line">
                <input 
                  type="text" 
                  name="normal.tca" 
                  v-model="model.normal.tca[0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span class="label"> <b>时</b></span>
                <input 
                  type="text" 
                  name="tca" 
                  v-model="model.normal.tca[1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span class="label"> <b>分</b></span>
                <input 
                  type="text" 
                  name="tca" 
                  v-model="model.normal.tca[2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span class="label"> <b>秒</b></span> 
                <span>输入时长 </span>
              </div>
              <div class="g-tip">
                <template v-if="errors.has('normal.tca')">
                  时间格式设置不正确
                </template>
              </div>
            </div>
          </div>
          <div class="ask-group">
            <label class="g-name"> <b>备注</b></label>
            <textarea class="tareaOne"  cols="55" rows="15"></textarea>
            <div class="info reasonOne">输入罚时原因</div>
          </div>
        </form> 
        <div class="info">*车组违反赛事规定，根据实际情况，手动罚时间</div>
      </el-tab-pane>
      <el-tab-pane label="补时" name="max">
        <form class="ask-form">
         <div class="ask-group">
            <label class="g-name"> <b>补时</b></label>
            <div class="g-value tca" :class="{error: errors.has('normal.tca')}">
              <div class="g-line">
                <input 
                  type="text" 
                  name="normal.tca" 
                  v-model="model.max.max[0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span class="label"> <b>时</b></span>
                <input 
                  type="text" 
                  name="tca" 
                  v-model="model.max.max[1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span class="label"> <b>分</b></span>
                <input 
                  type="text" 
                  name="tca" 
                  v-model="model.max.max[2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span class="label"> <b>秒</b></span> 
                <span>输入时长 </span>
              </div>
              <div class="g-tip">
                <template v-if="errors.has('normal.tca')">
                  时间格式设置不正确
                </template>
              </div>
            </div>
          </div>
          <div class="ask-group">
            <label class="g-name"> <b>备注</b></label>
            <textarea class="tareaOne"  cols="55" rows="15"></textarea>
            <div class="info reasonOne">输入补给原因</div>
          </div>
        </form>
        <div class="info">*根据实际情况，手动补给时间说明。</div>
      </el-tab-pane>
      <el-tab-pane label="退出" name="lost">
        <form class="ask-form">
          <div class="ask-group " >   
            <div class="drop">
            <i class="zifu">*</i>
            <div class="out allFont"> <b>退出</b> </div>
            <div class="out allFont"> <el-checkbox @change='other'  v-model="checked"></el-checkbox> <b>{{ notF }}</b> <span class="computT">车组退出当前赛段</span>  </div>
            </div>
          </div>
           
           <div class="drop achieve">
              <div class="out allFont"> <b>成绩</b>  <input type="text"> </div>
           </div>
           
             <div class="infoOther">车组退出赛段后，车组在该赛段的固定成绩</div>
             
           <div class="drop achieveTwo dropTime">
                <i class="zifu">*</i>
              <div class="out allFont"> <b>时间</b>  <input type="text"> </div>
           </div>
             
                <div class="infoTwo">车组退出赛段的时间</div>

            <div class="drop areaNumberOne">
                <i class="zifu">*</i>
               <div class="out allFont">  <b>原因</b> </div>
              <div class="out allFont areaOne"> 
              <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              class="textareaOne"
              size="medium"
              v-model="textarea">
              </el-input>
             </div>
         </div> 
     
          
            <div class="infoThree">输入退赛原因</div>

           <div class="drop areaNumberTwo">
                <i class="zifu">*</i>
               <div class="out allFont">  <b>撤出方式</b> </div>
              <div class="out allFont areaOne"> 
              <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              class="textareaTwo"
              size="medium"
              v-model="textarea">
              </el-input>
             </div>
        </div> 

            <div class="infoFour">输入车组撤出赛段的方式</div>
      
           <div class="drop achieve dropLast">
              <div class="out allFont"> <b>成绩</b>  </div>
              <div>
                  <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              class="textareaThree"
              size="medium"
              v-model="textarea">
              </el-input>
              </div>
           </div>
                

       </form>     
        <!-- <div class="info">*设置车组在赛段中，丢掉该属性的赛点，系统应自动判罚的时间。</div> -->
      </el-tab-pane>
      <el-tab-pane label="退赛">
          <form class="ask-form">
          <div class="drop backBit">
            <i class="zifu">*</i>
            <div class="out allFont"> <b>退出</b> </div>
            <div class="out allFont"> <el-checkbox @change='other'  v-model="checked"></el-checkbox> <b>{{ notF }}</b> <span class="computT">车组退出当前赛段</span>  </div>
            </div>
           
            <div class="drop achieve backBit">
              <div class="out allFont"> <b>原因</b>   </div>
              <div>
                <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              class="textareaFive"
              size="medium"
              v-model="textarea">
              </el-input>
              </div>
           </div>
              
          <div class="infoFive">输入车组撤出赛段的方式</div>

          </form>

      </el-tab-pane>
      <el-tab-pane label="赛点时间" >
           <form class="ask-form">
          <div class="ask-group punTime" :key="item.name" v-for="item in lostFileds">
            <label class="g-name"> <b>{{item.name.toUpperCase()}}</b></label>
            <div class="g-value tca" :class="{error: errors.has(`lost.${item.name}`)}">
              <div class="g-line allBox">
                <input 
                  class="timeInput"
                  type="text" 
                  :name="`lost.${item.name}`"
                  v-model="model.lost[item.name][0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span > <b class="bTime">时</b></span>
                <input 
                  class="timeInput"
                  type="text" 
                  :name="`lost.${item.name}`"
                  v-model="model.lost[item.name][1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span > <b class="bTime">分</b></span>
                <input 
                  class="timeInput"
                  type="text" 
                  :name="`lost.${item.name}`"
                  v-model="model.lost[item.name][2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span > <b class="bTime">秒</b></span> 
                 <span> <b class="passWord"> 通过: </b></span>
                 <el-checkbox class="boxFrom"   name='check.ck' @change='checkClick' v-model="model.check.ck[0]"></el-checkbox> <b class="bFont">是</b>
                  <el-checkbox class="boxFrom"  name='check.age' @change='other'  v-model="checked2"></el-checkbox> <b class="bFont">否</b>
    
              </div>   
            </div>     
          </div>
      
        </form> 

      </el-tab-pane>
    </el-tabs>
    <ask-button slot="footer" class="bottomBtn" @ask-click="onSubmit">确定</ask-button>
    <ask-button slot="footer" class="gray bottomBtn" @ask-click="close">取消</ask-button>
	</ask-modal>
</template>

<script>
import moment from 'moment/moment.js';
import { askDialogToast } from '@/utils';
import elementComponents from '@/utils';

export default {
  name: 'DialogMatchStageLocation',
  data() {
    return {
      textarea:'',
      notF: '否',
      checked: false,
      checked1: true,
      checked2: false,
      activeTab: 'normal',
      show: false,
      item: null,
      theme: '',
      _cancelClose: null,
      _sureClose: null,
      lostFileds: [{
        name: 'dss',
        desc: ''
      }, {
        name: 'k12',
        desc: ''
      }, {
        name: 'k35',
        desc: ''
      }, {
        name: 'cp1',
        desc: ''
      }, {
        name: 'k46',
        desc: ''
      }],
      model: {
        normal: {
          tca: [0,0,0]
        },
        max: {
          max: [0, 0, 0],
          punish: [0, 0, 0]
        },
        lost: {
          dss: [99, 66, 0],
          k12: [0, 0, 0],
          k35: [0, 0, 0],
          cp1: [0, 0, 0],
          k46: [0, 0, 0]
        },
        check: {
          ck: [false,true],
      
        }
      }
    }
  },
   computed: {
  },
  created(){
    if(this.item != null) {
      this.buildModelData();
      this.isEdit = true;
    }
  },
  watch:{
    item:{
      handler(){
        if(this.item != null) {
          this.buildModelData();
          this.isEdit = true;
        }
      },
      deep:true
    }
  },
  methods:{
    checkClick() {
      console.log();
    },
    buildModelData(){
      console.log(this.item)
      this.model = Object.assign(this.model, this.item)
    },
    close(){
      this.show = false;
      this._closeModal();
    },
    _closeModal(){
      this._cancelClose && this._cancelClose(this);
    },
    onSubmit(){
    },
    other() {
       if(this.checked == true) {
           this.notF = '是'
       } else {
           this.notF = '否'
       }
    }
  }
}
</script>
