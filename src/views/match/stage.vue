<style lang="scss" scoped>
	@import '~@/styles/mixins', '~@/styles/variables';
	.mi-box {
		background-color: transparent;
		display: flex;
		font-size: .18rem;
	}
	.content {
		width: 65vw;
		position: relative;
		margin-right: 0.18rem;
		border: 1px solid map-get($color, 100D2);
		.empty {
			background-color: white;
			height: 70vh;
			font-size: 0.3rem;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			color: map-get($color, 100D4);
		}
		.map-wrap {
			position: relative;
			height: 70vh;
			z-index: 0;
			.map {
				height: 100%;
				width: 100%;
			}
			.map-title {
				position: absolute;
				top: 0;
				color: white;
				padding: .1rem .3rem;
				background-color: map-get($color, 400);
				box-shadow: 0 3px 3px rgba(50,50,93,.11);
				z-index: 1;
				&:after {
					content: "";
					position: absolute;
					right: -0.3rem;
					top: 0;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 0.45rem 0 0 0.3rem;
					border-color: transparent transparent transparent map-get($color, 400);
					z-index: -1;
				}
			}
		}
		.info {
			z-index: 1;
			position: relative;
			width: 100%;
			background-color: white;
			padding: .18rem;
			box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.1);
			overflow: auto;
			.header {
				.points {
					margin-top: 0.1rem;
					margin-left: 0.5rem;
				}
			}
			.points {
				.point {
					margin-right: 0.1rem;
					margin-top: 0.1rem;
					font-size: .13rem;
					color: white;
					background-color: lighten(map-get($color, 400), 15%);
					float: left;
					padding: 0.08rem 0.12rem;
					border-radius: 3px;
				}
			}
		}
	}
	.infos {
		border: 1px solid map-get($color, 100D2);
		flex: 1;
		background-color: white;
		.section {
			padding: .18rem;
			border-bottom: 1px solid map-get($color, 100D1);
		}
		.header {
			font-size: 0.15rem;
			display: flex;
			justify-content: space-between;
			.title {
				font-weight: bold;
			}
		}
		.main {
			padding: 0.18rem;
			padding-bottom: 0;
			font-size: 0.15rem;
			&.list {
				padding: 0;
				padding-top: 0.18rem;
			}
			.name {
				margin-right: 0.1rem;
			}
			.longitude {
				margin-top: 0.05rem;
			}
			.upload {
				background: map-get($color,400);
				color: white;
				margin-top: 0.18rem;
			}
			.list {
				border: 1px solid map-get($color, 100D1);
				max-height: 50vh;
				overflow: auto;
				.item {
					border-bottom: 1px solid map-get($color, 100D1);
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					cursor: default;
					&.selected {
						background-color: map-get($color, 100S1);
					}
					&:last-child {
						border-bottom: 0;
					}
					.sort {
						padding: 0.1rem;
						background-color: map-get($color, 100S4);
						cursor: move;
						margin-right: 0.05rem;
					}
					.remove {
						margin-right: 0.1rem;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="match-stage">
		<enb-tab>赛段文件浏览</enb-tab>
		<div class="mi-box stage">
			<div class="content">
				<div class="empty" v-if="!selected">
					请在右侧上传或选择赛段
				</div>
				<div class="map-wrap" v-if="selected">
					<match-map class="map" :points="selectedPoints" :paths="selectedPaths"></match-map>
					<div class="map-title">{{matchName}}赛段文件</div>
				</div>
				<div class="info" v-if="selected">
					<div class="header">
						<span class="name">赛段：{{selectedData.name}}</span>
						<span class="points">赛点：{{selectedData.stage_site}}</span>
					</div>
					<ul class="points" v-if="selectedPoints.length">
						<li class="point" v-for="point in selectedPoints">{{point.name}}</li>
					</ul>
				</div>
			</div>
			<div class="infos">
				<div class="section position">
					<div class="header">
						<span class="title">赛事位置</span>
						<a class="update" @click="popupUpdateLocationDialog">修改</a>
					</div>
					<div class="main">
						<div class="latitude"><span class="name">经度：</span>{{model.competition.longitude || '-'}}</div>
						<div class="longitude"><span class="name">纬度：</span>{{model.competition.latitude || '-'}}</div>
					</div>
				</div>
				<div class="section names">
					<div class="header">
						<span class="title">赛段</span>
					</div>
					<div class="main list">
						<draggable class="list" v-if="model.stages.length" v-model="model.stages" @start="drag = true" @end="sortEnd">
							<div :class="{item: true, selected: item.id === selected}" v-for="item in model.stages" :key="item.id" @click="onSelect(item)">
								<div class="left">
									<i class="sort el-icon-sort"></i>
									{{item.name}}
								</div>
								<a class="remove" @click.stop="popupRemoveDialog(item)">删除</a>
							</div>
						</draggable>
						<el-upload
							ref="upload"
							:action="''"
							:on-remove="onUploadRemove"
							:on-change="onUploadChange"
							:auto-upload="false">
							<ask-button class="upload">上传</ask-button>
							<div slot="tip" class="el-upload__tip">仅支持 KML 文件</div>
						</el-upload>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MatchMap from '@core/match/map.vue'
import draggable from 'vuedraggable'
import { dialogMatchStageLocation } from '@core/match/dialog-match-stage-location';
import { askDialogConfirm, askDialogToast,merge } from '@/utils';
import { StageManageApi, MatchApi } from '@/services';

export default {
	name: "MatchStage",
	components: {
		MatchMap,
		draggable
	},
	mounted(){
		this.getData();
	},
	data() {
		return {
			selected: null,
			stageApi: new StageManageApi(),
			matchApi: new MatchApi(),
			drag: false,
			matchName: '',
			selectedPoints: [],
			selectedPaths: [],
			model: {
				stages: [], 
        competition: { 
					longitude: '', 
					latitude: ''
				}
			}
		}
	},
	computed: {
		selectedData () {
			for (const item of this.model.stages) {
				if (item.id === this.selected) {
					return item
				}
			}
			return {}
		},
		newSortedStages () {
			return this.model.stages.map((item, idx) => {
				item.order = idx + 1
				return item
			})
		}
	},
	methods: {
		onSelect (item) {
			this.selected = item.id
			this.getDetailByURL(item)
		},
		getDetailByURL (item) {
			this.$store.dispatch('ajaxRequestStart');
			this.stageApi.getDetail(item.json_path).then(r => {
				this.$store.dispatch('ajaxRequestEnd');
				this.selectedPoints = r.data.point;
				this.selectedPaths = r.data.line;
			}, err => {
				this.$store.dispatch('ajaxRequestEnd');
				askDialogToast({msg: `获取赛段数据失败`, time: 2000, class: 'danger'});
				this.selected = null;
				this.selectedPoints = [];
				this.selectedPaths = [];
			})
		},
		sortEnd () {
			this.drag = false
			this.$store.dispatch('ajaxRequestStart');
			this.stageApi.sortFiles({
				editor: this.newSortedStages.map((item) => {
					return {
						id: item.id,
						order: String(item.order)
					}
				})
			}).then(r => {
				this.$store.dispatch('ajaxRequestEnd');
				if(r.data.code != 200) return;
				askDialogToast({msg: `赛段排序完成`, time: 2000, class: 'success'});
				this.getData();
			}, err => {
				this.$store.dispatch('ajaxRequestEnd');
			})
		},
		onUploadChange (file) {
			if (file) {
				const fd = new FormData;
				fd.append('token', this.$user.token)
				fd.append('competition_id', this.$route.params.matchId);
				fd.append('file', file.raw);
				this.$store.dispatch('ajaxRequestStart');
				this.stageApi.uploadFile(fd).then(r => {
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					askDialogToast({msg:`已成功创建赛段！`, time:2000, class:'success'});
					this.getData();
					this.$refs.upload.clearFiles();
				}, err => {
					this.$refs.upload.clearFiles();
					this.$store.dispatch('ajaxRequestEnd');
				})
			}
		},
		onUploadRemove () {},
		getData () {
			this.$store.dispatch('ajaxRequestStart');
			Promise.all([
				this.stageApi.getIndex({
					competition_id: this.$route.params.matchId
				}),
				this.matchApi.queryId({ id: this.$route.params.matchId })
			]).then(([r1, r2]) => {
				this.$store.dispatch('ajaxRequestEnd');
				if(r1.data.code != 200 || r2.data.code != 200) return;
				this.model = Object.assign(this.model, r1.data.data);
				this.model.stages = this.model.stages.sort((a, b) => {
					return Number(a.order) - Number(b.order)
				})
				this.matchName = r2.data.data.base.name
			},err=>{
				this.$store.dispatch('ajaxRequestEnd');
			})
		},
		popupUpdateLocationDialog () {
			dialogMatchStageLocation({
				item: this.model,
				sure: (vm, model) => {
					this.$store.dispatch('ajaxRequestStart');
					this.stageApi.updateLocation({
						competition_id: this.$route.params.matchId,
						map_longitude: this.model.competition.longitude,
    				map_latitude: this.model.competition.latitude
					}).then(r => {
						this.$store.dispatch('ajaxRequestEnd');
						if(r.data.code != 200) return;
						vm.close();
						askDialogToast({msg:`已成功修改经纬度！`, time:2000, class:'success'});
						this.getData();
					}, err => {
						this.$store.dispatch('ajaxRequestEnd');
					})
				},
				cancel: (vm) => {}
			})
		},
		popupRemoveDialog(item) {
			askDialogConfirm({
				content: `您是否确认删除“${item.name}”赛段?`,
				title: '提示',
				theme: 'enb-confirm'
			}, (vm) => {
				this.$store.dispatch('ajaxRequestStart');
				this.stageApi.removeFile({
					id: item.id
				}).then(r => {
					this.$store.dispatch('ajaxRequestEnd');
					if(r.data.code != 200) return;
					vm.close();
					askDialogToast({msg:`已成功删除赛段！`, time: 2000, class: 'success'});
					if (item.id === this.selected) {
						this.selected = null
					}
					this.getData();
				}, err => {
					this.$store.dispatch('ajaxRequestEnd');
				})
			})
		}
	}
}
</script>
