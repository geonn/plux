var args = arguments[0] || {};
var library = Alloy.createCollection('panelList');
var details = library.getPanelListByState();
console.log(details);
listing();
function listing(){
	var TheTable = Titanium.UI.createTableView({
		width:'100%',
		separatorColor: '#ffffff'
	});
	
	var data=[];

   		var arr = details;
   		var counter = 0;
   		
   		if(arr.length < 1){
			var noRecord = Ti.UI.createLabel({ 
			    text: "No record found", 
			    color: '#CE1D1C', 
			    textAlign: 'center',
			    font:{fontSize:14,fontStyle:'italic'},
			    top: 15,
			    width: Ti.UI.SIZE 
			 });
			$.panelListTbl.add(noRecord);
		}else{

	   		arr.forEach(function(entry) {
	   			
	   			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: 40,
			    source: entry.state,
			    selectedBackgroundColor: "#FFE1E1",
				backgroundGradient: {
			      type: 'linear',
			      colors: ['#FEFEFB','#F7F7F6'],
			      startPoint: {x:0,y:0},
			      endPoint:{x:0,y:70},
			      backFillStart:false},
			   });
				 
		 
				var stateLbl = Titanium.UI.createLabel({
					text:entry.state,
					font:{fontSize:16},
					source: entry.state,
					color: "#848484",
					width:'65%',
					textAlign:'left',
					top:8,
					left:20,
					height:25
				});
				 
				 
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.state,
					width:15,
					right:20 
				});		
				 
				/*
				row.addEventListener('touchend', function(e) {
				 //	goAd(e);
				});
			 */
				 
				row.add(stateLbl);
				row.add(rightForwardBtn); 
				data.push(row);
	   		});
	   		
	   		TheTable.setData(data);
			$.panelClinicTbl.add(TheTable);
		}
		
		TheTable.addEventListener('click', function(e)
		{
			var nav = require('navigation');
			nav.navigateWithArgs("clinicListing", {state:e.rowData.source});
		});
}