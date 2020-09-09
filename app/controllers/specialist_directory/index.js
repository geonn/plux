// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function init(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 3000);
	
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

// $.win.addEventListener("close", function(){
// 	$.destroy();
// });

function doClick(e) {
	var win = Alloy.createController("specialist_directory/result").getView();
	win.open();
}

function clickState(e){
	$.pState.setSelectedRow(null, null);
}