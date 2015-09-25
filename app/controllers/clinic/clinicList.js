var args = arguments[0] || {};
var clinicType = args.clinicType || "CLINIC";
var library = Alloy.createCollection('panelList');
var corp = Ti.App.Properties.getString('corpcode') || "";
var list;
var aspClinicArr = [];

common.construct($); 
common.showLoading();

if(clinicType == "hours24"){
	if(OS_IOS){
		$.clinicList.title = "24 Hours Clinic List";
	}else{
		$.pageTitle.text = "24 Hours Clinic List";
	}
	 
}else{
	if(OS_IOS){
		$.clinicList.title = clinicType + " List";
	}else{
		$.pageTitle.text = clinicType + " List";
	} 
}

setTimeout(function(){
	loadData(corp);
}, 1000);

function listing(){   
	var data=[];  
	$.clinicListTv.setData(data);
   		var arr = list;
   		var counter = 0; 
   		 
   		if(arr.length < 1){
   			common.hideLoading();
			var noRecord = Ti.UI.createLabel({ 
			    text: "No clinic found", 
			    color: '#CE1D1C', 
			    textAlign: 'center',
			    font:{fontSize:14,fontStyle:'italic'},
			    top: 15,
			    width: Ti.UI.SIZE 
			 });
			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    backgroundSelectedColor: "#FFE1E1",
				color: "transparent"
			   });
			row.add(noRecord);
			data.push(row);
			$.clinicListTv.setData(data);
		}else{
			
	   		arr.forEach(function(entry) {
	   			var row = Titanium.UI.createTableViewRow({
				    touchEnabled: true,
				    height: Ti.UI.SIZE,
				    source: entry.id,
				    backgroundSelectedColor: "#FFE1E1",
					//title :  entry.clinicName,
					color: "transparent"
				   });
				
				var contentView = Ti.UI.createView({
					layout: "vertical",
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL
				});
				
				var clinicLbl = Titanium.UI.createLabel({
					text:entry.clinicName,
					font:{fontSize:14},
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
					font:{fontSize:12},
					source: entry.id,
					color: "#848484", 
					textAlign:'left', 
					left:15,
					height:Ti.UI.SIZE
				}); 
				contentView.add(mobileLbl);
			 
				var distLbl = Titanium.UI.createLabel({
					text:  entry.postcode +", " + entry.city +", "+  entry.state,
					font:{fontSize:12},
					source: entry.id,
					color: "#848484", 
					textAlign:'left', 
					left:15,
					bottom:5,
					width: "85%",
					height:Ti.UI.SIZE
				}); 
				contentView.add(distLbl);
				
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.id,
					width:15,
					right:20 
				});
				
				row.add(contentView);
				row.add(rightForwardBtn); 
			 
				data.push(row);
	   		});
	   		
	   		
	   		$.clinicListTv.setData(data);
	   		common.hideLoading();
		}
		
		$.clinicListTv.addEventListener('click', function(e) { 
			nav.navigateWithArgs("clinic/clinicDetails", {panel_id:e.rowData.source});
		});
}

$.btnList.addEventListener('click', function(){    
	nav.navigateWithArgs("clinic/clinicLocator", { clinicType: clinicType });
}); 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.clinicList); 
	}); 
} 
	/***SEARCH FUNCTION***/
	function searchResult(){
		$.searchItem.blur(); 
		common.showLoading();
		var str = $.searchItem.getValue(); 
		if(str != ""){
			if(clinicType == "hours24"){  
				list = library.getPanelBy24Hours(str, corp); 
			}else{ 
				list = library.getPanelByClinicType(clinicType, str, corp);     
			}
			listing();
		}else{
			loadData(corp);
		}	
	}
	
	$.searchItem.addEventListener("return", searchResult);

	$.searchItem.addEventListener('focus', function f(e){
		$.searchItem.removeEventListener('focus', f);
	});
	
	$.searchItem.addEventListener('cancel', function(e){ 
		$.searchItem.blur();
		loadData(corp);
	});
	
	$.searchItem.addEventListener('blur', function(e){
		 
	});
 

function loadData(corp){
	if(clinicType == "hours24"){ 
		list = library.getPanelBy24Hours("", corp);   
	}else{ 
		list = library.getPanelByClinicType(clinicType,"", corp);   
	} 
	common.showLoading();
	listing();
}
