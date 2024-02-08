const layers = [
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "dutch_grants-5ehfqe-right-highlighted",
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
    toggleElement: "grants_layer",
  },
  {
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
        0.45,
      ],
      "fill-outline-color": "#FF0000",
    },
    toggleElement: "grants_layer"
  },
  {
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
    toggleElement: "grant_lots"
  },
  {
    id: "grant-lots-lines-right",
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
    toggleElement: "grants_layer_lines"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "gravesend_boundaries-c6qrbw-right-highlighted",
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
    toggleElement: "gravesend_layer"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "gravesend_boundaries-c6qrbw-right",
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
    toggleElement: "gravesend_layer"
  },
  {
    id: "gravesend-lines-right",
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
    toggleElement: "gravesend_layer_lines"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "karl_long_island-right-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.brthat7a",
    },
    layout: {
      visibility: document.getElementById("karl_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundaries_LI_to_1700-8zmmzq",
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
    toggleElement: "karl_layer"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "karl_long_island-right",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.brthat7a",
    },
    layout: {
      visibility: document.getElementById("karl_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundaries_LI_to_1700-8zmmzq",
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
    toggleElement: "karl_layer"
  },
  {
    id: "karl-lines-right",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.6ro0a0e0",
    },
    layout: {
      visibility: document.getElementById("karl_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundaries_lines_LI_to_1700-190acb",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
    toggleElement: "karl_layer_lines"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "original_grants_and_farms-right-highlighted",
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
      "fill-outline-color": "#FF0000",
    },
    toggleElement: "farms_layer"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "original_grants_and_farms-right",
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
        0.45,
      ],
      "fill-outline-color": "#FF0000",
    },
    toggleElement: "farms_layer"
  },
  {
    id: "farms-lines-right",
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
    toggleElement: "farms_layer_lines"
  },

  {
    id: "info-points-right",
    type: "symbol", // Change the type to "symbol"
    source: {
        type: "vector",
        url: "mapbox://mapny.4oxcibaa",
    },

    "layout": {
      "visibility": document.getElementById("info_points").checked ? "visible" : "none",
      "icon-image": "info_points_image",
      "icon-allow-overlap": true,
      "icon-size": [
        "interpolate", ["linear"], ["zoom"],
        8, 0.05, // Constant size at zoom 8
        15, 0.08 // Constant size at zoom 15
      ]      
    },
        //Trying to change icons, not working:
        /*
        "icon-image": [
          "match", ["get", "changetext"], 
          "2", "info_points_image",  // Use info_points_image when changetext is "2"
          "info_points_image2"       // Use info_points_image2 for all other cases
        ]
        */

        //Trying to change icons, not working:
        /*
        "icon-image": [
          "case",
          ["==", ["get", "changetext"], "2"], "info_points_image",
          "info_points_image2"
        ]
        */
    "source-layer": "info_of_interest3-0euqvk",
    paint: {
      "icon-opacity": [
        "interpolate", ["linear"], ["zoom"],
        7, 0, // Opacity at zoom 8
        8, 1.0 // Opacity becomes fully opaque (1.0) at zoom 9
      ]
    },
    toggleElement: "info_points"
}
,

//NEW LAYER - STYLING NOT WORKING AND NEEDS CONNECTION TO TIMELINE:

{
  id: "info-labels-right",
  type: "symbol",
  source: {
    type: "vector",
    //Num type for "change"
    //url: "mapbox://mapny.cmczx4cf",
    //Num type for "changetext"
    url: "mapbox://mapny.4oxcibaa",
  },
  "source-layer": "info_of_interest3-0euqvk",
  layout: {
    "text-field": ["get", "Label"],
    "text-size": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", 4, 4], // Size at zoom 0
      22, ["match", ["get", "changetext"], "2", 21, 16] // Size at zoom 22
    ],
    "text-anchor": "left", // This positions the left end of the text at the anchor point
    'text-justify': 'left', // Options: 'left', 'center', 'right'
    "text-offset": [1.5, 0],
    //"visibility": document.getElementById("info_labels").checked ? "visible" : "none",
    "visibility": document.getElementById("info_labels").checked ? "visible" : "none",
  },
  paint: {
    "text-color": [
      "match",
      ["get", "changetext"],
      "2", "#ff0000", // Red color for "2"
      "#2c0202" // Default color
    ],
    "text-opacity": [
      "interpolate", ["linear"], ["zoom"],
      7, ["match", ["get", "changetext"], "2", 0, 0], // Opacity at zoom 6
      8, ["match", ["get", "changetext"], "2", 1.0, 1.0] // Opacity at zoom 7
    ],
    "text-halo-color": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", "#ffffff", "#ffffff"], // Halo color at zoom 0
      22, ["match", ["get", "changetext"], "2", "#ffffff", "#ffffff"] // Halo color at zoom 22
    ],
    "text-halo-width": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", 5, 4], // Halo width at zoom 0
      22, ["match", ["get", "changetext"], "2", 5, 4] // Halo width at zoom 22
    ],
    "text-halo-blur": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", 1, 1], // Halo blur at zoom 0
      22, ["match", ["get", "changetext"], "2", 1, 1] // Halo blur at zoom 22
    ],
  },
  minzoom: 1,
  toggleElement: "info_labels"
},

  {
    id: "settlements-right",
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
    toggleElement: "settlements_points"
  },
  {
    id: "settlements-labels-right",
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
    toggleElement: "settlements_labels"
  },
  {
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
    toggleElement: "castello_points"
  },
  {
    id: "curr-lots-high-right",
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
        0.0,
      ],
      "fill-outline-color": "transparent",
    },
    toggleElement: "current_lots"
  },
  {
    id: "curr-lots-right",
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
        0.0,
      ],
      "fill-outline-color": "#000000",
    },
    toggleElement: "current_lots"
  },
  {
    id: "curr-lots-lines-right",
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
      "line-color": "#000080",
      "line-width": 3,
      "line-opacity": 0.7,
    },
    toggleElement: "current_lots_lines"
  },
  {
    id: "curr-builds-lines-right",
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
    toggleElement: "current_buildings_lines"
  },
  {
    id: "curr-builds-right",
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
        0.2,
      ],
      "fill-outline-color": "#000000",
    },
    toggleElement: "current_buildings"
  },
  {
    id: "long-island-right",
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
    toggleElement: "longisland_coastline"
  },
  {
    id: "long-island-area-right",
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
    toggleElement: "longisland_area"
  },
  {
    id: "lenape-trails-right",
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
    toggleElement: "lenape_trails"
  },
  {
    id: "manahatta-shoreline-right",
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
    toggleElement: "manahatta_shoreline"
  },
  {
    id: "streams-right",
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
    toggleElement: "manahatta_streams"
  },
  {
    id: "indian-paths-right",
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
    toggleElement: "indian_paths"
  },
  {
    id: "native-groups-lines-right",
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
    toggleElement: "native_groups_lines"
  },
  {
    id: "native-groups-area-right",
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
    toggleElement: "native_groups_area"
  },
  {
    id: "native-groups-area-right-highlighted",
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
    toggleElement: "native_groups_area"
  },
  {
    id: "native-groups-labels-right",
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
    toggleElement: "settlements_labels"
  },
  {
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
    toggleElement: "circle_point"
  },
];

const beforeLayers = [
  {
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
    toggleElement: "grants_layer"
  },
  {
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
    toggleElement: "grants_layer"
  },
  {
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
    toggleElement: "circle_point"
  },
  {
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
    toggleElement: "grant_lots"
  },
  {
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
    toggleElement: "grants_layer_lines"
  },
  {
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
    toggleElement: "gravesend_layer"
  },
  {
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
    toggleElement: "gravesend_layer"
  },
  {
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
    toggleElement: "gravesend_layer_lines"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "karl_long_island-left-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.brthat7a",
    },
    layout: {
      visibility: document.getElementById("karl_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundaries_LI_to_1700-8zmmzq",
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
    toggleElement: "karl_layer"
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "karl_long_island-left",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.brthat7a",
    },
    layout: {
      visibility: document.getElementById("karl_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundaries_LI_to_1700-8zmmzq",
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
    toggleElement: "karl_layer"
  },
  {
    id: "karl-lines-left",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.6ro0a0e0",
    },
    layout: {
      visibility: document.getElementById("karl_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "boundaries_lines_LI_to_1700-190acb",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
    toggleElement: "karl_layer_lines"
  },
  {
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
    toggleElement: "farms_layer"
  },
  {
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
    toggleElement: "farms_layer"
  },
  {
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
    toggleElement:"farms_layer_lines"
  },


  {
    id: "info-points-left",
    type: "symbol", // Change the type to "symbol"
    source: {
        type: "vector",
        url: "mapbox://mapny.4oxcibaa",
    },

    "layout": {
      "visibility": document.getElementById("info_points").checked ? "visible" : "none",
      "icon-image": "info_points_image",
      "icon-allow-overlap": true,
      "icon-size": [
        "interpolate", ["linear"], ["zoom"],
        8, 0.05, // Constant size at zoom 8
        15, 0.08 // Constant size at zoom 15
      ]      
    },
    "source-layer": "info_of_interest3-0euqvk",
    "paint": {
      "icon-opacity": [
        "interpolate", ["linear"], ["zoom"],
        7, 0, // Opacity at zoom 8
        8, 1.0 // Opacity becomes fully opaque (1.0) at zoom 9
      ]
    },
    toggleElement: "info_points"
},


{
  id: "info-labels-left",
  type: "symbol",
  source: {
    type: "vector",
    //Num type for "change"
    //url: "mapbox://mapny.cmczx4cf",
    //Num type for "changetext"
    url: "mapbox://mapny.4oxcibaa",
  },
  "source-layer": "info_of_interest3-0euqvk",
  layout: {
    "text-field": ["get", "Label"],
    "text-size": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", 4, 4], // Size at zoom 0
      22, ["match", ["get", "changetext"], "2", 21, 16] // Size at zoom 22
    ],
    "text-anchor": "left", // This positions the left end of the text at the anchor point
    'text-justify': 'left', // Options: 'left', 'center', 'right'
    "text-offset": [1.5, 0],
    //"visibility": document.getElementById("info_labels").checked ? "visible" : "none",
    "visibility": document.getElementById("info_labels").checked ? "visible" : "none",
  },
  paint: {
    "text-color": [
      "match",
      ["get", "changetext"],
      "2", "#ff0000", // Red color for "2"
      "#2c0202" // Default color
    ],
    "text-opacity": [
      "interpolate", ["linear"], ["zoom"],
      7, ["match", ["get", "changetext"], "2", 0, 0], // Opacity at zoom 6
      8, ["match", ["get", "changetext"], "2", 1.0, 1.0] // Opacity at zoom 7
    ],
    "text-halo-color": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", "#ffffff", "#ffffff"], // Halo color at zoom 0
      22, ["match", ["get", "changetext"], "2", "#ffffff", "#ffffff"] // Halo color at zoom 22
    ],
    "text-halo-width": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", 5, 4], // Halo width at zoom 0
      22, ["match", ["get", "changetext"], "2", 5, 4] // Halo width at zoom 22
    ],
    "text-halo-blur": [
      "interpolate", ["linear"], ["zoom"],
      0, ["match", ["get", "changetext"], "2", 1, 1], // Halo blur at zoom 0
      22, ["match", ["get", "changetext"], "2", 1, 1] // Halo blur at zoom 22
    ],
  },
  minzoom: 1,
  toggleElement: "info_labels"
},

  {
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
    toggleElement: "settlements_points"
  },
  {
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
    toggleElement: "settlements_labels"
  },
  {
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
    toggleElement: "castello_points"
  },
  {
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
    toggleElement: "current_lots"
  },
  {
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
    toggleElement: "current_lots"
  },
  {
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
    toggleElement: "current_lots_lines"
  },
  {
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
    toggleElement: "current_buildings_lines"
  },
  {
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
    toggleElement: "current_buildings"
  },
  {
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
    toggleElement: "longisland_coastline"
  },
  {
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
    toggleElement: "longisland_area"
  },
  {
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
    toggleElement: "lenape_trails"
  },
  {
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
    toggleElement: "manahatta_shoreline"
  },
  {
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
    toggleElement: "manahatta_streams"
  },
  {
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
    toggleElement: "indian_paths"
  },
  {
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
    toggleElement: "native_groups_lines"
  },
  {
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
    toggleElement: "native_groups_area"
  },
  {
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
    toggleElement: "native_groups_area"
  },
  {
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
    toggleElement: "settlements_labels"
  }
]