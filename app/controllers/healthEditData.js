var args = arguments[0] || {};
var gType = args.gType || 1; 
var hd = require('healthData');  
var lib_health = Alloy.createCollection('health'); 


common.construct($);
common.showLoading();
loadList("1");
 
function loadList(showDelete){
	var data=[];
	var info_details = lib_health.getHealthAllListByType(gType); 
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
		
		var bmiLeft = heartLeft +40;
		var bmiLbl = Titanium.UI.createLabel({
			text:  entry.amount,
			source: entry.id,
			left: bmiLeft,
			color: "#929292",
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
