var args = arguments[0] || {};
var expandmode = false;

API.loadPanelList();

Alloy.Globals.navMenu = $.navMenu;
$.scrollboard.addEventListener("scroll", function(e){
	var o = e.source.contentOffset;
	
	if(o.y >= 139 && expandmode){
		$.logo.animate({
	        top: -100,
	        duration: 500
	    }, function(){expandmode = false;});
	}else if(o.y < 139 && !expandmode){
		$.logo.animate({
	        top: 10,
	        duration: 500
	    }, function(){expandmode = true;});
	}else if(o.y < 139){
		$.logo.setTop(o.y+10);
		return ;
	}
});

function navWindow(e){
	var target = e.source.mod;
	var nav = require('navigation');
	if(e.source.mod == "m_eCard" || e.source.mod == "m_myClaim"){
		nav.navigationWindow(target, 1);
	}else{
		nav.navigationWindow(target);
	}	
}
