var args = arguments[0] || {};

var menus = [
	{title: "BLOOD PRESSURE", type: "2", icon: "/images/icons/like.png", measurement: "mmHg", color: "#CE1D1C", fields:[
		{name: "Systolic", type: "number", tool: "picker", max_range: 200, min_range: 10, default_value: 120, graph_display: true},
		{name: "Diastolic", type: "number", tool: "picker", max_range: 200, min_range: 10,  default_value: 100, graph_display: true},
		{name: "Pulse Rate", type: "number", tool: "textfield", graph_display: false},
		{name: "Medication", type: "string", tool: "picker", options:["None", "Taken","Not Taken"], default_value: "None", graph_display: false},
		{name: "Remark", type: "string", tool: "remark", graph_display: false} 
	]},
	{title: "HEART RATE", type:"3", icon: "/images/icons/like.png", measurement: "Pulse", color: "#CE1D1C", fields:[
		{name: "Pulse Rate", type: "number", tool: "picker", max_range: 200, min_range: 10, default_value: 100, graph_display: true},
		{name: "Medication", type: "string", tool: "picker", options:["None", "Taken","Not Taken"], default_value: "None", graph_display: false},
		{name: "Remark", type: "string", tool: "remark", graph_display: false} 
	]},
	{title: "BLOOD GLUCOSE", type: "8", icon: "/images/icons/blood-drop.png", measurement: "mg/dL", color: "#CE1D1C", fields:[
		{name: "Blood Glucose", type: "number", tool: "picker", max_range: 400, min_range: 40, default_value: 100, graph_display: true},
		{name: "Current Status", type: "string", tool: "picker", options:["None", "Fasting", "After Meals", "Before Meals"], default_value: "None", graph_display: false},
		{name: "Medication", type: "string", tool: "picker", options:["None", "Taken","Not Taken"], default_value: "None", graph_display: false},
		{name: "Insulin", type: "number", tool: "textfield", graph_display: false},
		{name: "Remark", type: "string", tool: "remark", graph_display: false} 
	]},
	{title: "CHOLESTROL", type:"7", icon: "/images/icons/blood-drop.png", measurement: "mg/dL", color: "#CE1D1C", fields:[
		{name: "HDL", type: "number", tool: "picker", max_range: 200, min_range: 0, default_value: 100, graph_display: true},
		{name: "LDL", type: "number", tool: "picker", max_range: 300, min_range: 0, default_value: 130, graph_display: true},
		{name: "Medication", type: "string", tool: "picker", options:["None", "Taken","Not Taken"], default_value: "None", graph_display: false},
		{name: "Remark", type: "string", tool: "remark", graph_display: false} 
	]},
	{title: "WEIGHT", type:"6", icon: "/images/icons/weight.png", measurement: "KG", color: "#933ec5", fields:[
		{name: "Weight", type: "number", tool: "picker", max_range: 300, min_range: 0, default_value: 100, graph_display: true},
		//{name: "Body Fat %", type: "number", tool: "picker", max_range: 100, min_range: 0, default_value: 15, graph_display: true},
		{name: "Remark", type: "string", tool: "remark", graph_display: false} 
	]},
	{title: "BMI", type:"9", icon: "/images/icons/weight.png", measurement: "kg/m2", color: "#933ec5", fields:[
        {name: "BMI", type: "number", tool: "picker", max_range: 50, min_range: 10, default_value: 23, graph_display: true},
        //{name: "Body Fat %", type: "number", tool: "picker", max_range: 100, min_range: 0, default_value: 15, graph_display: true},
        {name: "Remark", type: "string", tool: "remark", graph_display: false} 
    ]},
    {title: "BMR", type:"10", icon: "/images/icons/weight.png", measurement: "kcal", color: "#933ec5", fields:[
        {name: "BMR", type: "number", tool: "textfield", graph_display: true},
       // {name: "BMR", type: "number", tool: "picker", max_range: 50, min_range: 10, default_value: 23, graph_display: true},
        //{name: "Body Fat %", type: "number", tool: "picker", max_range: 100, min_range: 0, default_value: 15, graph_display: true},
        {name: "Remark", type: "string", tool: "remark", graph_display: false} 
    ]},
    {title: "FAT %", type:"11", icon: "/images/icons/weight.png", measurement: "%", color: "#933ec5", fields:[
        {name: "FAT %", type: "number", tool: "picker", max_range: 50, min_range: 10, default_value: 23, graph_display: true},
        //{name: "Body Fat %", type: "number", tool: "picker", max_range: 100, min_range: 0, default_value: 15, graph_display: true},
        {name: "Remark", type: "string", tool: "remark", graph_display: false} 
    ]},
    {title: "VISCRERAL FAT", type:"12", icon: "/images/icons/weight.png", measurement: "VISCRERAL FAT", color: "#933ec5", fields:[
        {name: "VISCRERAL FAT", type: "number", tool: "textfield", graph_display: true},
        //{name: "FAT %", type: "number", tool: "picker", max_range: 50, min_range: 10, default_value: 23, graph_display: true},
        //{name: "Body Fat %", type: "number", tool: "picker", max_range: 100, min_range: 0, default_value: 15, graph_display: true},
        {name: "Remark", type: "string", tool: "remark", graph_display: false} 
    ]},
];
init();

function init(){
	var health_data_firsttime = Ti.App.Properties.getString('health_data_firsttime') || false;
	if(health_data_firsttime){
	    render_menu();
	}else{
	    refresh();
	}
	
}

function render_menu(){
	var model = Alloy.createCollection("health");
	var latest = model.getLatestByType();
	var pw = Ti.Platform.displayCaps.platformWidth;
	var ldf = Ti.Platform.displayCaps.logicalDensityFactor;
	var pwidth = (OS_IOS)?pw:parseInt(pw / (ldf || 1), 10);

	var cell_width =  Math.floor((pwidth - 15) / 2 );
	var odd_counter = 0;
	for (var i=0; i < menus.length; i++) {
		var found = Alloy.Globals._.where(latest, {type: menus[i].type});
		var top = Math.floor(i/2)*190+10;
		var left = (odd_counter % 2)?cell_width+10:5;
		var view_container = $.UI.create("View", {classes:['vert', 'rounded'], width: cell_width, height: 185, top:top, left: left, backgroundColor: "#ffffff", record: menus[i]});
		var label_title = $.UI.create("Label", {classes:['wsize','hsize','h5'], textAlign: "center", top:10, text: menus[i].title, touchEnabled: false});
		var image_icon = $.UI.create("ImageView", {width: 50, height:50, top:10, bottom:10, image: menus[i].icon, touchEnabled: false});
		var main_title = "";
		if(found.length > 0){
			for (var j=0; j < menus[i].fields.length; j++) {
				if(menus[i].fields[j].graph_display){
					main_title += (j == 0)?found[0]['field'+(j+1)]||0:"/"+found[0]['field'+(j+1)]||0;
				}
			};
		}
		main_title = (main_title == "")?0:main_title;
		if(typeof $.menu.children[i] != "undefined"){
			$.menu.children[i].children[2].text = main_title+" \n"+menus[i].measurement;
		}else{
			var label_latest = $.UI.create("Label", {classes:['wfill','hsize','h6'], textAlign: "center", color: menus[i].color,  text: main_title+" \n"+menus[i].measurement, touchEnabled: false});
			var button_record = $.UI.create("Button", {classes:['small_button','rounded','padding'], backgroundColor: "#fff", borderColor: menus[i].color, color: menus[i].color, width: Ti.UI.FILL, title: "Record", record: menus[i]});
			view_container.add(label_title);
			view_container.add(image_icon);
			view_container.add(label_latest);
			view_container.add(button_record);
			$.menu.add(view_container);
			view_container.addEventListener('click', navToGraph);
			button_record.addEventListener('click', navToAdd);
		}
		odd_counter++;
	};
}

function navToGraph(e){
	Alloy.Globals.nav.navigateWithArgs("myHealth/graph", e.source.record);
}

function navToAdd(e){
	Alloy.Globals.nav.navigateWithArgs("myHealth/add", e.source.record);
}

function refresh(){
    Ti.App.Properties.setString('health_data_firsttime', "1");
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("14", u_id);
	var last_updated ="";
	
	if(isUpdate != "" ){
		//last_updated = isUpdate.updated;
	}

	Alloy.Globals.API.callByPost({url: "getHealthDataByUser", params:{u_id: u_id, last_updated: last_updated}}, function(responseText)	{
		var model2 = Alloy.createCollection("health");
		var res2 = JSON.parse(responseText);
		var arr2 = res2.data || null;
		model2.saveArray(arr2);
		checker.updateModule(14,"getHealthDataByUser", res2.last_updated, u_id);
		render_menu();
	});
}
  
Ti.App.addEventListener("myHealth:render_menu", render_menu);

$.win.addEventListener("close", function(e){
	Ti.App.removeEventListener("myHealth:render_menu", render_menu);
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		Alloy.Globals.nav.closeWindow($.win); 
	});
}