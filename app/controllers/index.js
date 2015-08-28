var args = {};
var u_id = Ti.App.Properties.getString('u_id') || "";

API.loadCategoryList(); 
API.loadNewsFeed();
API.loadLeaflet();
API.loadClinicList();

var win = Alloy.createController("home").getView();
win.open(); 
if(u_id == ""){ 
	nav.navigateWithArgs("login", {});  
} 

if (Ti.Platform.osname == 'android') {
	var AppVersionControl = require('AppVersionControl');
	AppVersionControl.checkAndUpdate();
}

/*
$.root.open({fullscreen:true});

$.link_visitor.addEventListener('click', function(e){
	var win = Alloy.createController("home").getView(); 
	win.open();
});

$.link_member.addEventListener('click', function(e){
	var win = Alloy.createController("login").getView(); 
	win.open();
});


*/