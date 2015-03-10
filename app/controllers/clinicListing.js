var args = arguments[0] || {};

var library = Alloy.createCollection('panelList');
var details = library.getPanelList();
listing();

$.setting.addEventListener("click", function(){
	var nav = require('navigation');
	nav.navigationWindow("clinicLocator");
});

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
			    height: 70,
			    id: entry.id,
			    selectedBackgroundColor: "#FFE1E1",
				backgroundGradient: {
			      type: 'linear',
			      colors: ['#FEFEFB','#F7F7F6'],
			      startPoint: {x:0,y:0},
			      endPoint:{x:0,y:70},
			      backFillStart:false},
			   });
				 
		 
				var popUpTitle = Titanium.UI.createLabel({
					text:entry.clinicName,
					font:{fontSize:16},
					source: entry.id,
					color: "#848484",
					width:'65%',
					textAlign:'left',
					top:8,
					left:20,
					height:25
				});
				
				var address =  Titanium.UI.createLabel({
					text:entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left',
					width:'85%',
					bottom:23,
					left:20,
					height:12
				});
				
				var tel =  Titanium.UI.createLabel({
					text:entry.tel,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left',
					bottom:5,
					left:20,
					height:12
				});
				
				/**
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.m_id,
					width:15,
					right:20 
				});		
				**/
				/*
				row.addEventListener('touchend', function(e) {
				 //	goAd(e);
				});
			 */
				 
				row.add(popUpTitle);
				row.add(address);
			 	row.add(tel);
			 	//row.add(rightForwardBtn);
				data.push(row);
	   		});
	   		
	   		TheTable.setData(data);
			$.panelListTbl.add(TheTable);
		}
		
		TheTable.addEventListener('click', function(e)
		{
			var nav = require('navigation');
			nav.navigateWithArgs("clinicLocator", {id:e.rowData.id});
		});
}