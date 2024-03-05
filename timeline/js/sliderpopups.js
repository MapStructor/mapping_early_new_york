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
  const nid =props.nid;

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
  var popup_html =
    "<h3>Grant Lot Division</h3><hr>" +
    "<br>" +
    "<b>Original Dutch Grant: </b>" +
    props.Lot +
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

  $("#infoLayerDutchGrants").html(popup_html);

  $("#infoLayerDutchGrants").html(popup_html);
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
  var popup_html = "";
  // There's an NID present for this layer, but there's no associated data in drupal. Once added, uncomment the following code
  // const nid = props.NID_num;
  /* fetch(
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
    }); */

  if (typeof lots_info[props.NID_num] == "undefined") {
    popup_html =
      "<h3>Original Grants &amp; Farms</h3><hr>" +
      "<br>" +
      "<b>To:</b> <i>" +
      props.To +
      "</i><br>" +
      "<b>Date:</b> <i>" +
      props.Date +
      "</i><br>" +
      "<br>";
  } else {
    popup_html = "<h3>Original Grants &amp; Farms</h3><hr><br>";
    if (lots_info[props.NID_num].title_linked.length > 0) {
      popup_html +=
        "<b>" + lots_info[props.NID_num].title_linked + "</b><br><br>";
    } else if (lots_info[props.NID_num].title.length > 0) {
      popup_html += "<b>" + lots_info[props.NID_num].title + "</b><br><br>";
    }
    if (lots_info[props.NID_num].to_party.length > 0) {
      if (lots_info[props.NID_num].to_party_linked.length > 0)
        popup_html +=
          "<b>To Party:</b> <i>" +
          lots_info[props.NID_num].to_party_linked +
          "</i><br>";
      //RESTORE THIS:
      else
        popup_html +=
          "<b>To Party:</b> <i>" +
          lots_info[props.NID_num].to_party +
          "</i><br>";
    }
      // Check if to_party2_linked is defined and has content, and use it first
      if (lots_info[props.NID_num].to_party2_linked && lots_info[props.NID_num].to_party2_linked.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" +
          lots_info[props.NID_num].to_party2_linked.replace(
          //  /href="\u0022/g,
              /href="/g,
            "target=\"_blank\" href=\"https://nahc-mapping.org/mappingNY/encyclopedia"
          ) +
          "</i><br>";
      }
      // We only add the plain text version if to_party2_linked is not present
      else if (lots_info[props.NID_num].to_party2 && lots_info[props.NID_num].to_party2.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" + lots_info[props.NID_num].to_party2 + "</i><br>";
      }


      // Inside the else block, where other properties are added:
      if (lots_info[props.NID_num].to_party_linked2.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" +
          lots_info[props.NID_num].to_party_linked2 +
          "</i><br>";
      } else if (lots_info[props.NID_num].to_party_text2.length > 0) {
        popup_html +=
          "<b>To Party 2:</b> <i>" +
          lots_info[props.NID_num].to_party_text2 +
          "</i><br>";
      }

    if (lots_info[props.NID_num].from_party.length > 0) {
      if (lots_info[props.NID_num].from_party_linked.length > 0)
        //RESTORE THIS TOO:
        popup_html +=
          "<b>From Party:</b> <i>" +
          lots_info[props.NID_num].from_party_linked +
          "</i><br>";
      else
        popup_html +=
          "<b>From Party:</b> <i>" +
          lots_info[props.NID_num].from_party +
          "</i><br>";
    }


    if (lots_info[props.NID_num].from_party_linked2.length > 0) {
      popup_html +=
        "<b>From Party 2:</b> <i>" +
        lots_info[props.NID_num].from_party_linked2 +
        "</i><br>";
    } else if (lots_info[props.NID_num].from_party_text2.length > 0) {
      popup_html +=
        "<b>From Party 2:</b> <i>" +
        lots_info[props.NID_num].from_party_text2 +
        "</i><br>";
    }



    if (lots_info[props.NID_num].date_start.length > 0) {
      popup_html +=
        "<b>Start:</b> <i>" + lots_info[props.NID_num].date_start + "</i><br>";
    }
    if (lots_info[props.NID_num].date_end.length > 0) {
      popup_html +=
        "<b>End:</b> <i>" + lots_info[props.NID_num].date_end + "</i><br>";
    }
    if (lots_info[props.NID_num].type.length > 0) {
      popup_html +=
        "<br><b>Type:</b> <i>" + lots_info[props.NID_num].type + "</i><br>";
    }
  }

 $("#infoLayerFarms").html(popup_html);

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
  // Needs more styling
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
      
    $("#longIslandLots").html(modifiedHtmlString);
  });
}