<template>
  <div id="container" ref="container" style="height: 100%;width: 100%;justify-content: center;position: relative">

  </div>
</template>

<script>
import { GaodeMap } from '@antv/l7-maps'
import { Scene, PolygonLayer, PointLayer, Source, Marker } from '@antv/l7'
import { getMap } from '@/apis/ecology/geomap'
export default {
  name: 'GisShow',
  data () {
    return {
      scene: null
    }
  },
  methods: {
    init () {
      this.scene = new Scene({
        id: this.$refs.container,
        logoVisible: false,
        map: new GaodeMap({
          // pitch: 35.210526315789465,
          style: 'light',
          center: [116.054266, 35.98102],
          zoom: 9.0,
          token: 'e07f60b1d835816709857bdef1c4b049',
          // debug: true
        })
      })
      const el = document.createElement('label')
      el.className = 'labelclass'
      el.textContent = '区域内生态要素数量'
      el.style.background = 'red'
      el.style.borderColor = '#fff'
      const marker = new Marker({ element: el })
        .setLnglat({ lng: 115.86, lat: 35.85 })
      this.scene.addMarker(marker)
      // const scaleControl = new Scale({ position: 'topleft' })
      // this.scene.addControl(scaleControl)
      getMap()
        .then(res => res.data)
        .then(data => {
          const region = data.region
          const points = data.points
          // console.log(points)
          const jiningPolygonLayer = new PolygonLayer({
            zIndex: 1
          })
            .source(region)
            .size(2)
            .color('#BDD2FD')
            .style({
              opacity: 0.5
            })
          const dataSource = new Source(points, {
            parser: {
              type: 'json',
              x: 'LON',
              y: 'LAT'
            },
            cluster: true
          })
          const pointLayer = new PointLayer({
            autoFit: true,
            zIndex: 2
          })
            .source(dataSource)
            .shape('circle')
            .scale('point_count', {
              type: 'quantile'
            })
            .size('point_count', [5, 10, 15, 20, 25])
            .active(true)
            .color('rgb(73, 167, 86)')
            .style({
              strokeWidth: 1,
              stroke: '#fff'
            })
          const pointLayerText = new PointLayer({
            autoFit: false,
            zIndex: 3
          })
            .source(dataSource)
            .shape('point_count', 'text')
            .size(15)
            .active(true)
            .color('#fff')
            .style({
              strokeWidth: 0,
              stroke: '#fff'
            })

          this.scene.addLayer(jiningPolygonLayer)
          this.scene.addLayer(pointLayer)
          this.scene.addLayer(pointLayerText)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
