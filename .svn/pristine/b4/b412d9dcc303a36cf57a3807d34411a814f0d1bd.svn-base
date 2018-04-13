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
      width: .6rem !important;
      max-width: .6rem;
      text-align: center;
      display: inline-block;
    }
    .label {
      display: block;
      margin: 0 10px;
    }
    .desc {
      margin-left: 0.1rem;
      opacity: 0.5;
    }
  }
</style>

<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		title="罚时设置"
		width="6rem"
		@close="_closeModal"
		class="custom-enb-confirm">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="标准给时" name="normal">
        <form class="ask-form">
          <div class="ask-group">
            <label class="g-name"><i>*</i>TCA</label>
            <div class="g-value tca" :class="{error: errors.has('normal.tca')}">
              <div class="g-line">
                <input 
                  type="text" 
                  name="normal.tca" 
                  v-model="model.normal.tca[0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span class="label">时</span>
                <input 
                  type="text" 
                  name="tca" 
                  v-model="model.normal.tca[1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span class="label">分</span>
                <input 
                  type="text" 
                  name="tca" 
                  v-model="model.normal.tca[2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span class="label">秒</span>
              </div>
              <div class="g-tip">
                <template v-if="errors.has('normal.tca')">
                  时间格式设置不正确
                </template>
              </div>
            </div>
          </div>
        </form>
        <div class="info">*设置车组从大营到起点行驶路段的标准给时。</div>
      </el-tab-pane>
      <el-tab-pane label="最大给时" name="max">
        <form class="ask-form">
          <div class="ask-group">
            <label class="g-name"><i>*</i>最大给时</label>
            <div class="g-value tca" :class="{error: errors.has('max.max')}">
              <div class="g-line">
                <input 
                  type="text" 
                  name="max.max" 
                  v-model="model.max.max[0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span class="label">时</span>
                <input 
                  type="text" 
                  name="max.max" 
                  v-model="model.max.max[1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span class="label">分</span>
                <input 
                  type="text" 
                  name="max.max" 
                  v-model="model.max.max[2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span class="label">秒</span>
              </div>
              <div class="g-tip">
                <template v-if="errors.has('max.max')">
                  时间格式设置不正确
                </template>
              </div>
            </div>
          </div>
          <div class="ask-group">
            <label class="g-name"><i>*</i>罚时</label>
            <div class="g-value tca" :class="{error: errors.has('max.punish')}">
              <div class="g-line">
                <input 
                  type="text" 
                  name="max.punish" 
                  v-model="model.max.punish[0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span class="label">时</span>
                <input 
                  type="text" 
                  name="max.punish" 
                  v-model="model.max.punish[1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span class="label">分</span>
                <input 
                  type="text" 
                  name="max.punish" 
                  v-model="model.max.punish[2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span class="label">秒</span>
              </div>
              <div class="g-tip">
                <template v-if="errors.has('max.punish')">
                  时间格式设置不正确
                </template>
              </div>
            </div>
          </div>
        </form>
        <div class="info">*设置车组赛段用时超过最大给时，系统自动判罚车组在该赛段的成绩。</div>
      </el-tab-pane>
      <el-tab-pane label="丢点" name="lost">
        <form class="ask-form">
          <div class="ask-group" :key="item.name" v-for="item in lostFileds">
            <label class="g-name"><i>*</i>{{item.name.toUpperCase()}}</label>
            <div class="g-value tca" :class="{error: errors.has(`lost.${item.name}`)}">
              <div class="g-line">
                <input 
                  type="text" 
                  :name="`lost.${item.name}`"
                  v-model="model.lost[item.name][0]"
                  v-validate="'required|decimal'"
                  placeholder="时">
                <span class="label">时</span>
                <input 
                  type="text" 
                  :name="`lost.${item.name}`"
                  v-model="model.lost[item.name][1]"
                  v-validate="'required|decimal'"
                  placeholder="分">
                <span class="label">分</span>
                <input 
                  type="text" 
                  :name="`lost.${item.name}`"
                  v-model="model.lost[item.name][2]"
                  v-validate="'required|decimal'"
                  placeholder="秒">
                <span class="label">秒</span>
                <span class="desc">{{item.desc.toUpperCase()}}</span>
              </div>
              <div class="g-tip">
                <template v-if="errors.has(`lost.${item.name}`)">
                  时间格式设置不正确
                </template>
              </div>
            </div>
          </div>
        </form>
        <div class="info">*设置车组在赛段中，丢掉该属性的赛点，系统应自动判罚的时间。</div>
      </el-tab-pane>
    </el-tabs>
    <ask-button slot="footer" @ask-click="onSubmit">确定</ask-button>
    <ask-button slot="footer" class="gray" @ask-click="close">取消</ask-button>
	</ask-modal>
</template>
<script>
import moment from 'moment/moment.js';
import { askDialogToast } from '@/utils';

export default {
  components: {
  },
  name: 'DialogMatchStageLocation',
  data () {
    return {
      activeTab: 'normal',
      show: false,
      item: null,
      theme: '',
      _cancelClose: null,
      _sureClose: null,
      lostFileds: [{
        name: 'wpv',
        desc: '可见航点'
      }, {
        name: 'wpm',
        desc: '隐藏航点'
      }, {
        name: 'wpe',
        desc: '渐现航点'
      }, {
        name: 'wps',
        desc: '安全航点'
      }, {
        name: 'cp',
        desc: '控制点'
      }],
      model: {
        normal: {
          tca: [0, 0, 0]
        },
        max: {
          max: [0, 0, 0],
          punish: [0, 0, 0]
        },
        lost: {
          wpv: [0, 0, 0],
          wpm: [22, 3, 4],
          wpe: [0, 0, 0],
          wps: [0, 0, 0],
          cp: [0, 0, 0]
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
    }
  }
}
</script>
