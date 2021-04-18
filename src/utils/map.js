import mapboxgl from "mapbox-gl"

export default {
  // Global function
  map: '',
  initMap: function(mapObj) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnVhYWhhbiIsImEiOiJja201dnk5dm0waWdhMm9ueGE2eHhhZnMwIn0.e9sT33Rk-Tk9onn_wSFX5A';
    const {
      zoom,
      center,
      divId,
      style,
      bearing,
      antialias,
      pitch
    } = mapObj;
    const map = new mapboxgl.Map({
      container: divId, // container ID
      style: style, // style URL
      center: center, // starting position [lng, lat]
      zoom: zoom, // starting zoom
      bearing: bearing,
      antialias: antialias,
      pitch: pitch
      });
    this.map = map;
    //Load 3D resources
    map.on('load', () => {
      // Insert the layer beneath any symbol layer
      var layers = map.getStyle().layers;     
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
          
            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    })
  },
  //Move to the layer to change the cursor
  changeCursor: function(layer) {
    // Change the cursor to a pointer when the mouse is over the states layer.
      this.map.on('mouseenter', layer, () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      
      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', layer, () => {
        this.map.getCanvas().style.cursor = '';
      });
  },
  //Move the cursor to the layer layer to change the layer state (color)
  changeLayerState: function(layer) {
    // When the user moves their mouse over the layer, we'll update the
    // feature state for the feature under the mouse.
    let that = this;
    let hoveredStateId=null;
    this.map.on("mousemove", layer, function(e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                that.map.setFeatureState({source: layer, id: hoveredStateId}, { hover: false});
            }
            hoveredStateId = e.features[0].id;
            that.map.setFeatureState({source: layer, id: hoveredStateId}, { hover: true});
        }
    });
    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    this.map.on("mouseleave", layer, () => {
        if (hoveredStateId) {
            this.map.setFeatureState({source: layer, id: hoveredStateId}, { hover: false});
        }
        hoveredStateId =  null;
    });
  },
  addPopup: function(layer) {
    //Click to get the feature information of the Link layer
    var that = this;
    //popup content
    var showInfo = '';

    this.map.on('click', layer, function(e) {
        console.log(e)
        var features = that.map.queryRenderedFeatures(e.point,{layers:[layer]});
        console.log(features)
        switch(layer) {
          case 'Link':
            showInfo = '<div class="makerTop"><h2 class="markerHear" > Link </h2></div>' +
            '<div class="markerBody" >';
            //Traverse the attribute value and attribute key in the object
            for(let key in features[0].properties) {
              if(key=='geometry') {
                //Skip the geometry field
                continue
              }else {
                showInfo += `<p>${key}: ${features[0].properties[key]}</p>`
              }
            }
            showInfo += '</div>' 
            break;
          case 'Node':
            showInfo = '<div class="makerTop"><h2 class="markerHear" > Node </h2></div>' +
            '<div class="markerBody" >'
            for(let key in features[0].properties) {
              if(key=='geometry') {
                //Skip the geometry field
                continue
              }else {
                showInfo += `<p>${key}: ${features[0].properties[key]}</p>`
              }
            }
            showInfo += '</div>' 
            break;  
          case 'Agent':
            showInfo = '<div class="makerTop"><h2 class="markerHear" > Agent </h2></div>' +
            '<div class="markerBody" >'
            for(let key in features[0].properties) {
              if(key=='geometry') {
                //Skip the geometry field
                continue
              }else {
                showInfo += `<p>${key}: ${features[0].properties[key]}</p>`
              }
            }
            showInfo += '</div>' 
            break;  
          case 'Zone':
            showInfo = '<div class="makerTop"><h2 class="markerHear" > Zone </h2></div>' +
            '<div class="markerBody" >'
              for(let key in features[0].properties) {
                if(key=='geometry') {
                  //Skip the geometry field
                  continue
                }else {
                  showInfo += `<p>${key}: ${features[0].properties[key]}</p>`
                }
              }
              showInfo += '</div>' 
              break;    
        }
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(showInfo)
          .addTo(that.map);
      });
  }
}