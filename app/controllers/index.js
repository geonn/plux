var args = {};

/***New DB field add here***/
var users = Alloy.createCollection('users'); 
users.addColumn("isver", "TEXT");
users.addColumn("verno", "TEXT");

var u_id = Ti.App.Properties.getString('u_id') || "";
var win = Alloy.createController("home").getView();

API.loadCategoryList(); 
API.loadNewsFeed();
API.loadLeaflet();
win.open(); 
if(u_id == ""){
	nav.navigateWithArgs("login", {});  
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