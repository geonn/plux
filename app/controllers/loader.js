var args = arguments[0] || {};

/**
 * function to start the loading animation
 */
$.start = function() {
	//$.overlay.opacity = 0;
	$.overlay.animate({
		opacity: 0.7,
		duration: 250
	});
};

/*
 * exposed function to finish the loading animation. Animates the rocket off the screen.
 */
$.finish = function(_callback) {
	/*$.rocketFlight.opacity = 0.1;
	
	$.rocketFlight.start();
	
	$.rocketFlight.animate({
		opacity: 1,
		duration: 500
	});
	*/
		
		/*$.rocketFlight.animate({
			top: -130,
			duration: 750,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN
		});*/
		
		$.overlay.animate({
			opacity: 0,
			duration: 750
		}, function() {
			_callback && _callback();
		});
};

//load API loadAPIBySequence
//API.bannerListing();
API.loadAPIBySequence();

Ti.App.addEventListener('app:update_loading_text', update_loading_text);

function update_loading_text(e){
	$.loading_text.text = e.text;
}

$.rocket.addEventListener("close", function(){
	Ti.App.removeEventListener('app:update_loading_text', update_loading_text);
	$.destroy();
});

