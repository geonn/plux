var args = arguments[0] || {}; 
var u_id = Ti.App.Properties.getString('u_id'); 
var loading = Alloy.createController("loading");
console.log('a');
function render_profile(arr){
	console.log('e');
	$.profileData.add(Alloy.createController("_plux_profile_view", {records: arr}).getView());
}

function refresh(){
	loading.start();
	console.log('a');
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	
	API.callByPost({url: "getPersonalInfoRecords", params:{u_id: u_id}}, function(responseText){
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		console.log('d');
		render_profile(arr);
		loading.finish();
	});
}

function init(){
	$.plux_profile.add(loading.getView());
	console.log('a');
	refresh();
}

init();

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.plux_profile); 
	}); 
}