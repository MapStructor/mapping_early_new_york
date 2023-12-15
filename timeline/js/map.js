var grant_lots_view_id = null,
  dgrants_layer_view_id = null,
  grant_lots_view_flag = false,
  demo_layer_view_flag = false,
  castello_layer_view_flag = false,
  dgrants_layer_view_flag = false;

$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerCastello").slideUp();

/////////////////////////////
//ACCESS TOKEN
/////////////////////////////

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

const beforeMapConfig = {
  container: "before",
  style: "mapbox://styles/mapny/clm2yrx1y025401p93v26bhyl",
  center: [0, 0],
  zoom: 0,
  attributionControl: false,
};

const afterMapConfig = {
  container: "after",
  style: "mapbox://styles/mapny/clm2yu5fg022801phfh479c8x",
  center: [0, 0],
  zoom: 0,
  attributionControl: false,
};

var beforeMap = new mapboxgl.Map(beforeMapConfig);

var afterMap = new mapboxgl.Map(afterMapConfig);

var map = new mapboxgl.Compare(beforeMap, afterMap, {
  // Set this to enable comparing two maps by mouse movement:
  // mousemove: true
});

/////////////////////////////
//ADD NAVIGATION CONTROLS (ZOOM IN AND OUT)
/////////////////////////////

//Before map
var nav = new mapboxgl.NavigationControl();
beforeMap.addControl(nav, "top-right");

//After map
var nav = new mapboxgl.NavigationControl();
afterMap.addControl(nav, "top-right");

/////////////////////////////
//BASEMAP MENU SWITCHING FUNCTIONALITY
/////////////////////////////

var rightInputs = document.getElementsByName("rtoggle");

function switchRightLayer(layer) {
  var rightLayerClass = layer.target.className;
  afterMap.setStyle("mapbox://styles/mapny/" + rightLayerClass);
}

for (var i = 0; i < rightInputs.length; i++) {
  rightInputs[i].onclick = switchRightLayer;
}

var leftInputs = document.getElementsByName("ltoggle");

function switchLeftLayer(layer) {
  var leftLayerClass = layer.target.className;
  beforeMap.setStyle("mapbox://styles/mapny/" + leftLayerClass);
}

for (var i = 0; i < leftInputs.length; i++) {
  leftInputs[i].onclick = switchLeftLayer;
}

/////////////////////////////
//NOT SURE WHAT THIS IS
/////////////////////////////

urlHash = window.location.hash;
var castello_click_ev = false,
  grant_lots_click_ev = false,
  demo_taxlot_click_ev = false,
  dutch_grant_click_ev = false;

var afterMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var coordinates = [];
var places_popup_html = "";

var afterMapPlacesPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPlacesPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var afterMapGrantLotPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeMapGrantLotPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var afterMapDutchGrantPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeMapDutchGrantPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var hoveredStateIdRight = null,
  hoveredStateIdLeft = null,
  hoveredStateIdRightCircle = null,
  hoveredStateIdLeftCircle = null,
  hoveredGrantStateIdRight = null,
  hoveredGrantStateIdLeft = null,
  hoveredGrantLotIdRight = null,
  hoveredGrantLotIdLeft = null,
  hoveredDutchGrantIdRight = null,
  hoveredDutchGrantIdLeft = null;

var clickedStateId = null;

beforeMap.on("load", function () {
  console.log("load");
  var sliderVal = moment($("#date").val()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  // CLICK AND OPEN POPUP
  beforeMap
    .on("click", "lot_events-bf43eb-left", function (e) {
      if (demo_layer_view_flag) {
        $("#demoLayerInfo").slideUp();
        demo_layer_view_flag = false;
      } else {
        buildPopUpInfo(e.features[0].properties);
        $("#demoLayerInfo").slideDown();
        demo_layer_view_flag = true;
        if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
      }

      demo_taxlot_click_ev = true;
    })
    .on("click", "places-left", function (e) {
      if (castello_layer_view_flag && clickedStateId == e.features[0].id) {
        $("#infoLayerCastello").slideUp();
        castello_layer_view_flag = false;
      } else {
        clickedStateId = e.features[0].id;

        places_popup_html =
          "<h3>Castello Taxlot (1660)</h3><hr>" +
          "<br>" +
          "<b>" +
          "Taxlot: " +
          "</b>" +
          e.features[0].properties.LOT2 +
          "<br>" +
          "<b>" +
          "Property Type: " +
          "</b>" +
          e.features[0].properties.tax_lots_1 +
          "<br>" +
          "<br>" +
          "<b>" +
          "Encyclopedia Page: " +
          "</b>" +
          "<br>" +
          '<a href="' +
          e.features[0].properties.new_link +
          '" target="_blank">' +
          e.features[0].properties.new_link +
          "</a>";

        $("#infoLayerCastello").html(places_popup_html).slideDown();
        castello_layer_view_flag = true;
        if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
      }

      castello_click_ev = true;
    })
    .on("click", "grant-lots-left", function (e) {
      if (layer_view_flag) {
        if (grant_lots_view_id == e.features[0].id) {
          if (grant_lots_view_flag) {
            $("#infoLayerGrantLots").slideUp();
            grant_lots_view_flag = false;
          } else {
            buildGrantLotsPopUpInfo(e.features[0].properties);
            $("#infoLayerGrantLots").slideDown();
            grant_lots_view_flag = true;
          }
        } else {
          buildGrantLotsPopUpInfo(e.features[0].properties);
          $("#infoLayerGrantLots").slideDown();
          grant_lots_view_flag = true;
        }
        grant_lots_view_id = e.features[0].id;
      } else {
        buildGrantLotsPopUpInfo(e.features[0].properties);
        $("#infoLayerGrantLots").slideDown();
        $("#view-hide-layer-panel").trigger("click");
        grant_lots_view_id = null;
      }

      grant_lots_click_ev = true;
    })
    .on("click", "dutch_grants-5ehfqe-left", function (e) {
      if (layer_view_flag) {
        if (dgrants_layer_view_id == e.features[0].id) {
          if (dgrants_layer_view_flag) {
            $("#infoLayerDutchGrants").slideUp();
            dgrants_layer_view_flag = false;
          } else {
            buildDutchGrantPopUpInfo(e.features[0].properties);
            $("#infoLayerDutchGrants").slideDown();
            dgrants_layer_view_flag = true;
          }
        } else {
          buildDutchGrantPopUpInfo(e.features[0].properties);
          $("#infoLayerDutchGrants").slideDown();
          dgrants_layer_view_flag = true;
        }
        dgrants_layer_view_id = e.features[0].id;
      } else {
        buildDutchGrantPopUpInfo(e.features[0].properties);
        $("#infoLayerDutchGrants").slideDown();
        $("#view-hide-layer-panel").trigger("click");
        dgrants_layer_view_id = null;
      }

      dutch_grant_click_ev = true;
    })
    .on("click", function () {
      if (
        !demo_taxlot_click_ev &&
        !castello_click_ev &&
        !grant_lots_click_ev &&
        !dutch_grant_click_ev
      ) {
        if (windoWidth > 555) $("#view-hide-layer-panel").trigger("click");
      }

      demo_taxlot_click_ev = false;
      castello_click_ev = false;
      grant_lots_click_ev = false;
      dutch_grant_click_ev = false;
    });
});

afterMap.on("load", function () {
  // CLICK AND OPEN POPUP
  afterMap
    .on("click", "lot_events-bf43eb-right", function (e) {
      if (demo_layer_view_flag) {
        $("#demoLayerInfo").slideUp();
        demo_layer_view_flag = false;
      } else {
        buildPopUpInfo(e.features[0].properties);
        $("#demoLayerInfo").slideDown();
        demo_layer_view_flag = true;
        if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
      }
      demo_taxlot_click_ev = true;
    })
    .on("click", "places-right", function (e) {
      if (castello_layer_view_flag && clickedStateId == e.features[0].id) {
        $("#infoLayerCastello").slideUp();
        castello_layer_view_flag = false;
      } else {
        clickedStateId = e.features[0].id;
        places_popup_html =
          "<h3>Castello Taxlot (1660)</h3><hr>" +
          "<br>" +
          "<b>" +
          "Taxlot: " +
          "</b>" +
          e.features[0].properties.LOT2 +
          "<br>" +
          "<b>" +
          "Property Type: " +
          "</b>" +
          e.features[0].properties.tax_lots_1 +
          "<br>" +
          "<br>" +
          "<b>" +
          "Encyclopedia Page: " +
          "</b>" +
          "<br>" +
          '<a href="' +
          e.features[0].properties.new_link +
          '" target="_blank">' +
          e.features[0].properties.new_link +
          "</a>";

        $("#infoLayerCastello").html(places_popup_html).slideDown();
        castello_layer_view_flag = true;
        if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
      }
      castello_click_ev = true;
    })
    .on("click", "grant-lots-right", function (e) {
      if (layer_view_flag) {
        if (grant_lots_view_id == e.features[0].id) {
          if (grant_lots_view_flag) {
            $("#infoLayerGrantLots").slideUp();
            grant_lots_view_flag = false;
          } else {
            buildGrantLotsPopUpInfo(e.features[0].properties);
            $("#infoLayerGrantLots").slideDown();
            grant_lots_view_flag = true;
          }
        } else {
          buildGrantLotsPopUpInfo(e.features[0].properties);
          $("#infoLayerGrantLots").slideDown();
          grant_lots_view_flag = true;
        }
        grant_lots_view_id = e.features[0].id;
      } else {
        buildGrantLotsPopUpInfo(e.features[0].properties);
        $("#infoLayerGrantLots").slideDown();
        $("#view-hide-layer-panel").trigger("click");
        grant_lots_view_id = null;
      }

      grant_lots_click_ev = true;
    })
    .on("click", "dutch_grants-5ehfqe-right", function (e) {
      if (layer_view_flag) {
        if (dgrants_layer_view_id == e.features[0].id) {
          if (dgrants_layer_view_flag) {
            $("#infoLayerDutchGrants").slideUp();
            dgrants_layer_view_flag = false;
          } else {
            buildDutchGrantPopUpInfo(e.features[0].properties);
            $("#infoLayerDutchGrants").slideDown();
            dgrants_layer_view_flag = true;
          }
        } else {
          buildDutchGrantPopUpInfo(e.features[0].properties);
          $("#infoLayerDutchGrants").slideDown();
          dgrants_layer_view_flag = true;
        }
        dgrants_layer_view_id = e.features[0].id;
      } else {
        buildDutchGrantPopUpInfo(e.features[0].properties);
        $("#infoLayerDutchGrants").slideDown();
        $("#view-hide-layer-panel").trigger("click");
        dgrants_layer_view_id = null;
      }

      dutch_grant_click_ev = true;
    })
    .on("click", function () {
      if (
        !demo_taxlot_click_ev &&
        !castello_click_ev &&
        !grant_lots_click_ev &&
        !dutch_grant_click_ev
      ) {
        if (windoWidth > 555) $("#view-hide-layer-panel").trigger("click");
      }

      demo_taxlot_click_ev = false;
      castello_click_ev = false;
      grant_lots_click_ev = false;
      dutch_grant_click_ev = false;
    });
});

beforeMap.on("error", function (e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

//////////////////////////////////////////////
//TIME LAYER FILTERING. NOT SURE HOW WORKS.
//////////////////////////////////////////////

function changeDate(unixDate) {
  var year = parseInt(moment.unix(unixDate).format("YYYY"));
  var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

  var sv = $("#year");
  if (year < 1700) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1600");
  }
  if (year >= 1700 && year < 1800) {
    sv.removeClass("y1600")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1700");
  }
  if (year >= 1800 && year < 1850) {
    sv.removeClass("y1700")
      .removeClass("y1600")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1800");
  }
  if (year >= 1850 && year < 1900) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1600")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1850");
  }
  if (year >= 1900 && year < 1950) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1600")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1900");
  }
  if (year >= 1950 && year < 2000) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1600")
      .removeClass("y2000")
      .addClass("y1950");
  }
  if (year >= 2000) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y1600")
      .addClass("y2000");
  }

  var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  ///////////////////////////////
  //LAYERS FOR FILTERING
  ///////////////////////////////

  //NAHC
  beforeMap.setFilter("dutch_grants-5ehfqe-left", dateFilter);
  afterMap.setFilter("dutch_grants-5ehfqe-right", dateFilter);

  beforeMap.setFilter("lot_events-bf43eb-left", dateFilter);
  afterMap.setFilter("lot_events-bf43eb-right", dateFilter);

  beforeMap.setFilter("grant-lots-left", dateFilter);
  afterMap.setFilter("grant-lots-right", dateFilter);

  var layer_features = afterMap.queryRenderedFeatures({
    layers: ["lot_events-bf43eb-right"],
  });
  if (demo_layer_view_flag) {
    buildPopUpInfo(layer_features[0].properties);
  }
} //end function changeDate

/////////////////////////////
//LAYERS AND LEGEND
/////////////////////////////

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
        "<b>Lot Division: </b>" +
        e.features[0].properties.dutchlot +
        "</div>";

      coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
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

      coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapPlacesPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'>" +
            "<b>Taxlot (1660):</b> " +
            "<br>" +
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

function addGrantLotsAfterLayers(date) {
  //REMOVING TAX LOT POINTS IF EXIST
  if (afterMap.getLayer("grant-lots-right"))
    afterMap.removeLayer("grant-lots-right");
  if (afterMap.getSource("demo_divisions_grant_c7-42w8pa"))
    afterMap.removeSource("demo_divisions_grant_c7-42w8pa");

  // Add a layer showing the places.
  afterMap.addLayer({
    id: "grant-lots-right",
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
  afterMap.on("mouseenter", "grant-lots-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    afterMapGrantLotPopUp.setLngLat(e.lngLat).addTo(afterMap);
  });

  afterMap.on("mousemove", "grant-lots-right", function (e) {
    if (e.features.length > 0) {
      if (hoveredGrantLotIdRight) {
        afterMap.setFeatureState(
          {
            source: "grant-lots-right",
            sourceLayer: "demo_divisions_grant_c7-42w8pa",
            id: hoveredGrantLotIdRight,
          },
          { hover: false }
        );
      }
      hoveredGrantLotIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "grant-lots-right",
          sourceLayer: "demo_divisions_grant_c7-42w8pa",
          id: hoveredGrantLotIdRight,
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

      coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      afterMapGrantLotPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "grant-lots-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredGrantLotIdRight) {
      afterMap.setFeatureState(
        {
          source: "grant-lots-right",
          sourceLayer: "demo_divisions_grant_c7-42w8pa",
          id: hoveredGrantLotIdRight,
        },
        { hover: false }
      );
    }
    hoveredGrantLotIdRight = null;
    if (afterMapGrantLotPopUp.isOpen()) afterMapGrantLotPopUp.remove();
  });
}

function addCastelloAfterLayers() {
  // Add a layer showing the places.
  afterMap.addLayer({
    id: "places-right",
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

  //ON HOVER
  afterMap.on("mouseenter", "places-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredStateIdRight) {
        afterMap.setFeatureState(
          {
            source: "places-right",
            sourceLayer: "taxlots-cpwvol",
            id: hoveredStateIdRight,
          },
          { hover: false }
        );
      }
      hoveredStateIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "places-right",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdRight,
        },
        { hover: true }
      );

      coordinates = e.features[0].geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      afterMapPlacesPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'>" +
            "<b>Taxlot (1660):</b> " +
            "<br>" +
            e.features[0].properties.LOT2 +
            "</div>"
        )
        .addTo(afterMap);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "places-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredStateIdRight) {
      afterMap.setFeatureState(
        {
          source: "places-right",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdRight,
        },
        { hover: false }
      );
    }
    hoveredStateIdRight = null;
    if (afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
  });
}

//BASEMAP SWITCHING
beforeMap.on("style.load", function () {
  //on the 'style.load' event, switch "basemaps" and then re-add layers
  //this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
  console.log("style change");
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  addBeforeLayers(yr, date);
  addCastelloBeforeLayers();
  addGrantLotsBeforeLayers(date);
});
afterMap.on("style.load", function () {
  //on the 'style.load' event, switch "basemaps" and then re-add layers
  //this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
  console.log("style change after");
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
  console.log(sliderVal);
  console.log(yr);
  console.log(date);

  addAfterLayers(yr, date);
  addCastelloAfterLayers();
  addGrantLotsAfterLayers(date);
});

/////////////////////////////
//MAP LAYERS
/////////////////////////////

function addBeforeLayers(yr, date) {
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

      var PopUpHTML =
        "<div class='infoLayerDutchGrantsPopUp'>" +
        e.features[0].properties.name +
        "<br>" +
        "<b>Dutch Grant Lot: </b>" +
        e.features[0].properties.Lot +
        "</div>";

      coordinates = e.features[0].geometry.coordinates.slice();

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

    coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    beforeMapPopUp
      .setLngLat(coordinates)
      .setHTML(
        "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>"
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

function addAfterLayers(yr, date) {
  //REMOVING TAX LOT POINTS IF EXIST
  if (afterMap.getLayer("lot_events-bf43eb-right"))
    afterMap.removeLayer("lot_events-bf43eb-right");
  if (afterMap.getSource("lot_events-bf43eb"))
    afterMap.removeSource("lot_events-bf43eb");
  if (afterMap.getLayer("dutch_grants-5ehfqe-right"))
    afterMap.removeLayer("dutch_grants-5ehfqe-right");
  if (afterMap.getSource("dutch_grants-5ehfqe"))
    afterMap.removeSource("dutch_grants-5ehfqe");

  //ADD GRANTS POLYGONS

  afterMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "dutch_grants-5ehfqe-right",
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
  afterMap.on("mouseenter", "dutch_grants-5ehfqe-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    afterMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(afterMap);
  });

  afterMap.on("mousemove", "dutch_grants-5ehfqe-right", function (e) {
    if (e.features.length > 0) {
      if (hoveredDutchGrantIdRight) {
        afterMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-right",
            sourceLayer: "dutch_grants-5ehfqe",
            id: hoveredDutchGrantIdRight,
          },
          { hover: false }
        );
      }
      hoveredDutchGrantIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-right",
          sourceLayer: "dutch_grants-5ehfqe",
          id: hoveredDutchGrantIdRight,
        },
        { hover: true }
      );

      var PopUpHTML =
        "<div class='infoLayerDutchGrantsPopUp'>" +
        e.features[0].properties.name +
        "<br>" +
        "<b>Dutch Grant Lot: </b>" +
        e.features[0].properties.Lot +
        "</div>";

      coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      afterMapDutchGrantPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "dutch_grants-5ehfqe-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredDutchGrantIdRight) {
      afterMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-right",
          sourceLayer: "dutch_grants-5ehfqe",
          id: hoveredDutchGrantIdRight,
        },
        { hover: false }
      );
    }
    hoveredDutchGrantIdRight = null;
    if (afterMapDutchGrantPopUp.isOpen()) afterMapDutchGrantPopUp.remove();
  });

  //ADD TAX LOT POINTS

  afterMap.addLayer({
    //ID: CHANGE THIS, 1 OF 3
    id: "lot_events-bf43eb-right",
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
  afterMap.on("mouseenter", "lot_events-bf43eb-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";

    if (hoveredStateIdRightCircle) {
      afterMap.setFeatureState(
        {
          source: "lot_events-bf43eb-right",
          sourceLayer: "lot_events-bf43eb",
          id: hoveredStateIdRightCircle,
        },
        { hover: false }
      );
    }
    hoveredStateIdRightCircle = e.features[0].id;
    afterMap.setFeatureState(
      {
        source: "lot_events-bf43eb-right",
        sourceLayer: "lot_events-bf43eb",
        id: hoveredStateIdRightCircle,
      },
      { hover: true }
    );

    coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    afterMapPopUp
      .setLngLat(coordinates)
      .setHTML(
        "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>"
      )
      .addTo(afterMap);
  });

  // CHANGE TO POINTER WHEN NOT HOVERING
  afterMap.on("mouseleave", "lot_events-bf43eb-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredStateIdRightCircle) {
      afterMap.setFeatureState(
        {
          source: "lot_events-bf43eb-right",
          sourceLayer: "lot_events-bf43eb",
          id: hoveredStateIdRightCircle,
        },
        { hover: false }
      );
    }
    hoveredStateIdRightCircle = null;
    if (afterMapPopUp.isOpen()) afterMapPopUp.remove();
  });
}

function buildPopUpInfo(props) {
  var popup_html =
    ///////
    //TITLE
    ///////
    "<b><h2>Demo Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b>" +
    // CAN'T GET THE TAXLOT LINK TO WORK: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7'>
    ////////////////
    //PROPERTY TYPE
    ////////////////
    "<b>Property Type: </b>" +
    "House" +
    //LINE
    "<hr>" +
    /////////////
    //DATE RANGE
    ////////////

    //FROM
    //example: June 3, 1643
    "<b> FROM: </b>" +
    props.DATE1 +
    //TO
    //example: January 19, 1659
    "<br>" +
    "<b> TO: </b>" +
    props.DATE2 +
    /////////////////////////////////////////////////////////////////////////////////////////////
    //UNKNOWN (DISPLAY TITLE AND EXPLANATION WHERE UNKNOWN OR NOTHING, %nbsp)
    //example 1: <br><br><b>TAXLOT EVENTS UNKNOWN</b><br>Needs research beyond sources used.
    //example 2: &nbsp;
    //////////////////////////////////////////////////////////////////////////////////////////////
    props.Unknown +
    //LINE
    "<hr>" +
    //////////////////////////////////////////////////
    //NEXT
    //example 1: <b>OWNERSHIP:</b><br>
    //example 2: <b>NEXT KNOWN OWNERSHIP:</b><br>
    //////////////////////////////////////////////////
    props.Next +
    //OWNER 1
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.TO_PAR1 +
    ": " +
    "<br>" +
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.TO_1 +
    " (" +
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.TO_ENT1 +
    ")" +
    "<br>" +
    "<br>" +
    //OWNER 2
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.TO_PAR2 +
    ": " +
    "<br>" +
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.TO_2 +
    " (" +
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.TO_ENT2 +
    ")" +
    "<br>" +
    "<br>" +
    //TAXLOT EVENT TITLE
    //example 1: <b>TAXLOT EVENT:</b>
    //example 2: <b>NEXT TAXLOT EVENT:</b>
    props.Tax_Event +
    "<br>" +
    //TAXLOT EVENT TYPE
    //example: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.EVENT1 +
    "<hr>" +
    //FROM TITLE
    //example 1: <b>FROM:</b>
    //example 2: <b>PREVIOUS KNOWN FROM:</b>
    props.Previous +
    "<br>" +
    //FROM 1

    //TAXLOT EVENT PARTY ROLE 1
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.FROM_PAR1 +
    ": " +
    "<br>" +
    //FROM PARTY 1 (ANCESTOR)
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.FROM_1 +
    //TAXLOT ENTITY DESCRIPTIONS 2
    " (" +
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.FROM_ENT1 +
    ")" +
    "<br>" +
    "<br>" +
    //FROM 2

    //TAXLOT EVENT PARTY ROLE 1
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.FROM_PAR2 +
    ": " +
    "<br>" +
    //FROM PARTY 2 (ANCESTOR)
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.FROM_2 +
    //TAXLOT ENTITY DESCRIPTIONS 2
    " (" +
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.FROM_ENT2 +
    ")" +
    ///////////////////////////
    //PREVIOUS TAXLOT EVENT (SHOWS UP IF TAXLOT EVENTS UNKNOWN, OTHERWISE BLANK, &nbsp;)
    //////////////////////////

    //TITLE: "PREVIOUS TAXLOT EVENT"
    //example 1: <br><br><b>PREVIOUS TAXLOT EVENT:</b><br>
    //example 2: &nbsp;
    props.Event +
    //PREVIOUS TAXLOT EVENT
    //example 1: /nahc/encyclopedia/node/1528 hreflang="en" target="_blank">Land Grant or Patent</a>
    //example 2: &nbsp;
    "<a href=https://nahc-mapping.org/mappingNY" +
    props.Prev_Event +
    //LINK TO ALL TAXLOT EVENTS: "SEE ALL TAXLOT EVENTS"
    "<br>" +
    "<hr>" +
    '<b> <h3><a href="https://encyclopedia.nahc-mapping.org/taxlot-events" target="_blank">SEE ALL TAXLOT EVENTS</a></h3></b>';

  //NEED TO MAKE THIS OPEN IN SEPARATE TAB!!
  $("#demoLayerInfo").html(popup_html);
}

function buildGrantLotsPopUpInfo(props) {
  var popup_html =
    "<h3>Grant Lot Division</h3><hr>" +
    "<br>" +
    "<b>Original Dutch Grant:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/" +
    props.Lot +
    "' target='_blank'>" +
    props.Lot +
    "</a><br>" +
    "<br>" +
    "<b>Lot Division: </b>" +
    props.dutchlot +
    "<br>" +
    "<b>Castello Taxlot (1660): </b>" +
    props.castello +
    "<br>" +
    "<br>" +
    "<b>Ownership:</b> " +
    props.name +
    "<br>" +
    "<b>From:</b> " +
    props.from +
    "<br>" +
    "<br>" +
    "<b>Start:</b> " +
    props.day1 +
    ", " +
    props.year1 +
    "<br>" +
    "<b>End:</b> " +
    props.day2 +
    ", " +
    props.year2 +
    "<br>" +
    "<br>" +
    "<b>Description:</b> " +
    "<br>" +
    props.descriptio +
    "<br><br>";
  $("#infoLayerGrantLots").html(popup_html);
}

function buildDutchGrantPopUpInfo(props) {
  var popup_html =
    "<h3>Dutch Grant</h3><hr>" +
    props.name +
    "<br>" +
    "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/" +
    props.Lot +
    "' target='_blank'>" +
    props.Lot +
    "</a><br>" +
    "<br>" +
    "<b>Start:</b> <i>" +
    props.day1 +
    " " +
    props.year1 +
    "</i><br>" +
    "<b>End:</b> <i>" +
    props.day2 +
    " " +
    props.year2 +
    "</i><br>" +
    "<br>" +
    "<b>Description (partial):</b>" +
    "<br>" +
    props.descriptio +
    "<br><br>";
  $("#infoLayerDutchGrants").html(popup_html);
}
