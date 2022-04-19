/*
 * 
 * BuscaOnibus LocationSearch 1.0 - Location Search Jquery Plugin for BuscaOnibus!
 * Version 1.0
 * @requires jQuery v1.3.2
 * 
 * 2011 - BuscaOnibus | All right reserved
 * 
 */

/* Plugin boLocationSearch definition */

(function($) {
    $.fn.extend({
    	boLocationSearch: function(options) {
        	var defaults = {    
        			lang: 'pt',
        			locationList: null,
        			locationTypeFilter: null, //['city','busTerminal']
        			selectFunction: null
        	};
     	
        	var config = $.extend(defaults, options);
 
		    var inputData = new Array();
			for(var key in config.locationList)
			{
				if (!config.locationTypeFilter || !config.locationList[key].type || config.locationTypeFilter.indexOf(config.locationList[key].type) >-1){
					var inputLocation = new Object();
					//if filtered by cityTerminal use terminal link instead of location link
					if(config.locationTypeFilter && config.locationTypeFilter.indexOf('busTerminal') >-1 && config.locationList[key].type == 'busTerminal'){
						inputLocation.id = config.locationList[key].terminalLink;
					}
					else{
						inputLocation.id = config.locationList[key].linkName;						
					}
					inputLocation.value = config.locationList[key].htmlFullName;					
					inputData.push(inputLocation);
				}
			}	
					    				
			var accentMap = {
					"ã": "a",
					"á": "a",
					"â": "a",
					"é": "e",
					"è": "e",
					"ê": "e",
					"í": "i",
					"õ": "o",
					"ó": "o",
					"ô": "o",
					"ú": "u",
					"ç": "c"
				};

			var normalize = function( term ) {
				var ret = "";
				for ( var i = 0; i < term.length; i++ ) {
					ret += accentMap[ term.charAt(i).toLowerCase() ] || term.charAt(i);
				}
				return ret;
			};
			
			this.autocomplete({ 
				source: function( request, response ) {
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
					response( $.grep( inputData, function( value ) {
						value = value.label || value.value || value;
						return matcher.test( value ) || matcher.test( normalize( value ) );
					}) );
				},
				select: config.selectFunction,
				minLength: 2
			});			    				
		    				
			this.click(function() {
				//select the text in the input box
				$(this).select();
			});        	
        
        }
    });
})(jQuery);