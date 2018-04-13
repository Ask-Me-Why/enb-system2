<template>
	<ask-modal 
		:title="title" 
		:show.sync="show"
		:shade="shade"
		:shadeColor="shadeColor"
		:shadeClick="shadeClick"
		@open="open"
		:beforeClose="beforeClose"
		:afterClose="afterClose"
		:class="theme"
		class="ask-confirm"
		:showClose="showClose"
		:showFooter= "(cancelBtn||sureBtn)"
		:transition="transition"
	>
		<div class="confirm-box" v-if="content" v-html="content">
		</div>
	    <ask-button slot="footer" class="confirm-btn" v-if="cancelBtn" :text="cancelText" @ask-click="cancel"></ask-button>
	    <ask-button slot="footer" class="confirm-btn" v-if="sureBtn" @ask-click="sure">
	    	{{sureText}}
	    </ask-button>
	</ask-modal>
</template>
<style src="./ask-confirm.scss" lang="scss"></style>
<script>
	export default{
		props:{
			shade:{
				type:Number,
				default:.4
			},
			shadeColor:{
				type:String,
				default:'#000'
			},
			shadeClick:{
				type:Boolean,
				default: true
			},
			show: {
				type:Boolean,
				default:false
			},
			content: {
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			showClose: {
				type: Boolean,
				default: true 
			},
			cancelBtn:{
				type: Boolean,
				default: true 
			},
			cancelText:{
				type: String,
				default:'取消'
			},
			sureBtn:{
				type: Boolean,
				default: true 
			},
			sureText:{
				type: String,
				default:'确定'
			},
			transition:{
				type: String,
				default:'ask-modal-fill'
			},
			theme:[]
		},
		data() {
			return {
			}
		},
		methods:{
			open(){},
			sure(){
				this.$emit('onok');
			},
			cancel(){
				this.$emit('oncancel');
			},
			close(){
				this.show = false;
			},
			beforeClose(){
				this.$emit('onclose');
			},
			afterClose(vm){
				this.$nextTick(()=>{
					vm.$el.remove && vm.$el.remove();
				})
			}
		}
	}
</script>