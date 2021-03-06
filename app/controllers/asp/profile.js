var args = arguments[0] || {};  
Alloy.Globals.common.construct($);
loadPage();
function loadPage(){
	var isver = Ti.App.Properties.getString('isver');
	var corpcode = Ti.App.Properties.getString('corpcode');
	var memno = Ti.App.Properties.getString('memno');
	var empno = Ti.App.Properties.getString('empno');
	if(isver == "true" || isver > 0){ 
		$.profileContainer.show();
	} 
	Ti.App.removeEventListener('loadPage',loadPage);
}
var data = JSON.parse(Ti.App.Properties.getString('dependent'));
var profile_view = Alloy.createController("_profile_view", {profile_data: data}).getView();  
$.main.addView(profile_view);

function changePassword(){
	var nav = require('navigation');
	Alloy.Globals.nav.navigationWindow("asp/changePassword", 0);
} 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		Alloy.Globals.nav.closeWindow($.asp_profile); 
	}); 
}

$.moreBtn.addEventListener('click', function(e){
	var dialog = Ti.UI.createOptionDialog({
	  cancel: 1,
	  options: ['Change Password', 'Cancel'],
	  title: 'More'
	});
	
	dialog.show();
	
	dialog.addEventListener("click", function(e){
		if(e.index == 0){
			changePassword();
			//Alloy.Globals.API.loadCategory({types: "popular"});
		}
	});
});

$.asp_profile.addEventListener("close", function(){
	Ti.App.removeEventListener('loadPage', loadPage);
	$.destroy();
});