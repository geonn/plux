var args = arguments[0] || {}; 
var library = Alloy.createCollection('panelList'); 
var corp = Ti.App.Properties.getString('corpcode') || "";
var memno = Ti.App.Properties.getString('memno');
var details;
common.construct($);
common.showLoading();

function doRefresh(){
	API.loadPanelList({clinicType:""});
}

function listing(){
	 
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
	   			var myClinicType = entry.clinicType;
	   			if(entry.clinicType == "hours24"){
	   				myClinicType = "24 HOURS";
	   			}
	   			var row = Titanium.UI.createTableViewRow({
				    touchEnabled: true,
				    height: 70,
				    id: entry.clinicType,
				    backgroundSelectedColor: "#FFE1E1",
				    backgroundColor: "#ffffff"
			    });
				
				var clinicImg = entry.clinicType;
				if(OS_IOS){
					clinicImg = clinicImg.toLowerCase(); 
				}
				
				var leftImage =  Titanium.UI.createView({
					backgroundImage:"/images/"+clinicImg+".png", 
					width: 50,
					height:50,
					left:10
				});	
				
				var popUpTitle = Titanium.UI.createLabel({
					text:myClinicType,
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
					height:25
				});
				 
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.clinicType,
					width:15,
					right:20 
				});		
				
				row.add(leftImage); 
				row.add(popUpTitle);
				row.add(totalPanel); 
			 	row.add(rightForwardBtn);
				data.push(row);
	   		});
	   		
			$.tblview.setData(data);
		}
		
	
	common.hideLoading();
}

function init(){
	details = library.getCountClinicType(corp); 
	details24 = library.getCount24Hours(corp); 
	var det24= { 
		clinicType: "hours24",
		total: details24.total 
	};
	
	details.splice(1, 0, det24);
	//details.push(det24);
	listing();
}
init();

$.win.addEventListener('close',function(){
	Ti.App.removeEventListener('aspClinic',listing);
	details = null;
	details24 = null;
	det24 = null;
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}

Ti.App.addEventListener('aspClinic',init);

$.tblview.addEventListener('click', function(e){
	var nav = require('navigation');
	//nav.navigateWithArgs("clinic/clinicLocator", {clinicType:e.rowData.id});
	nav.navigateWithArgs("clinic/clinicList", {clinicType:e.rowData.id});
});