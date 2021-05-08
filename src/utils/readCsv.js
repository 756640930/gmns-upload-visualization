import XLSX from "xlsx"
import {
  toLineGeojson,
  toDemandGeojson,
  toNodeGeojson,
  toZoneGeojson,
  toZoneCenterGeojson,
  toPoiGeojson,
  toLgGeojson
  } from "@/utils/transform.js"
import {
  addLinkLayer,
  addNodeLayer,
  addAgentLayer,
  addZoneLayer,
  addZoneCenterLayer,
  addDemandLayer,
  addPoiLayer,
  addLgLayer
  } from "@/utils/addLayer.js"
import state from  "@/store/state.js"
import {
  fileTypeCheck
} from "@/utils/regexp.js"



    // input reads local excel files (deprecated)
    // function readWorkbookFromLocalFile(Map,features) {
    //   let that = this
    //   let resultFile = document.getElementById('file').files[0]
    //   console.log(resultFile)
    //   var reader = new FileReader();
    //   reader.readAsBinaryString(resultFile);
    //   reader.onload = function (e) {
    //     let fileContent = e.target.result
    //     var workbook = XLSX.read(fileContent, {type: 'binary'});
    //     console.log(workbook)
    //     let  worksheet = workbook.Sheets.Sheet1; 
    //     var json = XLSX.utils.sheet_to_json(worksheet);
    //     console.log(json)
    //     var fileType = fileTypeCheck(resultFile.name)
    //     switch(fileType) {
    //       case "link":
    //         features = toLineGeojson(json,features)
    //         addLinkLayer('Link',Map,features,'#adff2f',3); 
    //         break;
    //       case "node":
    //         features = toNodeGeojson(json,features)
    //         addNodeLayer('Node',Map,features,'#d3d3d3',4); 
    //         break;                      

    //     }
    //   }
    // }
    //How to read local files in elemnet_ui
    function elReadFile(file,Map) {
      let that = this
      console.log(file)
      let resultFile = file
      console.log(resultFile)
      var reader = new FileReader();
      reader.readAsBinaryString(resultFile);
      // Reading the file will trigger the onload asynchronous event, and you can use the callback function to get the final value.
      //Note that onload here is an asynchronous event
      reader.onload = function (e) {
        let fileContent = e.target.result
        var workbook = XLSX.read(fileContent, {type: 'binary'});
        console.log(workbook)
        let  worksheet = workbook.Sheets.Sheet1; // Here we only read the first sheet
        //Each line of information will be saved in json
        var json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json)
        var fileType = fileTypeCheck(resultFile.name)
        switch(fileType) {
          case "link":
            var link_features = []
            link_features = toLineGeojson('Link',json,link_features)
            //Add a layer (note that it needs to be added in the asynchronous function onload)
            console.log(link_features)
            addLinkLayer('Link',Map,link_features,'#adff2f',6); 
            //Map center center leap
            var linkCenter = link_features[0].geometry.coordinates[0]
            state.layerCenter.link = linkCenter
            console.log(linkCenter)
            Map.flyTo({
              center: linkCenter,
              speed: 4
              });
            break;
          case "grid2demand":
            var demand_features = []
            demand_features = toDemandGeojson('Demand',json,demand_features)
            //Add a layer (note that it needs to be added in the asynchronous function onload)
            console.log(demand_features)
            addDemandLayer('Demand',Map,demand_features,'#DDDDDD',2); 
            //Map center center leap
            var demandCenter = demand_features[0].geometry.coordinates[0]
            state.layerCenter.grid2demand = demandCenter
            console.log(demandCenter)
            Map.flyTo({
              center: demandCenter,
              speed: 4
              });
            break;
          case "agent":
              var agent_features = []
              agent_features = toLineGeojson('Agent',json,agent_features)
              //Add a layer (note that it needs to be added in the asynchronous function onload)
              console.log(agent_features)
              addAgentLayer('Agent',Map,agent_features,'white',8); 
              //Map center center leap
              var agentCenter = agent_features[0].geometry.coordinates[0]
              state.layerCenter.agent = agentCenter
              console.log(agentCenter)
              Map.flyTo({
                center: agentCenter,
                speed: 4
                });
              break;
          case "node":
            var node_features = []
            node_features = toNodeGeojson(json,node_features)
            //Add a layer (note that it needs to be added in the asynchronous function onload)
            console.log(node_features)
            addNodeLayer('Node',Map,node_features,'#5500FF',4); 
            //Map center center leap
            var nodeCenter = node_features[0].geometry.coordinates
            state.layerCenter.node = nodeCenter
            console.log(nodeCenter)
            Map.flyTo({
              center: nodeCenter,
              speed: 4
              });            
            break;  
          case "zone":
            var zone_features = []
            var zone_center_features = []
            zone_features = toZoneGeojson(json,zone_features)
            zone_center_features = toZoneCenterGeojson(json,zone_center_features)

            console.log(zone_features)
            addZoneLayer('Zone',Map,zone_features,'#088'); 
            addZoneCenterLayer('Zone-centers',Map,zone_center_features,'green',3); 

            var zoneCenter = []
            zoneCenter.push(zone_features[0].properties.centroid_x)
            zoneCenter.push(zone_features[0].properties.centroid_y)
            state.layerCenter.zone = zoneCenter
            console.log(zoneCenter)
            Map.flyTo({
              center: zoneCenter,
              speed: 4
              });            
            break; 
          case "lg2demand":
            var lg_features = []
            lg_features = toLgGeojson(json,lg_features)  
            console.log(lg_features)
            addLgLayer('Lg2demand',Map,lg_features,'#088'); 
  
            var lgCenter = lg_features[0].geometry.coordinates[0][0]
            state.layerCenter.lg2demand = lgCenter
            console.log(lgCenter)
            Map.flyTo({
              center: lgCenter,
              speed: 4
              });            
            break; 
          case "poi":
            var poi_features = []
            poi_features = toPoiGeojson(json,poi_features)
            addPoiLayer('Poi',Map,poi_features,'#227700'); 
            console.log(poi_features)
            var poiCenter = poi_features[0].geometry.coordinates[0][0]
            console.log(poiCenter)
            state.layerCenter.poi = poiCenter
            console.log(poiCenter)
            Map.flyTo({
              center: poiCenter,
              speed: 4
              });            
            break;                 
        }
      }
    }

  export {
    readWorkbookFromLocalFile,
    elReadFile
  }