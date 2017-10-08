var args = arguments[0] || {};  
common.construct($);
loadPage();
function loadPage(){
	var isver = Ti.App.Properties.getString('isver');
	var corpcode = Ti.App.Properties.getString('corpcode');
	var memno = Ti.App.Properties.getString('memno');
	var empno = Ti.App.Properties.getString('empno');
	if(isver == "true" || isver > 0){ 
		$.verifyContainer.hide();
		$.profileContainer.show();
	} else{
		$.description.text= "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
		$.verifyContainer.show();
		$.profileContainer.hide();
	}
	Ti.App.removeEventListener('loadPage',loadPage);
}
var data = JSON.parse(Ti.App.Properties.getString('dependent'));
for (var i=0; i < data.length; i++) {
	console.log(i);
  	var profile_view = Alloy.createController("_profile_view", {profile_data: data[i]}).getView(); 	
  	$.main.addView(profile_view);
};

function changePassword(){
	var nav = require('navigation');
	nav.navigationWindow("asp/changePassword", 0);
} 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		console.log('close!!');
		nav.closeWindow($.asp_profile); 
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
			//API.loadCategory({types: "popular"});
		}
	});
});

function checkStatus(){
	var asp_email = Ti.App.Properties.getString('asp_email');
	if(typeof asp_email != "undefined" && asp_email != ""){
		//Ti.App.addEventListener('loadPage', loadPage);
		loading.start();
		loadPage();
		//API.doLogin(asp_email, asp_password, $, "refresh", loadPage);
	}else{
		common.createAlert("Error", "Please login your ASP account", function(e){$.win.close();});
	}
}

$.asp_profile.addEventListener("close", function(){
	Ti.App.removeEventListener('loadPage', loadPage);
	$.destroy();
	console.log("window close");
});