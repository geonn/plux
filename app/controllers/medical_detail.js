var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id');

function init(){
	$.win.add(loading.getView());
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

$.win.addEventListener("close", function(){
	$.destroy();
	console.log("window close");
});
