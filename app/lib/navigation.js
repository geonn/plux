
exports.navigationWindow = function(target, checkAuth, callback, param){
	if(checkAuth){
		var auth = require("login");
		if(!auth.checkLogin()){
			var nav = require("navigation");
			console.log('login page');
			nav.navigationWindow("login", 0, target);
		}else if(target =="m_eCard"){
			var win = Alloy.createController(target, {target: callback}).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}else{
			var win = Alloy.createController(target).getView(); 
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}
		return;
	}
	if(target == "login"){
		var win = Alloy.createController(target, {target: callback}).getView(); 
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}else if(typeof param !== undefined){
		console.log(typeof param);
		var win = Alloy.createController(target, param).getView(); 
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}else{
		var win = Alloy.createController(target).getView(); 
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}
};

exports.navigateWithArgs = function(target, args){
	var win = Alloy.createController(target, args).getView(); 
	Alloy.Globals.navMenu.openWindow(win,{animated:true});
};

exports.closeWindow = function(win){
	Alloy.Globals.navMenu.closeWindow(win);
};
