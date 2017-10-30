var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
hd.construct($);

init();

function init(){
	filterList({category: "all"});
}

function resetGraph(){
	var childs = $.graphScrollView.getChildren();
	for (var i=0; i < childs.length; i++) {
		childs[i].setHeight("0");
	};
}

function filterList(e){
	
	if(e.category == "measurement"){
		resetGraph();
		$.bmiView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);

		$.bmiView.setTop(10);
		$.cholestrolView.setTop(10);
		
		$.bmiView.show();
		$.cholestrolView.show();
	}else if(e.category == "vitals"){
		resetGraph();
		$.heartRateView.setHeight(Ti.UI.SIZE);
		$.bodyTemperatureView.setHeight(Ti.UI.SIZE);
		$.bloodPressureView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);
		$.glucoseView.setHeight(Ti.UI.SIZE);
		
		$.heartRateView.setTop(10);
		$.bodyTemperatureView.setTop(10);
		$.bloodPressureView.setTop(10);
		$.cholestrolView.setTop(10);
		$.glucoseView.setTop(10);
		
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.bloodPressureView.show();
		$.cholestrolView.show();
		$.glucoseView.show();
	}else{
		for(var a = 0; a < $.graphScrollView.children.length; a++){
			var activityIndicator = createIndicator();
			$.graphScrollView.children[a].children[0].add(activityIndicator);
			activityIndicator.show();
		}
		$.bmiView.setHeight(Ti.UI.SIZE);
		
		$.bmiView.setTop(10);
		$.bmiView.show();
	}
	
}

function getDataByType(e){
	var gType = e.source.gType;
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("14", u_id, gType);
	var last_updated ="";
	
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}


	API.callByPost({url: "getHealthDataByUser", params:{u_id: u_id, type:gType, last_updated: last_updated}}, function(responseText)	{
		var model2 = Alloy.createCollection("health");
		var res2 = JSON.parse(responseText);
		 
		var arr2 = res2.data || null;
		model2.saveArray(arr2);
		checker.updateModule(14,"getHealthDataByUser", res2.last_updated, u_id, gType);
		hd.loadInfo(gType,'','1',e.source.parent.children[2].children[1]);
		e.source.children[0].hide();
	});
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

  
$.myhealth.addEventListener("close", function(e){
	
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.myhealth); 
	});
}