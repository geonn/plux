var args = arguments[0] || {};
var mod = args.mod;

var module = require("hra/"+mod);
module.construct($);
$.hraDetailsWin.title = module.title;
$.description.add(module.description());
$.input_box.add(module.input_box());

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		COMMON.closeWindow($.hraDetailsWin); 
	}); 
}