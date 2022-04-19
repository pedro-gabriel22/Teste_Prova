/*
 * 
 * BuscaOnibus TerminalMap 1.0 - Terminal Map Jquery Plugin for BuscaOnibus!
 * Version 1.0
 * @requires jQuery v1.3.2
 * @requires Maps API on http://maps.google.com/maps/api/js?sensor=false&region=BR
 * 
 * 2014 - BuscaOnibus | All right reserved
 * 
 */

/* Plugin boTerminalMap definition */

(function($) {
    $.fn.extend({
        boTerminalMap: function(options) {
        	var defaults = {    
    				busTerminalName: null,
    				busTerminalLatLng: null,
    				busTerminalAddress: null,
        			iconSrc: "/site2013/img/icons/map-icon-city.png",
        			lang: 'pt',
        			zoom: 16,
        			baseUrl: '',
        			strokeColor: '#333333'
        	};
     	
        	var config = $.extend(defaults, options);
        	
        	var infoWindow = new google.maps.InfoWindow();

			var iconMarkerImage = null;
			var terminalMarker = null;
			var mapContainer = this[0];

        	var textContent = new Object();
        	if(config.lang == 'pt'){
        		textContent.locationClickInfoHeader = "Endereço:";
        	}
        	else{//lang = en
        		textContent.locationClickInfoHeader = "Address:";
        	}
        	
			
			if(config.iconSrc) {
				var iconImg = new Image();

	   			function iconImgLoaded(){
	   				iconMarkerImage = new google.maps.MarkerImage(config.iconSrc,
						      new google.maps.Size(iconImg.width,iconImg.height),
						      new google.maps.Point(0,0),
						      new google.maps.Point(iconImg.width/2,iconImg.height/2));
	   				loadMap(mapContainer);
	   			}

	   			iconImg.onload = iconImgLoaded
	   			iconImg.src = config.iconSrc;			
			}
			else {
				loadMap(mapContainer);				
			}
			
			function createMarker() {
				terminalMarker = new google.maps.Marker({
				      position: new google.maps.LatLng(config.busTerminalLatLng.lat(),config.busTerminalLatLng.lng()), 
				      map: map, 
				      title: config.busTerminalName,
				      icon: iconMarkerImage,
				      shape: { coord: [0, 0, iconMarkerImage.size.width],type: 'circle'}
				});
				
				google.maps.event.addListener(terminalMarker, "click", function() {
					infoWindow.open(map, terminalMarker);			
	    		});
			}			

			function createInfoWindow() {
				var contentArray = new Array();
				contentArray.push("<div class='bo-destination-map-info'>");    				
				contentArray.push(String.format("<h3>{0}</h3>",config.busTerminalName));
				contentArray.push("<h4>" + textContent.locationClickInfoHeader + "</h4>");
				contentArray.push("<p>");
				contentArray.push(config.busTerminalAddress);
				contentArray.push("</p>");
				contentArray.push("</div>");
				infoWindow.setContent(contentArray.join(""));
			}
			
        	function loadMap(mapDiv) {

				var mapOptions = {
					zoom: config.zoom,
					center: config.busTerminalLatLng,
				    zoomControl: true,
				    mapTypeControl: false,
				    streetViewControl: false,
				    scrollwheel: false,
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				map = new google.maps.Map(mapDiv, mapOptions);	
				
				createInfoWindow();
				createMarker();
			}
        }
    });
})(jQuery);