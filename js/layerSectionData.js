const manhattanLayerSections = [
  {
    id: "manahatta_items",
    caretId: "manahatta-layer-caret",
    label: "1609 | Manahatta",
    itemSelector: ".manahatta_layer_item",
    zoomTo: "Manhattan",
    infoId: "manahatta-info",
    type: "group",
  },
  {
    id: "lenape_trails",
    name: "lenape_trails",
    label: "Lenape Trails",
    iconColor: "#ff0000",
    className: "manahatta",
    topLayerClass: "manahatta_layer",
    isSolid: true,
  },
  {
    id: "manahatta_shoreline",
    name: "manahatta_shoreline",
    className: "manahatta",
    label: "Manahatta Shoreline",
    iconColor: "#ffd700",
    topLayerClass: "manahatta_layer",
    isSolid: true,
  },
  {
    id: "manahatta_streams",
    name: "manahatta_streams",
    label: "Streams (c 1600)",
    className: "manahatta",
    iconColor: "#0000ff",
    topLayerClass: "manahatta_layer",
    isSolid: true,
  },
  {
    id: "farms_layer_items",
    caretId: "farms-layer-caret",
    label: "1638-83 | Original Grants & Farms",
    itemSelector: ".farms_layer_item",
    zoomTo: "Original Grants",
    infoId: "farms-info-layer",
    type: "group",
  },
  {
    id: "farms_layer",
    className: "farms_layer",
    name: "farms_layer",
    iconColor: "#e3ed58",
    label: "Information",
    topLayerClass: "farms_layer",
    iconType: "square",
    isSolid: true,
  },
  {
    id: "farms_layer_lines",
    className: "farms_layer",
    name: "farms_layer_lines",
    iconColor: "#ff0000",
    label: "Lines",
    topLayerClass: "farms_layer",
    iconType: "square",
    isSolid: false,
  },
  {
    id: "grants_layer_items",
    caretId: "dutch-grants-layer-caret",
    label: "1640-64 | Dutch Grants",
    itemSelector: ".dutch_grants_layer_item",
    zoomTo: "NA",
    infoId: "grants-info-layer",
    type: "group",
  },
  {
    id: "grants_layer",
    className: "grants_layer",
    name: "grants_layer",
    iconColor: "#e3ed58",
    label: "Information",
    topLayerClass: "dutch_grants_layer",
    iconType: "square",
    isSolid: true,
  },
  {
    id: "grants_layer_lines",
    className: "grants_layer",
    name: "grants_layer_lines",
    iconColor: "#ff0000",
    label: "Lines",
    topLayerClass: "dutch_grants_layer",
    iconType: "square",
    isSolid: false,
  },
  {
    id: "circle_point",
    name: "circle_point",
    checked: true,
    label: "1643-75 | Lot Events",
    iconColor: "#097911",
    zoomTo: "NA",
    infoId: "demo-taxlot-info-layer",
    type: "lots-events",
  },
  {
    id: "grant_lots",
    name: "grant_lots",
    label: "1643-67 | Demo Grant Divisions: C7",
    iconColor: "#008888",
    zoomTo: "NA",
    infoId: "demo-grant-info-layer",
    type: "grants-lots",
  },
  {
    id: "castello_points",
    name: "castello_points",
    label: "1660 | Castello Taxlots",
    iconColor: "#ff0000",
    zoomTo: "NA",
    infoId: "castello-info-layer",
    type: "castello-points",
  },
  {
    id: "current_lots_items",
    caretId: "current-lots-layer-caret",
    label: "Current Lots",
    itemSelector: ".current_lots_layer_item",
    zoomTo: "NA",
    infoId: "current-lots-info-layer",
    type: "group",
  },
  {
    className: "current_lots",
    id: "current_lots",
    name: "current_lots",
    iconColor: "#7b68ee",
    label: "Information",
    topLayerClass: "current_lots_layer",
    isSolid: true,
    iconType: "square",
  },
  {
    className: "current_lots",
    id: "current_lots_lines",
    name: "current_lots_lines",
    iconColor: "#000080",
    label: "Lines",
    topLayerClass: "current_lots_layer",
    iconType: "square",
    isSolid: false,
  },
  {
    className: "current_buildings",
    id: "current_buildings_lines",
    name: "current_buildings_lines",
    iconColor: "#0000ff",
    label: "Current Buildings",
    zoomTo: "NA",
    infoId: "current-buildings-lines-info-layer",
    type: "current-buildings",
  },
];

const longIslandLayerSections = [

  {
    id: 'native_groups_layer_items',
    name: 'native_groups_layer_items',
    caretId: 'native-groups-layer-caret',
    label: '1600s | Long Island Tribes',
    zoomTo: 'LongIsland',
    infoId: 'native-groups-info-layer',
    type: 'group',
    itemSelector: ".native_groups_layer_item"
  },
  {
    className: 'native_groups_layer',
    id: 'native_groups_labels',
    name: 'native_groups_labels',
    iconColor: '#0b0ee5',
    label: 'Labels',
    topLayerClass: "native_groups_layer",
    iconType: "comment-dots",
    isSolid: true,
  },
  {
    className: 'native_groups_layer',
    id: 'native_groups_area',
    name: 'native_groups_area',
    iconColor: '#ff1493',
    label: 'Area',
    iconType: "square",
    topLayerClass: "native_groups_layer",
    isSolid: true
  },
  {
    className: 'native_groups_layer',
    id: 'native_groups_lines',
    name: 'native_groups_lines',
    iconColor: '#ff0000',
    label: 'Borders',
    iconType: "square",
    topLayerClass: "native_groups_layer",
  },
  {
    id: 'custom_indian_paths',
    name: 'custom_indian_paths',
    iconColor: '#00ff00',
    label: 'Custom Paths',
    zoomTo: 'Manhattan',
    infoId: 'custom-indian-paths-info-layer',
    type: "custom_indian_paths"
  },
  {
    id: "settlements_items",
    caretId: "settlements-layer-caret",
    label: "1600-64 | Settlements",
    itemSelector: ".settlements_layer_item",
    zoomTo: "Brooklyn",
    infoId: "settlements-info-layer",
    type: "group",
  },
  {
    className: "settlements",
    id: "settlements_points",
    name: "settlements_points",
    iconColor: "#0b0ee5",
    label: "Locations",
    topLayerClass: "settlements_layer",
    iconType: "circle",
    isSolid: true,
  },
  {
    id: "settlements_labels",
    name: "settlements_labels",
    className: "settlements",
    iconColor: "#0b0ee5",
    label: "Labels",
    topLayerClass: "settlements_layer",
    iconType: "comment-dots",
    isSolid: true,
  },
  {
    id: 'gravesend_layer_items',
    name: 'gravesend_layer_items',
    caretId: 'gravesend-layer-caret',
    label: '1609-Present | Brooklyn Grants',
    zoomTo: 'Brooklyn',
    infoId: 'boundaries-info-layer',
    itemSelector: '.gravesend_layer_item',
    type: "group"
  },
  {
    className: 'gravesend_layer',
    id: 'gravesend_layer',
    name: 'gravesend_layer',
    iconColor: '#e3ed58',
    label: 'Information',
    topLayerClass: "gravesend_layer",
    iconType: "square",
    isSolid: true
  },
  {
    className: 'gravesend_layer',
    id: 'gravesend_layer_lines',
    name: 'gravesend_layer_lines',
    iconColor: '#ff0000',
    label: 'Lines',
    topLayerClass: "gravesend_layer",
    iconType: "square"
  },
  {
    id: "long-island-lot",
    caretId: "long-island-lot-layer-caret",
    label: "1630-1700 | Long Island Lots ",
    itemSelector: ".long_island_lot_item",
    zoomTo: "LongIsland",
    infoId: "long-island-lot",
    type: "group",
  },
  {
    className: "long_island_lot",
    id: "long_island-lot_points",
    name: "long_island-lot_points",
    iconColor: "#e5870b",
    label: "Lots",
    topLayerClass: "long_island_lot",
    iconType: "circle",
    isSolid: true,
  },
  {
    id: "long_island_lot_labels",
    name: "long_island_lot_labels",
    className: "long_island_lot",
    iconColor: "#0b0ee5",
    label: "Labels",
    topLayerClass: "long_island_lot",
    iconType: "comment-dots",
    isSolid: true,
  },
  {
    id: 'karl_layer_items',
    name: 'karl_layer_items',
    caretId: 'karl-layer-caret',
    label: '1636-Present | Long Island Towns',
    zoomTo: 'LongIsland',
    infoId: 'ny_towns',
    itemSelector: '.karl_layer_item',
    type: "group"
  },
  {
    className: 'karl_layer',
    id: 'karl_layer',
    name: 'karl_layer',
    iconColor: '#e3ed58',
    label: 'Information',
    topLayerClass: 'karl_layer',
    iconType: 'square',
    isSolid: true
  },
  {
    className: 'karl_layer',
    id: 'karl_layer_lines',
    name: 'karl_layer_lines',
    iconColor: '#ff0000',
    label: 'Lines',
    topLayerClass: 'karl_layer',
    iconType: 'square'
  },
  {
    id: 'longisland_items',
    name: 'longisland_items',
    caretId: 'long-island-caret',
    label: 'Long Island Area Coastline',
    zoomTo: 'LongIsland',
    infoId: 'longisland-info-layer',
    itemSelector: '.long_island_item',
    type: "group"
  },
  {
    className: 'long_island',
    id: 'longisland_area',
    name: 'longisland_area',
    iconColor: '#00ff7f',
    label: 'Area',
    topLayerClass: "long_island",
    iconType: "square",
    isSolid: true
  },
  {
    className: 'long_island',
    id: 'longisland_coastline',
    name: 'longisland_coastline',
    iconColor: '#006400',
    label: 'Coastline',
    topLayerClass: "long_island",
    isSolid: true
  },
  
];

const informationOfInterest = [
  {
    id: 'info_items',
    name: 'info_items',
    caretId: 'info-layer-caret',
    label: 'Information of Interest',
    zoomTo: 'LongIsland',
    infoId: 'info-points-items',
    itemSelector: '.info_layer_item' ,
    type: "group"
  },
  {
    className: 'info-item',
    id: 'info_points',
    name: 'info_points',
    iconColor: '#ed4040',
    label: 'Locations',
    iconType: "circle",
    topLayerClass: "info_layer",
    iconType: "circle",
    isSolid: true
  },
  {
    className: 'info-item',
    id: 'info_labels',
    name: 'info_labels',
    iconColor: '#ed4040',
    label: 'Labels',
    iconType: 'comment-dots',
    topLayerClass: "info_layer",
    isSolid: true
  }
]
