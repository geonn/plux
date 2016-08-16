var args = arguments[0] || {}; 
var usersModel = Alloy.createCollection('users_plux');
var u_id = Ti.App.Properties.getString('u_id'); 
var data = usersModel.getUserById(u_id);
var loading = Alloy.createController("loading");

function render_profile(){
	$.profileData.add(Alloy.createController("_plux_profile_view", {profile_data: data}).getView());
}

function refresh(){
	loading.start();
	
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(15, u_id);
	var last_updated = isUpdate.updated || "";
	last_update = last_updated;
	
	API.callByPost({url: "getPersonalInfoRecords", params:{u_id: u_id, last_updated: last_update}}, function(responseText){
		var model = Alloy.createCollection("personal_info");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(15, "getPersonalInfoRecords", res.last_updated, u_id);
		
		render_profile();
		loading.finish();
	});
}

function init(){
	$.plux_profile.add(loading.getView());
	refresh();
}

init();

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.plux_profile); 
	}); 
}