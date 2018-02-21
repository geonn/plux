var args = arguments[0] || {};
var perior_type = "day";
var moment = require('alloy/moment');
var model = Alloy.createCollection("health");
var select_month = moment(new Date()).format("YYYY-MM");
var select_year = moment(new Date()).format("YYYY");
var field_graph = [];
init();

function init(){
	$.win.title = args.title;
	$.date_indicator.text = moment(select_month).format("MMM YYYY");
	for (var i=0; i < args.fields.length; i++) {
		if(args.fields[i].graph_display){
			field_graph.push(args.fields[i]);
		}
	};
	console.log("check here");
	console.log(field_graph);
	refresh({});
}

function adjust_date_indicator(e){
	console.log(e.source.action);
	if(perior_type == "day"){
		select_month = (e.source.action == "minus")?moment(select_month).add(-1, 'M').format("YYYY-MM"):moment(select_month).add(1, 'M').format("YYYY-MM");
	}else{
		select_year = (e.source.action == "minus")?moment(select_year).add(-1, 'Y').format("YYYY"):moment(select_year).add(1, 'Y').format("YYYY");
	}
	$.date_indicator.text = (perior_type == "day")?moment(select_month).format("MMM YYYY"):moment(select_year).format("YYYY");
	refresh({});
}

function changeDateSorting(e){
	var childs = $.day_month.getChildren();
	for (var i=0; i < childs.length; i++) {
		childs[i].backgroundColor = "#fff";
	};
	e.source.backgroundColor = "#ddd";
	perior_type = e.source.perior_type;
	$.date_indicator.text = (perior_type == "day")?moment(select_month).format("MMM YYYY"):moment(select_year).format("YYYY");
	refresh({});
}

function refresh(e){
	if(typeof e.height != "undefined"){
		console.log(e.height+" inner height");
		$.webview.height = e.height;
	}
	if(perior_type == "day"){
		var data = model.getDataGroupByDay({date: select_month, type: args.type, select_month: select_month});
	}else{
		var data = model.getDataGroupByMonth({date: select_year, type: args.type, select_year: select_year});
	}
	var data_arranged = [];
	var temp_graph_arr = [];
	temp_graph_arr.push({type: "string", name: perior_type});
	for (var l=0; l < field_graph.length; l++) {
		temp_graph_arr.push({type: field_graph[l].type, name: field_graph[l].name});
	}	
	for (var j=0; j < data.length; j++) {
		var temp_arr = [];
		
		temp_arr.push(data[j].day);
		
		for (var k=0; k < field_graph.length; k++) {
			temp_arr.push(parseInt(data[j]['field'+(k+1)]));
			
		};
		data_arranged.push(temp_arr);
	}
	console.log(data_arranged);
	console.log(temp_graph_arr);
	Ti.App.fireEvent("graph:load_data", {data: data_arranged, fields: temp_graph_arr});//data: data});
}

function transformFunction(model){
	var transform = model.toJSON();
	var main_title = "";
	for (var k=0; k < field_graph.length; k++) {
		main_title += (k == 0)?transform['field'+(k+1)]:"/"+transform['field'+(k+1)];
	}
	main_title += " "+args.measurement;
    transform.main_title = main_title;
    transform.sub_title = moment(transform.date).format("DD-MM-YYYY hh:mm A");
    return transform;
}

Ti.App.addEventListener("webview:graph_loaded", refresh);

$.win.addEventListener("close", function(e){
	Ti.App.removeEventListener("webview:graph_loaded", refresh);
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}