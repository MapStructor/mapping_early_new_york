//Note: All enable/disable functionily is removed because
//when disabled, everything is erased.


//let SKETCH_ENABLED = false;

const beforeMapDrawConfig = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true,
  },
  defaultMode: "draw_polygon",
});

const afterMapDrawConfig = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    //trash: true,
  },
  defaultMode: "draw_polygon",
});

// Added these lines after removing enable/disable functionality
$("#beforemap-drawing-controls").append(beforeMapDrawConfig.onAdd(beforeMap));
$("#aftermap-drawing-controls").append(afterMapDrawConfig.onAdd(afterMap));


//$("#sketch-dropdown").slideUp();

/*

function enable() {
  $("#disable-edit-mode").attr("disabled", false);
  $("#enable-edit-mode").attr("disabled", true);
  //   afterMap.addControl(draw)
  $("#beforemap-drawing-controls").html("");
  $("#aftermap-drawing-controls").html("");
  $("#beforemap-drawing-controls").append(beforeMapDrawConfig.onAdd(beforeMap));
  $("#aftermap-drawing-controls").append(afterMapDrawConfig.onAdd(afterMap));
  $("#sketch-dropdown").slideDown();
  SKETCH_ENABLED = true;

  // Change button text temporarily
  const enableButton = document.getElementById("enable-edit-mode");
  const originalText = enableButton.innerHTML;
  enableButton.innerHTML = "<i class='fa-solid fa-pencil'></i> <b>Enabling...</b>";
  setTimeout(() => {
      enableButton.innerHTML = originalText;
  }, 1000); // Reset text after 1 second

}

function disable() {
  $("#enable-edit-mode").attr("disabled", false);
  $("#disable-edit-mode").attr("disabled", true);
  beforeMap.removeControl(beforeMapDrawConfig);
  afterMap.removeControl(afterMapDrawConfig);
  $("#sketch-dropdown").slideUp();
  SKETCH_ENABLED = false;

  // Change button text temporarily
  const disableButton = document.getElementById("disable-edit-mode");
  const originalText = disableButton.innerHTML;
  disableButton.innerHTML = "<i class='fa-solid fa-pencil'></i> <b>Disabling...</b>";
  setTimeout(() => {
      disableButton.innerHTML = originalText;
  }, 1000); // Reset text after 1 second

}
*/

function createOrUpdateLabel(mapInstance, feature) {
  const coordinates = feature.geometry.type === 'Point' ? 
                      feature.geometry.coordinates : 
                      feature.geometry.coordinates[0][0];
  const labelId = feature.properties.title || 'no-title';

  var label = {
      id: labelId,
      type: "symbol",
      source: {
          type: "geojson",
          data: {
              type: "FeatureCollection",
              features: [{
                  type: "Feature",
                  properties: {
                      title: labelId,
                      icon: "circle",
                  },
                  geometry: {
                      type: "Point",
                      coordinates: coordinates,
                  },
              }],
          },
      },
      layout: {
          "text-font": ["Asap Medium"],
          "text-field": "{title}",
          "text-size": 18,
          "text-offset": [0, 1.5],
          "visibility": "visible"
      },
      paint: {
          "text-color": "#000000",
          "text-halo-width": 3,
          "text-halo-blur": 2,
          "text-halo-color": "#ffffff",
      },
  };

  if (mapInstance.getLayer(labelId)) {
      mapInstance.getSource(labelId).setData(label.source.data);
  } else {
      mapInstance.addLayer(label);
  }
}

// Event listener for feature selection changes
beforeMap.on("draw.selectionchange", e => onSelectFeature(e, "beforemap"));
afterMap.on("draw.selectionchange", e => onSelectFeature(e, "aftermap"));


function onSelectFeature(e, mapType) {
  const title = {
      aftermap: "aftermap-title-input",
      beforemap: "beforemap-title-input"
  }[mapType];
  const info = {
      aftermap: "aftermap-info-input",
      beforemap: "beforemap-info-input"
  }[mapType];

  if (e.features.length > 0) {
      const feature = e.features[0];
      document.getElementById(title).value = feature.properties.title || "";
      document.getElementById(info).value = feature.properties.info || "";
  }
}


// Update feature info and label
function updateFeatureInfo(mapType) {
  const draw = {
      aftermap: afterMapDrawConfig,
      beforemap: beforeMapDrawConfig
  }[mapType];
  const titleId = {
      aftermap: "aftermap-title-input",
      beforemap: "beforemap-title-input"
  }[mapType];
  const infoId = {
      aftermap: "aftermap-info-input",
      beforemap: "beforemap-info-input"
  }[mapType];

  const title = document.getElementById(titleId).value;
  const info = document.getElementById(infoId).value;
  const selectedFeatures = draw.getSelected();

  if (selectedFeatures.features.length > 0) {
      const feature = selectedFeatures.features[0];
      feature.properties.title = title;
      feature.properties.info = info;
      draw.setFeatureProperty(feature.id, "title", title);
      draw.setFeatureProperty(feature.id, "info", info);

      const mapInstance = mapType === 'aftermap' ? afterMap : beforeMap;
      createOrUpdateLabel(mapInstance, feature);
  } else {
      alert("No feature selected. Select a feature to update its information.");
  }
}




function downloadGeoJSON(mapType) {
    const draw = {
        aftermap: afterMapDrawConfig,
        beforemap: beforeMapDrawConfig
    }[mapType]
  const data = draw.getAll();
  if (data.features.length > 0) {
    const geojson = JSON.stringify(data);
    const blob = new Blob([geojson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "drawn_polygon.geojson";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    alert("No polygon to download. Draw a polygon first.");
  }
}

function handleFileUpload(mapType) {
    const draw = {
        aftermap: afterMapDrawConfig,
        beforemap: beforeMapDrawConfig
    }[mapType]
    const fileInputId = {
        aftermap: "aftermap-file_upload",
        beforemap: "beforemap-file_upload"
    }[mapType]
  const fileInput = document.getElementById(fileInputId);

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      draw.add(JSON.parse(contents));
      draw.changeMode("simple_select");
    };

    reader.readAsText(file);
  } else {
    alert("No file selected")
  }
}

document.getElementById('beforemap-info-input').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight > 200 ? 200 : this.scrollHeight) + 'px';
});



document.querySelectorAll('.mapboxgl-ctrl-group button').forEach(button => {
  button.addEventListener('click', () => {
      // Toggle the 'active' class on click
      button.classList.toggle('active');
  });
});

function updateLabelPosition(mapInstance, feature) {
  const coordinates = feature.geometry.type === 'Point' ? 
                      feature.geometry.coordinates : 
                      feature.geometry.coordinates[0][0];

  if (mapInstance.getSource(feature.properties.title)) {
      mapInstance.getSource(feature.properties.title).setData({
          type: "FeatureCollection",
          features: [{
              type: "Feature",
              properties: {
                  title: feature.properties.title || "No title set",
              },
              geometry: {
                  type: "Point",
                  coordinates: coordinates,
              }
          }]
      });
  }
}

// Event listeners for updating label position and removing labels
beforeMap.on('draw.update', function(e) {
  if (e.features.length > 0) {
      updateLabelPosition(beforeMap, e.features[0]);
  }
});

afterMap.on('draw.update', function(e) {
  if (e.features.length > 0) {
      updateLabelPosition(afterMap, e.features[0]);
  }
});

beforeMap.on('draw.delete', function(e) {
  if (e.features.length > 0) {
      removeLabel(beforeMap, e.features[0]);
  }
});

afterMap.on('draw.delete', function(e) {
  if (e.features.length > 0) {
      removeLabel(afterMap, e.features[0]);
  }
});


function removeLabel(mapInstance, feature) {
  if (mapInstance.getLayer(feature.properties.title)) {
      mapInstance.removeLayer(feature.properties.title);
      mapInstance.removeSource(feature.properties.title);
  }
}

