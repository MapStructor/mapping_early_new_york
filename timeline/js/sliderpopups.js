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
      var modifiedHtmlString = "<h2>Lot:</h2>";

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
      var modifiedHtmlString = "";
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
          console.log(p1, p2, p3);

          if (p2.slice(0, 4) === "http") {
            return p1 + p2 + p3;
          }
          return p1 + prefix + p2 + p3;
        });

      $("#infoLayerDutchGrants").html(modifiedHtmlString);
    });

  var popup_html = "";
  if (typeof lots_info[props.Lot] == "undefined") {
    popup_html =
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
  } else {
    var builds_imgs = "";
    if (lots_info[props.Lot].builds.length > 0) {
      for (let i = 0; i < lots_info[props.Lot].builds.length; i++) {
        builds_imgs +=
          "<img src='https://encyclopedia.nahc-mapping.org" +
          lots_info[props.Lot].builds[i] +
          "'  width='258' ><br><br>";
      }
    }
    popup_html =
      "<h3>Dutch Grant</h3><hr>" +
      "<br>" +
      "<b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/lots/grantlot" +
      props.Lot +
      "' target='_blank'>" +
      props.Lot +
      "</a><br>" +
      "<br>";

    if (lots_info[props.Lot].to_party_linked.length > 0) {
      popup_html +=
        "<b>To Party:</b> <i>" +
        lots_info[props.Lot].to_party_linked +
        "</i><br><br>";
    } else if (lots_info[props.Lot].to_party.length > 0) {
      popup_html +=
        "<b>To Party:</b> <i>" + lots_info[props.Lot].to_party + "</i><br><br>";
    }
    if (lots_info[props.Lot].from_party_linked.length > 0) {
      popup_html +=
        "<b>From Party:</b> <i>" +
        lots_info[props.Lot].from_party_linked +
        "</i><br><br>";
    } else if (lots_info[props.Lot].from_party.length > 0) {
      popup_html +=
        "<b>From Party:</b> <i>" +
        lots_info[props.Lot].from_party +
        "</i><br><br>";
    }
    if (lots_info[props.Lot].date_start.length > 0) {
      popup_html +=
        "<b>Start:</b> <i>" + lots_info[props.Lot].date_start + "</i><br>";
    }
    if (lots_info[props.Lot].date_end.length > 0) {
      popup_html +=
        "<b>End:</b> <i>" + lots_info[props.Lot].date_end + "</i><br><br>";
    }
    if (lots_info[props.Lot].descr.length > 0) {
      popup_html +=
        "<b>Description:</b>" +
        "<br>" +
        "<i>" +
        lots_info[props.Lot].descr +
        "</i>";
    }
    popup_html += "<br><br>" + builds_imgs;
  }

  // $("#infoLayerDutchGrants").html(popup_html);

  // $("#infoLayerDutchGrants").html(popup_html);
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
