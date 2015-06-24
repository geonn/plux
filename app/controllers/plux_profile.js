var args = arguments[0] || {}; 
var usersModel = Alloy.createCollection('users_plux');
var u_id = Ti.App.Properties.getString('u_id'); 
var data = usersModel.getUserById(u_id);
var healthModel = Alloy.createCollection('personalInfo');
data['personal_health'] = healthModel.getOwnerData();
  
$.profileData.add(Alloy.createController("_plux_profile_view", {profile_data: data}).getView());

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.pluxProfileWin); 
	}); 
}