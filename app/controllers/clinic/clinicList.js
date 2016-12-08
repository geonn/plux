var args = arguments[0] || {};
var clinicType = args.clinicType || "CLINIC";
var library = Alloy.createCollection('panelList');
var corp = Ti.App.Properties.getString('corpcode') || "";
var data, str="", counter = 0;
var aspClinicArr = [];

if(clinicType == "hours24"){
	clinicType = "24 Hours";
}

function init(){
	init_dropbox();
	refresh();
}

init();

function init_dropbox(){
	Ti.App.Properties.setString('clinicTypeSelection', clinicType);  
	var clinicLocationSelection = Ti.App.Properties.getString('clinicLocationSelection'); 
	var clinicLocationSelection = (clinicLocationSelection != null )? clinicLocationSelection :"All";
	$.clinicTypeSelection.text = clinicType;
	$.clinicLocationSelection.text = clinicLocationSelection;
}

function refresh(){
	data = library.getData(clinicType, str, corp, counter);
	counter = counter + 20;
	listing({clear:false});
	loading = false;
}

function listing(e){   
	if(e.clear){
		var dat=[];  
		console.log('yes!!');
		$.clinicListTv.setData(dat);
	}
	
   		var arr = data;
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
			$.clinicListTv.appendRow(row);
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
				
				var cn = entry.clinicName.replace("[quot]", "'");
				var clinicLbl = Titanium.UI.createLabel({
					text:cn,
					font:{fontSize:14,fontWeight: 'bold'},
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
			  	
			  	if(entry.city != "" ){
			  		entry.city = ", " + entry.city;
			  	}
			  	if(entry.state != "" ){
			  		entry.state = ", " + entry.state;
			  	}
				var distLbl = Titanium.UI.createLabel({
					text:  entry.postcode +  entry.city + entry.state,
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
			 	$.clinicListTv.appendRow(row);
				//dat.push(row);
	   		});
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

function searchResult(){
	$.searchItem.blur(); 
	common.showLoading();
	str = $.searchItem.getValue(); 
	counter = 0;
	data = library.getData(clinicType, str, corp, counter);
	listing({clear: true});
}
 
function showTypeSelection(){
	var clinicTypeList = library.getCountClinicType(corp); 
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
				counter = 0;
				dialog.selectedIndex = e.index;
				$.clinicTypeSelection.text = clinicArr[e.index]; 
				Ti.App.Properties.setString('clinicTypeSelection', clinicArr[e.index]);  
				
				data = library.getData(clinicArr[e.index], str, corp, counter);
				common.showLoading();
				listing({clear:true});
		 
			}
		});
}

function showLocationSelection(){ 
	var stateList = library.getPanelListByState(); 
	var clinicLocationArr = []; 
	clinicLocationArr.push("All"); 
	stateList.forEach(function(entry) {
		if(entry.state != null){
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
		if(cancelBtn != e.index){
			dialog.selectedIndex = e.index;
			$.clinicLocationSelection.text = clinicLocationArr[e.index];
			
			if(e.index == "0"){
				Ti.App.Properties.setString('clinicLocationSelection', null); 
			}else{
				Ti.App.Properties.setString('clinicLocationSelection', clinicLocationArr[e.index]);  
			}
			
			//list = library.getPanelByClinicType(Ti.App.Properties.getString('clinicTypeSelection'),"", corp); 
			
			counter = 0;
			data = library.getData(Ti.App.Properties.getString('clinicTypeSelection'), str, corp, counter);
			common.showLoading();
			listing({clear:true});    
		}
	});
}

$.btnMap.addEventListener('click', function(){
	nav.navigateWithArgs("clinic/clinicLocator", { clinicType: Ti.App.Properties.getString('clinicTypeSelection'), location: Ti.App.Properties.getString('clinicLocationSelection') });
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.clinicList); 
	}); 
}
	
$.searchItem.addEventListener("return", searchResult);

$.searchItem.addEventListener('focus', function f(e){
	$.searchItem.removeEventListener('focus', f);
});

$.searchItem.addEventListener('cancel', function(e){ 
	$.searchItem.blur();
	counter = 0;
	data = library.getData(clinicType, "", corp, counter);
	listing({clear:true});
});

$.searchItem.addEventListener('blur', function(e){
	 
});
var loading = false;
var lastDistance = 0;
$.clinicListTv.addEventListener("scroll", function(e){
	if(Ti.Platform.osname == 'iphone'){
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;

	
		if (distance < lastDistance){
			var nearEnd = theEnd * .75;
 			if (!loading && (total >= nearEnd)){
 				loading = true;
 				refresh();
 			}
		}
		lastDistance = distance;
	}
	
	if(Ti.Platform.osname == 'android' && !loading){
		if((e.firstVisibleItem+e.visibleItemCount) == e.totalItemCount){
			loading = true;
			refresh();
		}
	}
});
