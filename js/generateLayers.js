/**
 * @param {{
 *  id: string;
 * name?: string;
 * caretId?: string;
 * label: string;
 * iconColor?: string;
 * itemSelector?: string;
 * zoomTo?: string;
 * infoId: string;
 * type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
 * iconType?: "square"
 * }[]} layers
 * @returns {string}
 */
function renderLayers(layers) {
  const lastBitOfManhattanSectionTemplate = `
<div class="layer-list-row">
  <input
    type="checkbox"
    id="current_buildings_items"
    name="current_buildings_items"
  />
  <label for="current_buildings_items">
    <i class="fas fa-caret-down"></i> Current Buildings
    <div class="dummy-label-layer-space"></div
  ></label>
</div>

<div class="layer-list-row">
  <input
    type="checkbox"
    class="current_buildings"
    id="current_buildings"
    name="current_buildings"
  />
  <label for="current_buildings">
    <i class="fa fa-square" style="color: #ff7f50"></i> Current
    Buildings</label
  >
</div>
`;
  let r = "";
  layers.forEach((layer) => {
    if (layer.type === "group") {
      r += renderLayerRow(layer);
    } else if (layer.type === "lots-events") {
      r += renderCirclePointLayerRow(layer);
    } else if (layer.type === "grants-lots") {
      r += renderGrantLotsLayerRow(layer);
    } else if (layer.type === "castello-points") {
      r += renderCastelloPointsLayerRow(layer);
    } else if (layer.type === "current-buildings"){
      r += lastBitOfManhattanSectionTemplate;
      r += `<div class="layer-list-row">
      <input
        type="checkbox"
        class="current_buildings"
        id="current_buildings_lines"
        name="current_buildings_lines"
      />
      <label for="current_buildings_lines">
        <i class="far fa-square" style="color: #0000ff"></i> Current
        Buildings
        <div class="dummy-label-layer-space"></div
      ></label>
      <div class="layer-buttons-block">
        <div class="layer-buttons-list">
          <i
            class="fa fa-crosshairs zoom-to-layer"
            onclick="zoomtocenter('NA')"
            title="Zoom to Layer"
          ></i>
          <i
            class="fa fa-info-circle layer-info trigger-popup"
            id="current-buildings-lines-info-layer"
            title="Layer Info"
          ></i>
        </div>
      </div>
    </div>`
    } else {
      r += renderManahattaLayerItem(layer);
    }
  });
  return r;
}

const layerSectionObjects = [
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
    isSolid: true
  },
  {
    id: "manahatta_shoreline",
    name: "manahatta_shoreline",
    className: "manahatta",
    label: "Manahatta Shoreline",
    iconColor: "#ffd700",
    topLayerClass: "manahatta_layer",
    isSolid: true
  },
  {
    id: "manahatta_streams",
    name: "manahatta_streams",
    label: "Streams (c 1600)",
    className: "manahatta",
    iconColor: "#0000ff",
    topLayerClass: "manahatta_layer",
    isSolid: true
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
    isSolid: true
  },
  {
    id: "farms_layer_lines",
    className: "farms_layer",
    name: "farms_layer_lines",
    iconColor: "#ff0000",
    label: "Lines",
    topLayerClass: "farms_layer",
    iconType: "square",
    isSolid: false
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
    isSolid: true
  },
  {
    id: "grants_layer_lines",
    className: "grants_layer",
    name: "grants_layer_lines",
    iconColor: "#ff0000",
    label: "Lines",
    topLayerClass: "dutch_grants_layer",
    iconType: "square",
    isSolid: false
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
    iconType: "square"
  },
  {
    className: "current_lots",
    id: "current_lots_lines",
    name: "current_lots_lines",
    iconColor: "#000080",
    label: "Lines",
    topLayerClass: "current_lots_layer",
    iconType: "square",
    isSolid: false
  },
  {
    className: 'current_buildings',
    id: 'current_buildings_lines',
    name: 'current_buildings_lines',
    iconColor: '#0000ff',
    label: 'Current Buildings',
    zoomTo: 'NA',
    infoId: 'current-buildings-lines-info-layer',
    type: "current-buildings"
  }
];

function renderLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          class="manahatta_items"
          id="${layerData.id || "manahatta_items"}"
          name="${layerData.name || "manahatta_items"}"
        />
        <i
          class="fas fa-plus-square compress-expand-icon"
          id="${layerData.caretId || "manahatta-layer-caret"}"
          onclick="itemsCompressExpand('${layerData.itemSelector || ""}','#${
    layerData.caretId || ""
  }')"
        ></i>
        <label for="${layerData.id || "manahatta_items"}">
          ${layerData.label || ""}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="${(layerData.id === "current_lots_items" || layerData.id === "grants_layer_items")? "zoomtocenter('NA')" :`zoomtobounds('${layerData.zoomTo || ""}')`}"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "manahatta-info"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;
  return html;
}
/**
 * 
 * @param {{
 *  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square";
* isSolid?: boolean;
* }} layerData 
 * @returns {string}
 */
function renderManahattaLayerItem(layerData) {
  const html = `
      <div class="layer-list-row ${layerData.topLayerClass}_item">
        &nbsp; &nbsp; &nbsp;
        <input
          type="checkbox"
          class="${layerData.className}"
          id="${layerData.id || "lenape_trails"}"
          name="${layerData.name || "lenape_trails"}"
        />
        <label for="${layerData.id || "lenape_trails"}">
          <i class="${layerData.isSolid? "fas" : "far"} fa-${layerData.iconType || "slash"} ${layerData.iconType === "square"? "" : "slash-icon"}" style="color: ${
            layerData.iconColor || "#ff0000"
          }"></i>
          ${layerData.label || "Lenape Trails"}
        </label>
      </div>
    `;

  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderCirclePointLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "circle_point"}"
          name="${layerData.name || "circle_point"}"
          ${layerData.checked ? 'checked="checked"' : ""}
        />
  
        <label for="${layerData.id || "circle_point"}">
          <i class="fa fa-play-circle" style="color: ${
            layerData.iconColor || "#097911"
          }"></i>${layerData.label || "1643-75 | Lot Events"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "demo-taxlot-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  // Assuming you want to append this HTML to the body
  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderGrantLotsLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "grant_lots"}"
          name="${layerData.name || "grant_lots"}"
        />
        <label for="${layerData.id || "grant_lots"}">
          <i class="fa fa-square" style="color: ${
            layerData.iconColor || "#008888"
          }"></i>${layerData.label || "1643-67 | Demo Grant Divisions: C7"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "demo-grant-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  // Assuming you want to append this HTML to the body
  return html;
}

/**
 * 
 * @param {{
*  id: string;
* name?: string;
* caretId?: string;
* label: string;
* iconColor?: string;
* itemSelector?: string;
* zoomTo?: string;
* infoId: string;
* type?: "group" | "lots-events" | "grants-lots" | "castello-points" | "current-buildings";
* iconType?: "square"
* }} layerData 
 * @returns {string}
 */
function renderCastelloPointsLayerRow(layerData) {
  const html = `
      <div class="layer-list-row">
        <input
          type="checkbox"
          id="${layerData.id || "castello_points"}"
          name="${layerData.name || "castello_points"}"
        />
        <label for="${layerData.id || "castello_points"}">
          <i class="fa fa-circle" style="color: ${
            layerData.iconColor || "#ff0000"
          }"></i>${layerData.label || "1660 | Castello Taxlots"}
          <div class="dummy-label-layer-space"></div>
        </label>
        <div class="layer-buttons-block">
          <div class="layer-buttons-list">
            <i
              class="fa fa-crosshairs zoom-to-layer"
              onclick="zoomtocenter('${layerData.zoomTo || "NA"}')"
              title="Zoom to Layer"
            ></i>
            <i
              class="fa fa-info-circle layer-info trigger-popup"
              id="${layerData.infoId || "castello-info-layer"}"
              title="Layer Info"
            ></i>
          </div>
        </div>
      </div>
    `;

  // Assuming you want to append this HTML to the body
  return html;
}



$("#manahatta-section-layers").html(
  renderLayers(layerSectionObjects)
);
console.log("generateLayer script ran successfully :)");
