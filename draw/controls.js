//Note: All enable/disable functionily is removed because
//when disabled, everything is erased.

//let SKETCH_ENABLED = false;

if (urlParams.get("sketch") === "1") {
  // Initialize the FirebaseUI Widget using Firebase.
  // var ui = new firebaseui.auth.AuthUI(firebase.auth());
  const session = localStorage.getItem("SESSION_KEY")
  if(!session){
    window.location.href = 'sketch.html';
  } else {
    const url = "https://meny-backend.onrender.com/session"
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      session
    })
  }).then(blob => {
    blob.json()
  }).then(data => {
    if (data.message !== "valid"){
      localStorage.removeItem("SESSION_KEY")
      window.href = '/sketch.html'
    } else {
      console.log(data)
    }
  })
  }
  

  let isFileUploaded = false;
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

  function createOrUpdateLabel(mapInstance, feature) {
    const coordinates =
      feature.geometry.type === "Point"
        ? feature.geometry.coordinates
        : feature.geometry.coordinates[0][0];
    const labelId = feature.properties.Label || "no-title";

    var label = {
      id: labelId,
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                title: labelId,
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
        "text-font": ["Asap Medium"],
        "text-field": "{title}",
        "text-size": 18,
        "text-offset": [0, 1.5],
        visibility: "visible",
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
  beforeMap.on("draw.selectionchange", (e) => onSelectFeature(e, "beforemap"));
  afterMap.on("draw.selectionchange", (e) => onSelectFeature(e, "aftermap"));

  function onSelectFeature(e, mapType) {
    const title = {
      aftermap: "aftermap-title-input",
      beforemap: "beforemap-title-input",
    }[mapType];
    const info = {
      aftermap: "aftermap-info-input",
      beforemap: "beforemap-info-input",
    }[mapType];

    if (e.features.length > 0) {
      const feature = e.features[0];
      document.getElementById(title).value = feature.properties.Label || "";
      document.getElementById(info).value = feature.properties.info || "";
      document.getElementById(mapType + "-startdate-input").value =
        feature.properties.DayStart || "";
      document.getElementById(mapType + "-enddate-input").value =
        feature.properties.DayEnd || "";
      document.getElementById("startdate2").value = feature.properties.DayStart2;
      document.getElementById("beforemap-nid-input").value = feature.properties.nid;
    }
  }

// Update feature info and label
function updateFeatureInfo(mapType) {
  const draw = {
    aftermap: afterMapDrawConfig,
    beforemap: beforeMapDrawConfig,
  }[mapType];
  const titleId = {
    aftermap: "aftermap-title-input",
    beforemap: "beforemap-title-input",
  }[mapType];
  const infoId = {
    aftermap: "aftermap-info-input",
    beforemap: "beforemap-info-input",
  }[mapType];

  const title = document.getElementById(titleId).value;
  const info = document.getElementById(infoId).value;
  const startDate = document.getElementById(mapType + "-startdate-input").value;
  const endDate = document.getElementById(mapType + "-enddate-input").value;
  const nid = document.getElementById('beforemap-nid-input').value;
  const DayStart2 = document.getElementById('startdate2').value;

  const selectedFeatures = draw.getSelected();

  if (selectedFeatures.features.length > 0) {
    const feature = selectedFeatures.features[0];

    // Set the properties on the feature
    feature.properties.Label = title;
    feature.properties.info = info || undefined;
    feature.properties.DayStart = +startDate;
    feature.properties.DayEnd = +endDate;
    feature.properties.nid = +nid;
    feature.properties.changetext = '2';
    feature.properties.change = 1;
    feature.properties.DayStart2 = +DayStart2;

    // Update the feature properties in the draw configuration
    draw.setFeatureProperty(feature.id, "Label", title);
    if (info) draw.setFeatureProperty(feature.id, "info", info);
    draw.setFeatureProperty(feature.id, "DayStart", +startDate);
    draw.setFeatureProperty(feature.id, "DayStart2", +DayStart2);
    draw.setFeatureProperty(feature.id, "DayEnd", +endDate);
    draw.setFeatureProperty(feature.id, "nid", +nid);
    draw.setFeatureProperty(feature.id, "changetext", '2');
    draw.setFeatureProperty(feature.id, "change", 1);

    // Update label for the feature
    const mapInstance = mapType === "aftermap" ? afterMap : beforeMap;
    createOrUpdateLabel(mapInstance, feature);
  }
  saveGeoJSONData(draw)
}


function saveGeoJSONData(draw) {
  const data = draw.getAll();
  const geojson = JSON.stringify(data);
  console.log("Updating geojson data => ", data)

  const url = `https://storage.googleapis.com/upload/storage/v1/b/meny_geojsons_bucket/o?uploadType=media&name=info_of_interest.geojson`;
  fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: geojson,
  })
  .then(response => response.json())
  .then(data => {
      console.log("Success:", data);
  })
  .catch((error) => {
      console.error("Error:", error);
  });
}


// Event listeners for feature creation, update, and deletion
beforeMap.on("draw.create", () => saveGeoJSONData(beforeMapDrawConfig));
beforeMap.on("draw.update", () => saveGeoJSONData(beforeMapDrawConfig));
beforeMap.on("draw.delete", () => saveGeoJSONData(beforeMapDrawConfig));

afterMap.on("draw.create", () => saveGeoJSONData(afterMapDrawConfig));
afterMap.on("draw.update", () => saveGeoJSONData(afterMapDrawConfig));
afterMap.on("draw.delete", () => saveGeoJSONData(afterMapDrawConfig));


  function downloadGeoJSON(mapType) {
    const draw = {
      aftermap: afterMapDrawConfig,
      beforemap: beforeMapDrawConfig,
    }[mapType];
    const data = draw.getAll();

    if (isFileUploaded) {
      // Upload the updated GeoJSON to Google Cloud Storage
      const url = `https://storage.googleapis.com/upload/storage/v1/b/meny_geojsons_bucket/o?uploadType=media&name=info_of_interest.geojson`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          loadSelectedGeoJSON();
        });
    }

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
      beforemap: beforeMapDrawConfig,
    }[mapType];
    const fileInputId = {
      aftermap: "aftermap-file_upload",
      beforemap: "beforemap-file_upload",
    }[mapType];
    const fileInput = document.getElementById(fileInputId);

    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const contents = e.target.result;
        const data = JSON.parse(contents);
        draw.add(data);
        draw.changeMode("simple_select");

        // Create labels for each feature
        data.features.forEach((feature) => {
          createOrUpdateLabel(
            mapType === "aftermap" ? afterMap : beforeMap,
            feature
          );
        });
      };

      reader.readAsText(file);
    } else {
      alert("No file selected");
    }
  }

  document
    .getElementById("beforemap-info-input")
    .addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height =
        (this.scrollHeight > 200 ? 200 : this.scrollHeight) + "px";
    });

  document.querySelectorAll(".mapboxgl-ctrl-group button").forEach((button) => {
    button.addEventListener("click", () => {
      // Toggle the 'active' class on click
      button.classList.toggle("active");
    });
  });

  function updateLabelPosition(mapInstance, feature) {
    const coordinates =
      feature.geometry.type === "Point"
        ? feature.geometry.coordinates
        : feature.geometry.coordinates[0][0];

    if (mapInstance.getSource(feature.properties.title)) {
      mapInstance.getSource(feature.properties.title).setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              title: feature.properties.title || "No title set",
            },
            geometry: {
              type: "Point",
              coordinates: coordinates,
            },
          },
        ],
      });
    }
  }

  // Event listeners for updating label position and removing labels
  beforeMap.on("draw.update", function (e) {
    if (e.features.length > 0) {
      updateLabelPosition(beforeMap, e.features[0]);
    }
  });

  afterMap.on("draw.update", function (e) {
    if (e.features.length > 0) {
      updateLabelPosition(afterMap, e.features[0]);
    }
  });

  beforeMap.on("draw.delete", function (e) {
    if (e.features.length > 0) {
      removeLabel(beforeMap, e.features[0]);
    }
  });

  afterMap.on("draw.delete", function (e) {
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

  function loadSelectedGeoJSON() {
    const selector = document.getElementById("geojson-selector");
    const selectedFile = selector.value;
    if (selectedFile) {
      loadGeoJSON(selectedFile);
    }
  }

  function loadGeoJSON(filename) {
    const url =
      `https://storage.googleapis.com/meny_geojsons_bucket/${filename}` +
      "?nocache=" +
      new Date().getTime();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        beforeMapDrawConfig.set(data);
        isFileUploaded = true;
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }
}