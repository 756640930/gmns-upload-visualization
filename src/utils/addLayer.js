import Mapbox from "./map.js"
import * as turf from "@turf/turf"
import state from  "@/store/state.js"


function addLinkLayer(id,map,features,color,width) {
  map.addSource(id, {
    'type': "geojson",
    'data': {
        "type": "FeatureCollection",
        "features": features
  }  
 });
  map.addLayer({
    'id': id,
    'type': 'line',
    'source': id,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': color,
      'line-width': width,
      'line-opacity': ["case",
      ["boolean", ["feature-state", "hover"], false],
      2,
      0.5
  ]
    }
  });  
  //Click on the layer to display the pop-up window
  Mapbox.addPopup('Link')
}

function addDemandLayer(id,map,features,color,width) {
  map.addSource(id, {
    'type': "geojson",
    'data': {
        "type": "FeatureCollection",
        "features": features
  }  
 });
  map.addLayer({
    'id': id,
    'type': 'line',
    'source': id,
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': color,
      'line-width': width,
      'line-opacity': ["case",
      ["boolean", ["feature-state", "hover"], false],
      2,
      0.5
  ]
    }
  });  
  Mapbox.addPopup('Link')
}

//Add agent layer and dynamic trajectory at the same time
function addAgentLayer(id,map,features,color,width) {
  // Only add up to 10 agents
  var agentNum = features.length>10 ? 10 : features.length
  state.agentNum = agentNum 
  var features = features.slice(0,agentNum) 
  var route = {
    'type': "geojson",
    'lineMetrics': true,    // Must-have conditions for line gradient
    'data': {
        "type": "FeatureCollection",
        "features": features
    }
  }
  map.addSource(id,route)
  map.addLayer({
    'id': id,
    'type': 'line',
    'source': id,
    'layout': {
      'visibility': 'visible',
      'line-join': 'round',
      'line-cap': 'round'
      },
    'paint': {
      'line-color': color,
      'line-width': width,
      'line-opacity': ["case",
        ["boolean", ["feature-state", "hover"], false],
        2,0.8]
      }   
  })
  // Line scrolling display effect
  var totalTime1 = 0
  var totalTime2 = 5

  for(let j=0; j<agentNum; j++) {
    // Create a line
    let lineCount = turf.lineString(features[j].geometry.coordinates);
    // The unit of dividing line segment is mile, 0.1 means dividing once every 100 meters
    let chunk = turf.lineChunk(lineCount, 0.3, {units: 'miles'});
    //Stored in the state to facilitate the deletion of the layer corresponding to the id
    state.agentArr[j] = chunk.features.length
    let colorNum = 0
    var colorList = ['red', 'rgba(255,255,255,0)', 'blue', 'rgba(255,255,255,0)', 'green', 'rgba(255,255,255,0)']
    for (let i = 0; i < chunk.features.length; i++) {
      let oneMarker = chunk.features[i].geometry.coordinates
      let pageNum = i % 6
      let lineName = 'lineAllCount_' + j + '_' + i
      // Draw a gradient line
      // Add data source
      map.addSource(lineName, {
        'type': 'geojson',
        'lineMetrics': true,    
        'data': chunk.features[i]
        });
        // Add a line
        map.addLayer({
          'id': lineName,
          'source': lineName,
          'type': 'line',
          'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
            },
          'paint': {
            'line-color': colorList[pageNum],
            'line-width': 3,
          }
        });
      }
      //The timer dynamically changes the color of the line
      let timer = setInterval(() => {
        colorNum++
        for (let i = 0; i < chunk.features.length; i++) {
          let oneMarker = chunk.features[i].geometry.coordinates
          let countNumShow = colorNum % 6
          let pageNum = i % 6
          let lineName = 'lineAllCount_' + j + '_' + i
          let totalNum = pageNum - countNumShow
          if (totalNum <= 0) {
            map.setPaintProperty(lineName, 'line-color', colorList[5 - Math.abs(totalNum)])
            }
          if (totalNum > 0) {
            map.setPaintProperty(lineName, 'line-color', colorList[totalNum - 1])
            }
          }
          // Trigger the rendering of a display box. When using a custom layer, when the layer changes, use this method to de-render.
          // Calling this method multiple times before rendering the next display box will only render once
          map.triggerRepaint();
      }, 500);
      //Store the id of each timer
      state.timerIdArr.push(timer)
  }
  console.log(state.timerIdArr)
  Mapbox.addPopup('Agent')
}


function addNodeLayer(id,map,features,color,radius) {
  map.addSource(id, {
    'type': "geojson",
    'data': {
        "type": "FeatureCollection",
        "features": features
  }  
 });
  map.addLayer({
    'id': id,
    'type': 'circle',
    'source': id,
    'paint': {
      'circle-radius': radius,
      'circle-color': color,
      'circle-opacity': ["case",
      ["boolean", ["feature-state", "hover"], false],
      2,
      0.5
  ]
    }
  });   
  Mapbox.addPopup('Node')
}

function addZoneLayer(id,map,features,color) {
  map.addSource(id, {
    'type': "geojson",
    'data': {
      "type": "FeatureCollection",
      "features": features
  }  
 });
  map.addLayer({
    "id": id+'-borders',
    "type": "line",
     "source": id,
    "layout": {},
    "paint": {
    "line-color": "#627BC1",
    "line-width": 2
    }
  });
  map.addLayer({
    'id': id,
    'type': 'fill',
    'source': id,
    'layout': {},
    'paint': {
    'fill-color': color,
    'fill-opacity': ["case",
      ["boolean",["feature-state","hover"],false],
      0.4,
      0.2
    ]
    }
  });
  Mapbox.addPopup('Zone')
}
function addPoiLayer(id,map,features,color) {
  map.addSource(id, {
    'type': "geojson",
    'data': {
      "type": "FeatureCollection",
      "features": features
  }  
 });
  map.addLayer({
    "id": id+'-borders',
    "type": "line",
     "source": id,
    "layout": {},
    "paint": {
    "line-color": "#627BC1",
    "line-width": 2
    }
  });
  map.addLayer({
    'id': id,
    'type': 'fill',
    'source': id,
    'layout': {},
    'paint': {
    'fill-color': color,
    'fill-opacity': ["case",
      ["boolean",["feature-state","hover"],false],
      0.9,
      0.7
    ]
    }
  });
  Mapbox.addPopup('Poi')
}
function addZoneCenterLayer(id,map,features,color,radius) {
  map.addSource(id, {
    'type': "geojson",
    'data': {
      "type": "FeatureCollection",
      "features": features
  }  
 });
 map.addLayer({
  'id': id,
  'type': 'circle',
  'source': id,
  'paint': {
    'circle-radius': radius,
    'circle-color': color
  }
}); 
}


export {
  addLinkLayer,
  addNodeLayer,
  addAgentLayer,
  addZoneLayer,
  addZoneCenterLayer,
  addDemandLayer,
  addPoiLayer
}