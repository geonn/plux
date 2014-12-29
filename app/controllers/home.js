var args = arguments[0] || {};
var expandmode = false;
Alloy.Globals.navMenu = $.navMenu;

$.scrollboard.addEventListener("scroll", function(e){
	var o = e.source.contentOffset;
	
	if(o.y <= 0){
		$.scrollboard.animate({
	        top: "45%",
	        duration: 500
	    }, function(){expandmode = false;});
	}else if(expandmode){
		return ;
	}else{
		$.scrollboard.animate({
			top: 0,
	        height: '100%',
	        duration: 500
	    }, function(){expandmode = true;});
	}
});

function navWindow(e){
	var target = e.source.mod;
	var nav = require('navigation');
	
	nav.navigationWindow(target);
}
