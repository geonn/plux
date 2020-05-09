// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

/*
 remove asp_password for security issues.
 * */
Ti.App.Properties.removeProperty('asp_password');
Ti.App.Properties.removeProperty('is_ver');
Alloy.Globals.push_redirect = true;
Alloy.Globals.common = require('common');
Alloy.Globals.API = require('api');
Alloy.Globals.nav = require('navigation');
Alloy.Globals.socket = require('socket');
Alloy.Globals._ = require("alloy/underscore")._;
//Alloy.Globals.Map =  (OS_IOS || OS_ANDROID) ? require('ti.map') : Ti.Map;
//var DBVersionControl = require('DBVersionControl');
//DBVersionControl.checkAndUpdate();
Alloy.Globals.Map = require('ti.map');

var win;
var target_page = "";
Ti.App.addEventListener("pause", function(e){
    Alloy.Globals.push_redirect = true;
    Alloy.Globals.socket.disconnect();
    //Ti.App.fireEvent("disconnect");
    if(OS_IOS){
	   win = Ti.UI.createWindow({backgroundColor: "red"});
	   win.open();
	}
});

Ti.App.addEventListener("resumed", function(e){
	if(typeof win != null && win != null){
		win.close();
	}
	setTimeout(function(){
        Alloy.Globals.push_redirect = false;
    }, 2000);
    var time_offset = parseInt(Ti.App.Properties.getString('time_offset'))+0 || 0;
    //Ti.App.fireEvent("connect", {u_id: Ti.App.Properties.getString('u_id') || 0, time_offset: time_offset});
});


Alloy.Globals.mocx = require("mocx");
Alloy.Globals.mocx.createCollection("chats", []);
Alloy.Globals.mocx.createCollection("points", []);
