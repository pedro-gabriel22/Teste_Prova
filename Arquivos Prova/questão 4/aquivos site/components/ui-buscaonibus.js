/* Utility functions */

String.format = function( text )
{
    //check if there are at least two arguments in the arguments list
    if ( arguments.length < 2 )
    {
        //if there are not 2 or more arguments there's nothing to replace
        //just return the original text
        return text;
    }
    //decrement to move to the second argument in the array
    var tokenCount = arguments.length - 2;
    for( var token = 0; token <= tokenCount; token++ )
    {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );
    }
    return text;
};

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function boExternalClick(thisElement){
	var $thisElement = $(thisElement);
	if($thisElement.is("a")){
		var linkUrl = $thisElement.attr("href");

		//Ignore internal links
		if(!linkUrl.startsWith('http') || linkUrl.startsWith('http://www.buscaonibus.com.br') || linkUrl.startsWith(location.origin)){
			return true;
		}

    	//External links to open in new tab
    	$thisElement.attr("target","_blank");
	}    	

    //Track click in Google Analytics
	var eventCategory = "ExternalLink";
	var eventAction = "Other";
	var eventValue = $thisElement.attr("href"); //default value
	if($thisElement.parents(".bo-time-detail-book-skyscanner").length > 0)
	{
		eventAction = "SkyscannerBooking";
		eventValue = $thisElement.parent().find(".bo-time-detail-partner a").html();
	}
	else if($thisElement.parents(".bo-results").length > 0 || $thisElement.parents("#bo-bus-company-info-message").length > 0)
	{
		eventAction = "CompanyTimetable";
	}
	else if($thisElement.parents(".bo-bus-company").length > 0 || $thisElement.parents(".bo-bus-companies .bo-box-link-list").length > 0)
	{
		eventAction = "Company";
	}
	else if($thisElement.parents(".bo-twitter").length > 0)
	{
		eventAction = "Twitter";
	}
	else if($thisElement.parents("#bo-upsell-dialog").length > 0)
	{
		eventAction = "Upsell";
	}
    ga('send', 'event', eventCategory, eventAction, eventValue);
}

$(document).ready(function() {

    var $root = $('html, body');
	var language = $("#language").val();
	var locale = new Object();

	locale.format = function( text )
	{
	    //check if there are two arguments in the arguments list
	    if ( arguments.length <= 1 )
	    {
	        //if there are not 2 or more arguments there is nothing to replace
	        //just return the original text
	        return text;
	    }
	    //decrement to move to the second argument in the array
	    var tokenCount = arguments.length - 2;
	    for( var token = 0; token <= tokenCount; token++ )
	    {
	        //iterate through the tokens and replace their placeholders from the original text in order
	        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );
	    }
	    return text;
	};
	
	if(language == "pt")
	{
		locale.searchPath = "/horario";
		locale.searchButton = "Pesquisar";
		locale.searchValidationTitle = "Campos de pesquisa incompletos"
		locale.searchValidationOrigin = "Por favor digite a <strong>Origem</strong> da sua viagem.";
		locale.searchValidationDestination = "Por favor digite o <strong>Destino</strong> da sua viagem.";
		locale.searchValidationDate = "Por favor digite a <strong>Data</strong> da sua viagem.";
		locale.timetableBusStationDetailsTitle = "Rodoviária de {0}";
		
		locale.infoTitleCssDict = {
    		'acessibilidade':		'bo-info-acessibilidade',
    		'achados e perdidos':	'bo-info-achados-perdidos',
    		'aeroporto':			'bo-info-aeroporto',
    		'caixas eletrônicos':	'bo-info-caixa-eletronico',
    		'chegando':				'bo-info-chegando-em',
    		'estacionamento':		'bo-info-estacionamento',
    		'guarda volumes':		'bo-info-guarda-volumes',
    		'lojas':				'bo-info-lojas',
    		'metrô':				'bo-info-metro',
    		'mobilidade urbana':	'bo-info-mobilidade-urbana',
    		'onde comer':			'bo-info-onde-comer',
    		'onde ficar':			'bo-info-onde-ficar',
    		'onde ir':				'bo-info-onde-ir',
    		'ônibus urbano':		'bo-info-onibus-urbano',
    		'sanitários':			'bo-info-sanitarios',
    		'táxi':					'bo-info-taxi'    		
    	};

		$.fn.datetimepicker.dates['pt'] = {
				days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
				daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
				daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
				months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
				monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
				today: "Hoje"
			};
	}
	if(language == "en")
	{
		locale.searchPath = "/en/timetable";
		locale.searchButton = "Search";
		locale.searchValidationTitle = "Search fields missing"
		locale.searchValidationOrigin = "Please provide the <strong>Origin</strong> of your trip.";
		locale.searchValidationDestination = "Please provide the <strong>Destination</strong> of your trip.";
		locale.searchValidationDate = "Please provide the <strong>Date</strong> of your trip.";
		locale.timetableBusStationDetailsTitle = "{0} bus station";
		
		locale.infoTitleCssDict = {
	    		'accessibility':		'bo-info-acessibilidade',
	    		'lost-property office':	'bo-info-achados-perdidos',
	    		'airport':				'bo-info-aeroporto',
	    		'atms':					'bo-info-caixa-eletronico',
	    		'arriving':				'bo-info-chegando-em',
	    		'parking areas':		'bo-info-estacionamento',
	    		'baggage room':			'bo-info-guarda-volumes',
	    		'shops':				'bo-info-lojas',
	    		'subway':				'bo-info-metro',
	    		'urban mobility':		'bo-info-mobilidade-urbana',
	    		'where to eat':			'bo-info-onde-comer',
	    		'where to stay':		'bo-info-onde-ficar',
	    		'where to go':			'bo-info-onde-ir',
	    		'urban bus':			'bo-info-onibus-urbano',
	    		'restrooms':			'bo-info-sanitarios',
	    		'taxi':					'bo-info-taxi'    		
	    	};
		
	}
	
    function validateInputFields()
    {
    	var line = "<div class='alert alert-danger'>{0}</div>\n";
    	var resultMessage = "";
        if($("#bo-search-input-origin").val() == "")
        {
        	resultMessage += locale.format(line,locale.searchValidationOrigin);
        }
        if($("#bo-search-input-destination").val() == "")
        {
        	resultMessage += locale.format(line,locale.searchValidationDestination);
        }
        if($("#bo-search-input-date").val() == "")
        {
        	resultMessage += locale.format(line,locale.searchValidationDate);
        }
        if(resultMessage == "")
        {
            return true;     
        }
        $("#bo-search-validation-message").html(resultMessage);
        $('#bo-search-validation-dialog').modal();
        return false;
    }
	
    // search autocomplete
	searchOriginSelectFunction = function(event, ui) {
		$("#bo-search-input-origin-id").val(ui.item.id);
		ga('send', 'event', 'InternalAction', 'OriginSelected', ui.item.value, 1);
	};
	searchDestinationSelectFunction = function(event, ui) {
		$("#bo-search-input-destination-id").val(ui.item.id);
		ga('send', 'event', 'InternalAction', 'DestinationSelected', ui.item.value, 1);
	};
	
	$("#bo-search-input-origin").boLocationSearch({
		locationList: boLocations["locations"],
		selectFunction: searchOriginSelectFunction
	});
	
	$("#bo-search-input-destination").boLocationSearch({
		locationList: boLocations["locations"],
		selectFunction: searchDestinationSelectFunction
	});
	
    $("#bo-search-return").click(function() {
		var origin = $("#bo-search-input-origin").val();
		var destination = $("#bo-search-input-destination").val();
    	searchReturn();
		ga('send', 'event', 'InternalAction', 'SearchReturn', origin + " - " + destination, 1);
		return false;
    });
    
    function searchReturn() {
		var origin = $("#bo-search-input-origin").val();
		var destination = $("#bo-search-input-destination").val();
		var originId = $("#bo-search-input-origin-id").val();
		var destinationId = $("#bo-search-input-destination-id").val();
		$("#bo-search-input-origin").val(destination);
		$("#bo-search-input-destination").val(origin);
		$("#bo-search-input-origin-id").val(destinationId);
		$("#bo-search-input-destination-id").val(originId);    	
    }

    searchSubmitFunction = function() {
    	if(validateInputFields() == true){
			var originVal = $("#bo-search-input-origin").val()
			var destinationVal = $("#bo-search-input-destination").val()
			var originId = $("#bo-search-input-origin-id").val();
			var destinationId = $("#bo-search-input-destination-id").val();
			
	    	var routeText = originVal + " > " + destinationVal;
	        $("#bo-searching-dialog-title").text(routeText);
	    	$("#bo-searching-dialog").modal();
	        
	        var searchUrl = locale.searchPath;
	        var dateSeparator = "&";
	    	if(boLocations["locations"][originId] && boLocations["locations"][originId].htmlFullName == originVal && boLocations["locations"][destinationId] && boLocations["locations"][destinationId].htmlFullName == destinationVal){
	    		searchUrl += '/'+originId+'/'+destinationId;
	    		dateSeparator = "?";
	    	}
	    	else{
	    		searchUrl += '';
	    		if(boLocations["locations"][originId] && boLocations["locations"][originId].htmlFullName == originVal){
	        		searchUrl += '?o='+encodeURI(originId);
	    		}
	    		else{
	        		searchUrl += '?o='+encodeURI(originVal);        			
	    		}
	    		if(boLocations["locations"][destinationId] && boLocations["locations"][destinationId].htmlFullName == destinationVal){
	        		searchUrl += '&d='+encodeURI(destinationId);
	    		}
	    		else{
	        		searchUrl += '&d='+encodeURI(destinationVal);        			
	    		}
	    	}
	    	searchUrl += dateSeparator + "dt=" + encodeURI($("#bo-search-input-date").val());
	        window.location = searchUrl;
		}
    	return false;
    };

    $("#bo-search-input-submit").click(searchSubmitFunction);
    $("#bo-search-form").submit(searchSubmitFunction);        

    $(".bo-searching").click(function(e) {
    	if (e.metaKey){
    		//ctrl or shift key pressed causing the link to open in another tab/window - Avoid showing the dialog
    		return true;
    	}
    	var routeText = "";
    	var link = $(this).attr("href");
        var link = link.split("?")[0];
        var linkParts = link.split("/");
        if(linkParts.length>3){
        	var originId = linkParts[linkParts.length-2];
        	var destinationId = linkParts[linkParts.length-1];
        	if(boLocations["locations"][originId] && boLocations["locations"][destinationId]){
        		routeText=boLocations["locations"][originId].htmlName+" > "+boLocations["locations"][destinationId].htmlName;        		
        	}
        }
        if(routeText == ""){
        	routeText = $(this).text().replace(" - "," > ");	
        }
        $("#bo-searching-dialog-title").text(routeText);
        $("#bo-searching-dialog").modal();
    });
    
	//External links to open upsell dialog
	$(".bo-results a.bo-external").click(function() {
		$("#bo-upsell-dialog").modal();
	});
	$(".bo-book-box a").click(function() {
		$("#bo-upsell-dialog").modal();
	});
	
	//timetable expand info
	
	$('.bo-timetable .bo-time-line').click(function(e) {
		var expandLine = $(this);
		var expandedElement = expandLine.next().children().children();
		if(expandedElement.is(':visible')){
			expandLine.removeClass('bo-line-expanded')
			expandedElement.slideUp();
		} else{
			expandLine.addClass('bo-line-expanded')
			expandedElement.slideDown();
			var company = expandLine.find(".bo-timetable-company").contents()[0].textContent;
	    	ga('send', 'event', 'InternalAction', 'TimetableInfoExpanded', company);
		}
		return false;
	});
	
	$('.bo-timetable .bo-time-detail-company-info a').click(function(e) {
		 var $modalInfoData = $("#bo-bus-company-info-" + $(this).data("link"));
		 var companyTitle = $(this).html();
		 if($modalInfoData.length == 1){
			 $("#bo-bus-company-info-title").html(companyTitle);
			 $("#bo-bus-company-info-message").html($modalInfoData.clone());
			 //Activate external clicks on modal
			 $("#bo-bus-company-info-message a, #bo-bus-company-info-message .bo-external").click(function() {
			    boExternalClick(this);
			 });
			 //Activate company website external click to open upsell dialog
			$("#bo-bus-company-info-message a.bo-external").click(function() {
				//$('#bo-bus-company-info-dialog').modal('hide');
				$("#bo-upsell-dialog").modal();
			});
			 $("#bo-bus-company-info-dialog").modal();
			 ga('send', 'event', 'InternalAction', 'CompanyInfoModal', companyTitle);
		 }
		 else {
			 ga('send', 'event', 'InternalAction', 'CompanyInfoModalError', companyTitle);
		 }
		 return false;
	});
	
	$('.bo-timetable .bo-time-detail-terminal-info a').click(function(e) {
		 var $modalInfoData = $("#bo-bus-station-info-" + $(this).data("link"));
		 var busStationTitle = $(this).html();
		 busStationTitle = String.format(locale.timetableBusStationDetailsTitle,busStationTitle);
		 if($modalInfoData.length == 1){
			 $("#bo-bus-station-info-title").html(busStationTitle);
			 $("#bo-bus-station-info-message").html($modalInfoData.clone());
			 //Activate external clicks on modal
			 $("#bo-bus-station-info-message a, #bo-bus-station-info-message .bo-external").click(function() {
			    boExternalClick(this);
			 });
			 $("#bo-bus-station-info-dialog").modal();
			 ga('send', 'event', 'InternalAction', 'BusStationInfoModal', busStationTitle);			 
		 }
		 else {
			 ga('send', 'event', 'InternalAction', 'BusStationInfoModalError', busStationTitle);
		 }
		 return false;
	});	
	
	//Booking.com box
	
	$("#bo-hotel-destination").boLocationSearch({
		locationList: boLocations["locations"]
	});
	
	//init checkout date
	
	var checkinDatedmyArray = $('#bo-hotel-checkin').val() != null ? $('#bo-hotel-checkin').val().split('/') : "";
	var checkinDate = null;
	if(checkinDatedmyArray.length == 3){
		checkinDate = new Date(checkinDatedmyArray[2],checkinDatedmyArray[1]-1,checkinDatedmyArray[0]);
		var checkoutDate = new Date(checkinDate);
		checkoutDate.setDate(checkinDate.getDate() + 2);
		$('#bo-hotel-checkout').val(checkoutDate.getDate()+'/'+(checkoutDate.getMonth()+1)+'/'+checkoutDate.getFullYear());
	}
	
	hotelSearchBookingSubmitFunction = function() {
		var checkinDatedmyArray = $('#bo-hotel-checkin').val().split('/');
		var checkoutDatedmyArray = $('#bo-hotel-checkout').val().split('/');
		var checkinDate = null;
		var checkoutDate = null;
		if(checkinDatedmyArray.length == 3){
			checkinDate = new Date(checkinDatedmyArray[2],checkinDatedmyArray[1],checkinDatedmyArray[0]);
		}
		if(checkoutDatedmyArray.length == 3){
			checkoutDate = new Date(checkoutDatedmyArray[2],checkoutDatedmyArray[1],checkoutDatedmyArray[0]);
		}
		if(checkinDate){
			$("#bo-checkin-monthday").val(checkinDate.getDate());
			$("#bo-checkin-year-month").val(checkinDate.getFullYear() + "-" + checkinDate.getMonth());
		}
		if(checkoutDate){
			$("#bo-checkout-monthday").val(checkoutDate.getDate());
			$("#bo-checkout-year-month").val(checkoutDate.getFullYear() + "-" + checkoutDate.getMonth());
		}	
	}
	
	$('#bo-hotel-booking-submit').click(hotelSearchBookingSubmitFunction);
	$('#bo-affiliate-hotel-search-form').submit(hotelSearchBookingSubmitFunction);

	
	// add date picker to all dates
	
	$('.bo-datetimepicker').datetimepicker({
		pickTime: false,
		language: language
    });
	
	/* Track external link events */

    $("a,.bo-external").click(function() {
    	boExternalClick(this);
    });

	/* Track ResultsView */
	var companyRealtimeList = [];
	var resultsCount = 0;
	var resultsFlag = ($(".bo-search-results-error").length > 0);
	
    $("table.bo-timetable tr.bo-time-line").each(function(index) {	
    	var sits = $(this).find(".bo-timetable-sits").contents()[0].textContent;
		var company = $(this).find(".bo-timetable-company").contents()[0].textContent;
		if(!(company in companyRealtimeList))
		{
			companyRealtimeList[company]=0;
	    	if($.trim(sits) != "*")
	    	{
				companyRealtimeList[company]=1;
	    	}
		}
		resultsCount++;
		resultsFlag = true;
  	});
  	
  	if(resultsFlag == true)
  	{
		var route = $("#bo-search-input-origin").val() + "-" + $("#bo-search-input-destination").val();
		ga('send', 'event', 'ResultsView', 'Results Count', route, resultsCount);
		for(company in companyRealtimeList)
		{
			ga('send', 'event', 'ResultsView', 'Company Realtime', company, companyRealtimeList[company]);
		}
  	}
	
    //Open newsletter subscribe screen
	$("#bo-newsletter-upsell-img").click(function() {
		$('#bo-upsell-dialog').modal('hide');
		ga('send', 'event', 'InternalAction', 'Newsletter', 'Open Form Upsell');
		$("#bo-newsletter-dialog").modal();
	});
	
    //Open newsletter subscribe screen
	$("#bo-newsletter-img").click(function() {
		ga('send', 'event', 'InternalAction', 'Newsletter', 'Open Form');
		$("#bo-newsletter-dialog").modal();
	});
	
    $('#bo-newsletter-submit').on('click', function(event) {
        if(event) event.preventDefault();
        submitNewsletterForm($('#bo-newsletter-form'));
      });
    
    function submitNewsletterForm($form) {      
    	$('#bo-newsletter-submit').prop('disabled', true);
    	$('#bo-newsletter-notification-container').html('<img class="bo-waiting-animation" src="/images/waiting_animation.gif" width="220" height="33"/>');
		var inputEmail = $form.find('input[name="email"]').val();
		var inputName = $form.find('input[name="name"]').val();
		
		if (inputEmail == ""){
			userMsg = 'Por favor preencha o seu e-mail e tente de novo.'
			$('#bo-newsletter-notification-container').html('<div class="alert alert-danger" role="alert">' + userMsg + '</div>');
			$('#bo-newsletter-submit').prop('disabled', false);
			ga('send', 'event', 'InternalAction', 'Newsletter', 'Submit Error: ' + 'No e-mail');
			return;
		}

		if (!validateEmail(inputEmail)){
			userMsg = 'Por favor verifique o seu e-mail e tente de novo.'
			$('#bo-newsletter-notification-container').html('<div class="alert alert-danger" role="alert">' + userMsg + '</div>');
			$('#bo-newsletter-submit').prop('disabled', false);
			ga('send', 'event', 'InternalAction', 'Newsletter', 'Submit Error: ' + 'Invalid e-mail ' + inputEmail);
			return;
		}

		var data_array = [
			{name: 'email', value: inputEmail},
			{name: 'nome', value: inputName},
			{name: 'page', value: location.pathname},
			{name: 'identificador', value:'Newsletter Site'},
			{name: 'token_rdstation', value:'94ba55a3c8b8e1283b96519852ec1a1d'}
		];
		
		RdIntegration.post(data_array, function (returnData) {
			if(returnData.status == 200 || returnData.status == 302){
				//Submit success
				userMsg = 'Obrigado! Em breve você receberá novidades no seu e-mail.';
				$('#bo-newsletter-submit').hide();
				$('#bo-newsletter-notification-container').html('<div class="alert alert-success" role="alert">' + userMsg + '</div><button class="btn btn-default btn-large btn-block" data-dismiss="modal">Fechar</button>');  
				ga('send', 'event', 'InternalAction', 'Newsletter', 'Submit Success');
			}
			else{
				//Submit error
				userMsg = 'Por favor verifique o seu e-mail e tente de novo.'
				$('#bo-newsletter-notification-container').html('<div class="alert alert-danger" role="alert">' + userMsg + '</div>');
				$('#bo-newsletter-submit').prop('disabled', false);
				ga('send', 'event', 'InternalAction', 'Newsletter', 'Submit Error: ' + returnData.responseText);
			}
		});
      
    }
    
    $('div.bo-tab-content h4').each(function(index) {	
    	var title = $(this).html().toLowerCase();
    	for(titleKey in locale.infoTitleCssDict){
    		if(title.indexOf(titleKey) > -1){
    			$(this).addClass(locale.infoTitleCssDict[titleKey]);
    		}	
    	}
    });
    
    $('ul.bo-nav-info li a').click(function() {
		tabName = $(this).find('.bo-tab-title').html();
		ga('send', 'event', 'InternalAction', 'InfoTab', tabName);
    });
      
    $('.bo-box-search-small-collapsed .bo-search-colapsed-origin').click(function() {
    	$('.bo-box-search-small-collapsed').slideUp();
    	$('#bo-search-form').slideDown({
    		done:  function() { 
    			$('#bo-search-input-origin').select();
    		}
    	});
    	ga('send', 'event', 'InternalAction', 'SearchExpanded', 'Origin');
    });
    
    $('.bo-box-search-small-collapsed .bo-search-colapsed-destination').click(function() {
    	$('.bo-box-search-small-collapsed').slideUp();
    	$('#bo-search-form').slideDown({
    		done:  function() { 
    			$('#bo-search-input-destination').select();
    		}
    	});
		ga('send', 'event', 'InternalAction', 'SearchExpanded', 'Destination');
    });
    
    $('.bo-box-search-small-collapsed .bo-search-colapsed-date').click(function() {
    	$('.bo-box-search-small-collapsed').slideUp();
    	$('#bo-search-form').slideDown({
    		done:  function() { 
    			$('#bo-search-form .bo-datetimepicker').datetimepicker('show');
    		}
    	});
    	ga('send', 'event', 'InternalAction', 'SearchExpanded', 'Date');
    });
    
    $('.bo-box-search-small-collapsed .bo-search-colapsed-return').click(function() {
    	$('.bo-box-search-small-collapsed').slideUp();
    	$('#bo-search-form').slideDown({
    		done: function() { 
	        	searchReturn();
	        	$('#bo-search-form .bo-datetimepicker').datetimepicker('show');
    		}
    	});
    	ga('send', 'event', 'InternalAction', 'SearchExpanded', 'Return');
    });    

    $('.bo-box-search-small .bo-box-search-small-collapse').click(function() {
    	$('#bo-search-form').slideUp();
    	$('.bo-box-search-small-collapsed').slideDown();
    	ga('send', 'event', 'InternalAction', 'SearchExpanded', 'Close');
    });
    
    //handle url hash on load behaviour
    if(window.location.hash) {
        //handle url hash without anchor target
    	if($(window.location.hash).length == 0){
    		//handle newsletter hash
    	   	if(window.location.hash == '#newsletter') {
        		ga('send', 'event', 'InternalAction', 'Newsletter', 'Open Form #newsletter');
        		$("#bo-newsletter-dialog").modal();    		
        	}
        	else{
        		//TODO: find out if there is any tab to activate
        		//TODO: handle map resize problem
        		/*
        		$elementTab = $('#bo-tab-' + window.location.hash.replace('#',''));
        		if($elementTab.length){
        			$elementTab.tab('show');
        		}
        		*/
        		//find out if there is any element to scroll to
        		$elementToScroll = $(window.location.hash + '-scroll');
        		if($elementToScroll.length){
                    $root.animate({
                        scrollTop: $elementToScroll.offset().top
                    }, 500);    	
        		}
        	}   		
    	}
     }
    
    //TODO: Add hash to url on tab selection
    /*
    $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        window.location.hash = this.hash.replace('bo-tab-content-','');
		if(this.hash.includes('map')){
			//TODO: handle map resize problem
		}
    });    
    */
    
    //handle window resize
    var windowResizeTimer;
    var windowWidth = $(window).width();
    function windowResizer() {
    	newWindowWidth = $(window).width();
    	if(newWindowWidth != windowWidth){
    		windowWidth = newWindowWidth;
    		ga('send', 'event', 'InternalAction', 'WindowResizeWidth', windowWidth.toString());
    	}    	
    }
    $(window).resize(function(){
    	clearTimeout(windowResizeTimer);
    	//Wait 500 miliseconds to avoid multiple calls on resize
    	windowResizeTimer = setTimeout(windowResizer, 500);
    });
    
    //Allow anchor scroll with smooth transition
    $('a.bo-anchor-scroll').click(function() {
        var href = $.attr(this, 'href');
        var hash = this.hash;
        if(hash == ""){
        	$hash = $('body');
        }
        else{
        	$hash = $(hash+'-scroll');        	
        }
        if($hash.length){
            $root.animate({
                scrollTop: $hash.offset().top
            }, 500, function () {
                window.location.hash = hash;
            });
            ga('send', 'pageview', location.pathname + location.search + hash);            
            return false;
        }
        else{
        	return true;
        }
    });
    
    $('div.bo-faq-question').each(function(index) {
    	var $groupHeaderList = $(this).children('h4');
    	$groupHeaderList.each(function(index) {
    		$groupContentList = $(this).nextUntil('h4');
    		$groupContentList.wrapAll('<div class="bo-faq-answer"></div>');
    		$groupContentList.parent().hide();
    	});
    });

    $('div.bo-faq-question h4').click(function() {
    	var $questionDiv = $(this).parent();
    	var $answerDiv = $questionDiv.children('.bo-faq-answer');
    	if($answerDiv.is(':visible')){
    		$answerDiv.slideUp();
    		$questionDiv.removeClass('bo-show');
		} else{
			$answerDiv.slideDown();	
			$questionDiv.addClass('bo-show');
		}
	});

    $('div.bo-career-section .bo-career-section-expand').click(function() {
    	var $careerDiv = $(this).parent();
    	var $contentDiv = $careerDiv.children('div.bo-career-section-content');
    	if($contentDiv.is(':visible')){
    		$contentDiv.slideUp();
    		$careerDiv.removeClass('bo-show');
		} else{
			$contentDiv.slideDown();	
			$careerDiv.addClass('bo-show');
	    	var careerTitle = $careerDiv.children('h3').html();
	    	ga('send', 'event', 'InternalAction', 'CareerInfoExpanded', careerTitle);
		}
    	return false;    	
	});
    
});