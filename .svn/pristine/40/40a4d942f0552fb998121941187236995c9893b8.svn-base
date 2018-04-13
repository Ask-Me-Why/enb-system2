<style lang="scss" scoped>
  @import '~@/styles/mixins', '~@/styles/variables';
  .match-score {
    .mi-box {
      font-size: .2rem;
      overflow: auto;
      .title {
        padding: .2rem .3rem;
        border-bottom: 1px solid map-get($color, 200);
      }
      .desc {
        padding: .2rem .3rem;
        font-size: .17rem;
      }
      .view {
        display: block;
        padding: .2rem .3rem;
        padding-top: 0;
        float: right;
        font-size: .17rem;
      }
    }
  }
</style>

<template>
  <div class="match-score">
    <enb-tab>赛事成绩</enb-tab>
    <div class="mi-box">
      <div class="title">赛段详情</div>
      <div class="desc">车组通过重要赛点的时间修改，判罚车组的罚时，补时和退出的情况</div>
      <router-link :to="{ name: 'matchScoreStage' }" class="view">查看详情</router-link>
    </div>
    <div class="mi-box">
      <div class="title">赛事成绩</div>
      <div class="desc">车组在赛事当中的赛段成绩，阶段成绩和总成绩</div>
      <router-link to="/" class="view">查看详情</router-link>
    </div>
    <div class="mi-box">
      <div class="title">组别成绩</div>
      <div class="desc">在不同组别下，车组的赛段成绩，阶段成绩和总成绩</div>
      <router-link to="/" class="view">查看详情</router-link>
    </div>
    <div class="mi-box">
      <div class="title">赛事积分</div>
      <div class="desc">在本次单场比赛中的车手积分，领航积分，组别积分，俱乐部积分，厂商队积分</div>
      <router-link to="/" class="view">查看详情</router-link>
    </div>
  </div>
</template>

<script>
  export default {
		name: 'MatchScore',
    components: {
    },
    mounted () {
    },
    data() {
      return {
      }
    },
    computed:{
    },
    watch: {
    },
    methods: {
    }
	}
</script>
