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

afterMap.on("draw.selectionchange", e => onSelectFeature(e, "aftermap"));
beforeMap.on("draw.selectionchange", e => onSelectFeature(e, "beforemap"));

function onSelectFeature(e, mapType) {
    const title = {
        aftermap: "aftermap-title-input",
        beforemap: "beforemap-title-input"
    }[mapType]
    const info = {
        aftermap: "aftermap-info-input",
        beforemap: "beforemap-info-input"
    }[mapType]

  if (e.features.length > 0) {
    const feature = e.features[0];
    document.getElementById(title).value =
      feature.properties.title || "";
    document.getElementById(info).value = feature.properties.info || "";
    console.log(feature.geometry.coordinates)
    let coordinates;

    if (feature.geometry.coordinates.length === 2){
      coordinates = feature.geometry.coordinates;
    } else
     coordinates = feature.geometry.coordinates[0][0];
    console.log(coordinates)
  var label = {
    id: feature.properties.title,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              title: feature.properties.title || "No title set",
              icon: "circle",
            },
            geometry: {
              type: "Point",
              coordinates: coordinates,
            },
          },
        ],
      },
    },
    layout: {
      visibility: "visible",
      "text-font": ["Asap Medium"],
      "text-field": "{title}",
      "text-size": 18,
    },
    paint: {
      "text-color": "#000000",
      "text-halo-width": 3,
      "text-halo-blur": 2,
      "text-halo-color": "#ffffff",
    },
  };

  beforeMap.addLayer(label)
  }

  
}

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

      // Get the "Update Info" button for the current map type
      const updateButtonId = `${mapType}-update-info-button`; // Ensure this ID matches your button ID
      const updateButton = document.getElementById(updateButtonId);
      if (updateButton) {
          const originalText = updateButton.innerHTML;
          updateButton.innerHTML = "✓ Updated"; // Unicode checkmark
          // Reset the button text after a short delay
          setTimeout(() => {
              updateButton.innerHTML = originalText;
          }, 2000); // 2 seconds delay
      }
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