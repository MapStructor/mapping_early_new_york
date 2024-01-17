/* 
Sketch will only be visibke at domain.com/sketch.html
/home/victor/Documents/gigs/MapStructor/projects/mapping early new york/sketch.html
*/

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("sketch") === "1") {
  const markUp = `
      <style>
          .sketch-input {
              display: block;
          }
          .file_upload {
              height: 0px;
              opacity: 0;
              width: 100%;
          }
      </style>
      <hr/>
      <p class="title">SKETCH</p>
      <center>
          <button id="enable-edit-mode" onclick="enable()">
              &nbsp; &nbsp; <i class="fa-solid fa-pencil"></i> &nbsp;
              <b>Enable</b> &nbsp; &nbsp; &nbsp;
          </button>

          <button id="disable-edit-mode" onclick="disable()" disabled>
              &nbsp; &nbsp; <i class="fa-solid fa-pencil"></i> &nbsp;
              <b>Disable</b> &nbsp; &nbsp; &nbsp;
          </button>
      </center>
      <div id="sketch-dropdown">
          <b>&nbsp; Before Map</b>
          <div id="beforemap-drawing-controls"></div>
          <div class="calculation-box">
              <input type="text" id="beforemap-title-input" placeholder="Title" class="sketch-input"/>
              <textarea id="beforemap-info-input" placeholder="Additional information"></textarea>
              <button onclick="updateFeatureInfo('beforemap')">Update Feature Info</button>
              <button><label for="beforemap-file_upload">Upload GeoJSON</label></button>
              <div id="calculated-area"></div>
              <button onclick="downloadGeoJSON('beforemap')">Download GeoJSON</button>
              <input
                  type="file"
                  id="beforemap-file_upload"
                  class="file_upload sketch-input"
                  accept=".geojson"
                  onchange="handleFileUpload('beforemap')"
              />
          </div>
          <b>&nbsp; After Map</b>
          <div id="aftermap-drawing-controls"></div>
          <div class="calculation-box">
              <input type="text" id="aftermap-title-input" placeholder="Title" class="sketch-input"/>
              <textarea id="aftermap-info-input" placeholder="Additional information"></textarea>
              <button onclick="updateFeatureInfo('aftermap')">Update Feature Info</button>
              <button><label for="aftermap-file_upload">Upload GeoJSON</label></button>
              <div id="calculated-area"></div>
              <button onclick="downloadGeoJSON('aftermap')">Download GeoJSON</button>
              <input
                  type="file"
                  class="file_upload sketch-input"
                  id="aftermap-file_upload"
                  accept=".geojson"
                  onchange="handleFileUpload('aftermap')"
              />
          </div>
      </div>
  `;

  $("#sketch-content").html(markUp);
}
