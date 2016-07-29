var args = arguments[0] || {};
var usersModel = Alloy.createCollection('users');   
common.construct($); 
loadPage();

function loadPage(){
	var userInfo = usersModel.getPrincipleData();  
	if(userInfo.isver == "true"){ 
		$.verifyContainer.hide();
		$.profileContainer.show();
		
	} else{
		$.description.text= "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
		$.verifyContainer.show();
		$.profileContainer.hide();
	}
	Ti.App.removeEventListener('loadPage',loadPage);
	 
}


var data = usersModel.getUserByEmpNo();
var healthModel = Alloy.createCollection('personalInfo');
var personal_health_data = healthModel.getOwnerData();
//var tmp_data = '[{"memno":"AGIL00005","icno":"AGIL00005","name":"KHAIRIL AZMY BIN MOHD AMINUDDIN","relation":"PRINCIPLE","allergy":"Peanut Allergy, Skin","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""},{"memno":"AGIL00005W","icno":"","name":"ZETI AZRI ZAMBAHARI","relation":"WIFE","allergy":"","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""},{"memno":"AGIL00005C1","icno":"","name":"ELEESYA SOFEA","relation":"CHILD","allergy":"","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""},{"memno":"AGIL00005C2","icno":"","name":"MUHAMMAD IMRAN","relation":"CHILD","allergy":"Peanut Allergy, Skin","empno":"00005","corpcode":"C001","corpname":"COMPANY DEMO (M) SDN BHD","costcenter":"","dept":""}]';

data[0]['personal_health'] = personal_health_data;
for (var i=0; i < data.length; i++) {
  	var profile_view = Alloy.createController("_profile_view", {profile_data: data[i]}).getView(); 	
  	$.main.addView(profile_view);
};

function checkStatus(){
	var asp_email = Ti.App.Properties.getString('asp_email');
	var asp_password = Ti.App.Properties.getString('asp_password');	 
	if(asp_email){
		Ti.App.addEventListener('loadPage', loadPage);
		common.showLoading();
		API.doLogin(asp_email, asp_password, $, "refresh" );
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

$.asp_profile.addEventListener("close", function(){
	Ti.App.removeEventListener('loadPage', loadPage);
	$.destroy();
	console.log("window close");
});