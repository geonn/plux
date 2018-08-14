function navigationWindow (target, checkAuth, callback, param){
	console.log(target+" nav to ");
	if(checkAuth == 1){
		var isver = Ti.App.Properties.getString('isver');
		console.log(isver+" isver no");
		
		if(isver == "true" || isver > 0){
			
		}else{
			var win = Alloy.createController("asp/_email_verify", {callback: function(e){
			     console.log("ready to nav to new win");
			     navigationWindow (target, checkAuth, callback, param);
			    } 
			}).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			return;
		}
		
		var memno = Ti.App.Properties.getString('memno') || ""; 
		if(memno == ""){ 
			var win = Alloy.createController("asp/login", {target: target}).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			
		}else if(target =="m_eCard"){
			 
			var win = Alloy.createController(target).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
		    if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			
		}else{
			console.log("auth checked going to "+target);
			var win = Alloy.createController(target).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
			 
		}
		return;
	}else{
		if(target =="m_eCard"){
			 
			var win = Alloy.createController(target).getView(); 
			win.orientationModes = [Titanium.UI.PORTRAIT,
		    Titanium.UI.LANDSCAPE_LEFT,
		    Titanium.UI.LANDSCAPE_RIGHT,];
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
		}else if(typeof param !== undefined && param !== null){
			console.log("here pls"); 
			var win = Alloy.createController(target, param).getView();
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
		}else{ 
			console.log("no!!");
			var win = Alloy.createController(target).getView(); 
			if(Ti.Platform.osname == "android"){ 
				win.open(); 
			}else{
				Alloy.Globals.navMenu.openWindow(win,{animated:true});
			}
		}
	}
};

function navigationWebview(webview, title){
	var win = Titanium.UI.createWindow({title: title});
    win.add(webview);
    if(Ti.Platform.osname == "android"){ 
		win.open(); 
	}else{
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}
	 
};

function navigateWithArgs(target, args){
	var win = Alloy.createController(target, args).getView(); 
	 
	if(Ti.Platform.osname == "android"){
		win.open(); 
	}else{
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}
}

function closeWindow(win){
	if(Ti.Platform.osname == "android"){ 
		win.close(); 
	}else{
		if(Alloy.Globals.navMenu != null){
			Alloy.Globals.navMenu.closeWindow(win);
		}else{
			win.close();
		}
	}
};

//var navigateWithArgs = _.debounce(nagivate_args, 1000, true);
exports.navigationWindow = _.debounce(navigationWindow, 1000, true);
exports.navigationWebview = _.debounce(navigationWebview, 1000, true);
exports.navigateWithArgs = _.debounce(navigateWithArgs, 1000, true);
exports.closeWindow = _.debounce(closeWindow, 1000, true);

