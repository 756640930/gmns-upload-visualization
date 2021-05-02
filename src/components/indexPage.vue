<template>
  <div id="main">
    <div class="header-title">
      <div id="header">
        <img id="logo" src="@/assets/image/logo.svg">
        <h2 id="labLabel">ASU Trans+AI Lab</h2>
        <a href="https://github.com/asu-trans-ai-lab"><img id="git" src="@/assets/image/github.svg"></a>
        <a href="https://github.com/asu-trans-ai-lab/grid2demand/blob/main/dataset/ASU/sample_GMNS_dataset.zip"><img id="xiazai" src="@/assets/image/xiazai.svg"></a>
      </div>
    </div>
    <div v-show="ifSideContent">
      <side-content @readFile="readFile" ref="sidecontent"></side-content>
    </div>
    <div>
      <touch-bar @open-close="openSideContent" @change-map-style="changeMapStyle"></touch-bar>
    </div>
    <div id="map"></div>
  </div>
</template>



<script>


import {elReadFile} from "@/utils/readCsv.js"
import TouchBar from '@/components/touchBar.vue'
import SideContent from '@/components/sideContent.vue'








export default {
  name: 'indexPage',
  components: {
    TouchBar,
    SideContent,
  },
  data() {
    return {
      //Decide to open the sidebar
      ifSideContent: true,
    }
  },
  methods: {
    changeMapStyle(item) {
      this.$refs.sidecontent.changeMapStyle();
    },
    //Sidebar on-off
    openSideContent() {
      this.ifSideContent = !this.ifSideContent
    },
    readFile(file) {
      console.log(file)
      elReadFile(file,this.map.map)
    }
  },
  mounted() {
    this.map.initMap({
      zoom: 16,
      center: [-96.77042, 43.612828],
      divId: 'map',
      style: 'mapbox://styles/mapbox/dark-v8',
      bearing: -17.6,
      antialias: true,
      pitch: 45
      })
      //Move the cursor to the layer to make the hand smaller
      this.map.changeCursor('Link');
      this.map.changeCursor('Node');
      this.map.changeCursor('Agent');
      this.map.changeCursor('Zone');
      this.map.changeCursor('Poi');
      //Move the cursor to the layer change state
      this.map.changeLayerState('Link');
      this.map.changeLayerState('Node');
      this.map.changeLayerState('Agent');
      this.map.changeLayerState('Zone');
      this.map.changeLayerState('Poi');
  }
}

</script>

<style>
#header{
  background: rgba(36, 40, 45);
  color: #fff;
  border-bottom: .3em solid #2f333e;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;
  margin: 0 !important;
  padding: 0;
  justify-content: space-between;
}
#map {
  position: absolute;
  width: 100%;
  height: 100%;
}
#git {
  position: fixed;
  right: 23px;
  top: 8px;
  align-self: center;
  width: 2rem;
}
#xiazai {
  position: fixed;
  right: 75px;
  top: 10px;
  align-self: center;
  width: 1.8rem;
}
#logo {
  position: fixed;
  left: 23px;
  top: -9px;
  align-self: center;
  width: 4.5rem;
}
#labLabel {
  position: fixed;
  left: 90px;
  top: 10px;
  font-family:sans-serif
}
.markerHear {
  width: 80%;
  font-size: 15px;
  line-height: 37px;
  padding-left: 12px;
  color: #fff;
  height: 37px;
  overflow: hidden;
  margin: 0;
}

.markerBody {
  background-color: #f8f9fc;
  padding: 8px 12px;
  border: solid 1px #052f66;
  border-top: none;
  height: 300px;
  overflow: scroll;
}

.markerBody p {
  font-size: 14px;
  margin: 0 !important;
  line-height: 30px;
  color: rgb(5, 1, 1);
}
.mapboxgl-popup-content {
  padding: 0
}

.mapboxgl-popup-close-button {
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  width: 40px;
  font-size: 22px;
  height: 40px;
  border: 0;
  border-radius: 0 3px 0 0;
  cursor: pointer;
  background-color: transparent;
}

.makerTop {
  background-color: #4f5155;
  background-size: 100% 100%;
  display: flex;
  border: solid 1px #052f66;
  align-items: center;
  border-bottom: none;
}
  .side-content {
    border-width: 0.01px;
    border-color: #000
  }

</style>
