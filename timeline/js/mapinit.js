var grant_lots_view_id = null,
    dgrants_layer_view_id = null,
	gravesend_layer_view_id = null,   // REPLACE THIS 
	native_group_layer_view_id = null,
	karl_layer_view_id = null,
	farms_layer_view_id = null,
	curr_layer_view_id = null,
    grant_lots_view_flag = false,
    demo_layer_view_flag = false,
    castello_layer_view_flag = false,
	settlements_layer_view_flag = false,
	dgrants_layer_view_flag = false,
	gravesend_layer_view_flag = false,   // REPLACE THIS
	native_group_layer_view_flag = false,
    karl_layer_view_flag = false,
	farms_layer_view_flag = false,
	curr_layer_view_flag = false;
	
$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#infoLayerFarms").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerCastello").slideUp();
$("#infoLayerCurrLots").slideUp();
$("#infoLayerSettlements").slideUp();
$("#infoLayerGravesend").slideUp();   // REPLACE THIS 
$("#infoLayerNativeGroups").slideUp();
$("#infoLayerKarl").slideUp();

// world bounds
const WorldBounds = [

	
	/*
	//For Sidebar Closed
	//Less of Greenland shown
	//Most ideal but Western third of North America cut off when sidebar open
    [-160,-61], // [west, south]
    [163,74]  // [east, north]
	*/
	

	/*
	//For Sidebar Open
	//Western portion beyond lower United States is cut off but Bering Strait seen
    [-179,-60], // [west, south]
    [146,75]  // [east, north]
	*/
	

	/*
	//For Sidebar Open
	//All Eurasia and North America visible
	//Shows too much of Greenland which is projected too large
    [-156,-69], // [west, south]
    [55,82]  // [east, north]
	*/

	
	//CURRENT CHOSEN:
	//For Sidebar Open
	//Alaska and Eastern most tip of Russia cut off
	//Shows less but still too much of Greenland which is projected too large
    [-179,-59], // [west, south]
    [135,77]  // [east, north]
	
	

];

// area bounds
	var LongIslandBounds = [[-74.0419692,40.5419011],[-71.8562705,41.161155]],
        ManhattanBounds = [[-74.04772962697074,40.682916945445164],[-73.90665099539478,40.879038046804695]],
		NYCbounds = [[-74.25559136315213,40.496133987611834],[-73.7000090638712,40.91553277650267]],
		BronxBounds = [[-73.93360592036706,40.785356620508495],[-73.76533243995276,40.91553277650267]],
		BrooklynBounds = [[-74.04189660705046,40.56952999398417],[-73.8335592388046,40.73912795313439]],
		QueensBounds = [[-73.96262015898652,40.54183396045311],[-73.7000090638712,40.80101146781903]],
		StatenIslandBounds = [[-74.25559136315213,40.496133987611834],[-74.04923629842045,40.648925552276076]],
		NewNLbounds = [[-75.5588888888889,39.5483333333333],[-71.6483333333333,42.64485]],
		NewEnglandBounds = [[-73.6468505859375, 41.017210578228436],[-69.708251953125,43.97700467496408]];

/////////////////////////////
//ACCESS TOKEN
/////////////////////////////

mapboxgl.accessToken =
	"pk.eyJ1Ijoibml0dHlqZWUiLCJhIjoid1RmLXpycyJ9.NFk875-Fe6hoRCkGciG8yQ";




/////////////////////////////
//ADD MAP CONTAINER
/////////////////////////////

        var beforeMap = new mapboxgl.Map({
            container: 'before',
            style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
            center: [0, 0],
            hash: true,
            zoom: 0,
			attributionControl: false
        });

        var afterMap = new mapboxgl.Map({
            container: 'after',
            style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
            center: [0, 0],
            hash: true,
            zoom: 0,
			attributionControl: false
        });

        var map = new mapboxgl.Compare(beforeMap, afterMap, {
            // Set this to enable comparing two maps by mouse movement:
            // mousemove: true
        });

        // Set the map's max bounds
		/*
		beforeMap.setMaxBounds(WorldBounds);
        afterMap.setMaxBounds(WorldBounds);
        */
        /////////////////////////////
        //ADD NAVIGATION CONTROLS (ZOOM IN AND OUT)
        /////////////////////////////
        //Before map
        var nav = new mapboxgl.NavigationControl();
        beforeMap.addControl(nav, "bottom-right");
		
        //After map
        var nav = new mapboxgl.NavigationControl();
        afterMap.addControl(nav, "bottom-right");
		

		
		
		var init_bearing,
		    init_center,
			init_zoom;
			
		var na_bearing = -51.3,
		    na_center = [-74.01255, 40.704882],
			na_zoom = 16.34;
		/*
			rotate_loop,
			rotate_loop_flag = false;
		var rotation =  0; //-51.3;
        var innerArrow = document.getElementById("compass-pointer");
        innerArrow.setAttribute("transform", "rotate(-45, 256, 256)")
        console.log(beforeMap.getBearing());
		
		function rotatex(deg) {
            //rotation += deg;
			var rotation = Math.round(beforeMap.getBearing()) + deg;
			var rtt = - rotation - 45
			
	        innerArrow.setAttribute("transform", "rotate(" + rtt + ", 256, 256)");
	
	        beforeMap.easeTo({bearing: rotation});
	        afterMap.easeTo({bearing: rotation});
	        console.log(beforeMap.getBearing());
        }
		
		function rotateLoopASC() {
			rotate_loop = setInterval(function () { rotate_loop_flag = true; rotatex(1); }, 250);
			console.warn("rotate");
		}
        
		function rotateLoopDESC() {
			rotate_loop = setInterval(function () { rotate_loop_flag = true; rotatex(-1) }, 250);
		}
		
		function rotateLoopASCend() {
			if(!rotate_loop_flag) {
				rotatex(5);
			}
			clearInterval(rotate_loop);
		    rotate_loop_flag = false;
		}
		
		function rotateLoopDESCend() {
			if(!rotate_loop_flag) {
				rotatex(-5);
			}
			clearInterval(rotate_loop);
		    rotate_loop_flag = false;
		}
		
		function setZoom(zoom_step){
            var zoom_level = Math.round(beforeMap.getZoom()) + zoom_step;
	        beforeMap.easeTo({zoom: zoom_level});
			afterMap.easeTo({zoom: zoom_level});
        }
        
        function zoomtofit(){
			//{center: [-74.01255, 40.704882], zoom: 16.34, bearing: -51.3}
			innerArrow.setAttribute("transform", "rotate( " + (-45 - init_bearing) + ", 256, 256)");
            beforeMap.easeTo({center: init_center, zoom: init_zoom, bearing: init_bearing});
			afterMap.easeTo({center: init_center, zoom: init_zoom, bearing: init_bearing});
		}
		*/
		

		function testZoom() {
            var current_bearing = beforeMap.getBearing();
            var TestBounds = [-74.01507471506183, 40.70239266372983, -74.00734180289922, 40.709035402164524]; //dutch grants
            //[-74.0128690093802, 40.705887398291175, -73.9457283353804, 40.817639419566085]; //Farms Layer
            beforeMap.fitBounds(TestBounds, {bearing: current_bearing});
				afterMap.fitBounds(TestBounds, {bearing: current_bearing});
		}
		
        function zoomtobounds(boundsName){
			switch(boundsName){
				case 'LongIsland':
				if(windoWidth <= 637) {
					beforeMap.fitBounds(LongIslandBounds, {bearing: 0});
				    afterMap.fitBounds(LongIslandBounds, {bearing: 0});
				} else {
			        beforeMap.fitBounds(LongIslandBounds, {bearing: 0, padding: {top: 5, bottom:5, left: 350, right: 5}});
				    afterMap.fitBounds(LongIslandBounds, {bearing: 0, padding: {top: 5, bottom:5, left: 350, right: 5}});
				}
				break;
				case 'Brooklyn':
			    beforeMap.fitBounds(BrooklynBounds, {bearing: 0});
				afterMap.fitBounds(BrooklynBounds, {bearing: 0});
				break;
				case 'NYC':
			    beforeMap.fitBounds(NYCbounds, {bearing: 0});
				afterMap.fitBounds(NYCbounds, {bearing: 0});
				break;
				case 'NewNL':
			    beforeMap.fitBounds(NewNLbounds, {bearing: 0});
				afterMap.fitBounds(NewNLbounds, {bearing: 0});
				break;
				case 'NewEngland':
			    beforeMap.fitBounds(NewEnglandBounds, {bearing: 0});
				afterMap.fitBounds(NewEnglandBounds, {bearing: 0});
				break;
				case 'Manhattan':
			    beforeMap.fitBounds(ManhattanBounds, {bearing: na_bearing});
				afterMap.fitBounds(ManhattanBounds, {bearing: na_bearing});
				break;
				case 'World':
			    beforeMap.fitBounds(WorldBounds, {bearing: 0});
				afterMap.fitBounds(WorldBounds, {bearing: 0});
				break;
			}
		}
		
		function zoomtocenter(centerName){
			switch(centerName){
				case 'NA':
			    beforeMap.easeTo({center: na_center, zoom: na_zoom, bearing: na_bearing, pitch: 0});
			    afterMap.easeTo({center: na_center, zoom: na_zoom, bearing: na_bearing, pitch: 0});
				break;
				case 'Manatus Map':
			    beforeMap.easeTo({center: [-73.9512,40.4999], zoom: 9, bearing: -89.7, pitch: 0});
			    afterMap.easeTo({center: [-73.9512,40.4999], zoom: 9, bearing: -89.7, pitch: 0});
				break;
				case 'Original Grants':
			    beforeMap.easeTo({center: [-73.9759,40.7628], zoom: 12, bearing: -51.3, pitch: 0});
			    afterMap.easeTo({center: [-73.9759,40.7628], zoom: 12, bearing: -51.3, pitch: 0});
				break;
				case 'NYC plan':
			    beforeMap.easeTo({center: [-74.01046,40.70713], zoom: 15, bearing: -51.3, pitch: 0});
			    afterMap.easeTo({center: [-74.01046,40.70713], zoom: 15, bearing: -51.3, pitch: 0});
				break;
				case 'Ratzer Map':
			    beforeMap.easeTo({center: [-74.00282,40.69929], zoom: 12, bearing: -6.5, pitch: 0});
			    afterMap.easeTo({center: [-74.00282,40.69929], zoom: 12, bearing: -6.5, pitch: 0});
				break;
				case 'Long Island':
			    beforeMap.easeTo({center: [-73.094,41.1], zoom: 8, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.094,41.1], zoom: 8, bearing: 0, pitch: 0});
				break;
				case 'NY Bay':
			    beforeMap.easeTo({center: [-73.9998,40.6662], zoom: 11, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.9998,40.6662], zoom: 11, bearing: 0, pitch: 0});
				break;
				case 'Gravesend Map':
			    beforeMap.easeTo({center: [-73.97629,40.60105], zoom: 13, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.97629,40.60105], zoom: 13, bearing: 0, pitch: 0});
				break;
				case 'Long Island 1873':
			    beforeMap.easeTo({center: [-73.2739,40.876], zoom: 8.6, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-73.2739,40.876], zoom: 8.6, bearing: 0, pitch: 0});
				break;
				case 'Belgii Novi':
			    beforeMap.easeTo({center: [-74.39,40.911], zoom: 5.7, bearing: -7.2, pitch: 0});
			    afterMap.easeTo({center: [-74.39,40.911], zoom: 5.7, bearing: -7.2, pitch: 0});
				break;
				case 'New England':
			    beforeMap.easeTo({center: [-72.898,42.015], zoom: 7, bearing: 0, pitch: 0});
			    afterMap.easeTo({center: [-72.898,42.015], zoom: 7, bearing: 0, pitch: 0});
				break;
				/*
				case '':
			    beforeMap.easeTo({center: [], zoom: , bearing: , pitch: 0});
			    afterMap.easeTo({center: [], zoom: , bearing: , pitch: 0});
				break;
				*/
			}
		}

        function zoomLabels(sel_opt) {
                    if( sel_opt == "show") {
					    beforeMap.setLayoutProperty( "label-long-island", "visibility", "visible" );
						afterMap.setLayoutProperty( "label-long-island", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "label-brooklyn", "visibility", "visible" );
						afterMap.setLayoutProperty( "label-brooklyn", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "label-manhattan", "visibility", "visible" );
						afterMap.setLayoutProperty( "label-manhattan", "visibility", "visible" ); 
					    beforeMap.setLayoutProperty( "label-new-amsterdam", "visibility", "visible" );
						afterMap.setLayoutProperty( "label-new-amsterdam", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "label-new-netherland", "visibility", "visible" );
						afterMap.setLayoutProperty( "label-new-netherland", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "label-new-england", "visibility", "visible" );
						afterMap.setLayoutProperty( "label-new-england", "visibility", "visible" ); 
						document.getElementById("show-zoom-label").style.display = "inline-block";
						document.getElementById("hide-zoom-label").style.display = "none";
					} else {
					    beforeMap.setLayoutProperty( "label-long-island", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "label-long-island", "visibility", "none" );
					    beforeMap.setLayoutProperty( "label-brooklyn", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "label-brooklyn", "visibility", "none" );
					    beforeMap.setLayoutProperty( "label-manhattan", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "label-manhattan", "visibility", "none" );
					    beforeMap.setLayoutProperty( "label-new-amsterdam", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "label-new-amsterdam", "visibility", "none" );
						beforeMap.setLayoutProperty( "label-new-netherland", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "label-new-netherland", "visibility", "none" );
						beforeMap.setLayoutProperty( "label-new-england", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "label-new-england", "visibility", "none" );
						document.getElementById("hide-zoom-label").style.display = "inline-block";
						document.getElementById("show-zoom-label").style.display = "none";
					}
        }

        /////////////////////////////
        //BASEMAP MENU SWITCHING FUNCTIONALITY
		/////////////////////////////


		//RIGHT MENU
        var rightInputs = document.getElementsByName('rtoggle');
		
        function switchRightLayer(layer) {
            var rightLayerClass = layer.target.className; //*A layer.target.id;
            afterMap.setStyle('mapbox://styles/nittyjee/' + rightLayerClass);
        }

        for (var i = 0; i < rightInputs.length; i++) {
            rightInputs[i].onclick = switchRightLayer;
		}


		//LEFT MENU
		var leftInputs = document.getElementsByName('ltoggle');
		
        function switchLeftLayer(layer) {
            var leftLayerClass = layer.target.className; //*A layer.target.id;
            beforeMap.setStyle('mapbox://styles/nittyjee/' + leftLayerClass);
        }

        for (var i = 0; i < leftInputs.length; i++) {
            leftInputs[i].onclick = switchLeftLayer;
		}







/////////////////////////////
// on Map events
/////////////////////////////

var urlHash = window.location.hash;
var castello_click_ev = false,
    grant_lots_click_ev = false,
	demo_taxlot_click_ev = false,
	dutch_grant_click_ev = false,
	gravesend_click_ev = false,     // REPLACE THIS
	native_groups_click_ev = false,
	karl_click_ev = false,
	farms_click_ev = false,
	curr_layer_click_ev = false,
	settlements_click_ev = false,
	zoom_labels_click_ev = false;
    

var afterMapPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var coordinates = [];
var places_popup_html = "",
    settlements_popup_html = "";

var afterMapPlacesPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapPlacesPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
	
var afterHighCastelloPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeHighCastelloPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var afterHighDemoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeHighDemoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
	
var afterHighGrantLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighGrantLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
var afterHighCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
var afterMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapGrantLotPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapDutchGrantPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapDutchGrantPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
	
/* REPLACE THIS */
var afterMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapGravesendPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapGravesendTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapGravesendTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
/* REPLACE THIS */


var afterMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapNativeGroupsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });


var afterMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterHighMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighMapKarlPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapKarlTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapKarlTwoPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	

var afterHighFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeHighFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapFarmPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });

var afterMapCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 }),
    beforeMapCurrLotsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 5 });
	
var afterMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
	
var afterHighMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }),
    beforeHighMapSettlementsPopUp = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

var hoveredStateIdRight = null,
    hoveredStateIdLeft = null,
	hoveredStateIdRightCircle = null,
    hoveredStateIdLeftCircle = null,
	hoveredGrantStateIdRight = null,
	hoveredGrantStateIdLeft = null,
	hoveredGrantLotIdRight = null,
	hoveredGrantLotIdLeft = null,
	hoveredDutchGrantIdRight = null,
	hoveredDutchGrantIdLeft = null,
	/* REPLACE THIS */
	hoveredGravesendIdRight = null,
	hoveredGravesendIdLeft = null,
	/* REPLACE THIS */
	hoveredNativeGroupsIdRight = null,
	hoveredNativeGroupsIdLeft = null,
	hoveredKarlIdRight = null,
	hoveredKarlIdLeft = null,
	hoveredFarmsIdRight = null,
	hoveredFarmsIdLeft = null,
	hoveredCurrLotsIdRight = null,
	hoveredCurrLotsIdLeft = null,
	hoveredSettlementsIdRight = null,
	hoveredSettlementsIdLeft = null;
	
var clickedStateId = null,
    clickedSettlementsId = null;
	
var demo_layer_features = null;

beforeMap.on("load", function () {
	console.log("load");
	/*
	console.log(beforeMap.getBearing());
	console.log(beforeMap.getZoom());
	console.log(beforeMap.getCenter());
	*/
	init_zoom = beforeMap.getZoom();
	init_bearing = beforeMap.getBearing();
	init_center = beforeMap.getCenter();
	/*
	rotate = init_bearing;
	innerArrow.setAttribute("transform", "rotate( " + (-45 - init_bearing) + ", 256, 256)");
	*/
	var sliderVal = moment($("#date").val()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
    
	
		// CLICK AND OPEN POPUP
		beforeMap.on('click', 'c7_dates-ajsksu-left', function (e) {
		          
            DemoClickHandle(e);
				  
		}).on('click', 'places-left', function (e) {
              
			CastelloClickHandle(e);
			  
        }).on('click', 'settlements-left', function (e) {
              
			SettlementsClickHandle(e);
			  
        }).on('click', 'grant-lots-left' , function (e) {
				        
            GrantLotsHandle(e);
						
		}).on('click', 'stokes_farms_complete_5_reduc-6k9tbl-left' , function (e) {
					
		    FarmsClickHandle(e);
						
		}).on('click', 'grants1-5sp9tb-left' , function (e) {
				        
			DutchGrantsClickHandle(e);
						
		}).on('click', 'gravesend_boundaries-c6qrbw-left' , function (e) {
					
		    GravesendClickHandle(e);
						
		}).on('click', 'native-groups-area-left' , function (e) {
					
		    NativeGroupsClickHandle(e);
						
		}).on('click', 'karl_long_island-left' , function (e) {
					
		    KarlClickHandle(e);
						
		}).on('click', 'curr-lots-left' , function (e) {
				        
            CurrLotsHandle(e);
						
		}).on('click', function () {
					
			DefaultHandle();
					
		});
	
	
});

afterMap.on("load", function () {
	console.log("load");
	//*A var sliderVal = $("#date").val();
	var sliderVal = moment($("#date").val()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
    
	
		// CLICK AND OPEN POPUP
		afterMap.on('click', 'c7_dates-ajsksu-right', function (e) {
			
            DemoClickHandle(e);
			
		}).on('click', 'places-right', function (e) {
			
			CastelloClickHandle(e);
			
        }).on('click', 'settlements-right', function (e) {
              
			SettlementsClickHandle(e);
			  
        }).on('click', 'grant-lots-right' , function (e) {
				        
            GrantLotsHandle(e);
						
		}).on('click', 'stokes_farms_complete_5_reduc-6k9tbl-right' , function (e) {
					
		    FarmsClickHandle(e);
						
		}).on('click', 'grants1-5sp9tb-right' , function (e) {
					
		    DutchGrantsClickHandle(e);
						
		}).on('click', 'gravesend_boundaries-c6qrbw-right' , function (e) {
					
		    GravesendClickHandle(e);
						
		}).on('click', 'native-groups-area-right' , function (e) {
					
		    NativeGroupsClickHandle(e);
						
		}).on('click', 'karl_long_island-right' , function (e) {
					
		    KarlClickHandle(e);
						
		}).on('click', 'curr-lots-right' , function (e) {
				        
			CurrLotsHandle(e);		
						
		}).on('click', function () {
			        
			DefaultHandle();
					
		});

	
});

beforeMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
	// Hide those annoying non-error errors
	if (e && e.error !== "Error") console.log(e);
});


//////////////////////////////////////////////
// ===== Layers click event functions ======
//////////////////////////////////////////////
	    
		function DefaultHandle() {
		
		            if(!demo_taxlot_click_ev && !castello_click_ev && !grant_lots_click_ev && !dutch_grant_click_ev && !farms_click_ev && !curr_layer_click_ev && !settlements_click_ev && !gravesend_click_ev && !native_groups_click_ev && !karl_click_ev && !zoom_labels_click_ev) {
                        if(windoWidth > 637)
							if($('#view-hide-layer-panel').length > 0)
			                    $('#view-hide-layer-panel').trigger('click');
					}
					
					demo_taxlot_click_ev = false;
					castello_click_ev = false;
					grant_lots_click_ev = false;
					dutch_grant_click_ev = false;
					farms_click_ev = false;
					curr_layer_click_ev = false;
					settlements_click_ev = false;
					gravesend_click_ev = false;
					native_groups_click_ev = false;
					karl_click_ev = false;
					zoom_labels_click_ev = false;
		
		}
		
		
		function CurrLotsHandle(event) {
			            var highPopUpHTML = "<div class='infoLayerCurrLotsPopUp'>" + "<b>" + event.features[0].properties.OwnerName + "</b>" + "<br>" +
									        event.features[0].properties.Address + "</div>";	

							if(curr_layer_view_id == event.features[0].id) {
								if(curr_layer_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag) {
							                $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerCurrLots").slideUp(); 
									curr_layer_view_flag = false;
									//*A#
									afterMap.setFeatureState(
                                        { source: 'curr-lots-high-right', sourceLayer: 'current_lots_1-ca6kq1', id: curr_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'curr-lots-high-left', sourceLayer: 'current_lots_1-ca6kq1', id: curr_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighCurrLotsPopUp.isOpen()) afterHighCurrLotsPopUp.remove();
									if(beforeHighCurrLotsPopUp.isOpen()) beforeHighCurrLotsPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    buildCurrLotsPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerCurrLots")
									        $("#infoLayerCurrLots").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerCurrLots").slideDown();
										if($('#view-hide-layer-panel').length > 0)
						                    if(!layer_view_flag)
												$('#view-hide-layer-panel').trigger('click');
									//}
								    curr_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'curr-lots-high-right', sourceLayer: 'current_lots_1-ca6kq1', id: curr_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'curr-lots-high-left', sourceLayer: 'current_lots_1-ca6kq1', id: curr_layer_view_id},
                                       { hover: true }
                                    );
									afterHighCurrLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							        if(!afterHighCurrLotsPopUp.isOpen()) afterHighCurrLotsPopUp.addTo(afterMap);
							        beforeHighCurrLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							        if(!beforeHighCurrLotsPopUp.isOpen()) beforeHighCurrLotsPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
								    buildCurrLotsPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerCurrLots")
								        $("#infoLayerCurrLots").insertBefore($(".infoLayerElem").first());
							        $("#infoLayerCurrLots").slideDown();
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag)
											$('#view-hide-layer-panel').trigger('click');
							    //}
								curr_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'curr-lots-high-right', sourceLayer: 'current_lots_1-ca6kq1', id: curr_layer_view_id},
                                    { hover: false }
                                );
								afterMap.setFeatureState(
                                    { source: 'curr-lots-high-right', sourceLayer: 'current_lots_1-ca6kq1', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'curr-lots-high-left', sourceLayer: 'current_lots_1-ca6kq1', id: curr_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'curr-lots-high-left', sourceLayer: 'current_lots_1-ca6kq1', id: event.features[0].id},
                                    { hover: true }
                                );
								afterHighCurrLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighCurrLotsPopUp.isOpen()) afterHighCurrLotsPopUp.addTo(afterMap);
							    beforeHighCurrLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighCurrLotsPopUp.isOpen()) beforeHighCurrLotsPopUp.addTo(beforeMap);
							}
							curr_layer_view_id = event.features[0].id;
						    curr_layer_click_ev = true;
		}

			 

        function GrantLotsHandle(event) { 
		            
					var highPopUpHTML = "<div class='infoLayerGrantLotsPopUp'>" +
									    event.features[0].properties.name + "<br>" +
										"<b>Start:</b> " + event.features[0].properties.day1 + ", " + event.features[0].properties.year1 + "<br>" +
										"<b>End:</b> " + event.features[0].properties.day2 + ", " + event.features[0].properties.year2 + "<br>" +
										//"<br>" +
										"<b>Lot Division: </b>" + event.features[0].properties.dutchlot +
									    "</div>";

							if(grant_lots_view_id == event.features[0].id) {
								if(grant_lots_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag) {
							                $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerGrantLots").slideUp(); 
									grant_lots_view_flag = false;
									if(afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.remove();
									if(beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    //$("#infoLayerGrantLots").html(event.features[0].properties.name).slideDown();
									    buildGrantLotsPopUpInfo(event.features[0].properties);
									    console.log($(".infoLayerElem").first().attr("id"));
									    if($(".infoLayerElem").first().attr("id") != "infoLayerGrantLots")
									        $("#infoLayerGrantLots").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerGrantLots").slideDown();
										if($('#view-hide-layer-panel').length > 0)
                                            if(!layer_view_flag)
                                                $('#view-hide-layer-panel').trigger('click');
								    //}
								    grant_lots_view_flag = true;
									afterHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.addTo(afterMap);
									beforeHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
			                        //$("#infoLayerGrantLots").html(event.features[0].properties.name).slideDown();
								    buildGrantLotsPopUpInfo(event.features[0].properties);
								    console.log($(".infoLayerElem").first().attr("id") );
								    if($(".infoLayerElem").first().attr("id") != "infoLayerGrantLots")
								        $("#infoLayerGrantLots").insertBefore($(".infoLayerElem").first()); //($("#rightInfoBar"));
							        $("#infoLayerGrantLots").slideDown();
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag)
							                $('#view-hide-layer-panel').trigger('click');
								//}
								grant_lots_view_flag = true;
								afterHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.addTo(afterMap);
								beforeHighGrantLotsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.addTo(beforeMap);
							}
							grant_lots_view_id = event.features[0].id; 
						    grant_lots_click_ev = true;
        }
		
			 
        function DemoClickHandle(event) { 
					if(demo_layer_view_flag) {
						if($('#view-hide-layer-panel').length > 0)
						    if(!layer_view_flag) {
							    $("#rightInfoBar").css('display', 'block');
								setTimeout( function() {
                                    $("#rightInfoBar").slideUp();
                                }, 500);
							}
						$("#demoLayerInfo").slideUp();
						demo_layer_view_flag = false;
						//if(afterMapPopUp.isOpen()) afterMapPopUp.remove();
						if(afterHighDemoPopUp.isOpen()) afterHighDemoPopUp.remove();
						if(beforeHighDemoPopUp.isOpen()) beforeHighDemoPopUp.remove();
					} else {
						//if(windoWidth > 637) {
						    buildPopUpInfo(event.features[0].properties);
						    if($(".infoLayerElem").first().attr("id") != "demoLayerInfo")
						        $("#demoLayerInfo").insertBefore($(".infoLayerElem").first());
					        $("#demoLayerInfo").slideDown();
						    
						    if(!layer_view_flag) 
								if($('#view-hide-layer-panel').length > 0)
								    $('#view-hide-layer-panel').trigger('click');
						//}
						
						demo_layer_view_flag = true;
						
						beforeHighDemoPopUp
                        .setLngLat(coordinates)
                        .setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>");
					    if(!beforeHighDemoPopUp.isOpen()) beforeHighDemoPopUp.addTo(beforeMap);
					
					    afterHighDemoPopUp
                        .setLngLat(coordinates)
						.setHTML("<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b></div>");
					    if(!afterHighDemoPopUp.isOpen()) afterHighDemoPopUp.addTo(afterMap);
					}
					demo_taxlot_click_ev = true;
        }
	
	
	    function SettlementsClickHandle(event) {
			//#infoLayerSettlements
			//settlements_info[event.features[0].properties.Lot]
			console.log(event.features[0]);
			
			if(settlements_layer_view_flag && (clickedSettlementsId == event.features[0].id) ) {
				        if($('#view-hide-layer-panel').length > 0)
						    if(!layer_view_flag) {
							    $("#rightInfoBar").css('display', 'block');
								setTimeout( function() {
                                    $("#rightInfoBar").slideUp();
                                }, 500);
							}
				        $("#infoLayerSettlements").slideUp();
						settlements_layer_view_flag = false;
						if(afterHighMapSettlementsPopUp.isOpen()) afterHighMapSettlementsPopUp.remove();
						if(beforeHighMapSettlementsPopUp.isOpen()) beforeHighMapSettlementsPopUp.remove();
		    } else {
				clickedSettlementsId = event.features[0].id;
				
				//var ref_name = event.features[0].properties.Name.replace(/\s+/g, '');
				var ref_name = event.features[0].properties.node_id.replace(/\/node\//g, '');
				//var ref_name = event.features[0].properties.enc_name.replace(/\s+/g, '');
				console.log(ref_name);
				console.log(settlements_info.length);
				settlements_popup_html = "<h3>Settlement</h3><hr>";
				/*
				for (var j = 0; j < settlements_info.length; j += 1) {
					console.log(j);
					console.log(settlements_info[j].name);
					var cmp_name = settlements_info[j].name;
					if(cmp_name.includes(ref_name)) {
                */
				    if( typeof settlements_info[ref_name] == "undefined" ) {
						//settlements_popup_html += "<h3>" + event.features[0].properties.Name + "</h3>";
						settlements_popup_html += "<h3>" + event.features[0].properties.enc_name + "</h3>";
				    } else {
						settlements_popup_html += "<h3>" + settlements_info[ref_name].name + "</h3>" + "<br>" +
						

						/* COMMENTING OUT CURRENT LOCATIONS PART OF SIDEBAR UNTIL "Current Location(s): " does not appear when there is no current location.
						
						"<br>" +

						"<b>" + "Current Location(s): " + "</b>" + "<br>" +
						//"<br>" + settlements_info[ref_name].curr_loc + "<br><br>" +
						( settlements_info[ref_name].curr_loc_url.length > 0 ? "<a href='https://nahc-mapping.org" + settlements_info[ref_name].curr_loc_url + "' target='_blank'>" : "" ) +
						( typeof settlements_linked_location[settlements_info[ref_name].curr_loc_target] == "undefined" ? "" : settlements_linked_location[settlements_info[ref_name].curr_loc_target] ) +
						( settlements_info[ref_name].curr_loc_url.length > 0 ? "</a><br>"  : "" ) + 
						( settlements_info[ref_name].curr_loc_name.length > 0 ? "<i>" + settlements_info[ref_name].curr_loc_name + "</i>" : "" ) + "<br><br>" +
						*/

						"<b>" + "Date: " + "</b>" + "<i>" + settlements_info[ref_name].date + "</i>" + "<br>" +
						"<br><i>" + settlements_info[ref_name].descr +"</i>" +
						( settlements_info[ref_name].img1.length > 0 ? "<img src='" + settlements_info[ref_name].img1 + "'  width='258' ><br>" : "" ) +
						( settlements_info[ref_name].img2.length > 0 ? "<img src='" + settlements_info[ref_name].img2 + "'  width='258' ><br>" : "" ) +
						( settlements_info[ref_name].img3.length > 0 ? "<img src='" + settlements_info[ref_name].img3 + "'  width='258' ><br>" : "" );
						console.warn(settlements_info[ref_name].curr_loc_target);
						console.warn(settlements_linked_location[settlements_info[ref_name].curr_loc_target]);
				    }
				/*	
					}
				}
				*/
				
				coordinates = event.features[0].geometry.coordinates.slice();
                //var description = event.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				    // event.features[0].properties.Name 
					beforeHighMapSettlementsPopUp
                        .setLngLat(coordinates)
                        .setHTML("<div class='infoLayerSettlementsPopUp'><b>" + event.features[0].properties.corr_label + "</b><br>" +
						// event.features[0].properties.Date + 
						"</div>");
					if(!beforeHighMapSettlementsPopUp.isOpen()) beforeHighMapSettlementsPopUp.addTo(beforeMap);
					
					// event.features[0].properties.Name 
					afterHighMapSettlementsPopUp
                        .setLngLat(coordinates)
						.setHTML("<div class='infoLayerSettlementsPopUp'><b>" + event.features[0].properties.corr_label + "</b><br>" +
						// event.features[0].properties.Date + 
						"</div>");
					if(!afterHighMapSettlementsPopUp.isOpen()) afterHighMapSettlementsPopUp.addTo(afterMap);
					//if(windoWidth > 637) {
					    if($(".infoLayerElem").first().attr("id") != "infoLayerSettlements")
					        $("#infoLayerSettlements").insertBefore($(".infoLayerElem").first());
					    $("#infoLayerSettlements").html(settlements_popup_html).slideDown();
				        
					    if(!layer_view_flag) 
							if($('#view-hide-layer-panel').length > 0)
							    $('#view-hide-layer-panel').trigger('click');
					//}
					settlements_layer_view_flag = true;
			}
		    settlements_click_ev = true;
			
		}
	
	
	    function CastelloClickHandle(event) {
	        if(castello_layer_view_flag && (clickedStateId == event.features[0].id) ) {
                        if($('#view-hide-layer-panel').length > 0)
						    if(!layer_view_flag) {
							    $("#rightInfoBar").css('display', 'block');
								setTimeout( function() {
                                    $("#rightInfoBar").slideUp();
                                }, 500);
							}
				        $("#infoLayerCastello").slideUp();
						castello_layer_view_flag = false;
						//if(afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
						if(afterHighCastelloPopUp.isOpen()) afterHighCastelloPopUp.remove();
						if(beforeHighCastelloPopUp.isOpen()) beforeHighCastelloPopUp.remove();
		    } else {
				    clickedStateId = event.features[0].id;
				
					places_popup_html = "<h3>Castello Taxlot (1660)</h3><hr>" +
						"<br>" +
						"<b>" + "Taxlot: " + "</b>" + 
						event.features[0].properties.LOT2 +
						"<br>" +
						"<b>" + "Property Type: " + "</b>" + 
						event.features[0].properties.tax_lots_1 +
						"<br>" +
						"<br>" +
						"<b>" + "Encyclopedia Page: " + "</b>" + 
						"<br>" +
						'<a href="' + event.features[0].properties.new_link + '" target="_blank">' + event.features[0].properties.new_link + '</a>';
				
				coordinates = event.features[0].geometry.coordinates.slice();
                //var description = event.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
                }
				
					beforeHighCastelloPopUp
                        .setLngLat(coordinates)
                        .setHTML("<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" + event.features[0].properties.LOT2 + "</div>");
					if(!beforeHighCastelloPopUp.isOpen()) beforeHighCastelloPopUp.addTo(beforeMap);
					
					afterHighCastelloPopUp
                        .setLngLat(coordinates)
						.setHTML("<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" + event.features[0].properties.LOT2 + "</div>");
					if(!afterHighCastelloPopUp.isOpen()) afterHighCastelloPopUp.addTo(afterMap);
					//console.log($(".infoLayerElem").first().attr("id"));
					//if(windoWidth > 637) {
					    if($(".infoLayerElem").first().attr("id") != "infoLayerCastello")
					        $("#infoLayerCastello").insertBefore($(".infoLayerElem").first());
					    $("#infoLayerCastello").html(places_popup_html).slideDown();
				        
					    if(!layer_view_flag) 
							if($('#view-hide-layer-panel').length > 0)
							    $('#view-hide-layer-panel').trigger('click');
					//}
					castello_layer_view_flag = true;
			}
		    castello_click_ev = true;
        }
	
	
		function FarmsClickHandle(event) {
	
			            var highPopUpHTML = "<div class='infoLayerFarmsPopUp'>" + event.features[0].properties.To + "</div>";
								
							if(farms_layer_view_id == event.features[0].id) {
								if(farms_layer_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag) {
							                $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerFarms").slideUp(); 
									farms_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'stokes_farms_complete_5_reduc-6k9tbl-right-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: farms_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'stokes_farms_complete_5_reduc-6k9tbl-left-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: farms_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighFarmPopUp.isOpen()) afterHighFarmPopUp.remove();
									if(beforeHighFarmPopUp.isOpen()) beforeHighFarmPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    buildFarmsPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerFarms")
									        $("#infoLayerFarms").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerFarms").slideDown();
										if($('#view-hide-layer-panel').length > 0)
						                    if(!layer_view_flag)
												$('#view-hide-layer-panel').trigger('click');
									//}
								    farms_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'stokes_farms_complete_5_reduc-6k9tbl-right-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: farms_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'stokes_farms_complete_5_reduc-6k9tbl-left-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: farms_layer_view_id},
                                       { hover: true }
                                    );
									afterHighFarmPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighFarmPopUp.isOpen()) afterHighFarmPopUp.addTo(afterMap);
									beforeHighFarmPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighFarmPopUp.isOpen()) beforeHighFarmPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
								    buildFarmsPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerFarms")
								        $("#infoLayerFarms").insertBefore($(".infoLayerElem").first());
							        $("#infoLayerFarms").slideDown();
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag)
											$('#view-hide-layer-panel').trigger('click');
								//}
								farms_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'stokes_farms_complete_5_reduc-6k9tbl-right-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: farms_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'stokes_farms_complete_5_reduc-6k9tbl-right-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'stokes_farms_complete_5_reduc-6k9tbl-left-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: farms_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'stokes_farms_complete_5_reduc-6k9tbl-left-highlighted', sourceLayer: 'stokes_farms_complete_5_reduc-6k9tbl', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighFarmPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighFarmPopUp.isOpen()) afterHighFarmPopUp.addTo(afterMap);
								beforeHighFarmPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighFarmPopUp.isOpen()) beforeHighFarmPopUp.addTo(beforeMap);
							}
							farms_layer_view_id = event.features[0].id;
						    farms_click_ev = true;
    }
	
	
	function DutchGrantsClickHandle(event) {
	
			        var highPopUpHTML = "";
					if( typeof dutch_grant_lots_info[event.features[0].properties.Lot] == "undefined" ) {
						highPopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + event.features[0].properties.name + "<br>";	
					} else {	
						highPopUpHTML = "<div class='infoLayerDutchGrantsPopUp'>" + ( dutch_grant_lots_info[event.features[0].properties.Lot].name_txt.length > 0 ? dutch_grant_lots_info[event.features[0].properties.Lot].name_txt : event.features[0].properties.name ) + "<br>";
					}
					highPopUpHTML += "<b>Dutch Grant Lot: </b>" + event.features[0].properties.Lot + "</div>";
						
						//if(layer_view_flag) {
							if(dgrants_layer_view_id == event.features[0].id) {
								if(dgrants_layer_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
										if(!layer_view_flag) {
									        $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerDutchGrants").slideUp(); 
									dgrants_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.remove();
									if(beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    buildDutchGrantPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
									        $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerDutchGrants").slideDown();
										if($('#view-hide-layer-panel').length > 0)
										    if(!layer_view_flag)
							                    $('#view-hide-layer-panel').trigger('click');
									//}
								    dgrants_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                       { hover: true }
                                    );
									afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.addTo(afterMap);
									beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
								    buildDutchGrantPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
								        $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
									$("#infoLayerDutchGrants").slideDown();
									if($('#view-hide-layer-panel').length > 0)
										if(!layer_view_flag)
							                $('#view-hide-layer-panel').trigger('click');
								//}
								dgrants_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-right-highlighted', sourceLayer: 'grants1-5sp9tb', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: dgrants_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'grants1-5sp9tb-left-highlighted', sourceLayer: 'grants1-5sp9tb', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.addTo(afterMap);
								beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.addTo(beforeMap);
							}
							dgrants_layer_view_id = event.features[0].id;
						    dutch_grant_click_ev = true;
    }


    
	/*REPLACE THIS*/
	function GravesendClickHandle(event) {
	
			        var highPopUpHTML = "<div class='infoLayerGravesendPopUp'><b>Name : </b>" + event.features[0].properties.Name + "</div>";
						
							if(gravesend_layer_view_id == event.features[0].id) {
								if(gravesend_layer_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag) {
							                $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerGravesend").slideUp(); 
									gravesend_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'gravesend_boundaries-c6qrbw-right-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: gravesend_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'gravesend_boundaries-c6qrbw-left-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: gravesend_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighMapGravesendPopUp.isOpen()) afterHighMapGravesendPopUp.remove();
									if(beforeHighMapGravesendPopUp.isOpen()) beforeHighMapGravesendPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    buildGravesendPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerGravesend")
									        $("#infoLayerGravesend").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerGravesend").slideDown();
										if($('#view-hide-layer-panel').length > 0)
						                    if(!layer_view_flag)
												$('#view-hide-layer-panel').trigger('click');
									//}
								    gravesend_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'gravesend_boundaries-c6qrbw-right-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: gravesend_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'gravesend_boundaries-c6qrbw-left-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: gravesend_layer_view_id},
                                       { hover: true }
                                    );
									afterHighMapGravesendPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighMapGravesendPopUp.isOpen()) afterHighMapGravesendPopUp.addTo(afterMap);
									beforeHighMapGravesendPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighMapGravesendPopUp.isOpen()) beforeHighMapGravesendPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
								    buildGravesendPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerGravesend")
								        $("#infoLayerGravesend").insertBefore($(".infoLayerElem").first());
							        $("#infoLayerGravesend").slideDown();
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag)
											$('#view-hide-layer-panel').trigger('click');
								//}
								gravesend_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'gravesend_boundaries-c6qrbw-right-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: gravesend_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'gravesend_boundaries-c6qrbw-right-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'gravesend_boundaries-c6qrbw-left-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: gravesend_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'gravesend_boundaries-c6qrbw-left-highlighted', sourceLayer: 'gravesend_boundaries-c6qrbw', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighMapGravesendPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighMapGravesendPopUp.isOpen()) afterHighMapGravesendPopUp.addTo(afterMap);
								beforeHighMapGravesendPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighMapGravesendPopUp.isOpen()) beforeHighMapGravesendPopUp.addTo(beforeMap);
							}
							gravesend_layer_view_id = event.features[0].id;
						    gravesend_click_ev = true;
    }
    /*REPLACE THIS*/


    function NativeGroupsClickHandle(event) {
		var highPopUpHTML = "";
		    
			if( (typeof taxlot_event_entities_info[event.features[0].properties.nid] == "undefined") || (event.features[0].properties.nid == "") ) {
		        highPopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + event.features[0].properties.name + "</div>";
	        } else {
				highPopUpHTML = "<div class='infoLayerCastelloPopUp'><b>Name : </b>" + ( taxlot_event_entities_info[event.features[0].properties.nid].name.length > 0 ? taxlot_event_entities_info[event.features[0].properties.nid].name : event.features[0].properties.name ) + "</div>";
			}
			
							if(native_group_layer_view_id == event.features[0].id) {
								if(native_group_layer_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag) {
							                $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerNativeGroups").slideUp(); 
									native_group_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.remove();
									if(beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    buildNativeGroupPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
									        $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerNativeGroups").slideDown();
										if($('#view-hide-layer-panel').length > 0)
						                    if(!layer_view_flag)
												$('#view-hide-layer-panel').trigger('click');
								    //}
								    native_group_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                       { hover: true }
                                    );
									afterHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.addTo(afterMap);
									beforeHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
								    buildNativeGroupPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
								        $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
							        $("#infoLayerNativeGroups").slideDown();
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag)
											$('#view-hide-layer-panel').trigger('click');
							    //}
								native_group_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'native-groups-area-right-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: native_group_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'native-groups-area-left-highlighted', sourceLayer: 'long_island_indian_areas-3o4hr7', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighMapNativeGroupsPopUp.isOpen()) afterHighMapNativeGroupsPopUp.addTo(afterMap);
								beforeHighMapNativeGroupsPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighMapNativeGroupsPopUp.isOpen()) beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
							}
							native_group_layer_view_id = event.features[0].id;
						    native_groups_click_ev = true;
    }


    function KarlClickHandle(event) {
	                // event.features[0].properties.Name
			        var highPopUpHTML = "<div class='infoLayerKarlPopUp'><b>Name : </b>" + event.features[0].properties.corr_label + "</div>";
						
							if(karl_layer_view_id == event.features[0].id) {
								if(karl_layer_view_flag) {
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag) {
							                $("#rightInfoBar").css('display', 'block');
											setTimeout( function() {
                                                $("#rightInfoBar").slideUp();
                                            }, 500);
										}
							        $("#infoLayerKarl").slideUp(); 
									karl_layer_view_flag = false;
									//*A#
							        afterMap.setFeatureState(
                                        { source: 'karl_long_island-right-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: karl_layer_view_id},
                                        { hover: false }
                                    );
									beforeMap.setFeatureState(
                                        { source: 'karl_long_island-left-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: karl_layer_view_id},
                                        { hover: false }
                                    );
									if(afterHighMapKarlPopUp.isOpen()) afterHighMapKarlPopUp.remove();
									if(beforeHighMapKarlPopUp.isOpen()) beforeHighMapKarlPopUp.remove();
								} else {
									//if(windoWidth > 637) {
									    buildKarlPopUpInfo(event.features[0].properties);
									    if($(".infoLayerElem").first().attr("id") != "infoLayerKarl")
									        $("#infoLayerKarl").insertBefore($(".infoLayerElem").first());
							            $("#infoLayerKarl").slideDown();
										if($('#view-hide-layer-panel').length > 0)
						                    if(!layer_view_flag)
												$('#view-hide-layer-panel').trigger('click');
									//}
								    karl_layer_view_flag = true;
									//*A#
									afterMap.setFeatureState(
                                       { source: 'karl_long_island-right-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: karl_layer_view_id},
                                       { hover: true }
                                    );
									beforeMap.setFeatureState(
                                       { source: 'karl_long_island-left-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: karl_layer_view_id},
                                       { hover: true }
                                    );
									afterHighMapKarlPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!afterHighMapKarlPopUp.isOpen()) afterHighMapKarlPopUp.addTo(afterMap);
									beforeHighMapKarlPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
									if(!beforeHighMapKarlPopUp.isOpen()) beforeHighMapKarlPopUp.addTo(beforeMap);
								}
							} else {
								//if(windoWidth > 637) {
								    buildKarlPopUpInfo(event.features[0].properties);
								    if($(".infoLayerElem").first().attr("id") != "infoLayerKarl")
								        $("#infoLayerKarl").insertBefore($(".infoLayerElem").first());;
							        $("#infoLayerKarl").slideDown();
									if($('#view-hide-layer-panel').length > 0)
						                if(!layer_view_flag)
											$('#view-hide-layer-panel').trigger('click');
								//}
								karl_layer_view_flag = true;
								//*A#
								afterMap.setFeatureState(
                                    { source: 'karl_long_island-right-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: karl_layer_view_id},
                                    { hover: false }
                                );
							    afterMap.setFeatureState(
                                    { source: 'karl_long_island-right-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: event.features[0].id},
                                    { hover: true }
                                );
								beforeMap.setFeatureState(
                                    { source: 'karl_long_island-left-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: karl_layer_view_id},
                                    { hover: false }
                                );
							    beforeMap.setFeatureState(
                                    { source: 'karl_long_island-left-highlighted', sourceLayer: 'karl_areas-8j4ru6', id: event.features[0].id},
                                    { hover: true }
                                );
                                afterHighMapKarlPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
								if(!afterHighMapKarlPopUp.isOpen()) afterHighMapKarlPopUp.addTo(afterMap);
								beforeHighMapKarlPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
							    if(!beforeHighMapKarlPopUp.isOpen()) beforeHighMapKarlPopUp.addTo(beforeMap);
							}
							karl_layer_view_id = event.features[0].id;
						    karl_click_ev = true;
    }


//////////////////////////////////////////////
//TIME LAYER FILTERING. NOT SURE HOW WORKS.
//////////////////////////////////////////////


function changeDate(unixDate) {
	var year = parseInt(moment.unix(unixDate).format("YYYY"));
	var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

	var yrFilter = ["all", ["<=", "YearStart", year], [">=", "YearEnd", year]];
	var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];


    



	///////////////////////////////
	//LAYERS FOR FILTERING
	///////////////////////////////


	//NAHC
	beforeMap.setFilter("grants1-5sp9tb-left", dateFilter);
    afterMap.setFilter("grants1-5sp9tb-right", dateFilter);
	
	beforeMap.setFilter("grants1-5sp9tb-left-highlighted", dateFilter);
	afterMap.setFilter("grants1-5sp9tb-right-highlighted", dateFilter);
	
    beforeMap.setFilter("stokes_farms_complete_5_reduc-6k9tbl-left", dateFilter);
	afterMap.setFilter("stokes_farms_complete_5_reduc-6k9tbl-right", dateFilter);
	
	beforeMap.setFilter("stokes_farms_complete_5_reduc-6k9tbl-left-highlighted", dateFilter);
	afterMap.setFilter("stokes_farms_complete_5_reduc-6k9tbl-right-highlighted", dateFilter);
	
	beforeMap.setFilter("c7_dates-ajsksu-left", dateFilter);
	afterMap.setFilter("c7_dates-ajsksu-right", dateFilter);
	
	beforeMap.setFilter("grant-lots-left", dateFilter);
	afterMap.setFilter("grant-lots-right", dateFilter);
	

	
	beforeMap.setFilter("grant-lots-lines-left", dateFilter);
	afterMap.setFilter("grant-lots-lines-right", dateFilter);
	
	beforeMap.setFilter("farms-lines-left", dateFilter);
	afterMap.setFilter("farms-lines-right", dateFilter);
	
	beforeMap.setFilter("settlements-left", dateFilter);
	afterMap.setFilter("settlements-right", dateFilter);


/*START ADDED BY NITIN*/

	beforeMap.setFilter("settlements-labels-left", dateFilter);
	afterMap.setFilter("settlements-labels-right", dateFilter);
	
/*END ADDED BY NITIN*/


    /* REPLACE THIS */
    beforeMap.setFilter("gravesend_boundaries-c6qrbw-left", dateFilter);
    afterMap.setFilter("gravesend_boundaries-c6qrbw-right", dateFilter);
	
	beforeMap.setFilter("gravesend_boundaries-c6qrbw-left-highlighted", dateFilter);
    afterMap.setFilter("gravesend_boundaries-c6qrbw-right-highlighted", dateFilter);
	
	beforeMap.setFilter("gravesend-lines-left", dateFilter);
    afterMap.setFilter("gravesend-lines-right", dateFilter);
	/* REPLACE THIS */
	
    
	beforeMap.setFilter("karl_long_island-left", dateFilter);
    afterMap.setFilter("karl_long_island-right", dateFilter);
	
	beforeMap.setFilter("karl_long_island-left-highlighted", dateFilter);
    afterMap.setFilter("karl_long_island-right-highlighted", dateFilter);
	
	beforeMap.setFilter("karl-lines-left", dateFilter);
    afterMap.setFilter("karl-lines-right", dateFilter);


    demo_layer_features = afterMap.queryRenderedFeatures({ layers: ['c7_dates-ajsksu-right'] });
	
	if(demo_layer_view_flag) {
		buildPopUpInfo(demo_layer_features[0].properties);
	}
	
	
}//end function changeDate


/////////////////////////////
//   ZOOM LABELS
/////////////////////////////
var lbl_color = "#482525";
var lbl_color_hover = "#ff0000";

var LongIslandZoomLabel = {
            id: "label-long-island",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {
                      title: "Long Island",
                      icon: "circle"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [-72.94912,40.85225]
                    },
                  }
                ],
              },
            },
            layout: {
				"visibility": "visible",
				"text-font": ["Asap Medium"],
				"text-field": "{title}",
				"text-size": 18,
				//"text-anchor": "center"
			  },
			  paint: {
				"text-color": "#000000",
				"text-halo-width": 3,
				"text-halo-blur": 2,
				"text-halo-color": "#ffffff",
				'text-opacity': {
				  default: 1,
				  stops: [
					[7.5, 0],
					[8, 1]
				  ]
				},
			  },
};

var BrooklynZoomLabel = {
            id: "label-brooklyn",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
				  {
                    type: "Feature",
                    properties: {
                      title: "Brooklyn",
                      icon: "circle"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [-73.93772792292754,40.65432897355928]
                    },
                  }
                ],
              },
            },
            layout: {
			  "visibility": "visible",
              "text-font": ["Asap Medium"],
              "text-field": "{title}",
              "text-size": 18,
              //"text-anchor": "center"
            },
            paint: {
              "text-color": "#000000",
              "text-halo-width": 3,
			  "text-halo-blur": 2,
              "text-halo-color": "#ffffff",
			  'text-opacity': {
				default: 1,
				stops: [
				  [10.2, 0],
				  [10.5, 1]
				]
			  },
            },
};

var NewAmsterdamZoomLabel = {
            id: "label-new-amsterdam",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {
                      title: "New Amsterdam",
                      icon: "circle"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [-74.01255, 40.704882]
                    },
                  }
                ],
              },
            },
            layout: {
				"visibility": "visible",
				"text-font": ["Asap Medium"],
				"text-field": "{title}",
				"text-size": 18,
				//"text-anchor": "center"
			  },
			  paint: {
				"text-color": "#000000",
				"text-halo-width": 3,
				"text-halo-blur": 2,
				"text-halo-color": "#ffffff",
				'text-opacity': {
				  default: 1,
				  stops: [
					[6, 0],
					[6.5, 1]
				  ]
				},
			  },
};

var ManhattanZoomLabel = {
            id: "label-manhattan",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
				  {
                    type: "Feature",
                    properties: {
                      title: "Manhattan",
                      icon: "circle"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [-73.97719031118277,40.78097749612493]
                    },
                  }
                ],
              },
            },
            layout: {
			  "visibility": "visible",
              "text-font": ["Asap Medium"],
              "text-field": "{title}",
              "text-size": 18,
              //"text-anchor": "center"
            },
            paint: {
              "text-color": "#000000",
              "text-halo-width": 3,
			  "text-halo-blur": 2,
              "text-halo-color": "#ffffff",
			  'text-opacity': {
				default: 1,
				stops: [
				  [10.2, 0],
				  [10.5, 1]
				]
			  },
            },
};

var NewNetherlandZoomLabel = {
            id: "label-new-netherland",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {
                      title: "New Netherland",
                      icon: "circle"
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [-73.60361111111109, 41.09659166666665]
                    },
                  }
                ],
              },
            },
            layout: {
			  "visibility": "visible",
              "text-font": ["Asap Medium"],
              "text-field": "{title}",
              "text-size": 18,
              //"text-anchor": "center"
            },
            paint: {
              "text-color": "#000000",
              "text-halo-width": 3,
			  "text-halo-blur": 2,
              "text-halo-color": "#ffffff",
			  /*
			  'text-opacity': {
				default: 1,
				stops: [
				  [5.2, 0],
				  [5.6, 1]
				]
			  },
			  */
            },
};




var NewEnglandZoomLabel = {
	id: "label-new-england",
	type: "symbol",
	source: {
	  type: "geojson",
	  data: {
		type: "FeatureCollection",
		features: [
		  {
			type: "Feature",
			properties: {
			  title: "New England",
			  icon: "circle"
			},
			geometry: {
			  type: "Point",
			  coordinates: [-71.67755127,42.4971076267]
			},
		  }
		],
	  },
	},
	//For some reason, New Netherland label disappears unless minzoom is created
	"minzoom": 5.2,
	layout: {
		"visibility": "visible",
		"text-font": ["Asap Medium"],
		"text-field": "{title}",
		"text-size": 18,
		//"text-anchor": "center"
	  },
	  paint: {
		"text-color": "#000000",
		"text-halo-width": 3,
		"text-halo-blur": 2,
		"text-halo-color": "#ffffff",
		
		'text-opacity': {
		  default: 1,
		  stops: [
			[5.2, 0],
			[5.6, 1]
		  ]
		},
		
	  },
};


/////////////////////////////
//LAYER CHANGING
/////////////////////////////

//BASEMAP SWITCHING
beforeMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change")
	//switchBeforeStyle();
	//*A var sliderVal = $("#date").val();
	//*A var sliderVal = moment($("#date").val()).unix();
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	addBeforeLayers(yr, date);
	addBeforeFarmsLayer(date);
	addCastelloBeforeLayers();
	addGrantLotsBeforeLayers(date);
	addGrantLotsLinesBeforeLayers(date);
	addCurrentLotsBeforeLayers();
	addCurrentLotsLinesBeforeLayers();
	addCurrentBuildingsBeforeLayers();
	addCurrentBuildingsLinesBeforeLayers();
	addManahattaBeforeLayers();
	addLongIslandCoastlineBeforeLayers();
	addIndianPathsBeforeLayers();
	addLongIslandNativeGroupsBeforeLayers();
/*REPLACE THIS*/
addGravesendBeforeLayers(date);
addGravesendLinesBeforeLayers(date);
/*REPLACE THIS*/
addKarlBeforeLayers(date);
addKarlLinesBeforeLayers(date);
addSettlementsBeforeLayers(date);
addSettlementsLabelsBeforeLayers(date);

addBeforeLabelsLayer();

});

//BASEMAP SWITCHING
afterMap.on('style.load', function () {
	//on the 'style.load' event, switch "basemaps" and then re-add layers
	//this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
	console.log("style change after")
	//switchStyle();
	//*A var sliderVal = $("#date").val();
	//*A var sliderVal = moment($("#date").val()).unix();
	var sliderVal = moment($("#date").text()).unix();
	var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
	var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));
	console.log(sliderVal)
	console.log(yr)
	console.log(date)

	addAfterLayers(yr, date);
	addAfterFarmsLayer(date);
	addCastelloAfterLayers();
	addGrantLotsAfterLayers(date);
	addGrantLotsLinesAfterLayers(date);
	addCurrentLotsAfterLayers();
	addCurrentLotsLinesAfterLayers();
	addCurrentBuildingsAfterLayers();
	addCurrentBuildingsLinesAfterLayers();
	addManahattaAfterLayers();
	addLongIslandCoastlineAfterLayers();
	addIndianPathsAfterLayers();
	addLongIslandNativeGroupsAfterLayers();

/*REPLACE THIS*/
addGravesendAfterLayers(date);
addGravesendLinesAfterLayers(date);
/*REPLACE THIS*/

addKarlAfterLayers(date);
addKarlLinesAfterLayers(date);

addSettlementsAfterLayers(date);
addSettlementsLabelsAfterLayers(date);

addAfterLabelsLayer();

});





