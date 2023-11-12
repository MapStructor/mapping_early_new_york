
//////////////////
// Dynamic Layers
//////////////////

function addAfterLayers(yr, date) {

    //afterMap.on('load', function () {
        
		//REMOVING TAX LOT POINTS IF EXIST
        if (afterMap.getLayer("lot_events-bf43eb-right")) afterMap.removeLayer("lot_events-bf43eb-right");
        if (afterMap.getSource("lot_events-bf43eb")) afterMap.removeSource("lot_events-bf43eb");
		if (afterMap.getLayer("dutch_grants-5ehfqe-right")) afterMap.removeLayer("dutch_grants-5ehfqe-right");
        if (afterMap.getSource("dutch_grants-5ehfqe")) afterMap.removeSource("dutch_grants-5ehfqe");
       
	   
	    //ADD GRANTS POLYGONS
        
		//*A#
        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "dutch_grants-5ehfqe-right-highlighted",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.7q2vs9ar"
			},
			layout: {
                visibility: document.getElementById('grants_layer').checked ? "visible" : "none",
            },
			"source-layer": "dutch_grants-5ehfqe",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});

        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "dutch_grants-5ehfqe-right",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.7q2vs9ar"
			},
			layout: {
                visibility: document.getElementById('grants_layer').checked ? "visible" : "none",
            },
			"source-layer": "dutch_grants-5ehfqe",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.45
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});


        //CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'dutch_grants-5ehfqe-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'dutch_grants-5ehfqe-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredDutchGrantIdRight) {
                        afterMap.setFeatureState(
                            { source: 'dutch_grants-5ehfqe-right', sourceLayer: 'dutch_grants-5ehfqe', id: hoveredDutchGrantIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredDutchGrantIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'dutch_grants-5ehfqe-right', sourceLayer: 'dutch_grants-5ehfqe', id: hoveredDutchGrantIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    var PopUpHTML = "";
					if( typeof dutch_grant_lots_info[e.features[0].properties.Lot] == "undefined" ) {
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + e.features[0].properties.name + "<br>";	
					} else {	
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + ( dutch_grant_lots_info[e.features[0].properties.Lot].name_txt.length > 0 ? dutch_grant_lots_info[e.features[0].properties.Lot].name_txt : e.features[0].properties.name ) + "<br>";
					}
					PopUpHTML += "<b>Dutch Grant Lot: </b>" + e.features[0].properties.Lot + "</div>";
					
					var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapDutchGrantPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'dutch_grants-5ehfqe-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredDutchGrantIdRight) {
                    afterMap.setFeatureState(
                        { source: 'dutch_grants-5ehfqe-right', sourceLayer: 'dutch_grants-5ehfqe', id: hoveredDutchGrantIdRight},
                        { hover: false }
                    );
                }
                hoveredDutchGrantIdRight = null;		
				if(afterMapDutchGrantPopUp.isOpen()) afterMapDutchGrantPopUp.remove();
            });
		
		
		

		//ADD TAX LOT POINTS

		afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "lot_events-bf43eb-right",
			type: "circle",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.9s9s67wu"
			},
			layout: {
                visibility: document.getElementById('circle_point').checked ? "visible" : "none",
            },
			"source-layer": "lot_events-bf43eb",
			paint: {

				//CIRCLE COLOR
				'circle-color': {
					type: "categorical",
					property: "color",
					stops: [
						["6", "#0000ee"],
						["5", "#097911"],
						["4", "#0000ee"],
						["3", "#097911"],
						["2", "#0000ee"],
						["1", "#097911"]
					],
					default: "#FF0000"
				},

                    //CIRCLE OPACITY
                    'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': {
					    type: "categorical",
					    property: "color",
					    stops: [
						    ["6", "#0000ee"],
						    ["5", "#097911"],
						    ["4", "#0000ee"],
						    ["3", "#097911"],
						    ["2", "#0000ee"],
						    ["1", "#097911"]
					    ],
					    default: "#FF0000"
				    },
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ],


				//CIRCLE RADIUS
				"circle-radius": {
					type: "categorical",
					property: "TAXLOT",
					stops: [
						["C7", 9]
					]
				}

			},
			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});



		//TAX LOT POPUP
		// CLICK AND OPEN POPUP
		//*A
		           
		            
                    
					
		// CHANGE TO CURSOR WHEN HOVERING
		afterMap.on('mouseenter', 'lot_events-bf43eb-right', function (e) {
			afterMap.getCanvas().style.cursor = 'pointer';
					
			        if (hoveredStateIdRightCircle) {
                        afterMap.setFeatureState(
                            { source: 'lot_events-bf43eb-right', sourceLayer: 'lot_events-bf43eb', id: hoveredStateIdRightCircle},
                            { hover: false }
                        );
                    }
                    hoveredStateIdRightCircle = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'lot_events-bf43eb-right', sourceLayer: 'lot_events-bf43eb', id: hoveredStateIdRightCircle},
                        { hover: true }
                    );
					
				var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				
				        afterMapPopUp
				            .setLngLat(coordinates)
							.setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" + e.features[0].properties.TAXLOT + "' target='_blank'>" + e.features[0].properties.TAXLOT + "</a></h2></b></div>")
                            .addTo(afterMap);
		});

		// CHANGE TO POINTER WHEN NOT HOVERING
		afterMap.on('mouseleave', 'lot_events-bf43eb-right', function () {
			afterMap.getCanvas().style.cursor = '';
			    if (hoveredStateIdRightCircle) {
                    afterMap.setFeatureState(
                        { source: 'lot_events-bf43eb-right', sourceLayer: 'lot_events-bf43eb', id: hoveredStateIdRightCircle},
                        { hover: false }
                    );
                }
                hoveredStateIdRightCircle = null;		
				if(afterMapPopUp.isOpen()) afterMapPopUp.remove();
		})
	//});
}



function addGrantLotsAfterLayers(date) {
	
	//REMOVING TAX LOT POINTS IF EXIST
	    if (afterMap.getLayer("grant-lots-right")) afterMap.removeLayer("grant-lots-right");
        if (afterMap.getSource("demo_divisions_grant_c7-42w8pa")) afterMap.removeSource("demo_divisions_grant_c7-42w8pa");
		
	// Add a layer showing the places.
	        afterMap.addLayer({
                id: "grant-lots-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.26xwjv4e"
                },
				layout: {
                    visibility: document.getElementById('grant_lots').checked ? "visible" : "none",
                },
                "source-layer": "demo_divisions_grant_c7-42w8pa",
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.5
                        ],
					'fill-outline-color': "#FF0000"
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
			
			
			//CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'grant-lots-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapGrantLotPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'grant-lots-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredGrantLotIdRight) {
                        afterMap.setFeatureState(
                            { source: 'grant-lots-right', sourceLayer: 'demo_divisions_grant_c7-42w8pa', id: hoveredGrantLotIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredGrantLotIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'grant-lots-right', sourceLayer: 'demo_divisions_grant_c7-42w8pa', id: hoveredGrantLotIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
			    
                 
                 
				    var PopUpHTML = "<div class='infoLayerGrantLotsPopUp'>" +
									e.features[0].properties.name + "<br>" +
											"<b>Start:</b> " + e.features[0].properties.day1 + ", " + e.features[0].properties.year1 + "<br>" +
											"<b>End:</b> " + e.features[0].properties.day2 + ", " + e.features[0].properties.year2 + "<br>" +
											//"<br>" +
											"<b>Lot Division: </b>" + e.features[0].properties.dutchlot +
									"</div>";
					
					
				var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapGrantLotPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'grant-lots-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredGrantLotIdRight) {
                    afterMap.setFeatureState(
                        { source: 'grant-lots-right', sourceLayer: 'demo_divisions_grant_c7-42w8pa', id: hoveredGrantLotIdRight},
                        { hover: false }
                    );
                }
                hoveredGrantLotIdRight = null;		
				if(afterMapGrantLotPopUp.isOpen()) afterMapGrantLotPopUp.remove();
            });
}


function addGrantLotsLinesAfterLayers(date) {
	
	//REMOVING TAX LOT POINTS IF EXIST
		if (afterMap.getLayer("grant-lots-lines-right")) afterMap.removeLayer("grant-lots-lines-right");
        if (afterMap.getSource("dutch_grants_lines-0y4gkx")) afterMap.removeSource("dutch_grants_lines-0y4gkx");
	
	
	// Add a layer showing the places.
	        afterMap.addLayer({
                id: "grant-lots-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.7dw0tqar"
                },
				layout: {
                    visibility: document.getElementById('grants_layer_lines').checked ? "visible" : "none",
                },
                "source-layer": "dutch_grants_lines-0y4gkx",
                paint: {
                    "line-color": "#FF0000",
					"line-width": 3,
					"line-opacity": 0.8
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
}



/*REPLACE THIS*/
////////////////////////////
// Gravesend Dynamic Layers
////////////////////////////

function addGravesendAfterLayers(date) {
	
		afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "gravesend_boundaries-c6qrbw-right-highlighted",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.5q4mas7d"
			},
			layout: {
                visibility: document.getElementById('gravesend_layer').checked ? "visible" : "none",
            },
			"source-layer": "brooklyn_grants-7qxrvu",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});

        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "gravesend_boundaries-c6qrbw-right",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.5q4mas7d"
			},
			layout: {
                visibility: document.getElementById('gravesend_layer').checked ? "visible" : "none",
            },
			"source-layer": "brooklyn_grants-7qxrvu",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.45
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});


        //CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'gravesend_boundaries-c6qrbw-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapGravesendTwoPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'gravesend_boundaries-c6qrbw-right', function (e) {
				console.warn(e.features[0].id);
				console.log(e.features[0].properties);
				
				if (e.features.length > 0) {
                    if (hoveredGravesendIdRight) {
                        afterMap.setFeatureState(
                            { source: 'gravesend_boundaries-c6qrbw-right', sourceLayer: 'brooklyn_grants-7qxrvu', id: hoveredGravesendIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredGravesendIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'gravesend_boundaries-c6qrbw-right', sourceLayer: 'brooklyn_grants-7qxrvu', id: hoveredGravesendIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    var PopUpHTML = "";
					/*
					if( typeof dutch_grant_lots_info[e.features[0].properties.Lot] == "undefined" ) {
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + e.features[0].properties.name + "<br>";	
					} else {	
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + ( dutch_grant_lots_info[e.features[0].properties.Lot].name_txt.length > 0 ? dutch_grant_lots_info[e.features[0].properties.Lot].name_txt : e.features[0].properties.name ) + "<br>";
					}
					*/
					PopUpHTML += "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" + e.features[0].properties.Name + "</div>";
					
					var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                console.log(PopUpHTML);
                //AFTER MAP POP UP CONTENTS
                afterMapGravesendTwoPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'gravesend_boundaries-c6qrbw-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredGravesendIdRight) {
                    afterMap.setFeatureState(
                        { source: 'gravesend_boundaries-c6qrbw-right', sourceLayer: 'brooklyn_grants-7qxrvu', id: hoveredGravesendIdRight},
                        { hover: false }
                    );
                }
                hoveredGravesendIdRight = null;		
				if(afterMapGravesendTwoPopUp.isOpen()) afterMapGravesendTwoPopUp.remove();
            });
	
}


function addGravesendLinesAfterLayers(date) {
	
	        afterMap.addLayer({
                id: "gravesend-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.9t6krwcz"
                },
				layout: {
                    visibility: document.getElementById('gravesend_layer_lines').checked ? "visible" : "none",
                },
                "source-layer": "brooklyn_grants_lines-8ry03u",
                paint: {
                    "line-color": "#FF0000",
					"line-width": 3,
					"line-opacity": 0.8
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
}
/*REPLACE THIS*/



////////////////////////////
// Karl Dynamic Layers
////////////////////////////

function addKarlAfterLayers(date) {
	
		afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "karl_long_island-right-highlighted",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.dv28lnbp"
			},
			layout: {
                visibility: document.getElementById('karl_layer').checked ? "visible" : "none",
            },
			"source-layer": "boundary_areas_long_island-8guvh4",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});

        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "karl_long_island-right",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.dv28lnbp"
			},
			layout: {
                visibility: document.getElementById('karl_layer').checked ? "visible" : "none",
            },
			"source-layer": "boundary_areas_long_island-8guvh4",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.45
                        ],
				"fill-outline-color": "#FF0000"

			},

			filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});


        //CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'karl_long_island-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapKarlTwoPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'karl_long_island-right', function (e) {
				console.warn(e.features[0].id);
				console.log(e.features[0].properties);
				
				if (e.features.length > 0) {
                    if (hoveredKarlIdRight) {
                        afterMap.setFeatureState(
                            { source: 'karl_long_island-right', sourceLayer: 'boundary_areas_long_island-8guvh4', id: hoveredKarlIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredKarlIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'karl_long_island-right', sourceLayer: 'boundary_areas_long_island-8guvh4', id: hoveredKarlIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    var PopUpHTML = "";
					/*
					if( typeof dutch_grant_lots_info[e.features[0].properties.Lot] == "undefined" ) {
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + e.features[0].properties.name + "<br>";	
					} else {	
						PopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + ( dutch_grant_lots_info[e.features[0].properties.Lot].name_txt.length > 0 ? dutch_grant_lots_info[e.features[0].properties.Lot].name_txt : e.features[0].properties.name ) + "<br>";
					}
					*/
					//e.features[0].properties.Name
					PopUpHTML += "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" + e.features[0].properties.corr_label + "</div>";
					
					var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                console.log(PopUpHTML);
                //AFTER MAP POP UP CONTENTS
                afterMapKarlTwoPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'karl_long_island-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredKarlIdRight) {
                    afterMap.setFeatureState(
                        { source: 'karl_long_island-right', sourceLayer: 'boundary_areas_long_island-8guvh4', id: hoveredKarlIdRight},
                        { hover: false }
                    );
                }
                hoveredKarlIdRight = null;		
				if(afterMapKarlTwoPopUp.isOpen()) afterMapKarlTwoPopUp.remove();
            });
	
}


function addKarlLinesAfterLayers(date) {
	
	        afterMap.addLayer({
                id: "karl-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.ckj6h3ga"
                },
				layout: {
                    visibility: document.getElementById('karl_layer_lines').checked ? "visible" : "none",
                },
                "source-layer": "boundary_lines_long_island-0c8elq",
                paint: {
                    "line-color": "#FF0000",
					"line-width": 3,
					"line-opacity": 0.8
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
}



/////////////////////////
// Farms Dynamic Layer
/////////////////////////

function addAfterFarmsLayer(date) {
	
		//ADD FARMS POLYGONS
		//*A fill pink #FFC0CB outline #C71585
        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "original_grants_and_farms-right-highlighted",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.0508movm"
			},
			layout: {
                visibility: document.getElementById('farms_layer').checked ? "visible" : "none",
            },
			"source-layer": "original_farms-6me5t0",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0
                        ],
				"fill-outline-color": "#FF0000"

			},
            filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
		});

        //*A fill pink #FFC0CB outline #C71585
        afterMap.addLayer({
			//ID: CHANGE THIS, 1 OF 3
			id: "original_grants_and_farms-right",
			type: "fill",
			source: {
				type: "vector",
				//URL: CHANGE THIS, 2 OF 3
				url: "mapbox://mapny.0508movm"
			},
			layout: {
                visibility: document.getElementById('farms_layer').checked ? "visible" : "none",
            },
			"source-layer": "original_farms-6me5t0",
			paint: {
				"fill-color": "#e3ed58",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.45
                        ],
				"fill-outline-color": "#FF0000"

			},
            filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
			
		});


		//ADD FARMS LINES
        //*A golden #FFD700
		    afterMap.addLayer({
                id: "farms-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.6dwzmxth"
                },
				layout: {
                    visibility: document.getElementById('farms_layer_lines').checked ? "visible" : "none",
                },
                "source-layer": "original_farms_lines-57l4u7",
                paint: {
				    "line-color": "#FF0000",
					"line-width": 3,
					"line-opacity": 0.8
				},
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
			
            });

        //CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'original_grants_and_farms-right', function (e) {
				console.log(e.features[0]);
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapFarmPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'original_grants_and_farms-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredFarmsIdRight) {
                        afterMap.setFeatureState(
                            { source: 'original_grants_and_farms-right', sourceLayer: 'original_farms-6me5t0', id: hoveredFarmsIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredFarmsIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'original_grants_and_farms-right', sourceLayer: 'original_farms-6me5t0', id: hoveredFarmsIdRight},
                        { hover: true }
                    );
					
                    //console.log(e.lngLat.lng);
					var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapFarmPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        "<div class='infoLayerFarmsPopUp'>" + e.features[0].properties.To + "</div>"
                    );
				
				}
				
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'original_grants_and_farms-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredFarmsIdRight) {
                    afterMap.setFeatureState(
                        { source: 'original_grants_and_farms-right', sourceLayer: 'original_farms-6me5t0', id: hoveredFarmsIdRight},
                        { hover: false }
                    );
                }
                hoveredFarmsIdRight = null;		
				if(afterMapFarmPopUp.isOpen()) afterMapFarmPopUp.remove();
            });
            
	
}


/////////////////////////
// Info Static Layer
/////////////////////////

function addInfoAfterLayers(date) {
	
	        // Add a layer showing the info.
	        afterMap.addLayer({
                id: "info-points-right",
                type: "circle",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.8c0cqfdz"
                },
				layout: {
                    visibility: document.getElementById('info_points').checked ? "visible" : "none",
                },
                "source-layer": "info_of_interest-17rpk9",
                paint: {
                    'circle-color': '#0dd3d3',
					'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#046969',
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ]
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
	
	        //ON HOVER
            afterMap.on('mouseenter', 'info-points-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				//console.log(e.features[0].id);
			    //console.log(e.features[0].properties);
			    if (e.features.length > 0) {
                    if (hoveredInfoIdRight) {
                        afterMap.setFeatureState(
                            { source: 'info-points-right', sourceLayer: 'info_of_interest-17rpk9', id: hoveredInfoIdRight},
                            { hover: false }
                        );
                    }
                    hoveredInfoIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'info-points-right', sourceLayer: 'info_of_interest-17rpk9', id: hoveredInfoIdRight},
                        { hover: true }
                    );
					
			    var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapInfoPopUp
                    .setLngLat(coordinates)
                    .setHTML(
                        "<div class='infoLayerInfoPointPopUp'><b>" + e.features[0].properties.Label + "</b><br>"
                        //+ e.features[0].properties.Date
                         + "</div>"
                    )
                    .addTo(afterMap);
					
				}
			});
			
			//OFF HOVER
            afterMap.on('mouseleave', 'info-points-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredInfoIdRight) {
                    afterMap.setFeatureState(
                        { source: 'info-points-right', sourceLayer: 'info_of_interest-17rpk9', id: hoveredInfoIdRight},
                        { hover: false }
                    );
                }
                hoveredInfoIdRight = null;	
				if(afterMapInfoPopUp.isOpen()) afterMapInfoPopUp.remove();
            });
	
}


/////////////////////////
// Info Static Layer
/////////////////////////

function addInfoLabelsAfterLayers(date) {
	
	        // Add a layer showing the places.
	        afterMap.addLayer({
                id: "info-labels-right",
                type: "symbol",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.8c0cqfdz"
                },
				layout: {
                    visibility: document.getElementById('info_labels').checked ? "visible" : "none",
                    "text-field": "{Label}",
					"text-offset": [0,1],
                    "text-size": {
                    stops: [
                        [0, 4],
                        [22, 21]
                    ]
                    }
                },

                "source-layer": "info_of_interest-17rpk9",

                paint: {
                    "text-color": "#2c0202",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 5,
                    "text-halo-blur": 1,
                    "text-opacity": {
                        stops: [
                        [6, 0],
                        [7, 1]
                        ]
                    }
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
	
}


/////////////////////////
// Settlements Static Layer
/////////////////////////

function addSettlementsAfterLayers(date) {
	
	// Add a layer showing the places.
	        afterMap.addLayer({
                id: "settlements-right",
                type: "circle",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.dm346dz9"
                },
				layout: {
                    visibility: document.getElementById('settlements_points').checked ? "visible" : "none",
                },
                "source-layer": "settlements-5551dw",
                paint: {
                    'circle-color': '#0b0ee5',
					'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#0b0ee5',
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ]
                },
                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });
			
			
			//ON HOVER
            afterMap.on('mouseenter', 'settlements-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
			    //console.log(e.features[0].properties);
				if (e.features.length > 0) {
                    if (hoveredSettlementsIdRight) {
                        afterMap.setFeatureState(
                            { source: 'settlements-right', sourceLayer: 'settlements-5551dw', id: hoveredSettlementsIdRight},
                            { hover: false }
                        );
                    }
                    hoveredSettlementsIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'settlements-right', sourceLayer: 'settlements-5551dw', id: hoveredSettlementsIdRight},
                        { hover: true }
                    );
					
			    var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapSettlementsPopUp
                    .setLngLat(coordinates)
                    .setHTML(
                        "<div class='infoLayerSettlementsPopUp'><b>" + e.features[0].properties.Name + "</b><br>"
                         //+ e.features[0].properties.Date 
                         + "</div>"
                    )
                    .addTo(afterMap);
					
				}
			});
			
			//OFF HOVER
            afterMap.on('mouseleave', 'settlements-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredSettlementsIdRight) {
                    afterMap.setFeatureState(
                        { source: 'settlements-right', sourceLayer: 'settlements-5551dw', id: hoveredSettlementsIdRight},
                        { hover: false }
                    );
                }
                hoveredSettlementsIdRight = null;	
				if(afterMapSettlementsPopUp.isOpen()) afterMapSettlementsPopUp.remove();
            });

}



/////////////////////////
// Settlements Labels Static Layer
/////////////////////////

function addSettlementsLabelsAfterLayers(date) {
	
	// Add a layer showing the places.
	        afterMap.addLayer({
                id: "settlements-labels-right",
                type: "symbol",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.dm346dz9"
                },
				layout: {
                    visibility: document.getElementById('settlements_labels').checked ? "visible" : "none",
                    "text-field": "{corr_label}",
					"text-offset": [0,1],
                    "text-size": {
                    stops: [
                        [0, 4],
                        [22, 21]
                    ]
                    }
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
                        [9, 1]
                        ]
                    }
                },




                filter: ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]]
            });

}





/////////////////////////
// Castello Static Layer
/////////////////////////

function addCastelloAfterLayers() {
	
	// Add a layer showing the places.
            afterMap.addLayer({
                id: "places-right",
                type: "circle",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.cvcg7wo0"
                },
				layout: {
                    visibility:  document.getElementById('castello_points').checked ? "visible" : "none",
                },
                "source-layer": "taxlots-cpwvol",
                paint: {
                    'circle-color': '#FF0000',
					'circle-opacity':  [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            1
                        ],
					'circle-stroke-width': 2,
					'circle-stroke-color': '#FF0000',
					'circle-stroke-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0
                        ]
                }
            });


            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
			/*
            afterMap.on('click', 'places-right', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                new mapboxgl.Popup()
                    .setLngLat(coordinates)

                    .setHTML(
                        e.features[0].properties.LOT2 +
                        "<br>" +
                        e.features[0].properties.tax_lots_1 +
                        "<br>" +
                        e.features[0].properties.tax_lots_2 +
                        "<br>" +
                        '<a href="' + e.features[0].properties.new_link + '" target="_blank">' + e.features[0].properties.new_link + '</a>'
                    )

                    .addTo(afterMap);
					
            });
			*/


            //CURSOR ON HOVER

            //ON HOVER
            afterMap.on('mouseenter', 'places-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				if (e.features.length > 0) {
                    if (hoveredStateIdRight) {
                        afterMap.setFeatureState(
                            { source: 'places-right', sourceLayer: 'taxlots-cpwvol', id: hoveredStateIdRight},
                            { hover: false }
                        );
                    }
                    hoveredStateIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'places-right', sourceLayer: 'taxlots-cpwvol', id: hoveredStateIdRight},
                        { hover: true }
                    );
					
					
			    var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapPlacesPopUp
                    .setLngLat(coordinates)
                    .setHTML(
                        "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" + e.features[0].properties.LOT2 + "</div>"
                    )
                    .addTo(afterMap);
				}
            });

            //OFF HOVER
            afterMap.on('mouseleave', 'places-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredStateIdRight) {
                    afterMap.setFeatureState(
                        { source: 'places-right', sourceLayer: 'taxlots-cpwvol', id: hoveredStateIdRight},
                        { hover: false }
                    );
                }
                hoveredStateIdRight = null;		
				if(afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
            });
	
}


/////////////////////////
// Current Static Layers
/////////////////////////

function addCurrentLotsAfterLayers() {
	
	//REMOVING CURRENT LOTS IF EXIST
		if (afterMap.getLayer("curr-lots-right")) afterMap.removeLayer("curr-lots-right");
        if (afterMap.getSource("current_lots-94syr2")) afterMap.removeSource("current_lots-94syr2");
	
	    afterMap.addLayer({
                id: "curr-lots-high-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.8gy1c1uu"
                },
				layout: {
                    visibility: document.getElementById('current_lots').checked ? "visible" : "none",
                },
                "source-layer": "current_lots-94syr2",
                paint: {
				"fill-color": "#7B68EE",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            0.0
                        ],
				"fill-outline-color": "transparent"
                }
			
            });
	
	        afterMap.addLayer({
                id: "curr-lots-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.8gy1c1uu"
                },
				layout: {
                    visibility: document.getElementById('current_lots').checked ? "visible" : "none",
                },
                "source-layer": "current_lots-94syr2",
                paint: {
				"fill-color": "#7B68EE",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.0
                        ],
				"fill-outline-color": "#000000"
                }
			
            });
			
			
			//CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'curr-lots-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapCurrLotsPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'curr-lots-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredCurrLotsIdRight) {
                        afterMap.setFeatureState(
                            { source: 'curr-lots-right', sourceLayer: 'current_lots-94syr2', id: hoveredCurrLotsIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredCurrLotsIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'curr-lots-right', sourceLayer: 'current_lots-94syr2', id: hoveredCurrLotsIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    //console.log(e.features[0].properties);
                    //Address
					//OwnerName
					var PopUpHTML = "<div class='infoLayerCurrLotsPopUp'>" + "<b>" + e.features[0].properties.OwnerName + "</b>" + "<br>" +
									e.features[0].properties.Address + "</div>";		
					
					/*
					var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				*/


                //AFTER MAP POP UP CONTENTS
                afterMapCurrLotsPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });
	
	
            //OFF HOVER
			afterMap.on('mouseleave', 'curr-lots-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredCurrLotsIdRight) {
                    afterMap.setFeatureState(
                        { source: 'curr-lots-right', sourceLayer: 'current_lots-94syr2', id: hoveredCurrLotsIdRight},
                        { hover: false }
                    );
                }
                hoveredCurrLotsIdRight = null;		
				if(afterMapCurrLotsPopUp.isOpen()) afterMapCurrLotsPopUp.remove();
            });
}


function addCurrentLotsLinesAfterLayers() {
	
	//REMOVING CURRENT LOTS IF EXIST
		if (afterMap.getLayer("curr-lots-lines-right")) afterMap.removeLayer("curr-lots-lines-right");
        if (afterMap.getSource("current_lots_lines-41dc4r")) afterMap.removeSource("current_lots_lines-41dc4r");
	
	         afterMap.addLayer({
                id: "curr-lots-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.6ziby9ed"
                },
				layout: {
                    visibility: document.getElementById('current_lots_lines').checked ? "visible" : "none",
                },
                "source-layer": "current_lots_lines-41dc4r",
                paint: {
				    "line-color": "#000080",
					"line-width": 3,
					"line-opacity": 0.7
				}
			
            });
	
}


function addCurrentBuildingsLinesAfterLayers() {
	
	//REMOVING CURRENT LOTS IF EXIST
		if (afterMap.getLayer("curr-builds-lines-right")) afterMap.removeLayer("curr-builds-lines-right");
        if (afterMap.getSource("current_buildings_lines-3k97hu")) afterMap.removeSource("current_buildings_lines-3k97hu");
	
	         afterMap.addLayer({
                id: "curr-builds-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.5w8vqpgq"
                },
				layout: {
                    visibility: document.getElementById('current_buildings_lines').checked ? "visible" : "none",
                },
                "source-layer": "current_buildings_lines-3k97hu",
                paint: {
				    "line-color": "#0000FF",
					"line-width": 2,
					"line-opacity": 0.7
				}
			
            });
	
}

function addCurrentBuildingsAfterLayers() {
	
	//REMOVING CURRENT LOTS IF EXIST
		if (afterMap.getLayer("curr-builds-right")) afterMap.removeLayer("curr-builds-right");
        if (afterMap.getSource("current_buildings_1-cjgsm")) afterMap.removeSource("current_buildings_1-cjgsm");
	
	        afterMap.addLayer({
                id: "curr-builds-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.9bfdcno0"
                },
				layout: {
                    visibility: document.getElementById('current_buildings').checked ? "visible" : "none",
                },
                "source-layer": "current_buildings-1dzyhp",
                paint: {
				"fill-color": "#FF7F50",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.2
                        ],
				"fill-outline-color": "#000000"
                }
			
            });
}


function addLongIslandCoastlineAfterLayers() {

	        afterMap.addLayer({
                id: "long-island-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.0g0oj4rl"
                },
				layout: {
                    visibility: document.getElementById('longisland_coastline').checked ? "visible" : "none",
                },
                "source-layer": "long_island_coastline_lines-0bxmn5",
                paint: {
                "line-color": "#006400",
                "line-width": 3,
                "line-opacity": 1.0
                }
			
            });
			
			
			afterMap.addLayer({
                id: "long-island-area-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.c64cpp25"
                },
				layout: {
                    visibility: document.getElementById('longisland_area').checked ? "visible" : "none",
                },
                "source-layer": "long_island_coastline_area-9vxity",
                paint: {
				"fill-color": "#00FF7F",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.8,
                            0.2
                        ],
				"fill-outline-color": "#000000"
                }
			
            });
}


function addManahattaAfterLayers() {
            
			afterMap.addLayer({
                id: "lenape-trails-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.3lqznx9l"
                },
				layout: {
                    visibility: document.getElementById('lenape_trails').checked ? "visible" : "none",
                },
                "source-layer": "lenape_trails-bxaww5",
                paint: {
                "line-color": "#FF0000",
                "line-width": 4,
                "line-opacity": 1.0
                }
			
            });
			
			
			 afterMap.addLayer({
                id: "manahatta-shoreline-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.a0lop49m"
                },
				layout: {
                    visibility: document.getElementById('manahatta_shoreline').checked ? "visible" : "none",
                },
                "source-layer": "manahatta_shoreline-1xswf8",
                paint: {
                "line-color": "#FFD700",
                "line-width": 4,
                "line-opacity": 1.0
                }
			
            });
			
			
			afterMap.addLayer({
                id: "streams-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.a9o6nugn"
                },
				layout: {
                    visibility: document.getElementById('manahatta_streams').checked ? "visible" : "none",
                },
                "source-layer": "manahatta_area_streams-a2x39f",
                paint: {
                "line-color": "#0000FF",
                "line-width": 4,
                "line-opacity": 1.0
                }
			
            });
			
}


function addIndianPathsAfterLayers() {

	        afterMap.addLayer({
                id: "indian-paths-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.a39vr1hw"
                },
				layout: {
                    visibility: document.getElementById('indian_paths').checked ? "visible" : "none",
                },
                "source-layer": "indian_paths_brooklyn-27hu9d",
                paint: {
                "line-color": "#FF0000",
                "line-width": 5,
                "line-opacity": 1.0
                }
			
            });
}



function addLongIslandNativeGroupsAfterLayers() {


    /* Long Island Indian Borders - 2 Versions: With Coastlines and Without coastlines */

    /* With Coastlines */

    /*

	        afterMap.addLayer({
                id: "native-groups-lines-right",
                type: "line",
                source: {
                    type: "vector",
                    url: "mapbox://nittyjee.02m6t3qm"
                },
				layout: {
                    visibility: document.getElementById('native_groups_lines').checked ? "visible" : "none",
                },
                "source-layer": "long_island_indian_area_lines-b7m3lt",
                paint: {
                "line-color": "#FF0000",
                "line-width": 2,
                "line-opacity": 1.0
                }
			
            });
	*/	


    /* Without coastlines*/

    afterMap.addLayer({
        id: "native-groups-lines-right",
        type: "line",
        source: {
            type: "vector",
            url: "mapbox://mapny.bwpbasrr"
        },
        layout: {
            visibility: document.getElementById('native_groups_lines').checked ? "visible" : "none",
        },
        "source-layer": "indian_borders_simplified_lon-buo3kf",
        paint: {
        //Light Blue:
        //"line-color": "#3a96f8",
        //Orange:
        "line-color": "#ff9900",
        //Red:
        //"line-color": "#FF0000",
        "line-width": 15,
        "line-blur" : 20,
        "line-opacity": 1.0
        }
    
    });


			
			afterMap.addLayer({
                id: "native-groups-area-right",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.8in6hi37"
                },
				layout: {
                    visibility: document.getElementById('native_groups_area').checked ? "visible" : "none",
                },
                "source-layer": "indian_areas_long_island-50h2dj",
                paint: {
				"fill-color": "#FF1493",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.5,
                            0.2
                        ],
				"fill-outline-color": "#FFD700"
                }
            });
			
			
			afterMap.addLayer({
                id: "native-groups-area-right-highlighted",
                type: "fill",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.8in6hi37"
                },
				layout: {
                    visibility: document.getElementById('native_groups_area').checked ? "visible" : "none",
                },
                "source-layer": "indian_areas_long_island-50h2dj",
                paint: {
				"fill-color": "#FF1493",
				"fill-opacity": [ 
					    'case',
                        ['boolean', ['feature-state', 'hover'], false],
                            0.3,
                            0
                        ],
				"fill-outline-color": "#FFD700"
                }
            });
			
			
			afterMap.addLayer({
                id: "native-groups-labels-right",
                type: "symbol",
                source: {
                    type: "vector",
                    url: "mapbox://mapny.5m6t979e"
                },
				layout: {
                    visibility: document.getElementById('settlements_labels').checked ? "visible" : "none",
				"text-field": "{name}",
					"text-offset": [0,1],
                    "text-size": {
                    stops: [
                        [0, 4],
                        [22, 34]
                    ]
                    }
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
                        [7, 1]
                        ]
                    }
                }
            });
			
			
			//CURSOR ON HOVER
            //ON HOVER
			afterMap.on('mouseenter', 'native-groups-area-right', function (e) {
                afterMap.getCanvas().style.cursor = 'pointer';
				afterMapNativeGroupsPopUp.setLngLat(e.lngLat).addTo(afterMap);
			});
			
            afterMap.on('mousemove', 'native-groups-area-right', function (e) {
				if (e.features.length > 0) {
                    if (hoveredNativeGroupsIdRight) {
                        afterMap.setFeatureState(
                            { source: 'native-groups-area-right', sourceLayer: 'indian_areas_long_island-50h2dj', id: hoveredNativeGroupsIdRight},
                            { hover: false }
                        );
                    }
					//console.log(e.features[0]);
                    hoveredNativeGroupsIdRight = e.features[0].id;
                    afterMap.setFeatureState(
                        { source: 'native-groups-area-right', sourceLayer: 'indian_areas_long_island-50h2dj', id: hoveredNativeGroupsIdRight},
                        { hover: true }
                    );
					
					//console.log(e.lngLat.lng);
                    var PopUpHTML = "";
					if( (typeof taxlot_event_entities_info[e.features[0].properties.nid] == "undefined") || (e.features[0].properties.nid == "") ) {
						PopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + e.features[0].properties.name + "</div>";	
					} else {	
						PopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + ( taxlot_event_entities_info[e.features[0].properties.nid].name.length > 0 ? taxlot_event_entities_info[e.features[0].properties.nid].name : e.features[0].properties.name ) + "</div>";
					}
					//PopUpHTML += "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + e.features[0].properties.name + "</div>";
					
					var coordinates = e.features[0].geometry.coordinates.slice();
                //var description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                //AFTER MAP POP UP CONTENTS
                afterMapNativeGroupsPopUp
                    .setLngLat(e.lngLat)
					.setHTML(
                        PopUpHTML
                    );
				
				}
				
            });

            //OFF HOVER
			afterMap.on('mouseleave', 'native-groups-area-right', function () {
                afterMap.getCanvas().style.cursor = '';
				if (hoveredNativeGroupsIdRight) {
                    afterMap.setFeatureState(
                        { source: 'native-groups-area-right', sourceLayer: 'indian_areas_long_island-50h2dj', id: hoveredNativeGroupsIdRight},
                        { hover: false }
                    );
                }
                hoveredNativeGroupsIdRight = null;		
				if(afterMapNativeGroupsPopUp.isOpen()) afterMapNativeGroupsPopUp.remove();
            });
}





////////////////////////////////
// Interactive Zoom Labels Layer
////////////////////////////////


function addAfterLabelsLayer() {
	
          afterMap.addLayer(LongIslandZoomLabel);
		  
		  afterMap.on('mouseenter', 'label-long-island', function (e) {
              afterMap.setPaintProperty("label-long-island", "text-color", lbl_color_hover);
              afterMap.getCanvas().style.cursor = "pointer";
          });
		  
		  afterMap.on('mouseleave', 'label-long-island', function () {
              afterMap.setPaintProperty("label-long-island", "text-color", lbl_color);
              afterMap.getCanvas().style.cursor = "";
          });
		  
		  afterMap.on('click', 'label-long-island', function (e) {
			  zoom_labels_click_ev = true;
              zoomtobounds('LongIsland');
          });
		  
		  afterMap.addLayer(BrooklynZoomLabel);
		  
		  afterMap.on('mouseenter', 'label-brooklyn', function (e) {
              afterMap.setPaintProperty("label-brooklyn", "text-color", lbl_color_hover);
              afterMap.getCanvas().style.cursor = "pointer";
          });
		  
		  afterMap.on('mouseleave', 'label-brooklyn', function () {
              afterMap.setPaintProperty("label-brooklyn", "text-color", lbl_color);
              afterMap.getCanvas().style.cursor = "";
          });
		  
		  afterMap.on('click', 'label-brooklyn', function (e) {
			  zoom_labels_click_ev = true;
              zoomtobounds('Brooklyn');
          });
		  
		  afterMap.addLayer(NewAmsterdamZoomLabel);
		  
		  afterMap.on('mouseenter', 'label-new-amsterdam', function (e) {
              afterMap.setPaintProperty("label-new-amsterdam", "text-color", lbl_color_hover);
              afterMap.getCanvas().style.cursor = "pointer";
          });
		  
		  afterMap.on('mouseleave', 'label-new-amsterdam', function () {
              afterMap.setPaintProperty("label-new-amsterdam", "text-color", lbl_color);
              afterMap.getCanvas().style.cursor = "";
          });
		  
		  afterMap.on('click', 'label-new-amsterdam', function (e) {
			  zoom_labels_click_ev = true;
              zoomtocenter('NA');
          });
		  
		  afterMap.addLayer(ManhattanZoomLabel);
		  
		  afterMap.on('mouseenter', 'label-manhattan', function (e) {
              afterMap.setPaintProperty("label-manhattan", "text-color", lbl_color_hover);
              afterMap.getCanvas().style.cursor = "pointer";
          });
		  
		  afterMap.on('mouseleave', 'label-manhattan', function () {
              afterMap.setPaintProperty("label-manhattan", "text-color", lbl_color);
              afterMap.getCanvas().style.cursor = "";
          });
		  
		  afterMap.on('click', 'label-manhattan', function (e) {
			  zoom_labels_click_ev = true;
              zoomtobounds('Manhattan');
          });
		  
		  afterMap.addLayer(NewNetherlandZoomLabel);
		  
		  afterMap.on('mouseenter', 'label-new-netherland', function (e) {
              afterMap.setPaintProperty("label-new-netherland", "text-color", lbl_color_hover);
              afterMap.getCanvas().style.cursor = "pointer";
          });
		  
		  afterMap.on('mouseleave', 'label-new-netherland', function () {
              afterMap.setPaintProperty("label-new-netherland", "text-color", lbl_color);
              afterMap.getCanvas().style.cursor = "";
          });
		  
		  afterMap.on('click', 'label-new-netherland', function (e) {
			  zoom_labels_click_ev = true;
              zoomtobounds('NewNL');
          });
		  
		  afterMap.addLayer(NewEnglandZoomLabel);
		  
		  afterMap.on('mouseenter', 'label-new-england', function (e) {
              afterMap.setPaintProperty("label-new-england", "text-color", lbl_color_hover);
              afterMap.getCanvas().style.cursor = "pointer";
          });
		  
		  afterMap.on('mouseleave', 'label-new-england', function () {
              afterMap.setPaintProperty("label-new-england", "text-color", lbl_color);
              afterMap.getCanvas().style.cursor = "";
          });
		  
		  afterMap.on('click', 'label-new-england', function (e) {
			  zoom_labels_click_ev = true;
              zoomtobounds('NewEngland');
          });
}


