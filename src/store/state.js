export default {
  //Control the pop-up window for switching layers
  ifLayerModal: false,
  //Number of agent variables
  agentNum: null,
  //Store the number of line segments divided by each agent
  agentArr: [],
  //Timer id array
  timerIdArr: [],
  // All uploaded files are managed here
  layerCenter: {
    link: [],
    node: [],
    zone: [],
    agent: [],
    grid2demand: [],
    poi: [],
    lg2demand: []
  },
  //File type management object
  fileNameArr: {
    'link': false,
    'node': false,
    'agent': false,
    'grid2demand': false,
    'zone': false,
    'poi': false,
    'lg2demand': false
  }
}