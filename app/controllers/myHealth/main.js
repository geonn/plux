var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
hd.construct($);

if(Ti.Platform.osname != "android"){
	hd.stepsMotion();
}

function resetGraph(){
	$.bmiView.setHeight("0");
	$.bloodPressureView.setHeight("0");
	$.heartRateView.setHeight("0");
	$.bodyTemperatureView.setHeight("0");
//	$.heightView.setHeight("0");
//	$.weightView.setHeight("0");
	$.cholestrolView.setHeight("0");
	$.glucoseView.setHeight("0");
	$.bmiView.setTop("0");
	$.bloodPressureView.setTop("0");
	$.heartRateView.setTop("0");
	$.bodyTemperatureView.setTop("0");
//	$.heightView.setTop("0");
//	$.weightView.setTop("0");
	$.cholestrolView.setTop("0");
}

function filterList(e){
	
	if(e.category == "measurement"){
		resetGraph();
		$.bmiView.setHeight(Ti.UI.SIZE);
//		$.heightView.setHeight(Ti.UI.SIZE);
//		$.weightView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);

		$.bmiView.setTop(10);
//		$.heightView.setTop(10);
//		$.weightView.setTop(10);
		$.cholestrolView.setTop(10);
		
		$.bmiView.show();
//		$.heightView.show();
//		$.weightView.show(); 
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
		/**if(Ti.Platform.osname != "android"){
			$.stepsView.setHeight(Ti.UI.SIZE);
			$.stepsView.setTop(10);
			$.stepsView.show();
		}**/
		$.bmiView.setHeight(Ti.UI.SIZE);
//		$.heightView.setHeight(Ti.UI.SIZE);
//		$.weightView.setHeight(Ti.UI.SIZE);
		$.heartRateView.setHeight(Ti.UI.SIZE);
		$.bodyTemperatureView.setHeight(Ti.UI.SIZE);
		$.bloodPressureView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);
		$.glucoseView.setHeight(Ti.UI.SIZE);
		
		$.bmiView.setTop(10);
//		$.heightView.setTop(10);
//		$.weightView.setTop(10);
		$.heartRateView.setTop(10);
		$.bodyTemperatureView.setTop(10);
		$.bloodPressureView.setTop(10);
		$.cholestrolView.setTop(10);
		$.glucoseView.setTop(10);
		
//		$.weightView.show(); 
//		$.heightView.show(); 
		$.bmiView.show();
		$.bloodPressureView.show();
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.cholestrolView.show();
		$.glucoseView.show();
	}
	
}

Ti.App.addEventListener('filterList', filterList);
Ti.App.addEventListener("loadLatest", loadLatest);

function loadLatest(e){
	var graph_view = children({name: "gType", value: e.gType}, $.graphScrollView);
	graph_view.children[2].children[1].text = e.text;
}

Ti.App.addEventListener('graphLoaded', graphLoaded);

function graphLoaded(e){
	//console.log(e.id);
	var graph_view = children({name: "gType", value: e.id}, $.graphScrollView);
	graph_view.children[0].children[0].hide();
	//graph_view.children[0].height = e.contentheight;
}

Ti.App.addEventListener('populateDataById', populateDataById);

function populateDataById(e){
	hd.loadInfo(e.id,'','1');
}



filterList({category: "all"}); 
/**if(Ti.Platform.osname != "android"){
	$.stepsView.addEventListener('click',function(e){
		nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 10});
	});	
	
	$.stepsWebView.addEventListener('load',function(e){
		var actualHeight = e.source.evalJS("document.height;");
		e.source.height = parseInt(actualHeight);
	});
}**/

$.bmiView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 1});
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 2});
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 3});
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 4});
});

$.bmiWebView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	//e.source.height = parseInt(actualHeight);
});

$.bloodPressureWebView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	//e.source.height = parseInt(actualHeight);
});

$.heartRateWebView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	//e.source.height = parseInt(actualHeight);
});

$.bodyTemperatureWebView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	//e.source.height = parseInt(actualHeight);
});

$.cholestrolWebView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	//e.source.height = parseInt(actualHeight);
});

$.glucoseWebView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	//e.source.height = parseInt(actualHeight);
});

//$.heightView.addEventListener('click',function(e){
//	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 5});
//});

//$.heightView.addEventListener('load',function(e){
//	var actualHeight = e.source.evalJS("document.height;");
//	e.source.height = parseInt(actualHeight);
//});

//$.weightView.addEventListener('click',function(e){
//	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 6});
//});

//$.weightWebView.addEventListener('load',function(e){
//	hd.loadInfo(6);
//	var actualHeight = e.source.evalJS("document.height;");
//	e.source.height = parseInt(actualHeight);
//});

$.cholestrolView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 7});
});

$.glucoseView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 8});
});

$.moreHealth.addEventListener('click', function(e){
	if(Ti.Platform.osname == "android"){
		var dialog = Ti.UI.createOptionDialog({
		  cancel: 3,
		  options: ['Me', 'Body Measurement', 'Vitals', 'Cancel'],
		  title: 'More'
		});
		
		dialog.show();
		
		dialog.addEventListener("click", function(e){
			if(e.index == 0){
				nav.navigationWindow("myHealth/profile");
			}else if(e.index == 1){
				Ti.App.fireEvent('filterList',{category: "measurement"});
				//API.loadCategory({types: "popular"});
			}else if(e.index == 2){
				Ti.App.fireEvent('filterList',{category: "vitals"});
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
	Ti.App.removeEventListener('filterList',filterList);
	Ti.App.removeEventListener('populateDataById',populateDataById);
	Ti.App.removeEventListener('loadLatest',loadLatest);
	Ti.App.removeEventListener('graphLoaded', graphLoaded);
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.myhealth); 
	});
}