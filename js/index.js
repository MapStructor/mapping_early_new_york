
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  console.warn("mobile device");
  console.warn("redirect");
  window.location.href = './mobile.html'; 
}else{
  // false for not mobile device
  console.warn("not mobile device");
  //if ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) ) {
  if ( window.innerWidth <= 670 ) {
      console.warn("but small size");
	  console.warn("redirect");
	  window.location.href = './mobile.html'; 
  } else {
      console.warn("start");
      console.warn("load");
  }
}


    // get Dutch Grants Lots Info from REST API
    var dutch_grant_lots_info = new Array(),
	    farms_grants_info = new Array(),
	    settlements_info = new Array(),
		infos_entity = new Array(),
		settlements_linked_location = new Array(),
		brooklyn_grants_info = new Array(),
		taxlot_events_info = new Array(),
		taxlot_event_entities_info = new Array();
	var dutch_grant_lots_info_length = 0,
	    farms_grants_info_length = 0,
	    settlements_info_length = 0,
		infos_entity_length = 0,
		brooklyn_grants_length = 0,
		taxlot_events_info_length = 0,
		taxlot_entities_info_length = 0;
	
	var lots_info = new Array();
	var lots_info_length = 0;
	getLotsInfo();
	
    //getDutchGrantsInfo();
	//getOriginalFarmsInfo();
	//getBrooklynGrantsInfo();
	getSettlementsInfo();
	getInfosEntity();
	getTaxlotEventsInfo();
	getTaxlotEventEntitiesDescrInfo();
	
	
	var modal_header_text = [];
	var modal_content_html = [];
	getInfoText(modal_header_text, modal_content_html);

		    var layer_view_flag = true;
			var timeline_pointer_flag = true;
			var windoWidth = 0;
			
			
		    var sliderStart = moment("01/01/1626").unix();
			var sliderStartDrag = sliderStart; //moment("06/02/1643").unix();
		    //var sliderEnd = moment().unix();
			var sliderEnd = moment("01/01/1700").unix();
			var sliderEndDrag = sliderEnd; //moment("07/04/1675").unix();
			
			//*A (sliderStart + sliderEnd)/2 = -9799671480
			var sliderMiddle =  (sliderStart + sliderEnd)/2;
			var tooltiPos = -100;
			
			var ruler_step = (sliderEnd - sliderStart)/10,
				date_ruler1 = sliderStart + ruler_step,
				date_ruler2 = sliderStart + ruler_step*3,
				date_ruler4 = sliderStart + ruler_step*7,
				date_ruler5 = sliderStart + ruler_step*9;
			
			
function simple_tooltip(target_items, name){
$(target_items).each(function(i){
$("body").append("<div class='"+name+"' id='"+name+i+"'><p>"+$(this).attr('title')+"</p></div>");
var my_tooltip = $("#"+name+i);

$(this).removeAttr("title").mouseover(function(){
my_tooltip.css({opacity:1.0, display:"none"}).fadeIn(200);
}).mousemove(function(kmouse){
my_tooltip.css({left:kmouse.pageX+15, top:kmouse.pageY+15});
}).mouseout(function(){
my_tooltip.fadeOut(200);
});
});
}

			
			
			$(document).ready(function () {
				if (jQuery.browser.msie) alert('Sorry, this application uses state of the art HTML5 techniques which are not (well) supported by Internet Explorer.\nUse Google Chrome or Mozilla Firefox to experience the full power of HTML5 and this application');
                
				simple_tooltip("i.layer-info, i.zoom-to-layer","tooltip");
				
				windoWidth = $(window).width();
				//console.log(windoWidth);
				//555
				if(windoWidth <= 637) {
				    if(layer_view_flag) {
				        $("#studioMenu").css({'margin-left' : "-111%"});//.slideUp();
						$("#view-hide-layer-panel").css({'margin-left' : "-337px"});
						$("#mobi-hide-sidebar").css({'margin-left' : "-111%"});
						layer_view_flag = false;
						$("#dir-txt").html("&#9205;");
					}
			    }
                
				$(window).resize(function(){
				    windoWidth = $(window).width();
				});
				
				// console.log(window.name);
				
				$(".manahatta_layer_item").hide();
				$(".farms_layer_item").hide();
				$(".dutch_grants_layer_item").hide();
				$(".current_lots_layer_item").hide();
                $("#long-island-section-layers").slideUp();
				$("#info-section-layers").slideUp();
				$("#manahatta-maps-section").slideUp();
				$("#long-island-maps-section").slideUp();
				$("#long-island-maps-section1").slideUp();
				$("#new-netherland-maps-section").slideUp();
				$("#new-england-maps-section").slideUp();
					
				$("#ruler-date1").text(moment.unix(date_ruler1).format('YYYY')); // .format('DD MMM YYYY')
				$("#ruler-date2").text(moment.unix(date_ruler2).format('YYYY')); // .format('DD MMM YYYY')
				//$("#ruler-date3").text(moment.unix(sliderMiddle).format('DD MMM YYYY'));
				$("#ruler-date3").html("&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;");
				$("#mobi-year").html("&nbsp; &#8678; &nbsp; TIME &nbsp; &nbsp; &nbsp; &nbsp; SLIDE &nbsp; &#8680;");
				$("#ruler-date4").text(moment.unix(date_ruler4).format('YYYY')); // .format('DD MMM YYYY')
				$("#ruler-date5").text(moment.unix(date_ruler5).format('YYYY')); // .format('DD MMM YYYY')
				
				console.log("start:", sliderStart);
				console.log("end:", sliderEnd);
				console.log("window:", window.name);

				$("#slider").slider({
					min: sliderStart,
					max: sliderEnd,
					step: 86400, //24 hrs in unix time, set slider step to 1 day=86400 seconds
					value: sliderMiddle, //window.name || sliderMiddle,
					slide: function (event, ui) {
						tooltiPos = ((ui.value < sliderMiddle ) ? 30 : -100);
						/*
					        $(ui.handle).find('.ui-slider-tooltip').css({ left: tooltiPos}).text(moment.unix(ui.value).format('MM/DD/YYYY'));
						$("#date").val(moment.unix(ui.value).format('MM/DD/YYYY'));
						*/
						
						//urlHash = window.location.hash + '/' + ui.value;
						// console.log(urlHash);
						// hash.onMapMove();
						if(timeline_pointer_flag) {
						    $("#ruler-date3").text(moment.unix(sliderMiddle).format('YYYY')); // .format('DD MMM YYYY')
					        //$("#mobi-year").text(moment.unix(sliderMiddle).format('YYYY'));  // .format('DD MMM YYYY')
							$("#mobi-year").css("display", "none");
							$("#ruler-date1").css("display", "block");
							$("#ruler-date2").css("display", "block");
							$("#ruler-date3").css("display", "block");
							$("#ruler-date4").css("display", "block");
							$("#ruler-date5").css("display", "block");
						    timeline_pointer_flag = false;
						}
						
						if(demo_layer_view_flag) { 
						    if(ui.value <= sliderStartDrag){
                                $(this).slider('value', sliderStartDrag);
								changeDate(sliderStartDrag);
								$("#date").text(moment.unix(sliderStartDrag).format('DD MMM YYYY'));
                                return false
                            }
                            if(ui.value >= sliderEndDrag){
                                $(this).slider('value', sliderEndDrag);
								changeDate(sliderEndDrag);
								$("#date").text(moment.unix(sliderEndDrag).format('DD MMM YYYY'));
                                return false
                            }
							if ((ui.value <= sliderEndDrag) && (ui.value >= sliderStartDrag)) {
							    changeDate(ui.value);
								$("#date").text(moment.unix(ui.value).format('DD MMM YYYY'));
							}
						} else {
						    changeDate(ui.value);
							$("#date").text(moment.unix(ui.value).format('DD MMM YYYY'));
						}
						
					},
					create: function( event, ui ) {
				                var tooltip = $('<div class="ui-slider-tooltip" />').css({
					              position: 'absolute',
					              top: 32,
					              left: tooltiPos,
					              color: "red",
					              width: "100px",
					              size: "1"
				                }).text(moment.unix(sliderMiddle).format('MM/DD/YYYY'));

				                      //*A $(event.target).find('.ui-slider-handle').append(tooltip);
			                        },
			                        change: function(event, ui) {}
				});

				//*A $("#date").val($("#slider").slider("values", 0));
                                //*A $("#date").val(moment.unix($("#slider").slider("values", 0)).format('MM/DD/YYYY'));
				$("#date").text(moment.unix($("#slider").slider("values", 0)).format('DD MMM YYYY'));
				
				$('.footnote').click(function () {
				$('#footnotediv').toggle('slide');
				});
				
				
				$('#current_lots_items').change(function(){
                    $('.current_lots').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    beforeMap.setLayoutProperty( "curr-lots-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "curr-lots-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "curr-lots-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "curr-lots-lines-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "curr-lots-high-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "curr-lots-high-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "curr-lots-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "curr-lots-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "curr-lots-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "curr-lots-lines-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "curr-lots-high-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "curr-lots-high-right", "visibility", "none" );
						
						if(curr_layer_view_flag) { 
							closeCurrLotsInfo();
						}
					}
                });

                $(".current_lots").change(function () {
                    if ($(".current_lots:checked").length == $(".current_lots").length) {
                        $('#current_lots_items').prop('checked','checked');
                    }else{
                        $('#current_lots_items').prop('checked',false);  
                    }
                });
				
				
				$('#current_buildings_items').change(function(){
                    $('.current_buildings').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    beforeMap.setLayoutProperty( "curr-builds-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "curr-builds-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "curr-builds-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "curr-builds-lines-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "curr-builds-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "curr-builds-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "curr-builds-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "curr-builds-lines-right", "visibility", "none" );
					}
                });

                $(".current_buildings").change(function () {
                    if ($(".current_buildings:checked").length == $(".current_buildings").length) {
                        $('#current_buildings_items').prop('checked','checked');
                    }else{
                        $('#current_buildings_items').prop('checked',false);  
                    }
                });
				
				
				$('#current_lots').click(function() {
				    //console.warn(document.getElementById('current_lots').checked);
                    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("curr-lots", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "curr-lots-left", "visibility", "visible" );
							beforeMap.setLayoutProperty( "curr-lots-high-left", "visibility", "visible" );
						//if(afterMap.getLayoutProperty("curr-lots", "visibility") === "none" )
					        afterMap.setLayoutProperty( "curr-lots-right", "visibility", "visible" ); 
							afterMap.setLayoutProperty( "curr-lots-high-right", "visibility", "visible" );
					} else {
					    //if(beforeMap.getLayoutProperty("curr-lots-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "curr-lots-left", "visibility", "none" ); 
							beforeMap.setLayoutProperty( "curr-lots-high-left", "visibility", "none" );
						//if(afterMap.getLayoutProperty("curr-lots-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "curr-lots-right", "visibility", "none" );
							afterMap.setLayoutProperty( "curr-lots-high-right", "visibility", "none" );
							
						if(curr_layer_view_flag) { 
							closeCurrLotsInfo();
						}
					}
                });
				
				$('#current_lots_lines').click(function() {
				    //console.warn(document.getElementById('current_lots_lines').checked);
                    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("curr-lots-lines", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "curr-lots-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("curr-lots-lines", "visibility") === "none" )
					        afterMap.setLayoutProperty( "curr-lots-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("curr-lots-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "curr-lots-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("curr-lots-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "curr-lots-lines-right", "visibility", "none" );
					}
                });
				
				
				$('#current_buildings').click(function() {
				    //console.warn(document.getElementById('current_buildings').checked);
                    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("curr-builds", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "curr-builds-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("curr-builds", "visibility") === "none" )
					        afterMap.setLayoutProperty( "curr-builds-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("curr-builds-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "curr-builds-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("curr-builds-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "curr-builds-right", "visibility", "none" );
					}
                });
				
				$('#current_buildings_lines').click(function() {
				    //console.warn(document.getElementById('current_buildings_lines').checked);
                    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("curr-builds-lines", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "curr-builds-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("curr-builds-lines", "visibility") === "none" )
					        afterMap.setLayoutProperty( "curr-builds-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("curr-builds-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "curr-builds-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("curr-builds-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "curr-builds-lines-right", "visibility", "none" );
					}
                });
				
				$(".long_island").change(function () {
                    if ($(".long_island:checked").length == $(".long_island").length) {
                        $('#longisland_items').prop('checked','checked');
                    }else{
                        $('#longisland_items').prop('checked',false);  
                    }
                });
				
				$('#longisland_coastline').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "long-island-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "long-island-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "long-island-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "long-island-right", "visibility", "none" );
					}
                });
				
				$('#longisland_area').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "long-island-area-left", "visibility", "visible" );
					        afterMap.setLayoutProperty( "long-island-area-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "long-island-area-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "long-island-area-right", "visibility", "none" );
					}
                });
				
				$('#longisland_items').change(function(){
                    $('.long_island').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    beforeMap.setLayoutProperty( "long-island-left", "visibility", "visible" ); 
					    afterMap.setLayoutProperty( "long-island-right", "visibility", "visible" ); 
					    beforeMap.setLayoutProperty( "long-island-area-left", "visibility", "visible" );
					    afterMap.setLayoutProperty( "long-island-area-right", "visibility", "visible" );
					} else {
					    beforeMap.setLayoutProperty( "long-island-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "long-island-right", "visibility", "none" ); 
					    beforeMap.setLayoutProperty( "long-island-area-left", "visibility", "none" );
					    afterMap.setLayoutProperty( "long-island-area-right", "visibility", "none" );
					}
                });
				
				
				$('#indian_paths').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "indian-paths-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "indian-paths-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "indian-paths-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "indian-paths-right", "visibility", "none" );
					}
                });
				
				
				$('#lenape_trails').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "lenape-trails-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "lenape-trails-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "lenape-trails-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "lenape-trails-right", "visibility", "none" );
					}
                });
				
				$('#manahatta_shoreline').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "manahatta-shoreline-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "manahatta-shoreline-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "manahatta-shoreline-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "manahatta-shoreline-right", "visibility", "none" );
					}
                });
				
				$('#manahatta_streams').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "streams-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "streams-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "streams-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "streams-right", "visibility", "none" );
					}
                });
				
				$(".manahatta").change(function () {
                    if ($(".manahatta:checked").length == $(".manahatta").length) {
                        $('#manahatta_items').prop('checked','checked');
                    }else{
                        $('#manahatta_items').prop('checked',false);  
                    }
                });
				
				$('#manahatta_items').change(function(){
                    $('.manahatta').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    beforeMap.setLayoutProperty( "lenape-trails-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "lenape-trails-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "manahatta-shoreline-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "manahatta-shoreline-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "streams-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "streams-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "lenape-trails-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "lenape-trails-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "manahatta-shoreline-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "manahatta-shoreline-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "streams-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "streams-right", "visibility", "none" );
					}
                });
				
				
				$('#castello_points').click(function() {
				    //console.warn(document.getElementById('castello_points').checked);
                    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("places", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "places-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("places", "visibility") === "none" )
					        afterMap.setLayoutProperty( "places-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("places-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "places-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("places-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "places-right", "visibility", "none" );
							
						if(castello_layer_view_flag) { 
						    closeCastelloInfo();
						}	
						
					}
                });
				
				
				$(".settlements").change(function () {
                    if ($(".settlements:checked").length == $(".settlements").length) {
                        $('#settlements_items').prop('checked','checked');
                    }else{
                        $('#settlements_items').prop('checked',false);  
                    }
                });
				
				$('#settlements_points').click(function() {
                    if( $( this ).prop('checked') ) {
					        // sizeOfArray(settlements_info)     for assoc arrays
					        if(settlements_info_length == 0) {
					            getSettlementsInfo();
					        }
					        beforeMap.setLayoutProperty( "settlements-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "settlements-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "settlements-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "settlements-right", "visibility", "none" );
							
						if(settlements_layer_view_flag) { 
							closeSettlementsInfo();
						}
					}
                });

				$('#settlements_labels').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "settlements-labels-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "settlements-labels-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "settlements-labels-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "settlements-labels-right", "visibility", "none" );
					}
                });
				
				$('#settlements_items').change(function(){
                    $('.settlements').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    // sizeOfArray(settlements_info)     for assoc arrays
					    if(settlements_info_length == 0) {
					        getSettlementsInfo();
					    }
					    beforeMap.setLayoutProperty( "settlements-left", "visibility", "visible" ); 
					    afterMap.setLayoutProperty( "settlements-right", "visibility", "visible" ); 
					    beforeMap.setLayoutProperty( "settlements-labels-left", "visibility", "visible" ); 
					    afterMap.setLayoutProperty( "settlements-labels-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "settlements-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "settlements-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "settlements-labels-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "settlements-labels-right", "visibility", "none" );
					}
                });
				
				
				$(".info-item").change(function () {
                    if ($(".info-item:checked").length == $(".info-item").length) {
                        $('#info_items').prop('checked','checked');
                    }else{
                        $('#info_items').prop('checked',false);  
                    }
                });
				
				$('#info_points').click(function() {
                    if( $( this ).prop('checked') ) {
					        // sizeOfArray(infos_entity)     for assoc arrays
							if(infos_entity_length == 0) {
					            getInfosEntity();
					        }
					        beforeMap.setLayoutProperty( "info-points-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "info-points-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "info-points-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "info-points-right", "visibility", "none" );
					    
						if(info_layer_view_flag) { 
							closeInfoLayerInfo();
						}
					}
                });
				
				$('#info_labels').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "info-labels-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "info-labels-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "info-labels-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "info-labels-right", "visibility", "none" );
					}
                });
				
				$('#info_items').change(function(){
                    $('.info-item').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    // sizeOfArray(infos_entity)     for assoc arrays
					    if(infos_entity_length == 0) {
					        getInfosEntity();
					    }
					    beforeMap.setLayoutProperty( "info-points-left", "visibility", "visible" ); 
					    afterMap.setLayoutProperty( "info-points-right", "visibility", "visible" ); 
					    beforeMap.setLayoutProperty( "info-labels-left", "visibility", "visible" ); 
					    afterMap.setLayoutProperty( "info-labels-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "info-points-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "info-points-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "info-labels-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "info-labels-right", "visibility", "none" );
					}
                });
				
				
				$('#circle_point').click(function() {
				    if( $( this ).prop('checked') ) {
					    // sizeOfArray(taxlot_events_info)     for assoc arrays
					    if(taxlot_events_info_length == 0) {
					        getTaxlotEventsInfo();
					    }
					    //if(beforeMap.getLayoutProperty("lot_events-bf43eb-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "lot_events-bf43eb-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("lot_events-bf43eb-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "lot_events-bf43eb-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("lot_events-bf43eb-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "lot_events-bf43eb-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("lot_events-bf43eb-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "lot_events-bf43eb-right", "visibility", "none" );
							
						if(demo_layer_view_flag) { 
						    closeDemoInfo();
						}
					}
				});
				
				
				$('#grants_layer_items').change(function(){
                    $('.grants_layer').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    // sizeOfArray(dutch_grant_lots_info)     for assoc arrays
						/*
					    if(dutch_grant_lots_info_length == 0) {
					        getDutchGrantsInfo();
					    }
						*/
						if(lots_info_length == 0) {
					        getLotsInfo();
						}
					    beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right-highlighted", "visibility", "visible" );
						
						beforeMap.setLayoutProperty( "grant-lots-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "grant-lots-lines-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right-highlighted", "visibility", "none" );
						
						beforeMap.setLayoutProperty( "grant-lots-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "grant-lots-lines-right", "visibility", "none" );
						
						if(dgrants_layer_view_flag) { 
							closeDutchGrantsInfo();
						}
					}
                });

                $(".grants_layer").change(function () {
                    if ($(".grants_layer:checked").length == $(".grants_layer").length) {
                        $('#grants_layer_items').prop('checked','checked');
                    }else{
                        $('#grants_layer_items').prop('checked',false);  
                    }
                });
				
				
				$('#grants_layer').click(function() {
				    if( $( this ).prop('checked') ) {
					    // sizeOfArray(dutch_grant_lots_info)     for assoc arrays
					    /*
						if(dutch_grant_lots_info_length == 0) {
					        getDutchGrantsInfo();
					    }
						*/
						if(lots_info_length == 0) {
					        getLotsInfo();
						}
					    //if(beforeMap.getLayoutProperty("dutch_grants-5ehfqe-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("dutch_grants-5ehfqe-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right", "visibility", "visible" ); 
							beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left-highlighted", "visibility", "visible" );
							afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right-highlighted", "visibility", "visible" );
					} else {
					    //if(beforeMap.getLayoutProperty("dutch_grants-5ehfqe-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("dutch_grants-5ehfqe-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right", "visibility", "none" );
							beforeMap.setLayoutProperty( "dutch_grants-5ehfqe-left-highlighted", "visibility", "none" );
							afterMap.setLayoutProperty( "dutch_grants-5ehfqe-right-highlighted", "visibility", "none" );
						if(dgrants_layer_view_flag) { 
							closeDutchGrantsInfo();
						}
					}
				});
				
				$('#grants_layer_lines').click(function() {
				    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("grant-lots-lines-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "grant-lots-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("grant-lots-lines-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "grant-lots-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("grant-lots-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "grant-lots-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("grant-lots-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "grant-lots-lines-right", "visibility", "none" );
					}
				});
				
				
				/* REPLACE THIS */
				$('#gravesend_layer_items').change(function(){
                    $('.gravesend_layer').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    // sizeOfArray(dutch_new_grant_lots_info)     for assoc arrays
						/*
						if(brooklyn_grants_length == 0) {
		                    getBrooklynGrantsInfo();
	                    }
						*/
						if(lots_info_length == 0) {
					        getLotsInfo();
						}
					    beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right-highlighted", "visibility", "visible" );
						
						beforeMap.setLayoutProperty( "gravesend-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "gravesend-lines-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right-highlighted", "visibility", "none" );
						
						beforeMap.setLayoutProperty( "gravesend-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "gravesend-lines-right", "visibility", "none" );
						
						
						if(gravesend_layer_view_flag) { 
							closeGravesendInfo();
						}
						
					}
                });

                $(".gravesend_layer").change(function () {
                    if ($(".gravesend_layer:checked").length == $(".gravesend_layer").length) {
                        $('#gravesend_layer_items').prop('checked','checked');
                    }else{
                        $('#gravesend_layer_items').prop('checked',false);  
                    }
                });
				
				
				$('#gravesend_layer').click(function() {
				    if( $( this ).prop('checked') ) {
					    // sizeOfArray(dutch_grant_lots_info)     for assoc arrays
						/*
						if(brooklyn_grants_length == 0) {
		                    getBrooklynGrantsInfo();
	                    }
						*/
						if(lots_info_length == 0) {
					        getLotsInfo();
						}
					    //if(beforeMap.getLayoutProperty("gravesend_boundaries-c6qrbw-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("gravesend_boundaries-c6qrbw-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right", "visibility", "visible" ); 
							beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left-highlighted", "visibility", "visible" );
							afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right-highlighted", "visibility", "visible" );
					} else {
					    //if(beforeMap.getLayoutProperty("gravesend_boundaries-c6qrbw-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("gravesend_boundaries-c6qrbw-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right", "visibility", "none" );
							beforeMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-left-highlighted", "visibility", "none" );
							afterMap.setLayoutProperty( "gravesend_boundaries-c6qrbw-right-highlighted", "visibility", "none" );
						
						if(gravesend_layer_view_flag) { 
							closeGravesendInfo();
						}
					}
				});
				
				$('#gravesend_layer_lines').click(function() {
				    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("gravesend-lines-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "gravesend-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("gravesend-lines-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "gravesend-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("gravesend-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "gravesend-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("gravesend-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "gravesend-lines-right", "visibility", "none" );
					}
				});
				/* REPLACE THIS */
				
				
				// Long Island Native Groups Layer Start
				$('#native_groups_layer_items').change(function(){
                    $('.native_groups_layer').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    // sizeOfArray(dutch_grant_lots_info)     for assoc arrays
					    if(taxlot_entities_info_length == 0) {
					        getTaxlotEventEntitiesDescrInfo();
					    }
					    beforeMap.setLayoutProperty( "native-groups-area-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "native-groups-area-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "native-groups-area-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "native-groups-area-right-highlighted", "visibility", "visible" );
						
						beforeMap.setLayoutProperty( "native-groups-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "native-groups-lines-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "native-groups-labels-left", "visibility", "visible" ); 
					    afterMap.setLayoutProperty( "native-groups-labels-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "native-groups-area-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "native-groups-area-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "native-groups-area-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "native-groups-area-right-highlighted", "visibility", "none" );
						
						beforeMap.setLayoutProperty( "native-groups-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "native-groups-lines-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "native-groups-labels-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "native-groups-labels-right", "visibility", "none" );
						
						if(native_group_layer_view_flag) { 
							closeNativeGroupsInfo();
						}
					}
                });
    
                $(".native_groups_layer").change(function () {
                    if ($(".native_groups_layer:checked").length == $(".native_groups_layer").length) {
                        $('#native_groups_layer_items').prop('checked','checked');
                    }else{
                        $('#native_groups_layer_items').prop('checked',false);  
                    }
                });
				
				
				$('#native_groups_area').click(function() {
				    if( $( this ).prop('checked') ) {
                            // sizeOfArray(dutch_grant_lots_info)     for assoc arrays
					        if(taxlot_entities_info_length == 0) {
					            getTaxlotEventEntitiesDescrInfo();
					        }
					        beforeMap.setLayoutProperty( "native-groups-area-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "native-groups-area-right", "visibility", "visible" ); 
							beforeMap.setLayoutProperty( "native-groups-area-left-highlighted", "visibility", "visible" );
							afterMap.setLayoutProperty( "native-groups-area-right-highlighted", "visibility", "visible" );
					} else {
					        beforeMap.setLayoutProperty( "native-groups-area-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "native-groups-area-right", "visibility", "none" );
							beforeMap.setLayoutProperty( "native-groups-area-left-highlighted", "visibility", "none" );
							afterMap.setLayoutProperty( "native-groups-area-right-highlighted", "visibility", "none" );

						if(native_group_layer_view_flag) { 
							closeNativeGroupsInfo();
						}
					}
				});
				
				
				$('#native_groups_labels').click(function() {
                    if( $( this ).prop('checked') ) {
					        beforeMap.setLayoutProperty( "native-groups-labels-left", "visibility", "visible" ); 
					        afterMap.setLayoutProperty( "native-groups-labels-right", "visibility", "visible" ); 
					} else {
					        beforeMap.setLayoutProperty( "native-groups-labels-left", "visibility", "none" ); 
					        afterMap.setLayoutProperty( "native-groups-labels-right", "visibility", "none" );
					}
                });
				
				$('#native_groups_lines').click(function() {
				    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("native-groups-lines-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "native-groups-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("native-groups-lines-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "native-groups-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("native-groups-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "native-groups-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("native-groups-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "native-groups-lines-right", "visibility", "none" );
					}
				});
				// Long Island Native Groups Layer End
				
				
				// Karl Layer Start
				$('#karl_layer_items').change(function(){
                    $('.karl_layer').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    // sizeOfArray(dutch_new_grant_lots_info)     for assoc arrays
						/*
					    if(dutch_new_grant_lots_info_length == 0) {
					        getDutchNewGrantsInfo();
					    }
						*/
					    beforeMap.setLayoutProperty( "karl_long_island-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "karl_long_island-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "karl_long_island-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "karl_long_island-right-highlighted", "visibility", "visible" );
						
						beforeMap.setLayoutProperty( "karl-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "karl-lines-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "karl_long_island-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "karl_long_island-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "karl_long_island-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "karl_long_island-right-highlighted", "visibility", "none" );
						
						beforeMap.setLayoutProperty( "karl-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "karl-lines-right", "visibility", "none" );
						
						
						if(karl_layer_view_flag) { 
							closeKarlInfo();
						}
						
					}
                });

                $(".karl_layer").change(function () {
                    if ($(".karl_layer:checked").length == $(".karl_layer").length) {
                        $('#karl_layer_items').prop('checked','checked');
                    }else{
                        $('#karl_layer_items').prop('checked',false);  
                    }
                });
				
				
				$('#karl_layer').click(function() {
				    if( $( this ).prop('checked') ) {
					    /*
					    // sizeOfArray(dutch_grant_lots_info)     for assoc arrays
					    if(dutch_grant_lots_info_length == 0) {
					        getDutchGrantsInfo();
					    }
						*/
					    //if(beforeMap.getLayoutProperty("karl_long_island-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "karl_long_island-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("karl_long_island-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "karl_long_island-right", "visibility", "visible" ); 
							beforeMap.setLayoutProperty( "karl_long_island-left-highlighted", "visibility", "visible" );
							afterMap.setLayoutProperty( "karl_long_island-right-highlighted", "visibility", "visible" );
					} else {
					    //if(beforeMap.getLayoutProperty("karl_long_island-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "karl_long_island-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("karl_long_island-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "karl_long_island-right", "visibility", "none" );
							beforeMap.setLayoutProperty( "karl_long_island-left-highlighted", "visibility", "none" );
							afterMap.setLayoutProperty( "karl_long_island-right-highlighted", "visibility", "none" );
						
						if(karl_layer_view_flag) { 
							closeKarlInfo();
						}
					}
				});
				
				$('#karl_layer_lines').click(function() {
				    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("karl-lines-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "karl-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("karl-lines-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "karl-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("karl-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "karl-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("karl-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "karl-lines-right", "visibility", "none" );
					}
				});
				// Karl Layer End
				
				
				// Farms Layer Start
				
				$('#farms_layer_items').change(function(){
                    $('.farms_layer').prop('checked',this.checked);
					if( $( this ).prop('checked') ) {
					    /*
					    if(farms_grants_info_length == 0) {
					        getOriginalFarmsInfo();
						}
						*/
						if(lots_info_length == 0) {
					        getLotsInfo();
						}
					    beforeMap.setLayoutProperty( "original_grants_and_farms-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "original_grants_and_farms-right", "visibility", "visible" ); 
						beforeMap.setLayoutProperty( "original_grants_and_farms-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "original_grants_and_farms-right-highlighted", "visibility", "visible" );
						
						beforeMap.setLayoutProperty( "farms-lines-left", "visibility", "visible" );
						afterMap.setLayoutProperty( "farms-lines-right", "visibility", "visible" ); 
					} else {
					    beforeMap.setLayoutProperty( "original_grants_and_farms-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "original_grants_and_farms-right", "visibility", "none" );
						beforeMap.setLayoutProperty( "original_grants_and_farms-left-highlighted", "visibility", "visible" );
						afterMap.setLayoutProperty( "original_grants_and_farms-right-highlighted", "visibility", "none" );
						
						beforeMap.setLayoutProperty( "farms-lines-left", "visibility", "none" ); 
					    afterMap.setLayoutProperty( "farms-lines-right", "visibility", "none" );
						
						if(farms_layer_view_flag) { 
							closeFarmsInfo();
						}
					}
                });

                $(".farms_layer").change(function () {
                    if ($(".farms_layer:checked").length == $(".farms_layer").length) {
                        $('#farms_layer_items').prop('checked','checked');
                    }else{
                        $('#farms_layer_items').prop('checked',false);  
                    }
                });
				
				
				$('#farms_layer').click(function() {
				    if( $( this ).prop('checked') ) {
					    /*
					    if(farms_grants_info_length == 0) {
					        getOriginalFarmsInfo();
						}
						*/
						if(lots_info_length == 0) {
					        getLotsInfo();
						}
					    //if(beforeMap.getLayoutProperty("original_grants_and_farms-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "original_grants_and_farms-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("original_grants_and_farms-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "original_grants_and_farms-right", "visibility", "visible" ); 
							beforeMap.setLayoutProperty( "original_grants_and_farms-left-highlighted", "visibility", "visible" );
							afterMap.setLayoutProperty( "original_grants_and_farms-right-highlighted", "visibility", "visible" );
					} else {
					    //if(beforeMap.getLayoutProperty("original_grants_and_farms-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "original_grants_and_farms-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("original_grants_and_farms-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "original_grants_and_farms-right", "visibility", "none" );
							beforeMap.setLayoutProperty( "original_grants_and_farms-left-highlighted", "visibility", "none" );
							afterMap.setLayoutProperty( "original_grants_and_farms-right-highlighted", "visibility", "none" );
						if(farms_layer_view_flag) { 
							closeFarmsInfo();
						}
					}
				});
				
				$('#farms_layer_lines').click(function() {
				    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("farms-lines-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "farms-lines-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("farms-lines-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "farms-lines-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("farms-lines-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "farms-lines-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("farms-lines-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "farms-lines-right", "visibility", "none" );
					}
				});
				
				// Farms Layer End
				
				
				$('#grant_lots').click(function() {
				    if( $( this ).prop('checked') ) {
					    //if(beforeMap.getLayoutProperty("grant-lots-left", "visibility") === "none" )
					        beforeMap.setLayoutProperty( "grant-lots-left", "visibility", "visible" ); 
						//if(afterMap.getLayoutProperty("grant-lots-right", "visibility") === "none" )
					        afterMap.setLayoutProperty( "grant-lots-right", "visibility", "visible" ); 
					} else {
					    //if(beforeMap.getLayoutProperty("grant-lots-left", "visibility") === "visible" )
					        beforeMap.setLayoutProperty( "grant-lots-left", "visibility", "none" ); 
						//if(afterMap.getLayoutProperty("grant-lots-right", "visibility") === "visible" )
					        afterMap.setLayoutProperty( "grant-lots-right", "visibility", "none" );
							
						if(grant_lots_view_flag) { 
							closeGrantLotsInfo();
						}
					}
				});
				
				
				//var layer_view_flag = true;
				
				$('#view-hide-layer-panel').click(function() {
				    if(layer_view_flag) {
				        $("#studioMenu").animate({'margin-left' : "-337px"},500);//.slideUp();
						$(this).animate({'margin-left' : "-337px"},500);
						$('#mobi-hide-sidebar').animate({'margin-left' : "-337px"},500);
						layer_view_flag = false;
						$("#dir-txt").html("&#9205;");
						$("#rightInfoBar").slideUp();
					} else {
					    $("#studioMenu").animate({'margin-left' : "0px"},500);//.slideDown();
						$(this).animate({'margin-left' : "0px"},500);
						$('#mobi-hide-sidebar').animate({'margin-left' : "0px"},500);
						layer_view_flag = true;
						$("#dir-txt").html("&#9204;");
						//555
						if(windoWidth > 637)
						    $("#rightInfoBar").slideDown();
					}
				});
				
				$('#mobi-view-sidebar').click(function() {
				    if(!layer_view_flag) {
				        $("#studioMenu").animate({'margin-left' : "0px"},500);//.slideDown();
						$("#view-hide-layer-panel").animate({'margin-left' : "0px"},500);
						$("#mobi-hide-sidebar").animate({'margin-left' : "0px"},500);
						layer_view_flag = true;
						$("#dir-txt").html("&#9204;");
					}
				});
				
				$('#mobi-hide-sidebar').click(function() {
				    if(layer_view_flag) {
				        $("#studioMenu").animate({'margin-left' : "-111%"},500);//.slideUp();
						$("#view-hide-layer-panel").animate({'margin-left' : "-337px"},500);
						$(this).animate({'margin-left' : "-111%"},500);
						layer_view_flag = false;
						$("#dir-txt").html("&#9205;");
					}
				});

				/* change timeline CSS property on mouseover & mouseout */
				$("div.timeline").mouseover(function(){
				    //$("div#slider").css("opacity", 0.8);
					$("div.ui-widget-content").css("background-color", "#baddf9");
                    $("a.ui-slider-handle").css("background", "red");
                }).mouseout(function(){
				    //$("div#slider").css("opacity", 1);
					$("div.ui-widget-content").css("background-color", "#d1ecff");
                    $("a.ui-slider-handle").css("background", "");
                });
				
				/*
				$("a.ui-slider-handle").mouseover(function(){
				    $("#ruler-date3").text(moment.unix(sliderMiddle).format('DD MMM YYYY'));
					$("#mobi-year").text(moment.unix(sliderMiddle).format('DD MMM YYYY'));
                });
				*/
				
				$('.trigger-popup').click(function(e) {
					var popup_id = ( e.target.id == "info" || e.target.id == "about-info" ) ? "about" : e.target.id;
					if (modal_header_text[popup_id].length > 0) {
						$("div.modal-header h1").text(modal_header_text[e.target.id]);
						$("div.modal-content").html(modal_content_html[e.target.id]);
						$("label#open-popup").trigger("click");
					}
				});
				
	
				// close modal by click outside the box
				
				$('div.modal-body').click(function(e){
                    e.stopPropagation();
                });
				
				$('div.modal').click(function() {
				    $("label#close").trigger("click");
                });
				
			    setTimeout( function() {
	                //document.getElementById("#loading").style.display = "none";
					$("div#loading").css('display', 'none');
	            }, 5000);
				
			});
			
			
// for test local host REST_API/grant-lots-export.json
// for test remote host https://lifecourse.xyz/upwork/test/ny/grant-lots-export.json
// REST API https://nahc-mapping.org/mappingNY/dev/grant-lots-export
// REST API https://encyclopedia.nahc-mapping.org/grant-lots-export
// REST API new https://encyclopedia.nahc-mapping.org/grant-lots-export-properly

function getDutchGrantsInfo() {
    
	var data_info_index = "";
	dutch_grant_lots_info_length = 0;
	
	$.ajax({
	            //url: 'REST_API/grant-lots-export.json',
			    url: 'https://encyclopedia.nahc-mapping.org/grant-lots-export-properly',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  
		//console.log(data);
		if(data.length > 0) {
		    //console.warn("\n\n\nLOAD JSON REST API\n\n\n");
		    for(let i = 0; i < data.length; i++){
                /* old api
				if( typeof data[i].title[0].value != "undefined" ) {
				    
					data_info_index = data[i].title[0].value;
					data_info_index = data_info_index.replace(/\s+/g, '');
					//data_info_index = data_info_index.toLowerCase();
					//console.log(/FortAmsterdam/.test(data_info_index));
					if(/FortAmsterdam/.test(data_info_index)) {
					    //console.log(data_info_index);
						data_info_index = "Fort Amsterdam";
					}
					
					//if(/J-Block-Garden-DWIC/.test(data_info_index)) {
					//    console.log(data_info_index);
					//}
				   
				    dutch_grant_lots_info[data_info_index] = { 
					    name_txt: data[i].field_name.length > 0 ? data[i].field_name[0].value : "", 
					    to_party: data[i].field_name.length > 0 ? (  
						    ( data[i].field_name456.length > 0 ? "<a href='https://nahc-mapping.org" + data[i].field_name456[0].url + "' target='_blank'>" : "" ) +
						     data[i].field_name[0].value  +
							( data[i].field_name456.length > 0 ? "</a>"  : "" )
						) : "", 
					    from_party:  data[i].field_from_party_text_.length > 0 ? (
						    ( data[i].field_from_party.length > 0 ? "<a href='https://nahc-mapping.org" + data[i].field_from_party[0].url + "' target='_blank'>" : "" ) +
						    data[i].field_from_party_text_[0].value  +
							( data[i].field_from_party.length > 0 ? "</a>"  : "" )
						) : "",
						start: data[i].field_date_end.length > 0 ? data[i].field_date_end[0].value  : "", 
						end: data[i].field_date_end_grants.length > 0 ? data[i].field_date_end_grants[0].value  : "", 
						notes: data[i].field_grant_notes.length > 0 ? data[i].field_grant_notes[0].value  : "", 
						descr: data[i].field_grant_description.length > 0 ? data[i].field_grant_description[0].value : "",
						builds: data[i].field_current_buildings_and_land.length > 0 ? data[i].field_current_buildings_and_land : []
					};  
          
                    dutch_grant_lots_info_length += 1;
                    //console.log(dutch_grant_lots_info_length);					
				}
				*/
				// new api
				//console.log(data[i].from_party);
				//console.log(data[i].to_party);
				//console.log(data[i].title);
				//console.log(unescape(data[i].from_party));
				//console.log(unescape(data[i].to_party));
				if( data[i].title != "" ) {
				    data_info_index = data[i].title;
					data_info_index = data_info_index.replace(/\s+/g, '');
					if(/FortAmsterdam/.test(data_info_index)) {
					    //console.log(data_info_index);
						data_info_index = "Fort Amsterdam";
					}
					dutch_grant_lots_info[data_info_index] = { 
					    name_txt: data[i].to_party_unlinked,
					    to_party: data[i].to_party.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
					    from_party: data[i].from_party.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						start: data[i].start, 
						end: data[i].end, 
						notes: data[i].note, 
						descr: data[i].description,
						builds: data[i].images.length > 0 ?  data[i].images.split(", ") : []
					};  
          
                    dutch_grant_lots_info_length += 1;
			    }
			}
		}
		

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
}


// for test local host REST_API/original-farms-and-grants-list-export.json
// REST API https://encyclopedia.nahc-mapping.org/original-farms-and-grants-list-export 

function getOriginalFarmsInfo() {
    
	var data_info_index = "";
	farms_grants_info_length = 0;
	
	$.ajax({
	            //url: 'REST_API/original-farms-and-grants-list-export.json',
			    url: 'https://encyclopedia.nahc-mapping.org/original-farms-and-grants-list-export',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  
		//console.log(data);
		if(data.length > 0) {
		    //console.warn("\n\n\nLOAD JSON REST API\n\n\n");
		    for(let i = 0; i < data.length; i++){
				
				if( typeof data[i].nid[0].value != "undefined" ) {
				    //console.log(data[i].title[0].value);
					//data_info_index = data[i].title[0].value;
					//data_info_index = data_info_index.replace(/\s+/g, '');
					//data_info_index = data_info_index.toLowerCase();
					data_info_index = "" + data[i].nid[0].value + "";

				    farms_grants_info[data_info_index] = { 
						//title: data[i].title.length > 0 ? data[i].title[0].value : "",
						name: data[i].title.length > 0 ? (  
						    ( data[i].path.length > 0 ? "<a href='https://encyclopedia.nahc-mapping.org" + data[i].path[0].alias + "' target='_blank'>" : "" ) +
						     data[i].title[0].value  +
							( data[i].path.length > 0 ? "</a>"  : "" )
						) : "",
						date_start: data[i].field_date_start_text_.length > 0 ? data[i].field_date_start_text_[0].value : "",
						date_end: data[i].field_date_end_text_.length > 0 ? data[i].field_date_end_text_[0].value : "",
						from_party: data[i].field_from_party_text_2.length > 0 ? data[i].field_from_party_text_2[0].value : "",
						to_party: data[i].field_to_party_unlinked_.length > 0 ? data[i].field_to_party_unlinked_[0].value : "",
						from_party_linked: data[i].field_from_party_.length > 0 ? "https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia" + data[i].field_from_party_[0].url : "",
						to_party_linked: data[i].field_to_party.length > 0 ? "https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia" + data[i].field_to_party[0].url : "",
						type: data[i].field_typedsfg.length > 0 ? data[i].field_typedsfg[0].value : ""
					};  
					
                    farms_grants_info_length += 1;
                    //console.log(taxlot_event_entities_info);					
				}
			}
		}
		

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
}


// for test local host REST_API/places-list-export.json
// REST API https://encyclopedia.nahc-mapping.org/places-list-export

function getSettlementsInfo() {
    
	var data_info_index = "";
	settlements_info_length = 0;
	
	$.ajax({
				url: 'https://encyclopedia.nahc-mapping.org/places-list-export',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  
		//console.log(data);
		if(data.length > 0) {
		    //console.warn("\n\n\nLOAD JSON REST API\n\n\n");
		    for(let i = 0; i < data.length; i++){
                // old api
				//if( typeof data[i].title[0].value != "undefined" ) {
				if( typeof data[i].nid[0].value != "undefined" ) {
				    //console.log(data[i].title[0].value);
					//data_info_index = data[i].title[0].value;
					//data_info_index = data_info_index.replace(/\s+/g, '');
					//data_info_index = data_info_index.toLowerCase();
					data_info_index = "" + data[i].nid[0].value + "";

				    settlements_info[data_info_index] = { 
					    //name: data[i].title.length > 0 ? data[i].title[0].value : "", 
						name: data[i].title.length > 0 ? (  
						    ( data[i].path.length > 0 ? "<a href='https://encyclopedia.nahc-mapping.org" + data[i].path[0].alias + "' target='_blank'>" : "" ) +
						     data[i].title[0].value  +
							( data[i].path.length > 0 ? "</a>"  : "" )
						) : "",
						curr_loc: data[i].field_current_location_text_.length > 0 ? (  
						    ( data[i].field_current_location_linked_.length > 0 ? "<a href='https://nahc-mapping.org" + data[i].field_current_location_linked_[0].url + "' target='_blank'>" : "" ) +
						     data[i].field_current_location_text_[0].value  +
							( data[i].field_current_location_linked_.length > 0 ? "</a>"  : "" )
						) : "",
						curr_loc_name: ( data[i].field_current_location_text_.length > 0 ? data[i].field_current_location_text_[0].value : "" ),
						curr_loc_url: ( data[i].field_current_location_linked_.length > 0 ? data[i].field_current_location_linked_[0].url : "" ),
						curr_loc_target: ( data[i].field_current_location_linked_.length > 0 ? data[i].field_current_location_linked_[0].target_id : "" ),
						date: data[i].field_date_text_.length > 0 ? data[i].field_date_text_[0].value : "", 
						descr: data[i].field_description10.length > 0 ? data[i].field_description10[0].value : "",
						curr_loc_txt: data[i].field_current_location_text_.length > 0 ? data[i].field_current_location_text_[0].value : "",
						curr_loc_link: data[i].field_current_location_linked_.length > 0 ? data[i].field_current_location_linked_[0].url : "",
						img1: data[i].field_image1_1.length > 0 ? data[i].field_image1_1[0].url : "",
						img2: data[i].field_image_2.length > 0 ? data[i].field_image_2[0].url : "",
						img3: data[i].field_image_3.length > 0 ? data[i].field_image_3[0].url : ""
					};  
                    
		            settlements_linked_location[data[i].nid[0].value] = data[i].title[0].value;
					
                    settlements_info_length += 1;
                    //console.log(settlements_info_length);					
				}
			}
		}
		//console.log(settlements_info);

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
}


// for test local host REST_API/taxlot-entities-export.json
// REST API https://encyclopedia.nahc-mapping.org/taxlot-entities-export

function getTaxlotEventEntitiesDescrInfo() {
    
	var data_info_index = "";
	taxlot_entities_info_length = 0;
	
	$.ajax({
				url: 'https://encyclopedia.nahc-mapping.org/taxlot-entities-export',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  
		//console.log(data);
		if(data.length > 0) {
		    //console.warn("\n\n\nLOAD JSON REST API\n\n\n");
		    for(let i = 0; i < data.length; i++){
                // old api
				//if( typeof data[i].title[0].value != "undefined" ) {
				if( typeof data[i].nid[0].value != "undefined" ) {
				    //console.log(data[i].title[0].value);
					//data_info_index = data[i].title[0].value;
					//data_info_index = data_info_index.replace(/\s+/g, '');
					//data_info_index = data_info_index.toLowerCase();
					data_info_index = "" + data[i].nid[0].value + "";

				    taxlot_event_entities_info[data_info_index] = { 
					    name: data[i].title.length > 0 ? data[i].title[0].value : "", 
						name_html: data[i].title.length > 0 ? (  
						    ( data[i].path.length > 0 ? "<a href='https://encyclopedia.nahc-mapping.org/node/" + data_info_index + "' target='_blank'>" : "" ) +
						     data[i].title[0].value  +
							( data[i].path.length > 0 ? "</a>"  : "" )
						) : "",
						descr: data[i].field_description14.length > 0 ? data[i].field_description14[0].value : "" 
					};  
					
                    taxlot_entities_info_length += 1;
                    //console.log(taxlot_event_entities_info);					
				}
			}
		}
		//console.log(taxlot_entities_info);

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
}


// for test local host REST_API/taxlot-events-export.json
// REST API https://encyclopedia.nahc-mapping.org/taxlot-events-export

function getTaxlotEventsInfo() {
    
	var data_info_index = "";
	taxlot_events_info_length = 0;
	
	$.ajax({
				url: 'https://encyclopedia.nahc-mapping.org/taxlot-events-export',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  
		//console.log(data);
		if(data.length > 0) {
		    //console.warn("\n\n\nLOAD JSON REST API\n\n\n");
		    for(let i = 0; i < data.length; i++){
				if( typeof data[i].title != "undefined" ) {

                    /*

	"title": "C7_1643-06-02"	
    "title":"\u003Ca href=\u0022\/node\/1545\u0022 hreflang=\u0022en\u0022\u003EC7_1643-06-02\u003C\/a\u003E"
	
	C7
	taxlot_C7
	"field_taxlot": "\u003Ca href=\u0022\/taxlot\/c7\u0022 hreflang=\u0022en\u0022\u003EC7\u003C\/a\u003E, \u003Ca href=\u0022\/lots\/taxlotc7\u0022 hreflang=\u0022en\u0022\u003Etaxlot_C7\u003C\/a\u003E",


	Willem Kieft (ID: 1,660,244)
	"field_from": "\u003Ca href=\u0022\/ancestor\/willem-kieft-id-1660244\u0022 hreflang=\u0022en\u0022\u003EWillem Kieft (ID: 1,660,244)\u003C\/a\u003E",
	
	Dutch West India Company (ID: DWIC)
	"field_from_party_1": "\u003Ca href=\u0022\/ancestor\/dutch-west-india-company-id-dwic\u0022 hreflang=\u0022en\u0022\u003EDutch West India Company (ID: DWIC)\u003C\/a\u003E",
	
	
	Govert Loockermans (ID: 151)
	"field_to": "\u003Ca href=\u0022\/ancestor\/govert-loockermans-id-151\u0022 hreflang=\u0022en\u0022\u003EGovert Loockermans (ID: 151)\u003C\/a\u003E",
		
	Isaac Allerton (ID: 1,660,228)   
	"field_to_party_1": "\u003Ca href=\u0022\/ancestor\/isaac-allerton-id-1660228\u0022 hreflang=\u0022en\u0022\u003EIsaac Allerton (ID: 1,660,228)\u003C\/a\u003E",
	
	"field_daystart": "June 2, 1643"
	
					*/
					
					//data_info_index = "" + data[i].title + "";
					
					/*
					console.log(data[i].title);
					console.log(data[i].title.match(/\/node\/(.*?)\"/)[1]);
					console.log(parseInt(data[i].title.match(/\/node\/(\d*?)\"/)[1]));
					*/
					
					data_info_index = data[i].title.match(/\/node\/(.*?)\"/)[1];
					
					//console.log(data_info_index);
				    
					if( data_info_index !== null ) {
					
				        taxlot_events_info[data_info_index] = { 
					        //title: data[i].title,
						    title: data[i].title.replaceAll("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    start : data[i].field_daystart,
						    end : '',
						    taxlot: data[i].field_taxlot.replaceAll("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    taxlotevent: data[i].field_taxlotevent.replaceAll("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party: data[i].field_to.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
					        to_party2: data[i].field_to_party_1.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party: data[i].field_from.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
					        from_party2: data[i].field_from_party_1.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),

						    property_type: data[i].field_pro.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party_1_text: data[i].field_events_to_party_1_text_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party_1_role: data[i].field_party_role_in_transaction_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party_1_entity: data[i].field_entity_description_to_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party_2_text: data[i].field_asdf_to_party_2_text_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party_2_role: data[i].field_party_role3.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party_2_entity: data[i].field_entity_description_to_part.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party_1_text: data[i].field_from_party_1_text_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party_1_role: data[i].field_partyrole.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party_1_entity: data[i].field_entity_desc.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party_2_text: data[i].field_from_party_2_text_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party_2_role: data[i].field_party_role2.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    from_party_2_entity: data[i].field_entity_description_from_pa.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia")

					    };  
					
                        taxlot_events_info_length += 1;
                        //console.log(taxlot_events_info);		
                    }						
				}
			}
		}
		//console.log(taxlot_events_info["C7_1643-06-02"].taxlot);

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
}


// for test local host REST_API/info-entities-export.json
// REST API https://encyclopedia.nahc-mapping.org/info-entities-export

function getInfosEntity() {
    
	var data_info_index = "";
	infos_entity_length = 0;
	
	$.ajax({
				url: 'https://encyclopedia.nahc-mapping.org/info-entities-export',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  
		//console.log(data);
		if(data.length > 0) {
		    //console.warn("\n\n\nLOAD JSON REST API\n\n\n");
		    for(let i = 0; i < data.length; i++){
                // old api
				//if( typeof data[i].title[0].value != "undefined" ) {
				if( typeof data[i].nid[0].value != "undefined" ) {
				    //console.log(data[i].title[0].value);
					//data_info_index = data[i].title[0].value;
					//data_info_index = data_info_index.replace(/\s+/g, '');
					//data_info_index = data_info_index.toLowerCase();
					data_info_index = "" + data[i].nid[0].value + "";

				    infos_entity[data_info_index] = { 
					    name: data[i].title.length > 0 ? data[i].title[0].value : "", 
						name_html: data[i].title.length > 0 ? (  
						    ( data[i].path.length > 0 ? "<a href='https://encyclopedia.nahc-mapping.org/node/" + data_info_index + "' target='_blank'>" : "" ) +
						     data[i].title[0].value  +
							( data[i].path.length > 0 ? "</a>"  : "" )
						) : "",
						descr: data[i].body.length > 0 ? data[i].body[0].value : "" 
					};  
					
                    infos_entity_length += 1;
                    //console.log(taxlot_event_entities_info);					
				}
			}
		}
		//console.log(taxlot_entities_info);

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
	
}


// for test local host REST_API/brooklyn-grant-ids-export.json
// REST API https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export

function getBrooklynGrantsInfo() {
    
	var data_info_index = "";
	brooklyn_grants_length = 0;
	
	$.ajax({
				url: 'https://encyclopedia.nahc-mapping.org/brooklyn-grant-ids-export',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	
	    if(data.length > 0) {
		    for(let i = 0; i < data.length; i++){
				if( typeof data[i].nid[0].value != "undefined" ) {
				    data_info_index = "" + data[i].nid[0].value + "";
				    
					brooklyn_grants_info[data_info_index] = {
						
					    name: data[i].title.length > 0 ? data[i].title[0].value : "",
						date_start: data[i].field_start_date_.length > 0 ? data[i].field_start_date_[0].value : "",
					
						to_party: data[i].field_to_party_1_text_.length > 0 ? data[i].field_to_party_1_text_[0].value.split("\n")[0] : "",	
						to_party_linked: data[i].field_to_party_1222.length > 0 ? "https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia" + data[i].field_to_party_1222[0].url : "",
						
						to_party2: data[i].field_to_party_2_text222.length > 0 ? data[i].field_to_party_2_text222[0].value : "",
						to_party2_linked: data[i].field_to_party_2_text_.length > 0 ? "https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia" + data[i].field_to_party_2_text_[0].url : "",
						
						from_party: data[i].field_from_party_1222.length > 0 ? data[i].field_from_party_1222[0].value : "",
						from_party_linked: data[i].field_from_party_12222.length > 0 ? "https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia" + data[i].field_from_party_12222[0].url : "",
						
						indigenous_signatories: data[i].field_history_notes222.length > 0 ? data[i].field_history_notes222[0].value : "",
						
						//ancestors_link: data[i].field_related_ancestors222.length > 0 ? "https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia" + data[i].field_related_ancestors222[0].url : "",

					};
					
				    brooklyn_grants_length += 1;
				}
	        }
		}

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });

}


// for test local host REST_API/lots-export2.json
// REST API https://encyclopedia.nahc-mapping.org/lots-export2

function getLotsInfo() {
    
	var data_info_index = "";
	lots_info_length = 0;
	
	$.ajax({
	            //url: 'REST_API/lots-export2.json',
			    url: 'https://encyclopedia.nahc-mapping.org/lots-export2',
				headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				type: 'get',
                dataType: 'json',
				data: {}
    })
	.done(function(data) { 
	  

		if(data.length > 0) {
		    for(let i = 0; i < data.length; i++){
				if( typeof data[i].field_old_nid != "undefined" ) {
                    if( data[i].field_old_nid != "" ) {
					    
						if( data[i].field_content_type == "Grant Lots" ) {
						    data_info_index = data[i].field_old_title;
					        data_info_index = data_info_index.replace(/\s+/g, '');
					        if(/FortAmsterdam/.test(data_info_index)) {
						        data_info_index = "Fort Amsterdam";
					        }
						} else {
					        data_info_index = "" + data[i].field_old_nid + "";
                        }
						
				        lots_info[data_info_index] = {
						    name: data[i].field_content_type,
                            title: data[i].field_old_title,
							//title_linked: data[i].title.replace(/>[^<]+<\/a>/, ">" + data[i].field_old_title + "</a>").replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022"),
							title_linked: data[i].title.replace(/>[^<]+<\/a>/, ">" + data[i].field_old_title + "</a>").replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https://encyclopedia.nahc-mapping.org/"),
							//title_linked: data[i].title.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    brooklyn_title: data[i].field_original_title_temp,
							to_party_linked: data[i].field_to_party_1222.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
					        from_party_linked: data[i].field_from_party.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
						    to_party: data[i].field_to_party_1_text_,
							from_party: data[i].field_from_party_text_,
							to_party2: data[i].field_to_party_2_text222,
						    to_party2_linked: data[i].field_to_party_2_text_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"),
							date_start: data[i].field_date_start_text_, 
							date_end: data[i].field_date_end_text_, 
						    indigenous_signatories: data[i].field_history_notes222,  // getBrooklynGrantsInfo()
							notes: "", // ???
							descr: data[i].field_grant_description,
							builds: data[i].field_current_buildings_and_land.length > 0 ? data[i].field_current_buildings_and_land.split(", ") : [],
						    type: data[i].field_proptype.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia")
						};  
					
					    /*
						    getDutchGrantsInfo()
						    end: "",   // !!!  absent
						    notes: data[i].field_history_notes222,   // ???  data[i].note
						    descr: "", // !!!  absent
						    builds: [] // !!!  absent
							
					        getOriginalFarmsInfo()  
                            date_end: "",   // !!!  absent                    
					   
					        getBrooklynGrantsInfo() 
					   
					    */
					
                        lots_info_length += 1;
                         //console.log(taxlot_event_entities_info);	
						//if(data[i].field_to_party_2_text222.lenght > 0)
						//console.log(data[i].field_to_party_2_text_.replace("href=\u0022", "target=\u0022_blank\u0022 href=\u0022https:\/\/nahc-mapping.org\/mappingNY\/encyclopedia"));
						//console.log(data[i].field_to_party_2_text222);
                    }						 
				}
			}
		}
		

    })
    .fail( function(xhr, textStatus, errorThrown) {
        // LOADING ERROR!
		console.warn("jQuery AJAX request  ERROR !!!");
		console.log(xhr.responseText);
        console.log(textStatus);
    });
}


    // Function to calculate the
    // length of an array
    sizeOfArray = function (array) {
 
        // A variable to store
        // the size of arrays
        let size = 0;
 
        // Traversing the array
        for (let key in array) {
 
            // Checking if key is present
            // in arrays or not
            if (array.hasOwnProperty(key)) {
                size++;
            }
        }
 
        // Return the size
        return size;
    }


    function itemsCompressExpand(items_class,caret_id) {
	    if($(caret_id).hasClass("fa-minus-square")) {
		    $(caret_id).removeClass("fa-minus-square").addClass("fa-plus-square");
			$(items_class).hide();
		} else if($(caret_id).hasClass("fa-plus-square")) {
		    $(caret_id).removeClass("fa-plus-square").addClass("fa-minus-square");
			$(items_class).show();
		}
	}

    function sectionCompressExpand(section_id,caret_id) {
	    if($(caret_id).hasClass("fa-minus-square")) {
		    $(caret_id).removeClass("fa-minus-square").addClass("fa-plus-square");
			$(section_id).slideUp();
		} else if($(caret_id).hasClass("fa-plus-square")) {
		    $(caret_id).removeClass("fa-plus-square").addClass("fa-minus-square");
			$(section_id).slideDown();
		}
	}