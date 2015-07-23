var args = arguments[0] || {};
var longitude = args.longitude || "";
var latitude = args.latitude || "";
var clinicType = args.clinicType || "";
var corp = Ti.App.Properties.getString('corpcode');
var list; 
 
if(corp != ""){ 
	API.loadPanelList({clinicType:clinicType});
}else{
	list = API.getNearbyClinic({longitude:longitude, latitude:latitude, clinicType: clinicType }); 
}

var aspClinicArr = [];
function loadClinic(e){
	var details = e.details; 
	if(details){ 
		details.forEach(function(d) {
			aspClinicArr.push(d.id);
		});
	}
	list = API.getNearbyClinic({longitude:longitude, latitude:latitude, clinicType: clinicType });
	
	Ti.App.removeEventListener('aspClinic',loadClinic);
}

//listing();
common.construct($);
common.showLoading();
Ti.App.addEventListener('updateNearbyList' , listing);
Ti.App.addEventListener('aspClinic',loadClinic);
function listing(e){
	 
	var TheTable = Titanium.UI.createTableView({
		width:'100%',
		height: 'auto'
		//separatorColor: '#ffffff'
	});
	
	var data=[];

   		var arr = e.data;
   		var counter = 0; 
   		if(arr.length < 1){
			var noRecord = Ti.UI.createLabel({ 
			    text: "No clinic found nearby", 
			    color: '#CE1D1C', 
			    textAlign: 'center',
			    font:{fontSize:14,fontStyle:'italic'},
			    top: 15,
			    width: Ti.UI.SIZE 
			 });
			$.clinicNearbySv.add(noRecord);
		}else{

	   		arr.forEach(function(entry) {
	   			var isValid = aspClinicArr.indexOf(entry.id);  
	   			if(isValid != "-1" || corp == ""){ 
		   			var row = Titanium.UI.createTableViewRow({
					    touchEnabled: true,
					    height: Ti.UI.SIZE,
					    source: entry.id,
					    selectedBackgroundColor: "#FFE1E1",
						 
					   });
					
					var contentView = Ti.UI.createView({
						layout: "vertical",
						height: Ti.UI.SIZE,
						width: Ti.UI.FILL
					});
					
					var clinicLbl = Titanium.UI.createLabel({
						text:entry.clinicname,
						font:{fontSize:16},
						source: entry.id,
						color: "#CE1D1C", 
						textAlign:'left',  
						top:5,
						left:15, 
						width:"80%",
						height:Ti.UI.SIZE
					}); 
					contentView.add(clinicLbl);
					
					var mobileLbl = Titanium.UI.createLabel({
						text:"Tel: " +entry.tel,
						font:{fontSize:14},
						source: entry.id,
						color: "#848484", 
						textAlign:'left', 
						left:15,
						height:Ti.UI.SIZE
					}); 
					contentView.add(mobileLbl);
					
					var distLbl = Titanium.UI.createLabel({
						text:"Within " +entry.distance,
						font:{fontSize:14},
						source: entry.id,
						color: "#848484", 
						textAlign:'left', 
						left:15,
						bottom:5,
						height:Ti.UI.SIZE
					}); 
					contentView.add(distLbl);
					
					var rightForwardBtn =  Titanium.UI.createImageView({
						image:"/images/btn-forward.png",
						source: entry.id,
						width:15,
						right:20 
					});		
					 
					/*
						row.addEventListener('touchend', function(e) {
						 //	goAd(e);
						});
					 */
					 
					row.add(contentView);
					row.add(rightForwardBtn); 
					data.push(row);
				}
	   		});
	   		
	   		TheTable.setData(data);
			$.clinicNearbySv.add(TheTable);
		}
		common.hideLoading();
		TheTable.addEventListener('click', function(e) { 
			nav.navigateWithArgs("clinic/clinicDetails", {panel_id:e.rowData.source});
		});
}