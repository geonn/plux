var args = arguments[0] || {}; 
var u_id = Ti.App.Properties.getString('u_id'); 
var loading = Alloy.createController("loading");
function render_profile(arr){
	$.profileData.add(Alloy.createController("_plux_profile_view", {records: arr}).getView());
}

function refresh(){
	loading.start();
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	
	Alloy.Globals.API.callByPost({url: "getPersonalInfoRecords", params:{u_id: u_id}}, function(responseText){
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		render_profile(arr);
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
		Alloy.Globals.nav.closeWindow($.plux_profile); 
	}); 
}