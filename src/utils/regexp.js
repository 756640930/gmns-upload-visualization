import state from  "@/store/state.js"
// import { node } from "webpack"

//Regular expression to match file name
function fileNameRegexp(fileName) {
  var pattern = /zone|link|node|demand|agent|poi|lgdemand/i
  return pattern.test(fileName)
}
//Determine whether the file type already exists
function fileInfoCheck(fileName) {
  // var zoneType = /zone/i
  // var linkType = /link/i
  // var nodeType = /node/i
  // var demandType = /demand/i
  // var agentType = /agent/i
  var fileType = null
  var fileTypeRegArr = [/zone/i, /link/i, /node/i, /demand/i, /agent/i, /poi/i, /lgdemand/i]
  var fileTypeArr = ['zone', 'link', 'node', 'demand', 'agent', 'poi', 'lgdemand']
  var fileCheckInfo = {
    ifExist: false,
    fileType: null
  }
  for(let i=0; i<fileTypeRegArr.length; i++) {
    if(fileTypeRegArr[i].test(fileName)) {
      fileType = fileTypeArr[i];
      break;
    }
  }
  console.log(state.fileNameArr.fileType)
  console.log(state.fileNameArr)
  console.log(fileCheckInfo)
  switch(fileType) {
    case 'node':
      fileCheckInfo.fileType = 'node'
      if(state.fileNameArr.node) {
        fileCheckInfo.ifExist = true;
      }else {
        fileCheckInfo.ifExist = false;
        state.fileNameArr.node = true
      }
      break;
    case 'link':
      fileCheckInfo.fileType = 'link'
      if(state.fileNameArr.link) {
        fileCheckInfo.ifExist = true;
      }else {
        fileCheckInfo.ifExist = false;
        state.fileNameArr.link = true
      }
      break;
    case 'agent':
      fileCheckInfo.fileType = 'agent'
      if(state.fileNameArr.agent) {
        fileCheckInfo.ifExist = true;
      }else {
        fileCheckInfo.ifExist = false;
        state.fileNameArr.agent = true
      }
      break;
    case 'demand':
      fileCheckInfo.fileType = 'demand'
      if(state.fileNameArr.demand) {
        fileCheckInfo.ifExist = true;
      }else {
        fileCheckInfo.ifExist = false;
        state.fileNameArr.demand = true
      }
      break;
    case 'zone':
      fileCheckInfo.fileType = 'zone'
      if(state.fileNameArr.zone) {
        fileCheckInfo.ifExist = true;
      }else {
        fileCheckInfo.ifExist = false;
        state.fileNameArr.zone = true
      }
      break;
    case 'poi':
      fileCheckInfo.fileType = 'poi'
      if(state.fileNameArr.poi) {
        fileCheckInfo.ifExist = true;
      }else {
        fileCheckInfo.ifExist = false;
        state.fileNameArr.poi = true
      }
      break;
    case 'lgdemand':
        fileCheckInfo.fileType = 'lgdemand'
        if(state.fileNameArr.lgdemand) {
          fileCheckInfo.ifExist = true;
        }else {
          fileCheckInfo.ifExist = false;
          state.fileNameArr.lgdemand = true
          }
        break;
  }
  // if(state.fileNameArr[fileType]) {
  //   fileCheckInfo.ifExist = true;
  //   fileCheckInfo.fileType = fileType
  // }else {
  //   state.fileNameArr[fileType] = true
  //   fileCheckInfo.ifExist = false;
  //   fileCheckInfo.fileType = fileType
  // }
  return fileCheckInfo;
}

//Return file type
function fileTypeCheck(fileName) {
  var fileType = null
  var fileTypeRegArr = [/zone/i, /link/i, /node/i, /demand/i,/agent/i,/poi/i,/lgdemand/i]
  var fileTypeArr = ['zone', 'link', 'node', 'demand', 'agent', 'poi', 'lgdemand']
  for(let i=0; i<fileTypeRegArr.length; i++) {
    if(fileTypeRegArr[i].test(fileName)) {
      fileType = fileTypeArr[i];
      break;
    }
  }
  return fileType;
}
export {
  fileNameRegexp,
  fileTypeCheck,
  fileInfoCheck,

}