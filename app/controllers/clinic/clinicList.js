var args = arguments[0] || {};
var clinicType = args.clinicType || "CLINIC";
var library = Alloy.createCollection('panelList');
var corp = Ti.App.Properties.getString('corpcode') || "";
var list;
var aspClinicArr = [];

if(clinicType == "hours24"){
	clinicType = "24 Hours";
}
Ti.App.Properties.setString('clinicTypeSelection', clinicType);  
var clinicLocationSelection = Ti.App.Properties.getString('clinicLocationSelection'); 
var clinicLocationSelection = (clinicLocationSelection != null )? clinicLocationSelection :"All";
common.construct($); 
common.showLoading();

$.clinicTypeSelection.text = clinicType;
$.clinicLocationSelection.text = clinicLocationSelection;
if(OS_IOS){
	$.clinicList.title = "Clinic Location List";
}else{
	$.pageTitle.text =  "Clinic Location List";
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

$.btnSearch.addEventListener('click', function(){    
	var isVis=  $.searchItem.getVisible(); 
	if(isVis === true){ 
		$.searchItem.visible = false;
		$.searchItem.height = 0;
		
	}else{ 
		$.searchItem.visible = true;
		$.searchItem.height = 50;
	}
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
			if(clinicType == "24 Hours"){  
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
 
function showTypeSelection(){
	var clinicTypeList = library.getCountClinicType();
	console.log(clinicTypeList);
	var det24= { 
		clinicType: "24 Hours"
	};
	clinicTypeList.splice(1, 0, det24);
	var clinicArr = [];
	clinicTypeList.forEach(function(entry) { 
		clinicArr.push(ucwords(entry.clinicType));
	}); 
	clinicArr.push("Cancel"); 
	var cancelBtn = clinicArr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: clinicArr.length -1,
		  options: clinicArr,
		  selectedIndex: 0,
		  title: 'Choose Type'
		});
		
		dialog.show();
		
		dialog.addEventListener("click", function(e){   
			if(cancelBtn != e.index){
				$.clinicTypeSelection.text = clinicArr[e.index]; 
				Ti.App.Properties.setString('clinicTypeSelection', clinicArr[e.index]);  
				if(clinicArr[e.index] == "24 Hours"){   
					list = library.getPanelBy24Hours("", corp);   
				}else{
					list = library.getPanelByClinicType(clinicArr[e.index],"", corp);   
				}
				
				common.showLoading();
				listing();
		 
			}
		});
}

function showLocationSelection(){
	var stateList = library.getPanelListByState();
	var clinicLocationArr = [];
	clinicLocationArr.push("Show Map"); 
	stateList.forEach(function(entry) {
		if(entry.state != ""){
			clinicLocationArr.push(ucwords(entry.state));
		} 
	});
	clinicLocationArr.push("Cancel"); 
	var cancelBtn = clinicLocationArr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: clinicLocationArr.length -1,
		  options: clinicLocationArr,
		  selectedIndex: 0,
		  title: 'Choose Location'
	});
		
	dialog.show();
		
	dialog.addEventListener("click", function(e){   
		if(e.index == "0"){
			nav.navigateWithArgs("clinic/clinicLocator", { clinicType: Ti.App.Properties.getString('clinicTypeSelection') });
		} else if(cancelBtn != e.index){
			$.clinicLocationSelection.text = clinicLocationArr[e.index];
			Ti.App.Properties.setString('clinicLocationSelection', clinicLocationArr[e.index]);  
				
			list = library.getPanelByClinicType(Ti.App.Properties.getString('clinicTypeSelection'),"", corp); 
			common.showLoading();
			listing();    
		}
	});
}

function loadData(corp){
	if(clinicType == "24 Hours"){ 
		list = library.getPanelBy24Hours("", corp);   
	}else{ 
		list = library.getPanelByClinicType(clinicType,"", corp);   
	} 
	common.showLoading();
	listing();
}
