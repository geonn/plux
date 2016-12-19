var args = arguments[0] || {};
var usersModel = Alloy.createCollection('users');   
common.construct($);
loadPage();

function loadPage(){
	var userInfo = usersModel.getPrincipleData(); 
	if(userInfo.isver == "true" || userInfo.isver > 0){ 
		$.verifyContainer.hide();
		$.profileContainer.show();
		console.log('a');
	} else{
		console.log('a');
		$.description.text= "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
		$.verifyContainer.show();
		$.profileContainer.hide();
	}
	Ti.App.removeEventListener('loadPage',loadPage);
}

var data = usersModel.getUserByEmpNo();
for (var i=0; i < data.length; i++) {
	console.log(i);
  	var profile_view = Alloy.createController("_profile_view", {profile_data: data[i]}).getView(); 	
  	$.main.addView(profile_view);
};

function checkStatus(){
	var asp_email = Ti.App.Properties.getString('asp_email');
	var asp_password = Ti.App.Properties.getString('asp_password');	 
	if(asp_email){
		Ti.App.addEventListener('loadPage', loadPage);
		common.showLoading();
		API.doLogin(asp_email, asp_password, $, "refresh", loadPage );
	}
} 

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

$.asp_profile.addEventListener("close", function(){
	Ti.App.removeEventListener('loadPage', loadPage);
	$.destroy();
	console.log("window close");
});