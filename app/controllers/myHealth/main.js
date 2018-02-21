var args = arguments[0] || {};
var category = args.category || "";

init();

function init(){
	refresh();
}

function refresh(){
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("14", u_id);
	var last_updated ="";
	
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}

	API.callByPost({url: "getHealthDataByUser", params:{u_id: u_id, last_updated: last_updated}}, function(responseText)	{
		var model2 = Alloy.createCollection("health");
		var res2 = JSON.parse(responseText);
		console.log(res.data); 
		var arr2 = res2.data || null;
		model2.saveArray(arr2);
		checker.updateModule(14,"getHealthDataByUser", res2.last_updated, u_id);
		render_graph();
	});
}

function render_graph(){
	var model2 = Alloy.createCollection("health");
	var data = model2.getData();
	
}

function navTo(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: e.source.gType});
}

$.moreHealth.addEventListener('click', function(e){
	if(Ti.Platform.osname == "android"){
		var dialog = Ti.UI.createOptionDialog({
		  cancel: 2,
		  options: ['Body Measurement', 'Vitals', 'Cancel'],
		  title: 'More'
		});
		
		dialog.show();
		
		dialog.addEventListener("click", function(e){
			if(e.index == 0){
				filterList({category: "measurement"});
			}else if(e.index == 1){
				filterList({category: "vitals"});
			}
		});
	}else{
		var page = Alloy.createController('myHealth/_menu').getView();
		page.open();
		page.animate({
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
			opacity: 1,
			duration: 200
		});
	}
	
});

  
$.win.addEventListener("close", function(e){
	
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}