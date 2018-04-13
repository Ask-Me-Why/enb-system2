<style lang="scss" scoped>
  .el-tabs {
    padding: .2rem;
  }
  .line {
    margin: .2rem 0;
    display: flex;
    &.lost {
      border-top: 1px dashed #ccc;
      padding-top: .2rem;
    }
    .name {
      width: 1.1rem;
    }
    .value {
      flex: 1;
      &.list {
        .item {
          margin-right: .2rem;
          float: left;
        }
      }
    }
  }
</style>

<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		title="罚时计算"
		width="6rem"
		@close="_closeModal"
		class="custom-enb-confirm">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="自动罚时" name="normal">
        <div class="line">
          <div class="name">超最大给时</div>
        </div>
        <div class="line">
          <div class="name">丢点罚时</div>
          <div class="value list">
            <div class="item">K56 (WPE) 罚时: 02:00:00</div>
            <div class="item">K32 (WPE) 罚时: 02:00:00</div>
            <div class="item">K32 (WPE) 罚时: 02:00:00</div>
            <div class="item">K32 (WPE) 罚时: 02:00:00</div>
          </div>
        </div>
        <div class="line lost">
          <div class="name">合计罚时</div>
          <div class="value">10:00:00</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="手动罚时" name="max">
        <div class="line">
          <div class="name">罚时</div>
          <div class="value">10:00:00</div>
        </div>
        <div class="line">
          <div class="name">备注</div>
          <input
            class="mi-input medium"
            name="name"
            type="text"
            v-validate="'required'"
            placeholder="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="补时" name="lost">
        <div class="line">
          <div class="name">补时</div>
          <div class="value">10:00:00</div>
        </div>
        <div class="line">
          <div class="name">备注</div>
          <input
            class="mi-input medium"
            name="name"
            type="text"
            v-validate="'required'"
            placeholder="">
        </div>
      </el-tab-pane>
    </el-tabs>
    <ask-button slot="footer" @ask-click="onSubmit">确定</ask-button>
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
          wpm: [0, 0, 0],
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
