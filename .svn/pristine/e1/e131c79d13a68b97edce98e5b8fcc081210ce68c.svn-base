<style lang="scss" scoped>
</style>

<template>
	<ask-modal 
		:show.sync="show" 
		:class="[theme]" 
		title="赛事位置"
		width="6rem"
		@close="_closeModal"
		class="custom-enb-confirm">
		<form class="ask-form">
			<div class="ask-group">
				<label class="g-name"><i>*</i>经度</label>
				<div class="g-value" :class="{error: errors.has('longitude')}">
					<div class="g-line">
						<input 
							type="text" 
							name="longitude" 
							v-model="model.competition.longitude"
							v-validate="'required|decimal'"
							placeholder="请输入经度">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('longitude')">
							例：3920.0000
						</template>
					</div>
				</div>
			</div>
			<div class="ask-group">
				<label class="g-name"><i>*</i>纬度</label>
				<div class="g-value" :class="{error: errors.has('latitude')}">
					<div class="g-line">
						<input 
							type="text" 
							name="latitude" 
							v-model="model.competition.latitude"
							v-validate="'required|decimal'"
							placeholder="请输入纬度">
					</div>
					<div class="g-tip">
						<template v-if="errors.has('latitude')">
							例：10206.0000
						</template>
					</div>
				</div>
			</div>
		</form>
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
      show: false,
      item: null,
      theme: '',
      _cancelClose: null,
      _sureClose: null,
      model: {
        competition: {}
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          this._sureClose && this._sureClose(this,this.model);
          return;
        }
        askDialogToast({msg:'请确保表单数据有效！', time: 2000, class: 'danger'});
      });
    }
  }
}
</script>
