<style lang="scss">
@import '~@/styles/mixins', '~@/styles/variables';

.map-marker-wrap {
  position: relative;
  .map-marker-icon {
    width: 30px;
    position: absolute;
    top: -82px;
    left: -1px;
  }
  .map-marker-name {
    background-color: white;
    padding: 4px 8px;
    color: black;
    position: absolute;
    top: -30px;
    border: 1px solid red;
    left: 50%;
    margin-left: -26px;
    width: 70px;
    text-align: center;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.amap-marker {
  &:hover {
    z-index: 1000 !important;
  }
}
</style>

<template>
  <div class="container" ref="container"></div>
</template>

<script>
import AMap from 'amap'

const markerHTML = (name) => {
  return `<div class="map-marker-wrap"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1522808063178" class="map-marker-icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1924" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M750.311065 323.377729l-384.000188-191.999905a31.979539 31.979539 0 0 0-14.309419-3.378388h-0.001505v-48.000353c0-8.836189-7.1628-16.000118-16.000118-16.000118-8.836189 0-16.000118 7.163552-16.000117 16.000118v864.001082c0 8.836565 7.163552 16.000494 16.000117 16.000494 8.836942 0 16.000118-7.163552 16.000118-16.000494v-368.000824h0.001505a31.972389 31.972389 0 0 0 14.309419-3.378387l384.000188-191.999906c10.841472-5.420548 17.688935-16.500968 17.688935-28.621848s-6.847463-23.200547-17.688935-28.621471z" fill="#5584ff" p-id="1925"></path></svg><div class="map-marker-name">${name}</div></div>`
}

export default {
  props: {
    points: {
      type: Array,
      default: []
    },
    paths: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      map: null
    }
  },
  methods: {
    renderPoints () {
      const lines = []
      for (const point of this.points) {
        const pos = [point.lng, point.lat]
        lines.push(pos)
        const marker1 = new AMap.Marker({
          position: pos,
          title: point.name,
          content: markerHTML(point.name)
        })
        marker1.setMap(this.map)
      }
    },
    renderPaths (PathSimplifier) {
      const pathSimplifierIns = new PathSimplifier({
        zIndex: 1,
        map: this.map,
        getPath: (dataItem) => {
          return dataItem.path
        },
        getHoverTitle: (dataItem, idx) => {
          return dataItem.name
        },
        renderOptions: {
          pathLineStyle: {
              strokeStyle: 'red',
              lineWidth: 4,
              dirArrowStyle: true
          }
        }
      })
      pathSimplifierIns.setData(this.paths)
    },
    render (PathSimplifier) {
      if (this.map) {
        this.map.destroy()
      }
      this.map = new AMap.Map(this.$refs.container, {
        zoom: 10
      })
      this.renderPoints()
      this.renderPaths(PathSimplifier)
      this.map.setFitView()
    },
    load () {
      AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
        if (!PathSimplifier.supportCanvas) {
            alert('当前浏览器不支持地图组件')
            return
        }
        this.render(PathSimplifier)
      })
    }
  },
  mounted () {
    this.load()
  },
  watch: {
    points () {
      this.load()
    }
  }
}
</script>
