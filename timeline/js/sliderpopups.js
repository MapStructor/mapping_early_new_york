function extractTextFromHTML(htmlString) {
  return $("<div>").html(htmlString).text();
}

function addFieldToPopup(
  fieldContent,
  displayMode = "",
  addExtraBreak = "",
  defaultValue = ""
) {
  let content = fieldContent
    ? displayMode === "unlinked"
      ? extractTextFromHTML(fieldContent)
      : fieldContent
    : defaultValue;
  return content
    ? (addExtraBreak === "break" ? "<br>" : "") + content + "<br>"
    : "";
}

function buildPopUpInfo(props) {
  const nid = props.nid;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      // Define the prefix
      var prefix = "https://encyclopedia.nahc-mapping.org";

      // Define the regular expression pattern
      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "";

      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });

      $("#demoLayerInfo").html(modifiedHtmlString);
      const title = $("#demoLayerInfo h2.node__title");
      title.hide();
      const targetElement = $(
        '#demoLayerInfo .field.field--name-field-taxlot.field--type-entity-reference.field--label-above .field__label'
      );
      targetElement.text("Lot:")
      targetElement.css({
        "font-size": "1.5em",
        "font-weight": "bold",
        "margin-top": "1em",
        // "margin-bottom": "0.5em",
        // "padding": "0.5em 0",
      });
    $(
        '#demoLayerInfo .field.field--name-field-taxlot.field--type-entity-reference.field--label-above .field__items'
      ).css({
        "font-size": "1.5em",
        // "font-weight": "bold",
        // "margin-top": "1em",
        // "margin-bottom": "0.5em",
        // "padding": "0.5em 0",
      });;
      /* const text = targetElement.text();
      const anchorTag = $("<a>").attr("href", href).attr("target", "_blank").text(text);
      targetElement.replaceWith(anchorTag); */
    });
}

function buildGrantLotsPopUpInfo(props) {
  const nid =
    props.drupalNid ||
    props.nid ||
    props.node_id ||
    props.node ||
    props.NID_num ||
    null;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      var prefix = "https://encyclopedia.nahc-mapping.org";

      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "";

      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });

      $("#infoLayerGrantLots").html(modifiedHtmlString);
    });
}

function buildDutchGrantPopUpInfo(props) {
  const nid =
    props.drupalNid ||
    props.nid ||
    props.node_id ||
    props.node ||
    props.NID_num ||
    null;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      // Define the prefix
      var prefix = "https://encyclopedia.nahc-mapping.org";

      // Define the regular expression pattern
      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "<h3>Dutch Grant</h3><hr/>";
      console.log(
        "expression present = ",
        /(<img.*src=")([^"]+)(")/g.test(modifiedHtmlString)
      );
      // Replace href attributes with the prefixed version
      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        })
        .replace(/(<img.*src=")([^"]+)(")/g, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        });

      $("#infoLayerDutchGrants").html(modifiedHtmlString);
      const title = $("#infoLayerDutchGrants h2.node__title a");
      const href = title.attr("href");
      title.hide();
      const targetElement = $(
        '#infoLayerDutchGrants .field.field--name-field-old-title.field--type-string.field--label-above .field__item'
      );
      const text = targetElement.text();
      const anchorTag = $("<a>").attr("href", href).attr("target", "_blank").text(text);
      targetElement.replaceWith(anchorTag);
    });

}

function buildGravesendPopUpInfo(props) {
  const nid = props.node;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      // NO
      const html = res[0].rendered_entity;
      // Define the prefix
      var prefix = "https://encyclopedia.nahc-mapping.org";

      // Define the regular expression pattern
      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "<h3>Brooklyn Grants</h3><hr>";

      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });
      console.log(html);
      $("#infoLayerGravesend").html(modifiedHtmlString);
      const title = $("#infoLayerGravesend h2.node__title a");
      const href = title.attr("href");
      title.hide();
      const targetElement = $(
        '#infoLayerGravesend .field.field--name-field-old-title.field--type-string.field--label-above .field__item'
      );
      const text = targetElement.text();
      const anchorTag = $("<a>").attr("href", href).attr("target", "_blank").text(text);
      targetElement.replaceWith(anchorTag);
    });
}

function buildNativeGroupPopUpInfo(props) {
  const nid =
    props.drupalNid ||
    props.nid ||
    props.node_id ||
    props.node ||
    props.NID_num ||
    null;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      // Define the prefix
      var prefix = "https://encyclopedia.nahc-mapping.org";

      // Define the regular expression pattern
      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "<h3>Long Island Tribes</h3><hr>";

      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });

      $("#infoLayerNativeGroups").html(modifiedHtmlString);
    });
}

function buildKarlPopUpInfo(props) {
  var nid = props.node_id.replace(/\/node\//g, "");
  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      // Define the prefix
      var prefix = "https://encyclopedia.nahc-mapping.org";

      // Define the regular expression pattern
      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "<h3>Long Island Towns</h3><hr>";

      // Replace href attributes with the prefixed version
      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });

      $("#infoLayerKarl").html(modifiedHtmlString);
      $("#infoLayerKarl h2.node__title").css({
        "font-size": "1em"
      })
    });
}

function buildFarmsPopUpInfo(props) {
  const nid = props.nid;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      var prefix = "https://encyclopedia.nahc-mapping.org";

      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "<h3>Original Grants &amp; Farms</h3><hr>";

      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });

      $("#infoLayerFarms").html(modifiedHtmlString);
      const title = $("#infoLayerFarms h2.node__title a");
      const href = title.attr("href");
      title.hide();
      const targetElement = $(
        '#infoLayerFarms .field.field--name-field-old-title.field--type-string.field--label-above .field__item'
      );
      const text = targetElement.text();
      const anchorTag = $("<a>").attr("href", href).attr("target", "_blank").text(text);
      targetElement.replaceWith(anchorTag);
    });
}

function buildCurrLotsPopUpInfo(props) {
  var popup_html =
    "<h3>Current Lot</h3><hr>" +
    "<b>Owner:</b>" +
    "<br>" +
    props.OwnerName +
    "<br><br>" +
    "<b>Address:</b>" +
    "<br>" +
    props.Address +
    "<br><br>" +
    "<b>Lot:</b>" +
    "<br>" +
    props.BBL +
    "<br><br>";
  $("#infoLayerCurrLots").html(popup_html);
}

function buildLongIslandLot(props) {
  const nid =
    props.drupalNid ||
    props.nid ||
    props.node_id ||
    props.node ||
    props.NID_num ||
    null;

  fetch(
    `https://encyclopedia.nahc-mapping.org/rendered-export-single?nid=${nid}`
  )
    .then((buffer) => buffer.json())
    .then((res) => {
      const html = res[0].rendered_entity;
      var prefix = "https://encyclopedia.nahc-mapping.org";

      var pattern = /(<a\s+href=")([^"]+)(")/g;
      var modifiedHtmlString = "";

      modifiedHtmlString += html
        .replace(pattern, (_, p1, p2, p3) => {
          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        })
        .replace(/(<a\s+[^>]*)(>)/g, (_, p1, p2) => {
          return p1 + ' target="_blank"' + p2;
        });

      $("#longIslandLots").html(modifiedHtmlString);
    });
}
