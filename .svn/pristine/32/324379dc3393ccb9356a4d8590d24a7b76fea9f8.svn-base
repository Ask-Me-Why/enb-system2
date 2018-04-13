<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<slot></slot>
		</div>
		<slot name="prev"></slot>
		<slot name="next"></slot>
		<slot name="pagination"></slot>
	</div>
</template>
<script>
import Swiper from '@/../node_modules/swiper/dist/js/swiper.js';
import '@/../node_modules/swiper/dist/css/swiper.min.css';
import { merge } from '@/utils';
export default {
	props:['options','slideData'],
	data() {
		return {
			swiper: ''
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.swiper = new Swiper(this.$el,this.options);
		})
	},
	destroyed() {
		this.$nextTick(() => {
			setTimeout(()=>{
				if (this.swiper) this.swiper.destroy();
			},300);
		})
	},
	watch: {
		"slideData": {
			handler: function(n, o) {
				// if(n.length <= 1) return;
				this.$nextTick(() => {
					if (this.swiper) {
						this.swiper.destroy();
						this.swiper = new Swiper(this.$el,this.options);
						// this.swiper.loopDestroy();
						// this.swiper.update(true);
						// this.swiper.loopCreate();
						// this.swiper.slideTo(0, 0, false);
					}
				})
			},
			deep: true
		}
	}
}

</script>
