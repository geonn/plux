var args = arguments[0] || {};
var gType = args.gType || 1; 
var hd = require('healthData');  
var lib_health = Alloy.createCollection('health'); 
 
common.construct($);
common.showLoading();
loadList("1");
 
function loadList(showDelete){
	var data=[];
	var theAmount;
	var loadType= gType;
	if(loadType == "5" || loadType == "6"){
		loadType = "1";
	}
	var info_details = lib_health.getHealthAllListByType(loadType); 
	if(info_details < 1){
		var row = Titanium.UI.createTableViewRow({
			touchEnabled: false,
			height: 100,  
			bottom: 20, 
			top:20,
			selectedBackgroundColor: "#ffffff", 
		});
		var noDataView = Titanium.UI.createView({ 
			height:Ti.UI.SIZE,
			width:Ti.UI.SIZE,
			layout: "vertical",
			bottom: 20 
		});	
		var noDataLbl = $.UI.create('Label',{ 
			text : "No records found", 
			classes : ['noData']
		});	
		var addDataView = Titanium.UI.createButton({ 
			title : "Add Data",
			height:40,
			width:80,
			backgroundColor : "#CE1D1C",
			color: "#ffffff",
			top:30,
			borderRadius: 5
		});	
		
		noDataView.addEventListener('click', function(){
			hd.navigateGraph(gType);
			nav.closeWindow($.healthEditWindow);
		});
		noDataView.add(noDataLbl);
		noDataView.add(addDataView);
		row.add(noDataView);
		data.push(row);
		$.editButton.setVisible(false);
		$.healthTableData.setData(data);
		common.hideLoading();
		return false;
	}
	
	info_details.forEach(function(entry) {
		 
		var row = Titanium.UI.createTableViewRow({
			touchEnabled: true,
			height: 45,
			source: entry.id,
			top:10,
			bottom: 10, 
			selectedBackgroundColor: "#FFE1E1", 
		});
		if(showDelete == "2"){
			var rmvBtn = Ti.UI.createImageView({ 
				left:5,
		   		width: 20,
		   		source: entry.id,
		   		height: Ti.UI.SIZE, 
		   		image : "/images/btn-delete.png",
			});
			
			rmvBtn.addEventListener('click', function(re){ 
				lib_health.removeHealthDataById(re.rowData.source);
				hd.populateData();
				loadList("2"); 
			});
		}
		
		var heartLeft = 15;
		if(showDelete == "2"){
			heartLeft = 35;
		}
		var heartImg = Titanium.UI.createImageView({
			image:"/images/health_love.png",
			source: entry.id,
			width:15,
			left:heartLeft 
		});		
		
		if(gType == "2"){
			theAmount = "Systolic : "+ parseFloat(entry.field1) + "\r\nDiastolic : "+ parseFloat(entry.field2);
		}else if(gType == "6"){
			theAmount = parseFloat(entry.field1) + " kg";
		}else if(gType == "5"){
			theAmount = parseFloat(entry.field2 ) * 100 + " cm";
		}else{
			theAmount = entry.amount;
		}
		var bmiLeft = heartLeft +40;
		var bmiLbl = Titanium.UI.createLabel({
			text:  theAmount,
			source: entry.id,
			left: bmiLeft,
			color: "#929292",
			font:{
				fontSize: 14
			},
			selectedBackgroundColor: "#FFE1E1"
		});
		var datetimeLbl = Titanium.UI.createLabel({
			text:  timeFormat(entry.date+ " "+entry.time),
			source: entry.id,
			right:15,
			color: "#929292",
			font:{
				fontSize: 14
			},
			selectedBackgroundColor: "#FFE1E1"
		});
	 
		if(showDelete == "2"){
			row.add(rmvBtn);
		}
		row.add(heartImg);
		row.add(bmiLbl);
		row.add(datetimeLbl);
		  
		data.push(row);
	});
	
	$.healthTableData.setData(data);
	common.hideLoading();
}

function doEditRecords(){
	loadList("2");
	$.doneButton.setVisible(true);
	$.editButton.setVisible(false);  
}

function doDone(){
	loadList("1");
	$.editButton.setVisible(true); 
	$.doneButton.setVisible(false);  
}
