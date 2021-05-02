<template>
  <div id="touch-bar">
    <a>
      <img id="uploadCard" src="@/assets/image/shezhi-2.png" @click="openSideContent">
    </a>
    <a>
      <img id="manageLayer" src="@/assets/image/tuceng.png" @click="changeMapStyle">
    </a>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        //Control the two styles of layer switching
        mapStyle: [0,1,2],    
        currMapStyle: 0
      }
    },
    methods: {
      openSideContent() {
        this.$emit('open-close')
      },
      //The previously added layer is deleted after changing the mapstyle, and it has not been resolved yet
      changeMapStyle() {
        this.$emit('change-map-style',true)
        if(this.currMapStyle<2) {
          this.currMapStyle = this.currMapStyle + 1
        }else {
          this.currMapStyle = 0
        }
        if(this.currMapStyle === 0) {
          this.map.map.setStyle('mapbox://styles/mapbox/dark-v8')         
        }else if(this.currMapStyle === 1) {
          this.map.map.setStyle('mapbox://styles/mapbox/satellite-v9')
        }else if(this.currMapStyle === 2) {
          this.map.map.setStyle('mapbox://styles/mapbox/streets-v11')
        }
      }        
    }
  }
</script>

<style scoped>
  #touch-bar {
    z-index: 1;
    width: 50px;
    height: 200px;
    display: -webkit-flex; /* Safari */
    -webkit-flex-flow: row-reverse wrap; /* Safari 6.1+ */
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;

    /* 定位相关 */
    position: fixed;
    right: 5px;
    top: 70px;
  }
  #touch-bar img {
    margin: 5px;
    padding: 3px;
    background-color: rgb(181, 216, 216);
    width: 35px;
    height: 35px;
  }
</style>
