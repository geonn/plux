var args = {};
var win = Alloy.createController("home").getView();
API.loadPanelList();
API.loadCategoryList(); 
API.loadNewsFeed();
API.loadLeaflet();
win.open();
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