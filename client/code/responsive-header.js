$( document ).ready(function() {

	$('.icon-nav').on('click', '.fa-bars', function() {
		var nav = $('#responsiveNav'); 
		if ($(nav).hasClass('nav')) {
		$(nav).toggleClass('nav responsive')
	    } else {
    		$(nav).toggleClass('responsive nav')
	    }
	});


	for (var i = 0; i < document.links.length; i++) {
	    if (document.links[i].href == document.URL) {
	        document.links[i].className = 'active-nav';
	    }
	}	

});

