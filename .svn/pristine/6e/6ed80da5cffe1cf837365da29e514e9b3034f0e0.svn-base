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
		:showClose="showClose"
		:transition="transition"
		>
		<div class="ask-alert-box" v-if="content" v-html="content">
		    
		</div>
	    <ask-button slot="footer" class="ask-alert-btn" @ask-click="sure">
	    	{{btnText}}
	    </ask-button>
	</ask-modal>
</template>
<style src="./ask-alert.scss" lang="scss"></style>
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
			btnText:{
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
			close(){
				this.show = false;
			},
			beforeClose(done){
				done();
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