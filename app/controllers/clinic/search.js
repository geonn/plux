var args = arguments[0] || {};
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
	var u_id = Ti.App.Properties.getString('u_id') || "";
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    console.log(args);
	API.callByPost({url: "getClinicLocator3", params: {u_id:u_id, isRefresh: 0, corpcode: corpcode, keyword: args.keyword}}, function(responseText){
	    console.log(responseText);
	    var result = JSON.parse(responseText);
	    loadClinic(result.data || []);
	});
}

init();

function loadClinic(data){
	loading.start();
	var arr_filter = [];
	for (var i=0; i < data.length; i++) {
		var tvr = $.UI.create("TableViewRow", {classes:['wfill','hsize'], backgroundColor: "#fff", record: data[i]});
		var row = $.UI.create("View", {classes:['wsize','hsize','padding'], left: 0, touchEnabled: false});
		var lab_category_name = $.UI.create("Label", {classes:['wsize','hsize','h6'], text: data[i].clinicName, touchEnabled: false});
		row.add(lab_category_name);
		tvr.add(row);
		arr_filter.push(tvr);
	};
	$.result.setData(arr_filter);
	loading.finish();
}

function navTo(e){
    type = e.source.record;
    Ti.App.fireEvent("clinic/index:navTo", e.source.record);
    closeWindow();
}

function closeWindow(){
    $.win.close();
}
$.win.addEventListener("close", function(){
    $.destroy();
});
