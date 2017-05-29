var args = arguments[0] || {};
var newsFeedModel = Alloy.createCollection('health_news_feed'); 
var categoryModel = Alloy.createCollection('categorys'); 

function init(){
	displayInpatientRecord();
}
init();

function displayInpatientRecord(){  
	var tableData = []; 
	var model = Alloy.createCollection("inpatient_record");	
	var data = model.getAllRecords();
	for(var i = 0;i < data.length;i++){
		var row = $.UI.create("TableViewRow",{title:data[i].invno,source:data[i].invno});
		row.addEventListener("click",function(e){
			console.log("U Click Me Ah!!!");
			viewDetails(row);
		});
		tableData.push(row);
	}
	$.infoTable.setData(tableData);
} 
function viewDetails(e){
	var nav = require('navigation');
	console.log("e:"+JSON.stringify(e.source));
	nav.navigateWithArgs("inpatient_detail", {
		params: e.source
	});
}
function closeWindow(){
	$.destroy();
	$.win.close();
}
$.win.addEventListener('close',function(e){
	closeWindow();
});

