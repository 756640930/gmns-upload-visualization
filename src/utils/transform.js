    //Convert the coordinate information in the json of Link and agent into array format
    function toLineGeojson(name,json,features) {
      //Used to store all coordinate data in a file
      var geometry_arr = []    //An array used to store coordinate data in a row
      var geometry_str = ''
      var begain
      var last
      for(var j=0; j<json.length; j++) {
        //Convert all coordinates in the array into a geojson source
        var feature = {
          'type': "Feature",
          'properties': {},
          'geometry': {
            'type': "LineString",
            'coordinates': []
          },
          'id': ''
        }
        //Store the information of each line in properties
        feature.properties = json[j]
        //This method agent and link are both in use, so you have to judge
        if(name=='Link') {
          feature.id = json[j].link_id
        }else if(name=='Agent') {
          feature.id = json[j].agent_id
        }
        //Start to convert the coordinate data format into an array type
        begain = json[j].geometry.indexOf("(")
        last = json[j].geometry.indexOf(")")
        geometry_str = json[j].geometry.slice(begain+1,last)
        geometry_arr = geometry_str.split(",")
        for(let i=0; i<geometry_arr.length; i++) {
          if(geometry_arr[i].indexOf(" ")==0){
            //Remove the first space
            geometry_arr[i] = geometry_arr[i].slice(1)
            geometry_arr[i] = geometry_arr[i].split(" ")
          }else {
            geometry_arr[i] = geometry_arr[i].split(" ")
          }
          //Force string to number
          geometry_arr[i][0] = Number(geometry_arr[i][0])
          geometry_arr[i][1] = Number(geometry_arr[i][1])
        }  
        feature.geometry.coordinates = geometry_arr
        features.push(feature)
      }
      console.log(features)
      return features
  };
  //Demand.csv file data conversion
  function toDemandGeojson(name,json,features) {
    //Used to store all coordinate data in a file
    var geometry_arr = []    //Array used to store coordinate data in a row
    var geometry_str = ''
    var begain
    var last
    for(var j=0; j<json.length; j++) {
      //Convert all coordinates in the array into a geojson source
      var feature = {
        'type': "Feature",
        'properties': {},
        'geometry': {
          'type': "LineString",
          'coordinates': []
        },
        'id': ''
      }
      //OD's demand does not need to be clicked to display detailed information
      // feature.properties = json[j]
      //Start to convert the coordinate data format into an array type
      begain = json[j].geometry.indexOf("(")
      last = json[j].geometry.indexOf(")")
      geometry_str = json[j].geometry.slice(begain+1,last)
      geometry_arr = geometry_str.split(",")
      for(let i=0; i<geometry_arr.length; i++) {
        if(geometry_arr[i].indexOf(" ")==0){
          //Remove the first space
          geometry_arr[i] = geometry_arr[i].slice(1)
          geometry_arr[i] = geometry_arr[i].split(" ")
        }else {
          geometry_arr[i] = geometry_arr[i].split(" ")
        }
        //Force string to number
        geometry_arr[i][0] = Number(geometry_arr[i][0])
        geometry_arr[i][1] = Number(geometry_arr[i][1])
      }  
      feature.geometry.coordinates = geometry_arr
      features.push(feature)
    }
    console.log(features)
    return features
};
  //Convert node's json to geojson
  function toNodeGeojson(json,features) {
    for(var j=0; j<json.length; j++) {
      //Convert all coordinates in the array into a geojson source
      var feature = {
        'type': "Feature",
        'properties': {},
        'geometry': {
          'type': "Point",
          'coordinates': []
        },
        'id': ''
      }; 
      feature.properties = json[j];
      feature.geometry.coordinates[0] =json[j].x_coord
      feature.geometry.coordinates[1] =json[j].y_coord  
      feature.id = json[j].node_id
      features.push(feature)
    }  
    return features 
  };
  function toZoneGeojson(json,features) {
    var geometry_arr = []    //An array used to store coordinate data in a row
    var geometry_str = ''
    var begain
    var last
    for(var j=0; j<json.length; j++) {
      var feature = {
        'type': "Feature",
        'properties': {},
        'geometry': {
          'type': "Polygon",
          'coordinates': []
        },
        'id': ''
      }  
      feature.properties = json[j] 
      feature.id = json[j].zone_id
      //Start to convert the coordinate data format into an array type
      if(json[j].geometry) {
        begain = json[j].geometry.indexOf("(")
        last = json[j].geometry.indexOf(")")
        // polygon是（（ ））
        geometry_str = json[j].geometry.slice(begain+2,last)
        geometry_arr = geometry_str.split(",")
        for(let i=0; i<geometry_arr.length; i++) {
          if(geometry_arr[i].indexOf(" ")==0){
            //Remove the first space
            geometry_arr[i] = geometry_arr[i].slice(1)
            geometry_arr[i] = geometry_arr[i].split(" ")
          }else {
            geometry_arr[i] = geometry_arr[i].split(" ")
          }
          //Force string to number
          geometry_arr[i][0] = Number(geometry_arr[i][0])
          geometry_arr[i][1] = Number(geometry_arr[i][1])
        }  
        feature.geometry.coordinates.push(geometry_arr)
        features.push(feature)
      }
    } 
    return features 
  }
  function toPoiGeojson(json,features) {
    var geometry_arr = []    //An array used to store coordinate data in a row
    var geometry_str = ''
    var begain
    var last
    for(var j=0; j<json.length; j++) {
      var feature = {
        'type': "Feature",
        'properties': {},
        'geometry': {
          'type': "Polygon",
          'coordinates': []
        }, 
        'id': ''
      }  
      feature.properties = json[j] 
      feature.id = json[j].poi_id
      //Start to convert the coordinate data format into an array type
      var multiPattern = /multipolygon/i
      var ploPattern = /polygon/i
      if(json[j].geometry) {
        console.log(multiPattern.test(json[j].geometry))
        console.log(ploPattern.test(json[j].geometry))
        if(multiPattern.test(json[j].geometry)) {
          geometry_arr = json[j].geometry.match(/\(\((.*?)\)\)/g)
          console.log(geometry_arr)
          for(var k=0; k<geometry_arr.length; k++) {
            geometry_arr[k] = geometry_arr[k].replace(/\(\(\(|\(\(|\)\)|\)\)\)/g,"")
            geometry_arr[k] = geometry_arr[k].split(",")
            for(var l=0; l<geometry_arr[k].length; l++) {
              if(geometry_arr[k][l].indexOf(" ")==0) {
                geometry_arr[k][l] = geometry_arr[k][l].slice(1)
              }
              geometry_arr[k][l] = geometry_arr[k][l].split(" ")
              geometry_arr[k][l][0] = Number(geometry_arr[k][l][0])
              geometry_arr[k][l][1] = Number(geometry_arr[k][l][1])
            }
          }
          console.log(geometry_arr)
          feature.geometry.coordinates = geometry_arr
          features.push(feature)
        }else if(ploPattern.test(json[j].geometry)) {
          begain = json[j].geometry.indexOf("(")
          last = json[j].geometry.indexOf(")")
          // polygon是（（ ））
          geometry_str = json[j].geometry.slice(begain+2,last)
          geometry_arr = geometry_str.split(",")
          for(let i=0; i<geometry_arr.length; i++) {
            if(geometry_arr[i].indexOf(" ")==0){
              //Remove the first space
              geometry_arr[i] = geometry_arr[i].slice(1)
              geometry_arr[i] = geometry_arr[i].split(" ")
            }else {
              geometry_arr[i] = geometry_arr[i].split(" ")
            }
            //Force string to number
            geometry_arr[i][0] = Number(geometry_arr[i][0])
            geometry_arr[i][1] = Number(geometry_arr[i][1])
          }  
          feature.geometry.coordinates.push(geometry_arr)
          features.push(feature)
        }
      }
    } 
    return features 
  }
  //return all char position
  function searchSubStr(str,subStr,positions){
    var pos = str.indexOf(subStr);
    while(pos>-1){
        positions.push(pos);
        pos = str.indexOf(subStr,pos+1);
    }
  }
  function toZoneCenterGeojson(json,features) {
    for(var j=0; j<json.length; j++) {
      var feature = {
        'type': "Feature",
        'properties': {},
        'geometry': {
          'type': "Point",
          'coordinates': []
        }
      }; 
      if(json[j].geometry) {
        feature.geometry.coordinates[0] = json[j].centroid_x
        feature.geometry.coordinates[1] = json[j].centroid_y
      }  
      features.push(feature)    
    }
    return features
  }
  export {
    toLineGeojson,
    toDemandGeojson,
    toNodeGeojson,
    toZoneGeojson,
    toZoneCenterGeojson,
    toPoiGeojson
  }
