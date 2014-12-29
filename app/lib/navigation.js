

exports.navigationWindow = function(target){
	var win = Alloy.createController(target).getView(); 
	Alloy.Globals.navMenu.openWindow(win,{animated:true});
};
