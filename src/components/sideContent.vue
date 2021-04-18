<template>
  <div>
    <el-card class="box-card" shadow="always">
      <!-- <div class="text item">
        <input type="file" 
        id="file" 
        multiple="multiple"
        @change="input" />
      </div> -->
      <el-upload
        ref="upload"
        class="upload-demo"
        action="alert"
        :auto-upload="false"
        :on-change="handleChange"
        :file-list="fileList"
        :on-remove="removeFile"
        :on-preview="goToCenter"
        multiple
        :limit="5">
        <el-button size="small" type="primary">Click upload</el-button>
        <div slot="tip" class="el-upload__tip">Only allow uploading of OSM2GMNS or Grid2demand files</div>
      </el-upload>
    </el-card>
  </div>
</template>
<script>
  import {
    fileNameRegexp,
    fileTypeCheck,
    fileInfoCheck
  } from "@/utils/regexp.js"

  export default {
    data () {
      return {   
        fileList: []           
      }
    },
    methods: {
      changeMapStyle() {
        this.$message('All files are removed');
        this.$refs.upload.clearFiles();
        this.$store.state.fileNameArr.link = false
        this.$store.state.fileNameArr.node = false
        this.$store.state.fileNameArr.agent = false
        this.$store.state.fileNameArr.demand = false
        this.$store.state.fileNameArr.zone = false
      },
      handleChange(file, fileList) {
        //Judge the file name before uploading, it’s not the relevant file that prompts an error
        var ifGmnsFile = fileNameRegexp(file.name)
        var fileCheckInfo = fileInfoCheck(file.name)
        if(!ifGmnsFile) {
          this.$message.error('Please upload a OSM2GMNS file');
          return false
        }else if(fileCheckInfo.ifExist) {
          var errorMsg = 'You already have a type of ' + fileCheckInfo.fileType + ' file';
          this.$message.error(errorMsg);
          return false
        }else {        
          this.fileList = fileList.slice(-5);
          this.$emit('readFile',file.raw)
        }
      },
      goToCenter(file) {
        var fileType = fileTypeCheck(file.name)
        switch(fileType) {
          case 'link':
            this.map.map.flyTo({
              center: this.$store.state.layerCenter.link,
              speed: 4
            });
            break; 
          case 'node':
            this.map.map.flyTo({
              center: this.$store.state.layerCenter.node,
              speed: 4
            });
            break; 
          case 'agent':
            this.map.map.flyTo({
              center: this.$store.state.layerCenter.agent,
              speed: 4
            });
            break; 
          case 'zone':
            this.map.map.flyTo({
              center: this.$store.state.layerCenter.zone,
              speed: 4
            });
            break; 
          case 'demand':
            this.map.map.flyTo({
              center: this.$store.state.layerCenter.demand,
              speed: 4
            });
            break; 
        }
      },
      //Remove every line segment cut by the agent
      removeAgentArr() {
        for(let i=0; i<this.$store.state.agentNum; i++) {
          for(let j=0; j<this.$store.state.agentArr[i]; j++) {
            var id = 'lineAllCount_' + i + '_' + j
            this.map.map.removeLayer(id)
            this.map.map.removeSource(id)             
          }
        };
        this.$store.state.agentNum = null
        this.$store.state.agentNumArr = []
        //Also clear the timer
        this.$store.state.timerIdArr.forEach(function(value,index) {
          clearInterval(value)
        })
      },
      removeFile(file,fileList) {
        var fileType = fileTypeCheck(file.name)
        if(fileType==='node') {
          this.map.map.removeLayer('Node')
          this.map.map.removeSource('Node')
          //Clear the status of whether this type exists
          this.$store.state.fileNameArr.node = false
        }else if(fileType==='link') {
          this.map.map.removeLayer('Link')
          this.map.map.removeSource('Link')  
          this.$store.state.fileNameArr.link = false       
        }else if(fileType==='agent') {
          this.map.map.removeLayer('Agent')
          this.map.map.removeSource('Agent') 
          this.$store.state.fileNameArr.agent = false
          this.removeAgentArr()         
        }else if(fileType==='zone') {
          this.map.map.removeLayer('Zone')
          this.map.map.removeLayer('Zone-borders')
          this.map.map.removeLayer('Zone-centers')
          this.map.map.removeSource('Zone')   
          this.map.map.removeSource('Zone-centers') 
          this.$store.state.fileNameArr.zone = false          
        }else if(fileType==='demand') {
          this.map.map.removeLayer('Demand')
          this.map.map.removeSource('Demand')  
          this.$store.state.fileNameArr.demand = false          
        }
      }
    }
  }
</script>

<style scoped>
  .el-card {
    border: rgba(37,39,47);
  }
  .box-card {
    width: 300px;
    /* height: 600px; */
    position: fixed;
    top:70px;
    left: 20px;
    bottom: 40px;
    z-index: 1;
    background-color: rgba(37,39,47);
  }
  .upload-demo {
    height: 400px;
  }
  .el-upload__tip {
    color: rgb(207, 200, 200);
  }
</style>
