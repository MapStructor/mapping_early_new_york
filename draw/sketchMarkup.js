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

            /* General Styles */
            .sketch-input, .calculation-box button, #enable-edit-mode, #disable-edit-mode {
                font-family: 'Arial', sans-serif;
                margin: 10px 0;
                padding: 10px;
                border-radius: 5px;
            }

            /* Overriding margin for buttons and labels within the calculation-box */
            .calculation-box button, 
            .calculation-box .file-upload-label {
                margin: 3px; /* Removing top and bottom margins */
                padding: 10px; /* Keeping the padding as it was */
            }

            

            /* Buttons */
            button {
                background-color: #4CAF50; /* Green */
                color: white;
                border: none;
                cursor: pointer;
                transition: background-color 0.01s;
            }

            /* Style for Upload Labels */
            label[for="beforemap-file_upload"], label[for="aftermap-file_upload"] {
                cursor: pointer;
                display: inline-block; /* Align with the adjacent button */
                background-color: #4CAF50; /* Green */
                color: white;
                padding: 10px;
                border-radius: 5px;
                margin: 10px 0;
                transition: background-color 0.01s;
            }

            /* Active (pressed) state for labels */
            label[for="beforemap-file_upload"]:active, label[for="aftermap-file_upload"]:active {
                background-color: #2a6e2d; /* Even darker shade for pressed state */
            }  

            button:hover, label[for="beforemap-file_upload"]:hover, label[for="aftermap-file_upload"]:hover {
                background-color: #3e8e41;
            }

            button:active {
                background-color: #2a6e2d; /* Darker green */
                transform: scale(0.95); /* Slightly smaller */
            }

            .update-info-button.checkmark {
                color: green;
                font-weight: bold;
            }
            
            
            /* Input Fields and Textareas */
            input[type="text"], textarea, input[type="number"] {
                width: 91%;
                border: 1px solid #ccc;
                padding: 10px; /* Padding for visual comfort */
                border-radius: 5px; /* Rounded corners for aesthetics */
                font-family: 'Arial', sans-serif; /* Consistent font */
            }

            /* File Upload */
            .file_upload {
                cursor: pointer;
            }

            /* Titles and Headings */
            .title, .calculation-box b {
                font-weight: bold;
                font-size: 1.2em;
            }

            /* Responsive Design */
            @media screen and (max-width: 600px) {
                input[type="text"], textarea, button {
                    width: 100%;
                }
            }

            /* Button Group Styling */
            .button-group {
                display: flex;
                justify-content: center;
                /*margin: 10px 0;*/
            }
            
            .update-group {
                width: 80%; /* Same width as before */
                margin: 2% 10% 0 10%; /* Reduced bottom margin */
                display: flex;
                justify-content: center;
            }
            
            .update-group button {
                width: 100%; /* Make the button fill the entire width of its container */
            }
            
            
            /* Group for Lower Buttons */
            .lower-buttons {
                width: 79%; /* Same width as the update-group */
                margin: 0 10% 0 10%; /* Reduced top margin, aligned with update-group */
                display: flex;
                justify-content: space-between;
            }
            
            .lower-buttons button, .lower-buttons .file-upload-label {
                flex: 1; /* Each button will take up half the space of their container */
                text-align: center;
                margin-right: 10px; /* Space between the buttons */
            }
            
            /* Remove margin from the last element in the lower-buttons group */
            .lower-buttons :last-child {
                margin-right: 0;
            }
            
            .file-upload-label {
                display: inline-block;
                cursor: pointer;
            }

            #beforemap-drawing-controls {
                display: flex;
                justify-content: center;
                align-items: center; /* Optional, if you also want vertical centering */
            }
            
            .mapboxgl-ctrl-group {
                width: max-content;
                margin-bottom: 1%;
                background-color: #b0b0b0 /* Make sure the background color is the same as when pressed */
            }

            .mapboxgl-ctrl-group > button {
                background-color: white
            }
            
            .mapboxgl-ctrl-group button:hover {
                background-color: #e0e0e0; /* Lighter shade when hovered */
            }
            
            /* Note: when pressed, there is a small gap on the left. Address that eventually */
            .mapboxgl-ctrl-group button:active {
                background-color: #b0b0b0; /* Darker shade when pressed */
            }

            /* Class for the active (on) state */
            .mapboxgl-ctrl-group button.active {
                background-color: #e0e0e0; /* Different color when remains on */
            }
            
            #beforemap-info-input {
                max-width: 92%; /* Fixed width */
                min-width: 92%; /* Fixed width */
                min-height: 50px; /* Initial height */
                overflow-y: hidden; /* Hide the vertical scrollbar */
                /*resize: none;*/ /* Prevent manual resizing */
            }
            
            
            /* Style for GeoJSON Selector */
            #geojson-selector {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-family: 'Arial', sans-serif;
            margin: 10px 0;
            box-sizing: border-box; /* Ensure padding and border don't increase element width */
            }

            
            
        </style>
        <hr/>
        <p class="title">SKETCH</p>

        <!-- Removing these while enable/disable functions are removed.
        <center>
            <button id="enable-edit-mode" onclick="enable()">
                <i class="fa-solid fa-pencil"></i> <b>Enable</b>
            </button>
            <button id="disable-edit-mode" onclick="disable()" disabled>
                <i class="fa-solid fa-pencil"></i> <b>Disable</b>
            </button>
        </center>
        -->

        <div id="sketch-dropdown">
            <!-- <b>Before Map</b> -->
            <br>
            <div id="beforemap-drawing-controls"></div>

            <div class="calculation-box">
            <input type="text" id="beforemap-title-input" placeholder="Title" class="sketch-input"/>
            <input type="number" id="beforemap-startdate-input" placeholder="Start Date" class="sketch-input"/>
            <input type="number" id="startdate2" placeholder="Start Date 2" class="sketch-input"/>
            <input type="number" id="beforemap-nid-input" placeholder="Nid" class="sketch-input"/>
            <input type="number" id="beforemap-enddate-input" placeholder="End Date" class="sketch-input"/>
            <textarea id="beforemap-info-input" placeholder="Additional information"></textarea>

            <select id="geojson-selector" onchange="loadSelectedGeoJSON()">
                <option value="">Select a GeoJSON</option>
                <option value="example.geojson">example.geojson</option>
                <option value="drawn_polygon2.geojson">drawn_polygon2.geojson</option>
                <option value="info_of_interest.geojson">info_of_interest.geojson</option>
            </select>
            
            <div class="button-group update-group">
                <button id="beforemap-update-info-button" onclick="updateFeatureInfo('beforemap')">Save</button>
            </div>
        
            <div class="button-group lower-buttons">
                <button onclick="downloadGeoJSON('beforemap')">Download</button>
                <label for="beforemap-file_upload" class="file-upload-label">Open</label>
            </div>
            <input
                type="file"
                id="beforemap-file_upload"
                class="file_upload sketch-input"
                accept=".geojson"
                onchange="handleFileUpload('beforemap')"
                style="display:none;"  <!-- Hidden input moved outside the flex container -->
        </div>
        <br>


        <!-- NOTE: If you want to add sketching for the right side, just copy
        what's above, and replace "beforemap" with "aftermap"
        -->

    `;

    $("#sketch-content").html(markUp);

    map._setPosition(innerWidth)
}
