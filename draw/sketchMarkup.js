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
            input[type="text"], textarea {
                width: 95%;
                border: 1px solid #ccc;
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
                margin: 0 10% 0 10%; /* Reduced bottom margin */
                display: flex;
                justify-content: center;
            }
            
            .update-group button {
                width: 100%; /* Make the button fill the entire width of its container */
            }
            
            
            /* Group for Lower Buttons */
            .lower-buttons {
                width: 80%; /* Same width as the update-group */
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
            <b>Before Map</b>
            <div id="beforemap-drawing-controls"></div>

            <div class="calculation-box">
            <input type="text" id="beforemap-title-input" placeholder="Title" class="sketch-input"/>
            <textarea id="beforemap-info-input" placeholder="Additional information"></textarea>
            
            <div class="button-group update-group">
                <button id="beforemap-update-info-button" onclick="updateFeatureInfo('beforemap')">Update Info</button>
            </div>
        
            <div class="button-group lower-buttons">
                <button onclick="downloadGeoJSON('beforemap')">Save</button>
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
        


        </div>
        
            <!-- After Map Section -->
            <b>After Map</b>
            <div id="aftermap-drawing-controls"></div>
            <div class="calculation-box">
                <input type="text" id="aftermap-title-input" placeholder="Title" class="sketch-input"/>
                <textarea id="aftermap-info-input" placeholder="Additional information"></textarea>
                
                <div class="button-group update-group">
                    <button id="aftermap-update-info-button" onclick="updateFeatureInfo('aftermap')">Update Info</button>
                </div>
            
                <div class="button-group lower-buttons">
                    <button onclick="downloadGeoJSON('aftermap')">Save</button>
                    <label for="aftermap-file_upload" class="file-upload-label">Open</label>
                </div>
                <input
                    type="file"
                    id="aftermap-file_upload"
                    class="file_upload sketch-input"
                    accept=".geojson"
                    onchange="handleFileUpload('aftermap')"
                    style="display:none;" <!-- Hidden input moved outside the flex container -->
            </div>
        </div>
    `;

    $("#sketch-content").html(markUp);
}
