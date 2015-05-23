
exports.navigationWindow = function(target, checkAuth, callback, param){
	 
	if(checkAuth == 1){
		var auth = require("login");
		if(!auth.checkLogin()){ 
			var win = Alloy.createController("asp/login", {target: target}).getView(); 
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}else if(target =="m_eCard"){
			 
			var win = Alloy.createController(target).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}else{
			 
			var win = Alloy.createController(target).getView(); 
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}
		return;
	}else{
		if(target =="m_eCard"){
			console.log(target+" my card no auth");
			var win = Alloy.createController(target).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}else if(typeof param !== undefined && param !== null){
			console.log(target+" my card no auth with param");
			var win = Alloy.createController(target, param).getView();
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}else{
			console.log(target+"no auth");
			var win = Alloy.createController(target).getView(); 
			Alloy.Globals.navMenu.openWindow(win,{animated:true});
		}
	}
};

exports.navigationWebview = function(webview, title){
	var win = Titanium.UI.createWindow({title: title});
    win.add(webview);
	Alloy.Globals.navMenu.openWindow(win,{animated:true});
};

exports.navigateWithArgs = function(target, args){
	var win = Alloy.createController(target, args).getView(); 
	Alloy.Globals.navMenu.openWindow(win,{animated:true});
};

exports.closeWindow = function(win){
	Alloy.Globals.navMenu.closeWindow(win);
};
