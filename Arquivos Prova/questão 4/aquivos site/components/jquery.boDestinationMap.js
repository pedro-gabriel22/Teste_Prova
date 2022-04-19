/*
 * 
 * BuscaOnibus DestinationMap 1.0 - Destination Map Jquery Plugin for BuscaOnibus!
 * Version 1.0
 * @requires jQuery v1.3.2
 * @requires jquery.boLocationSearch.js
 * @requires Maps API on http://maps.google.com/maps/api/js?sensor=false&region=BR
 * 
 * 2011 - BuscaOnibus | All right reserved
 * 
 */

/* Plugin boDestinationMap definition */

(function($) {
    $.fn.extend({
        boDestinationMap: function(options) {
        	var defaults = {    
        			lang: 'pt',
        			centerLatLng: new google.maps.LatLng(-16, -51),
        			zoom: 4,
        			mainLocationKey: null,
        			mainIconSrc: null,
        			locationList: null,
        			routeList: null,
        			baseUrl: '',
        			mainSelected: true,
        			strokeColor: '#333333',
        			addReturnRoutes: false,
        			fitToMarkers: false
        	};
     	
        	var config = $.extend(defaults, options);
        	
        	var textContent = new Object();
        	if(config.lang == 'pt'){
        		textContent.mainDestinationClickInfo = "Clique na cidade de origem para consultar <strong>horários de ônibus para {0}</strong>.";
        		textContent.mainLocationClickInfoHeader = "Ônibus para {0}";
        		textContent.locationClickInfoHeader = "Horários de ônibus {0} - {1}:";
        		textContent.locationClickInfoLink = "<a class='bo-link bo-searching' href='/horario/{0}/{1}'>{2} - {3}</a>";
        		textContent.locationClickInfoFooter = "<a class='bo-link' href='/destinos/{0}/{1}'><strong>+ Ônibus para {2}</strong></a>";
        		textContent.mapSearchCityLabel = "Pesquise a sua cidade aqui";
        		textContent.mapSearchDestinationLabel = "Pesquise o seu destino aqui";
        	}
        	else{//lang = en
        		textContent.mainDestinationClickInfo = "Click on the origin city to check <strong>bus times to {0}</strong>.";
        		textContent.mainLocationClickInfoHeader = "Bus times to {0}";
        		textContent.locationClickInfoHeader = "Bus times {0} - {1}:";
        		textContent.locationClickInfoLink = "<a class='bo-link bo-searching' href='/en/timetable/{0}/{1}'>{2} - {3}</a>";
        		textContent.locationClickInfoFooter = "<a class='bo-link' href='/en/destinations/{0}/{1}'><strong>+ Bus destinations to {2}</strong></a>";
        		textContent.mapSearchCityLabel = "Search your city here";
        		textContent.mapSearchDestinationLabel = "Search your destination here";
        	}
        	
        	var visibleLocationList = [];
        	var visibleRouteList = config.routeList;
        	var markers = [];
        	var selectedMarkerKey = null;
        	var destinations = [];
        	var routeLines = [];
        	var infoWindow = new google.maps.InfoWindow();
        	
   			//preload marker icons
   			var centerIconSrc = "/site2013/img/icons/map-icon-city.png";
   			var centerIconOverSrc = "/site2013/img/icons/map-icon-city.png";
   			var centerIconDestinationSrc = "/site2013/img/icons/map-icon-city.png";
   			var centerIconImg = new Image(34,45);
   			var centerIconOverImg = new Image(34,45);
   			var centerIconDestinationImg = new Image(34,45);
   			centerIconImg.src = centerIconSrc;
   			centerIconOverImg.src = centerIconOverSrc;
   			centerIconDestinationImg.src = centerIconDestinationSrc;
   			
			var centerIcon = new google.maps.MarkerImage(centerIconSrc,
			      new google.maps.Size(34, 45),
			      new google.maps.Point(0,0),
			      new google.maps.Point(17, 40));

			var centerIconOver = new google.maps.MarkerImage(centerIconOverSrc,
			      new google.maps.Size(34, 45),
			      new google.maps.Point(0,0),
			      new google.maps.Point(17, 40));

			var centerIconDestination = new google.maps.MarkerImage(centerIconDestinationSrc,
			      new google.maps.Size(34, 45),
			      new google.maps.Point(0,0),
			      new google.maps.Point(17, 40));

			var centerMainIcon = null;
			var mapContainer = this[0];
			
			var markerBounds = new google.maps.LatLngBounds();
			
			if(config.addReturnRoutes){
				var newReturnRouteList = [];
				for(var routeKey in config.routeList)
				{
					var route = config.routeList[routeKey];
					var originKey = route.origin.linkName;
					var destinationKey = route.destination.linkName;
					var returnRouteKey = destinationKey + '+' + originKey;
					if(!config.routeList[returnRouteKey]){
						newReturnRouteList[returnRouteKey] = {'origin':route.destination,'destination':route.origin};
					}
				}
				for(var returnRouteKey in newReturnRouteList)
				{
					config.routeList[returnRouteKey] = newReturnRouteList[returnRouteKey];
				}				
			}
			
			if(config.mainIconSrc)
			{
				var centerMainIconImg = new Image();

	   			function centerMainIconImgLoaded(){
	   				centerMainIcon = new google.maps.MarkerImage(config.mainIconSrc,
						      new google.maps.Size(centerMainIconImg.width,centerMainIconImg.height),
						      new google.maps.Point(0,0),
						      new google.maps.Point(centerMainIconImg.width/2,centerMainIconImg.height/2));
	   				loadMap(mapContainer);
	   			}

	   			centerMainIconImg.onload = centerMainIconImgLoaded
	   			centerMainIconImg.src = config.mainIconSrc;			
			}
			else {
				loadMap(mapContainer);				
			}
			
			function drawMapOriginSelected(locationKey, openInfoWindow)
			{
				selectedMarkerKey = locationKey;
				var selectedMarker = markers[selectedMarkerKey];
				if(!selectedMarker)
				{
					//start: make new location and routes visible
					if(config.mainLocationKey){
						var goRouteKey = locationKey + "+" + config.mainLocationKey; 
						var returnRouteKey = config.mainLocationKey + "+" + locationKey;
						if(config.routeList[goRouteKey])
						{
							visibleRouteList[goRouteKey] = config.routeList[goRouteKey];
						}
						if(config.routeList[returnRouteKey])
						{
							visibleRouteList[returnRouteKey] = config.routeList[returnRouteKey];
						}
					}
					else{
						for(var lKey in visibleLocationList)
						{
							var goRouteKey = locationKey + "+" + lKey; 
							var returnRouteKey = lKey + "+" + locationKey;
							if(config.routeList[goRouteKey])
							{
								visibleRouteList[goRouteKey] = config.routeList[goRouteKey];
							}
							if(config.routeList[returnRouteKey])
							{
								visibleRouteList[returnRouteKey] = config.routeList[returnRouteKey];
							}
						}					
					}
					visibleLocationList[locationKey]=config.locationList[locationKey];
					//end: make new location and routes visible
					
					markers[locationKey] = new google.maps.Marker({
					      position: new google.maps.LatLng(config.locationList[locationKey].lat,config.locationList[locationKey].lng), 
					      map: map, 
					      title: config.locationList[locationKey].htmlFullName,
					      icon: centerIcon,
					      shape: { coord: [0, 0, centerIcon.size.width],type: 'circle'}
					});
					createMarkerEvents(locationKey);
					selectedMarker = markers[locationKey];
				}
				selectedLocation = config.locationList[locationKey];
				destinations = new Array();
				for(var key in markers){
					if(key == config.mainLocationKey && config.mainIconSrc){
						markers[key].setIcon(centerMainIcon);
					}
					else{
						if(key == selectedMarkerKey){
							markers[key].setIcon(centerIconOver);
						}
						else{
							markers[key].setIcon(centerIcon);									
						}
					}
				}
				
				for(var key in routeLines)
				{
					routeLines[key].setOptions({strokeOpacity:0.0});								
				}					
			
				for(var routeKey in visibleRouteList)
				{
					var route = visibleRouteList[routeKey];
					var originKey = route.origin.linkName;
					var destinationKey = route.destination.linkName;
					if(originKey == locationKey && markers[destinationKey])
					{
						if(destinationKey != config.mainLocationKey || !config.mainIconSrc){
							markers[destinationKey].setIcon(centerIconDestination);
						}
						destinations[destinationKey] = true;
						if(!routeLines[routeKey])
						{
							routeLines[routeKey] = new google.maps.Polyline({
		    					path: [new google.maps.LatLng(config.locationList[originKey].lat,config.locationList[originKey].lng),new google.maps.LatLng(config.locationList[destinationKey].lat,config.locationList[destinationKey].lng)],
		    					strokeColor: config.strokeColor,
		    					strokeOpacity: 0.0,
		    					strokeWeight: 2
		    				});
							routeLines[routeKey].setMap(map);							
						}
						routeLines[routeKey].setOptions({strokeOpacity:0.5});
					}
    			}
			
    			if(openInfoWindow)
    			{
    				var contentArray = new Array();
    				contentArray.push("<div class='bo-destination-map-info'>");    				

					if(config.mainLocationKey){
	    				contentArray.push(String.format("<h3>{0}</h3>",selectedLocation.htmlFullName));
						if (selectedLocation.linkName == config.mainLocationKey)
						{
		    				contentArray.push("<p>");
		    				contentArray.push(String.format(textContent.mainDestinationClickInfo,selectedLocation.htmlName));
		    				contentArray.push("</p>");
						}
						else
						{
							contentArray.push("<ul class='nav nav-list'>");
							contentArray.push("<li class='bo-map-link'>");
							contentArray.push(String.format(textContent.locationClickInfoLink,selectedLocation.linkName,config.mainLocationKey,selectedLocation.htmlName,config.locationList[config.mainLocationKey].htmlName));
							contentArray.push("</li>");
							contentArray.push("<li class='bo-map-link'>");
							contentArray.push(String.format(textContent.locationClickInfoLink,config.mainLocationKey,selectedLocation.linkName,config.locationList[config.mainLocationKey].htmlName,selectedLocation.htmlName));
							contentArray.push("</li>");
							contentArray.push("<li class='bo-map-destination-link'>");
							contentArray.push(String.format(textContent.locationClickInfoFooter,selectedLocation.state.toLowerCase(),selectedLocation.linkName,selectedLocation.htmlFullName));
							contentArray.push("</li>");
							contentArray.push("</ul>");
	    				}
					}
					else{
						contentArray.push("<h3>");
	    				contentArray.push(String.format(textContent.mainLocationClickInfoHeader,selectedLocation.htmlFullName));
						contentArray.push("</h3>");
						contentArray.push("<ul class='nav nav-list'>");
						var linkCount = 6; //show 6 links only
						for(var routeKey in config.routeList)
						{
							var route = config.routeList[routeKey];
							if(route.destination.linkName == locationKey && markers[route.origin.linkName])
							{
								contentArray.push("<li class='bo-map-link'>");
								contentArray.push(String.format(textContent.locationClickInfoLink,route.origin.linkName,route.destination.linkName,route.origin.htmlName,route.destination.htmlName));
								contentArray.push("</li>");
								//count links
								linkCount--;
								if(linkCount<=0){
									break;
								}
							}
						}
						contentArray.push("<li class='bo-map-destination-link'>");
						contentArray.push(String.format(textContent.locationClickInfoFooter,selectedLocation.state.toLowerCase(),selectedLocation.linkName,selectedLocation.htmlFullName));
						contentArray.push("</li>");
						contentArray.push("</ul>");
					}
    				contentArray.push("</div>");
					infoWindow.setContent(contentArray.join(""));
					infoWindow.open(map, selectedMarker);
					//set focus to the map
					this[0].focus();
	    			$(".bo-map-link .bo-searching").click(function() {
				        var routeText = $(this).html().replace(" - "," > ");
				        $("#bo-searching-dialog-title").text(routeText);
				        $("#bo-searching-dialog").modal();
				    });    			
				}
			}
			
			function createMarkerEvents(locationKey)
			{
			
				google.maps.event.addListener(markers[locationKey], "mouseover",function(){
					if(locationKey != config.mainLocationKey || !config.mainIconSrc){
						markers[locationKey].setIcon(centerIconOver);
					}
				}); 
			
				google.maps.event.addListener(markers[locationKey], "mouseout",function(){
					if(locationKey != selectedMarkerKey){
						if(locationKey != config.mainLocationKey || !config.mainIconSrc){
							if(destinations[locationKey]){
								markers[locationKey].setIcon(centerIconDestination);
							}
							else{
								markers[locationKey].setIcon(centerIcon);
							}
						}
					}
				}); 
			
				google.maps.event.addListener(markers[locationKey], "click", function() {
					ga('send', 'event', 'InternalAction', 'MapSelect', config.locationList[locationKey].htmlFullName, 1);
					drawMapOriginSelected(locationKey, true);				
	    		});
			}
			
        	function loadMap(mapDiv)
			{

				var mapOptions = {
					zoom: config.zoom,
					center: config.centerLatLng,
				    zoomControl: true,
				    mapTypeControl: false,
				    streetViewControl: false,
				    scrollwheel: false,
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				map = new google.maps.Map(mapDiv, mapOptions);
				
				var mapSearchContentArray = new Array();
				mapSearchContentArray.push("<div class='input-group bo-map-search'>");
				mapSearchContentArray.push("<span class='input-group-addon'><span class='glyphicon glyphicon-search'></span></span>");
				if(config.mainLocationKey){
					mapSearchContentArray.push("<input id='bo-map-search-input' type='text' autocomplete='off' class='form-control' placeholder='"+ textContent.mapSearchCityLabel +"'></input>");
				}
				else{
					mapSearchContentArray.push("<input id='bo-map-search-input' type='text' autocomplete='off' class='form-control' placeholder='"+ textContent.mapSearchDestinationLabel +"'></input>");					
				}
				mapSearchContentArray.push("</div>");
				var controlMapSearch = $(mapSearchContentArray.join(""));
				controlMapSearch.css('z-index', 1);
				map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlMapSearch[0]);			
				
				for(var routeKey in config.routeList)
				{
					var route = config.routeList[routeKey];
					var originKey = route.origin.linkName;
					var destinationKey = route.destination.linkName;
					if(config.locationList[originKey] && config.locationList[destinationKey])
					{
						if(!visibleLocationList[originKey])
						{
							visibleLocationList[originKey] = config.locationList[originKey];
						}
						if(!visibleLocationList[destinationKey])
						{
							visibleLocationList[destinationKey] = config.locationList[destinationKey];
						}
						var lineKey = originKey + "+" + destinationKey;						
						routeLines[lineKey] = new google.maps.Polyline({
	    					path: [new google.maps.LatLng(config.locationList[originKey].lat,config.locationList[originKey].lng),new google.maps.LatLng(config.locationList[destinationKey].lat,config.locationList[destinationKey].lng)],
	    					strokeColor: config.strokeColor,
	    					strokeOpacity: 0.0,
	    					strokeWeight: 2
	    				});
						routeLines[lineKey].setMap(map);
					}
				}
				
				for(var locationKey in visibleLocationList)
				{
					var zIndex = 1;
					var locationIcon = centerIcon;
					if(locationKey == config.mainLocationKey  && config.mainIconSrc){
						zIndex = 999;
						locationIcon = centerMainIcon;
					}
					markers[locationKey] = new google.maps.Marker({
					      position: new google.maps.LatLng(visibleLocationList[locationKey].lat,visibleLocationList[locationKey].lng), 
					      map: map, 
					      title: visibleLocationList[locationKey].htmlFullName,
					      icon: locationIcon,
					      shape: { coord: [0, 0, locationIcon.size.width],type: 'circle'},
					      zIndex: zIndex
					});
					
					if(config.fitToMarkers){
						markerBounds.extend(markers[locationKey].position);
					}
					
					createMarkerEvents(locationKey);
				}
				
				if(config.fitToMarkers && !markerBounds.isEmpty()){
					map.fitBounds(markerBounds);
					limitZoomMinMax(4,10);					
				}
		
				/* Initiate Search Input */
				searchInputSelectFunction = function(event, ui) {
					if(!markers[ui.item.id] && !config.mainLocationKey){
						$.getJSON(config.baseUrl + '/ajax/destinations/' + ui.item.id + '.json', function(destinationsData) {
							config.routeList = $.extend(destinationsData["routes"], config.routeList);
							drawMapOriginSelected(ui.item.id, true);
						});
					}
					else{
						drawMapOriginSelected(ui.item.id, true);							
					}
					ga('send', 'event', 'InternalAction', 'MapSearch', ui.item.value, 1);
				};
				
				var mapSearchInput = controlMapSearch.find("#bo-map-search-input");
				
				mapSearchInput.boLocationSearch({
					lang: config.lang,
					locationList: config.locationList,
					locationTypeFilter: ['city'],
					selectFunction: searchInputSelectFunction
				});				
				
				if(config.mainLocationKey && config.mainSelected){
					drawMapOriginSelected(config.mainLocationKey, false);					
				}
			}
        	
        	function limitZoomMinMax(minLevel,maxLevel) {
        		map.initialZoom = true;
				zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function (event) {
					if (map.initialZoom == true) {
						zoomLevel = this.getZoom();
						if(zoomLevel < minLevel){
							this.setZoom(minLevel);
						} else if(zoomLevel > maxLevel){
							this.setZoom(maxLevel);
						}
						map.initialZoom = false;
					}
					google.maps.event.removeListener(zoomChangeBoundsListener);
				});
            }
        }
    });
})(jQuery);