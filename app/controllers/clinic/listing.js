var args = arguments[0] || {}; 
var library = Alloy.createCollection('panelList'); 
var corp = Ti.App.Properties.getString('corpcode');
var details;
common.construct($);
common.showLoading();
if(corp == ""){
	details = library.getCountClinicType(); 
	listing("");
}else{
	API.loadPanelList({clinicType:""});
}

Ti.App.addEventListener('aspClinic',listing);
 
function listing(e){
	var TheTable = Titanium.UI.createTableView({
		width:'100%',
		separatorColor: '#CE1D1C',
		height: Ti.UI.SIZE,
		top:0,
		scrollable:false
	});
	 
	var data=[];
	
	if(e == ""){
		var arr = details;
	}else{
		var arr = e.details;
	}
   	 
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
				    id: entry.clinicType,
				    selectedBackgroundColor: "#FFE1E1",
				    backgroundColor: "#ffffff"
			    });
				
				var leftImage =  Titanium.UI.createImageView({
					image:"/images/"+entry.clinicType +".png",
					width:50,
					height:50,
					left:10
				});	
				
				var popUpTitle = Titanium.UI.createLabel({
					text:entry.clinicType,
					font:{fontSize:16},
					source: entry.clinicType,
					color: "#848484",
					width:'65%',
					textAlign:'left', 
					left:70,
					height:25
				});
				 
				var totalPanel =  Titanium.UI.createLabel({
					text:entry.total,
					source: entry.clinicType,
					font:{fontSize:14,fontWeight:'bold'},
					width:'auto',
					color: "#848484",  
					right:50,
					height:12
				});
				 
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.clinicType,
					width:15,
					right:20 
				});		
				
				/**
				row.addEventListener('touchend', function(e) {
				 //	goAd(e);
				});
			 */
				row.add(leftImage); 
				row.add(popUpTitle);
				row.add(totalPanel); 
			 	row.add(rightForwardBtn);
				data.push(row);
	   		});
	   		
	   		TheTable.setData(data);
			$.panelListTbl.add(TheTable);
		}
		
	TheTable.addEventListener('click', function(e){
		var nav = require('navigation');
		nav.navigateWithArgs("clinic/clinicLocator", {clinicType:e.rowData.id});
	});
	common.hideLoading();
	Ti.App.removeEventListener('aspClinic',listing);
}