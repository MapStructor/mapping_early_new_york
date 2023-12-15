//////////////////
// Dynamic Layers
//////////////////

function addBeforeLayers(_, date) {
  /////////////////
  //NAHC POINTS MAP
  /////////////////

  //REMOVING TAX LOT POINTS IF EXIST
  if (beforeMap.getLayer("lot_events-bf43eb-left"))
    beforeMap.removeLayer("lot_events-bf43eb-left");
  if (beforeMap.getSource("lot_events-bf43eb"))
    beforeMap.removeSource("lot_events-bf43eb");
  if (beforeMap.getLayer("dutch_grants-5ehfqe-left"))
    beforeMap.removeLayer("dutch_grants-5ehfqe-left");
  if (beforeMap.getSource("dutch_grants-5ehfqe"))
    beforeMap.removeSource("dutch_grants-5ehfqe");

  //ADD GRANTS POLYGONS
  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "dutch_grants-5ehfqe-left-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.7q2vs9ar",
    },
    layout: {
      visibility: document.getElementById("grants_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "dutch_grants-5ehfqe",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0,
      ],
      "fill-outline-color": "#FF0000",
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "dutch_grants-5ehfqe-left",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.7q2vs9ar",
    },
    layout: {
      visibility: document.getElementById("grants_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "dutch_grants-5ehfqe",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.5,
      ],
      "fill-outline-color": "#000000",
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "dutch_grants-5ehfqe-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "dutch_grants-5ehfqe-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredDutchGrantIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-left",
            sourceLayer: "dutch_grants-5ehfqe",
            id: hoveredDutchGrantIdLeft,
          },
          { hover: false }
        );
      }
      hoveredDutchGrantIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-left",
          sourceLayer: "dutch_grants-5ehfqe",
          id: hoveredDutchGrantIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      if (
        typeof dutch_grant_lots_info[e.features[0].properties.Lot] ==
        "undefined"
      ) {
        PopUpHTML =
          "<div class='infoLayerDutchGrantsPopUp'>" +
          e.features[0].properties.name +
          "<br>";
      } else {
        PopUpHTML =
          "<div class='infoLayerDutchGrantsPopUp'>" +
          (dutch_grant_lots_info[e.features[0].properties.Lot].name_txt.length >
          0
            ? dutch_grant_lots_info[e.features[0].properties.Lot].name_txt
            : e.features[0].properties.name) +
          "<br>";
      }
      PopUpHTML +=
        "<b>Dutch Grant Lot: </b>" + e.features[0].properties.Lot + "</div>";

      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapDutchGrantPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "dutch_grants-5ehfqe-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredDutchGrantIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-left",
          sourceLayer: "dutch_grants-5ehfqe",
          id: hoveredDutchGrantIdLeft,
        },
        { hover: false }
      );
    }
    hoveredDutchGrantIdLeft = null;
    if (beforeMapDutchGrantPopUp.isOpen()) beforeMapDutchGrantPopUp.remove();
  });

  //ADD TAX LOT POINTS
  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "lot_events-bf43eb-left",
    type: "circle",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.9s9s67wu",
    },
    layout: {
      visibility: document.getElementById("circle_point").checked
        ? "visible"
        : "none",
    },
    "source-layer": "lot_events-bf43eb",
    paint: {
      //CIRCLE COLOR
      "circle-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },

      //CIRCLE OPACITY
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],

      //CIRCLE RADIUS
      "circle-radius": {
        type: "categorical",
        property: "TAXLOT",
        stops: [["C7", 9]],
      },
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  // CHANGE TO CURSOR WHEN HOVERING
  beforeMap.on("mouseenter", "lot_events-bf43eb-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";

    if (hoveredStateIdLeftCircle) {
      beforeMap.setFeatureState(
        {
          source: "lot_events-bf43eb-left",
          sourceLayer: "lot_events-bf43eb",
          id: hoveredStateIdLeftCircle,
        },
        { hover: false }
      );
    }
    hoveredStateIdLeftCircle = e.features[0].id;
    beforeMap.setFeatureState(
      {
        source: "lot_events-bf43eb-left",
        sourceLayer: "lot_events-bf43eb",
        id: hoveredStateIdLeftCircle,
      },
      { hover: true }
    );

    var coordinates = e.features[0].geometry.coordinates.slice();

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    beforeMapPopUp
      .setLngLat(coordinates)
      .setHTML(
        "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
          e.features[0].properties.TAXLOT +
          "' target='_blank'>" +
          e.features[0].properties.TAXLOT +
          "</a></h2></b></div>"
      )
      .addTo(beforeMap);
  });

  // CHANGE TO POINTER WHEN NOT HOVERING
  beforeMap.on("mouseleave", "lot_events-bf43eb-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredStateIdLeftCircle) {
      beforeMap.setFeatureState(
        {
          source: "lot_events-bf43eb-left",
          sourceLayer: "lot_events-bf43eb",
          id: hoveredStateIdLeftCircle,
        },
        { hover: false }
      );
    }
    hoveredStateIdLeftCircle = null;
    if (beforeMapPopUp.isOpen()) beforeMapPopUp.remove();
  });
}

function addGrantLotsBeforeLayers(date) {
  //REMOVING TAX LOT POINTS IF EXIST
  if (beforeMap.getLayer("grant-lots-left"))
    beforeMap.removeLayer("grant-lots-left");
  if (beforeMap.getSource("demo_divisions_grant_c7-42w8pa"))
    beforeMap.removeSource("demo_divisions_grant_c7-42w8pa");

  // Add a layer showing the places.
  beforeMap.addLayer({
    id: "grant-lots-left",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.26xwjv4e",
    },
    layout: {
      visibility: document.getElementById("grant_lots").checked
        ? "visible"
        : "none",
    },
    "source-layer": "demo_divisions_grant_c7-42w8pa",
    paint: {
      "fill-color": "#088",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.5,
      ],
      "fill-outline-color": "#FF0000",
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "grant-lots-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapGrantLotPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "grant-lots-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredGrantLotIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "grant-lots-left",
            sourceLayer: "demo_divisions_grant_c7-42w8pa",
            id: hoveredGrantLotIdLeft,
          },
          { hover: false }
        );
      }
      hoveredGrantLotIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "grant-lots-left",
          sourceLayer: "demo_divisions_grant_c7-42w8pa",
          id: hoveredGrantLotIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML =
        "<div class='infoLayerGrantLotsPopUp'>" +
        e.features[0].properties.name +
        "<br>" +
        "<b>Start:</b> " +
        e.features[0].properties.day1 +
        ", " +
        e.features[0].properties.year1 +
        "<br>" +
        "<b>End:</b> " +
        e.features[0].properties.day2 +
        ", " +
        e.features[0].properties.year2 +
        "<br>" +
        //"<br>" +
        "<b>Lot Division: </b>" +
        e.features[0].properties.dutchlot +
        "</div>";

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapGrantLotPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "grant-lots-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredGrantLotIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "grant-lots-left",
          sourceLayer: "demo_divisions_grant_c7-42w8pa",
          id: hoveredGrantLotIdLeft,
        },
        { hover: false }
      );
    }
    hoveredGrantLotIdLeft = null;
    if (beforeMapGrantLotPopUp.isOpen()) beforeMapGrantLotPopUp.remove();
  });
}

function addGrantLotsLinesBeforeLayers(date) {
  //REMOVING TAX LOT POINTS IF EXIST
  if (beforeMap.getLayer("grant-lots-lines-left"))
    beforeMap.removeLayer("grant-lots-lines-left");
  if (beforeMap.getSource("dutch_grants_lines-0y4gkx"))
    beforeMap.removeSource("dutch_grants_lines-0y4gkx");

  // Add a layer showing the places.
  beforeMap.addLayer({
    id: "grant-lots-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.7dw0tqar",
    },
    layout: {
      visibility: document.getElementById("grants_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "dutch_grants_lines-0y4gkx",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });
}

////////////////////////////
// Gravesend Dynamic Layers
////////////////////////////

function addGravesendBeforeLayers(date) {
  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "gravesend_boundaries-c6qrbw-left-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.5q4mas7d",
    },
    layout: {
      visibility: document.getElementById("gravesend_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "brooklyn_grants-7qxrvu",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0,
      ],
      "fill-outline-color": "#FF0000",
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "gravesend_boundaries-c6qrbw-left",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.5q4mas7d",
    },
    layout: {
      visibility: document.getElementById("gravesend_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "brooklyn_grants-7qxrvu",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.45,
      ],
      "fill-outline-color": "#FF0000",
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "gravesend_boundaries-c6qrbw-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapGravesendTwoPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "gravesend_boundaries-c6qrbw-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredGravesendIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "gravesend_boundaries-c6qrbw-left",
            sourceLayer: "brooklyn_grants-7qxrvu",
            id: hoveredGravesendIdLeft,
          },
          { hover: false }
        );
      }
      hoveredGravesendIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "gravesend_boundaries-c6qrbw-left",
          sourceLayer: "brooklyn_grants-7qxrvu",
          id: hoveredGravesendIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      PopUpHTML +=
        "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" +
        e.features[0].properties.Name +
        "</div>";

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapGravesendTwoPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "gravesend_boundaries-c6qrbw-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredGravesendIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "gravesend_boundaries-c6qrbw-left",
          sourceLayer: "brooklyn_grants-7qxrvu",
          id: hoveredGravesendIdLeft,
        },
        { hover: false }
      );
    }
    hoveredGravesendIdLeft = null;
    if (beforeMapGravesendTwoPopUp.isOpen())
      beforeMapGravesendTwoPopUp.remove();
  });
}

function addGravesendLinesBeforeLayers(date) {
  beforeMap.addLayer({
    id: "gravesend-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.9t6krwcz",
    },
    layout: {
      visibility: document.getElementById("gravesend_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "brooklyn_grants_lines-8ry03u",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });
}

////////////////////////////
// Karl Long Island Dynamic Layers
////////////////////////////

function addKarlBeforeLayers(date) {
  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "karl_long_island-left-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.dv28lnbp",
    },
    layout: {
      visibility: document.getElementById("karl_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundary_areas_long_island-8guvh4",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0,
      ],
      "fill-outline-color": "#FF0000",
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "karl_long_island-left",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.dv28lnbp",
    },
    layout: {
      visibility: document.getElementById("karl_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundary_areas_long_island-8guvh4",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.45,
      ],
      "fill-outline-color": "#FF0000",
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "karl_long_island-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapKarlTwoPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "karl_long_island-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredKarlIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "karl_long_island-left",
            sourceLayer: "boundary_areas_long_island-8guvh4",
            id: hoveredKarlIdLeft,
          },
          { hover: false }
        );
      }
      //console.log(e.features[0]);
      hoveredKarlIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "karl_long_island-left",
          sourceLayer: "boundary_areas_long_island-8guvh4",
          id: hoveredKarlIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      PopUpHTML +=
        "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" +
        e.features[0].properties.corr_label +
        "</div>";

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapKarlTwoPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "karl_long_island-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredKarlIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "karl_long_island-left",
          sourceLayer: "boundary_areas_long_island-8guvh4",
          id: hoveredKarlIdLeft,
        },
        { hover: false }
      );
    }
    hoveredKarlIdLeft = null;
    if (beforeMapKarlTwoPopUp.isOpen()) beforeMapKarlTwoPopUp.remove();
  });
}

function addKarlLinesBeforeLayers(date) {
  beforeMap.addLayer({
    id: "karl-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.ckj6h3ga",
    },
    layout: {
      visibility: document.getElementById("karl_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundary_lines_long_island-0c8elq",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });
}

/////////////////////////
//  Farms Dynamic Layer
/////////////////////////

function addBeforeFarmsLayer(date) {
  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "original_grants_and_farms-left-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.0508movm",
    },
    layout: {
      visibility: document.getElementById("farms_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "original_farms-6me5t0",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0,
      ],
      "fill-outline-color": "#000000",
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //*A fill pink #FFC0CB outline #C71585
  beforeMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "original_grants_and_farms-left",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.0508movm",
    },
    layout: {
      visibility: document.getElementById("farms_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "original_farms-6me5t0",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.5,
      ],
      "fill-outline-color": "#000000",
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  beforeMap.addLayer({
    id: "farms-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.6dwzmxth",
    },
    layout: {
      visibility: document.getElementById("farms_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "original_farms_lines-57l4u7",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  beforeMap.on("mouseenter", "original_grants_and_farms-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapFarmPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "original_grants_and_farms-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredFarmsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "original_grants_and_farms-left",
            sourceLayer: "original_farms-6me5t0",
            id: hoveredFarmsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredFarmsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "original_grants_and_farms-left",
          sourceLayer: "original_farms-6me5t0",
          id: hoveredFarmsIdLeft,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapFarmPopUp
        .setLngLat(e.lngLat)
        .setHTML(
          "<div class='infoLayerFarmsPopUp'>" +
            e.features[0].properties.To +
            "</div>"
        );
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "original_grants_and_farms-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredFarmsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "original_grants_and_farms-left",
          sourceLayer: "original_farms-6me5t0",
          id: hoveredFarmsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredFarmsIdLeft = null;
    if (beforeMapFarmPopUp.isOpen()) beforeMapFarmPopUp.remove();
  });
}

/////////////////////////
// Info Static Layer
/////////////////////////

function addInfoBeforeLayers(date) {
  // Add a layer showing the info.
  beforeMap.addLayer({
    id: "info-points-left",
    type: "circle",
    source: {
      type: "vector",
      url: "mapbox://mapny.8c0cqfdz",
    },
    layout: {
      visibility: document.getElementById("info_points").checked
        ? "visible"
        : "none",
    },
    "source-layer": "info_of_interest-17rpk9",
    paint: {
      "circle-color": "#0dd3d3",
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#008888",
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //ON HOVER
  beforeMap.on("mouseenter", "info-points-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    console.log(e.features[0].id);
    console.log(e.features[0].properties);
    if (e.features.length > 0) {
      if (hoveredInfoIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "info-points-left",
            sourceLayer: "info_of_interest-17rpk9",
            id: hoveredInfoIdLeft,
          },
          { hover: false }
        );
      }
      hoveredInfoIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "info-points-left",
          sourceLayer: "info_of_interest-17rpk9",
          id: hoveredInfoIdLeft,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapInfoPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerInfoPointPopUp'><b>" +
            e.features[0].properties.Label +
            "</b><br>" +
            "</div>"
        )
        .addTo(beforeMap);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "info-points-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredInfoIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "info-points-left",
          sourceLayer: "info_of_interest-17rpk9",
          id: hoveredInfoIdLeft,
        },
        { hover: false }
      );
    }
    hoveredInfoIdLeft = null;
    if (beforeMapInfoPopUp.isOpen()) beforeMapInfoPopUp.remove();
  });
}

/////////////////////////
// Info Static Layer
/////////////////////////

function addInfoLabelsBeforeLayers(date) {
  // Add a layer showing the places.
  beforeMap.addLayer({
    id: "info-labels-left",
    type: "symbol",
    source: {
      type: "vector",
      url: "mapbox://mapny.8c0cqfdz",
    },
    layout: {
      visibility: document.getElementById("info_labels").checked
        ? "visible"
        : "none",
      "text-field": "{Label}",
      "text-offset": [0, 1],
      "text-size": {
        stops: [
          [0, 4],
          [22, 21],
        ],
      },
    },

    "source-layer": "info_of_interest-17rpk9",

    paint: {
      "text-color": "#2c0202",
      "text-halo-color": "#ffffff",
      "text-halo-width": 5,
      "text-halo-blur": 1,
      "text-opacity": {
        stops: [
          [6, 0],
          [7, 1],
        ],
      },
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });
}

/////////////////////////
// Settlements Static Layer
/////////////////////////

function addSettlementsBeforeLayers(date) {
  // Add a layer showing the places.
  beforeMap.addLayer({
    id: "settlements-left",
    type: "circle",
    source: {
      type: "vector",
      url: "mapbox://mapny.dm346dz9",
    },
    layout: {
      visibility: document.getElementById("settlements_points").checked
        ? "visible"
        : "none",
    },
    "source-layer": "settlements-5551dw",
    paint: {
      "circle-color": "#0b0ee5",
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#0b0ee5",
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],
    },
    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });

  //ON HOVER
  beforeMap.on("mouseenter", "settlements-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    console.log(e.features[0].properties);
    if (e.features.length > 0) {
      if (hoveredSettlementsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "settlements-left",
            sourceLayer: "settlements-5551dw",
            id: hoveredSettlementsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredSettlementsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "settlements-left",
          sourceLayer: "settlements-5551dw",
          id: hoveredSettlementsIdLeft,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapSettlementsPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerSettlementsPopUp'><b>" +
            e.features[0].properties.Name +
            "</b><br>" +
            "</div>"
        )
        .addTo(beforeMap);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "settlements-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredSettlementsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "settlements-left",
          sourceLayer: "settlements-5551dw",
          id: hoveredSettlementsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredSettlementsIdLeft = null;
    if (beforeMapSettlementsPopUp.isOpen()) beforeMapSettlementsPopUp.remove();
  });
}

/////////////////////////
// Settlements Labels Static Layer
/////////////////////////

function addSettlementsLabelsBeforeLayers(date) {
  // Add a layer showing the places.
  beforeMap.addLayer({
    id: "settlements-labels-left",
    type: "symbol",
    source: {
      type: "vector",
      url: "mapbox://mapny.dm346dz9",
    },
    layout: {
      visibility: document.getElementById("settlements_labels").checked
        ? "visible"
        : "none",
      "text-field": "{corr_label}",
      "text-offset": [0, 1],
      "text-size": {
        stops: [
          [0, 4],
          [22, 21],
        ],
      },
    },

    "source-layer": "settlements-5551dw",

    paint: {
      "text-color": "#0b0ee5",
      "text-halo-color": "#ffffff",
      "text-halo-width": 5,
      "text-halo-blur": 1,
      "text-opacity": {
        stops: [
          [8, 0],
          [9, 1],
        ],
      },
    },

    filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]],
  });
}

/////////////////////////
// Castello Static Layer
/////////////////////////

function addCastelloBeforeLayers() {
  // Add a layer showing the places.
  beforeMap.addLayer({
    id: "places-left",
    type: "circle",
    source: {
      type: "vector",
      url: "mapbox://mapny.cvcg7wo0",
    },
    layout: {
      visibility: document.getElementById("castello_points").checked
        ? "visible"
        : "none",
    },
    "source-layer": "taxlots-cpwvol",
    paint: {
      "circle-color": "#FF0000",
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#FF0000",
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],
    },
  });


  //CURSOR ON HOVER

  //ON HOVER
  beforeMap.on("mouseenter", "places-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredStateIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "places-left",
            sourceLayer: "taxlots-cpwvol",
            id: hoveredStateIdLeft,
          },
          { hover: false }
        );
      }
      hoveredStateIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "places-left",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdLeft,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapPlacesPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
            e.features[0].properties.LOT2 +
            "</div>"
        )
        .addTo(beforeMap);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "places-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredStateIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "places-left",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdLeft,
        },
        { hover: false }
      );
    }
    hoveredStateIdLeft = null;
    if (beforeMapPlacesPopUp.isOpen()) beforeMapPlacesPopUp.remove();
  });
}

/////////////////////////
// Current Static Layers
/////////////////////////

function addCurrentLotsBeforeLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  if (beforeMap.getLayer("curr-lots-left"))
    beforeMap.removeLayer("curr-lots-left");
  if (beforeMap.getSource("current_lots-94syr2"))
    beforeMap.removeSource("current_lots-94syr2");

  beforeMap.addLayer({
    id: "curr-lots-high-left",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.8gy1c1uu",
    },
    layout: {
      visibility: document.getElementById("current_lots").checked
        ? "visible"
        : "none",
    },
    "source-layer": "current_lots-94syr2",
    paint: {
      "fill-color": "#7B68EE",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        0,
      ],
      "fill-outline-color": "#000000",
    },
  });

  beforeMap.addLayer({
    id: "curr-lots-left",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.8gy1c1uu",
    },
    layout: {
      visibility: document.getElementById("current_lots").checked
        ? "visible"
        : "none",
    },
    "source-layer": "current_lots-94syr2",
    paint: {
      "fill-color": "#7B68EE",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.1,
      ],
      "fill-outline-color": "#000000",
    },
  });

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "curr-lots-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapCurrLotsPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "curr-lots-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredCurrLotsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "curr-lots-left",
            sourceLayer: "current_lots-94syr2",
            id: hoveredCurrLotsIdLeft,
          },
          { hover: false }
        );
      }
      //console.log(e.features[0]);
      hoveredCurrLotsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "curr-lots-left",
          sourceLayer: "current_lots-94syr2",
          id: hoveredCurrLotsIdLeft,
        },
        { hover: true }
      );

      //Address
      //OwnerName
      var PopUpHTML =
        "<div class='infoLayerCurrLotsPopUp'>" +
        "<b>" +
        e.features[0].properties.OwnerName +
        "</b>" +
        "<br>" +
        e.features[0].properties.Address +
        "</div>";

      //BEFORE MAP POP UP CONTENTS
      beforeMapCurrLotsPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "curr-lots-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredCurrLotsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "curr-lots-left",
          sourceLayer: "current_lots-94syr2",
          id: hoveredCurrLotsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredCurrLotsIdLeft = null;
    if (beforeMapCurrLotsPopUp.isOpen()) beforeMapCurrLotsPopUp.remove();
  });
}

function addCurrentLotsLinesBeforeLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  if (beforeMap.getLayer("curr-lots-lines-left"))
    beforeMap.removeLayer("curr-lots-lines-left");
  if (beforeMap.getSource("current_lots_lines-41dc4r"))
    beforeMap.removeSource("current_lots_lines-41dc4r");

  beforeMap.addLayer({
    id: "curr-lots-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.6ziby9ed",
    },
    layout: {
      visibility: document.getElementById("current_lots_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "current_lots_lines-41dc4r",
    paint: {
      "line-color": "#00ff00",
      "line-width": 3,
      "line-opacity": 0.7,
    },
  });
}

function addCurrentBuildingsLinesBeforeLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  if (beforeMap.getLayer("curr-builds-lines-left"))
    beforeMap.removeLayer("curr-builds-lines-left");
  if (beforeMap.getSource("current_buildings_lines-3k97hu"))
    beforeMap.removeSource("current_buildings_lines-3k97hu");

  beforeMap.addLayer({
    id: "curr-builds-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.5w8vqpgq",
    },
    layout: {
      visibility: document.getElementById("current_buildings_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "current_buildings_lines-3k97hu",
    paint: {
      "line-color": "#0000FF",
      "line-width": 2,
      "line-opacity": 0.7,
    },
  });
}

function addCurrentBuildingsBeforeLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  if (beforeMap.getLayer("curr-builds-left"))
    beforeMap.removeLayer("curr-builds-left");
  if (beforeMap.getSource("current_buildings_1-cjgsm"))
    beforeMap.removeSource("current_buildings_1-cjgsm");

  beforeMap.addLayer({
    id: "curr-builds-left",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.9bfdcno0",
    },
    layout: {
      visibility: document.getElementById("current_buildings").checked
        ? "visible"
        : "none",
    },
    "source-layer": "current_buildings-1dzyhp",
    paint: {
      "fill-color": "#FF7F50",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.3,
      ],
      "fill-outline-color": "#000000",
    },
  });
}

function addLongIslandCoastlineBeforeLayers() {
  beforeMap.addLayer({
    id: "long-island-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.0g0oj4rl",
    },
    layout: {
      visibility: document.getElementById("longisland_coastline").checked
        ? "visible"
        : "none",
    },
    "source-layer": "long_island_coastline_lines-0bxmn5",
    paint: {
      "line-color": "#006400",
      "line-width": 3,
      "line-opacity": 1.0,
    },
  });

  beforeMap.addLayer({
    id: "long-island-area-left",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.c64cpp25",
    },
    layout: {
      visibility: document.getElementById("longisland_area").checked
        ? "visible"
        : "none",
    },
    "source-layer": "long_island_coastline_area-9vxity",
    paint: {
      "fill-color": "#00FF7F",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.2,
      ],
      "fill-outline-color": "#000000",
    },
  });
}

function addManahattaBeforeLayers() {
  beforeMap.addLayer({
    id: "lenape-trails-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.3lqznx9l",
    },
    layout: {
      visibility: document.getElementById("lenape_trails").checked
        ? "visible"
        : "none",
    },
    "source-layer": "lenape_trails-bxaww5",
    paint: {
      "line-color": "#FF0000",
      "line-width": 4,
      "line-opacity": 1.0,
    },
  });

  beforeMap.addLayer({
    id: "manahatta-shoreline-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.a0lop49m",
    },
    layout: {
      visibility: document.getElementById("manahatta_shoreline").checked
        ? "visible"
        : "none",
    },
    "source-layer": "manahatta_shoreline-1xswf8",
    paint: {
      "line-color": "#FFD700",
      "line-width": 4,
      "line-opacity": 1.0,
    },
  });

  beforeMap.addLayer({
    id: "streams-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.a9o6nugn",
    },
    layout: {
      visibility: document.getElementById("manahatta_streams").checked
        ? "visible"
        : "none",
    },
    "source-layer": "manahatta_area_streams-a2x39f",
    paint: {
      "line-color": "#0000FF",
      "line-width": 4,
      "line-opacity": 1.0,
    },
  });
}

function addIndianPathsBeforeLayers() {
  beforeMap.addLayer({
    id: "indian-paths-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.a39vr1hw",
    },
    layout: {
      visibility: document.getElementById("indian_paths").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_paths_brooklyn-27hu9d",
    paint: {
      "line-color": "#FF0000",
      "line-width": 5,
      "line-opacity": 1.0,
    },
  });
}

function addLongIslandNativeGroupsBeforeLayers() {

  beforeMap.addLayer({
    id: "native-groups-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.bwpbasrr",
    },
    layout: {
      visibility: document.getElementById("native_groups_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_borders_simplified_lon-buo3kf",
    paint: {
      "line-color": "#ff9900",
      "line-width": 15,
      "line-blur": 20,
      "line-opacity": 1.0,
    },
  });

  beforeMap.addLayer({
    id: "native-groups-area-left",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.8in6hi37",
    },
    layout: {
      visibility: document.getElementById("native_groups_area").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_areas_long_island-50h2dj",
    paint: {
      "fill-color": "#FF1493",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        0.2,
      ],
      "fill-outline-color": "#FFD700",
    },
  });

  beforeMap.addLayer({
    id: "native-groups-area-left-highlighted",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.8in6hi37",
    },
    layout: {
      visibility: document.getElementById("native_groups_area").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_areas_long_island-50h2dj",
    paint: {
      "fill-color": "#FF1493",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.3,
        0,
      ],
      "fill-outline-color": "#FFD700",
    },
  });

  beforeMap.addLayer({
    id: "native-groups-labels-left",
    type: "symbol",
    source: {
      type: "vector",
      url: "mapbox://mapny.5m6t979e",
    },
    layout: {
      visibility: document.getElementById("settlements_labels").checked
        ? "visible"
        : "none",
      "text-field": "{name}",
      "text-offset": [0, 1],
      "text-size": {
        stops: [
          [0, 4],
          [22, 34],
        ],
      },
    },
    "source-layer": "indian_labels_long_island-247yi6",
    paint: {
      "text-color": "#000080",
      "text-halo-color": "#ffffff",
      "text-halo-width": 5,
      "text-halo-blur": 1,
      "text-opacity": {
        stops: [
          [6, 0],
          [7, 1],
        ],
      },
    },
  });

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "native-groups-area-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapNativeGroupsPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "native-groups-area-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredNativeGroupsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "native-groups-area-left",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: hoveredNativeGroupsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredNativeGroupsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "native-groups-area-left",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: hoveredNativeGroupsIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      if (
        typeof taxlot_event_entities_info[e.features[0].properties.nid] ==
          "undefined" ||
        e.features[0].properties.nid == ""
      ) {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          e.features[0].properties.name +
          "</div>";
      } else {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          (taxlot_event_entities_info[e.features[0].properties.nid].name
            .length > 0
            ? taxlot_event_entities_info[e.features[0].properties.nid].name
            : e.features[0].properties.name) +
          "</div>";
      }

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapNativeGroupsPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "native-groups-area-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredNativeGroupsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "native-groups-area-left",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: hoveredNativeGroupsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredNativeGroupsIdLeft = null;
    if (beforeMapNativeGroupsPopUp.isOpen())
      beforeMapNativeGroupsPopUp.remove();
  });
}

////////////////////////////////
// Interactive Zoom Labels Layer
////////////////////////////////

function addBeforeLabelsLayer() {
  beforeMap.addLayer(LongIslandZoomLabel);

  beforeMap.on("mouseenter", "label-long-island", function (e) {
    beforeMap.setPaintProperty(
      "label-long-island",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-long-island", function () {
    beforeMap.setPaintProperty("label-long-island", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-long-island", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("LongIsland");
  });

  beforeMap.addLayer(BrooklynZoomLabel);

  beforeMap.on("mouseenter", "label-brooklyn", function (e) {
    beforeMap.setPaintProperty("label-brooklyn", "text-color", lbl_color_hover);
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-brooklyn", function () {
    beforeMap.setPaintProperty("label-brooklyn", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-brooklyn", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("Brooklyn");
  });

  beforeMap.addLayer(NewAmsterdamZoomLabel);

  beforeMap.on("mouseenter", "label-new-amsterdam", function (e) {
    beforeMap.setPaintProperty(
      "label-new-amsterdam",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-new-amsterdam", function () {
    beforeMap.setPaintProperty("label-new-amsterdam", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-new-amsterdam", function (e) {
    zoom_labels_click_ev = true;
    zoomtocenter("NA");
  });

  beforeMap.addLayer(ManhattanZoomLabel);

  beforeMap.on("mouseenter", "label-manhattan", function (e) {
    beforeMap.setPaintProperty(
      "label-manhattan",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-manhattan", function () {
    beforeMap.setPaintProperty("label-manhattan", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-manhattan", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("Manhattan");
  });

  beforeMap.addLayer(NewNetherlandZoomLabel);

  beforeMap.on("mouseenter", "label-new-netherland", function (e) {
    beforeMap.setPaintProperty(
      "label-new-netherland",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-new-netherland", function () {
    beforeMap.setPaintProperty("label-new-netherland", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-new-netherland", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("NewNL");
  });

  beforeMap.addLayer(NewEnglandZoomLabel);

  beforeMap.on("mouseenter", "label-new-england", function (e) {
    beforeMap.setPaintProperty(
      "label-new-england",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-new-england", function () {
    beforeMap.setPaintProperty("label-new-england", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-new-england", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("NewEngland");
  });
}
