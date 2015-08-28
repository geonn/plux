var args = arguments[0] || {};
var clinicType = args.clinicType || "CLINIC";
var library = Alloy.createCollection('panelList');
var corp = Ti.App.Properties.getString('corpcode');
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
<<<<<<< HEAD
		$.pageTitle.text = clinicType + " List";
	} 
=======
		API.loadPanelList({clinicType:clinicType});
	}
},1000);


function loadClinic(e){
	var details = e.details; 
	
	if(details){ 
		details.forEach(function(d) {
			aspClinicArr.push(d.id);
		});
	}
	listing();
	Ti.App.removeEventListener('aspClinic',loadClinic);
>>>>>>> origin/master
}

setTimeout(function(){ 
	loadData(corp);
}, 1000);

var searchBar = Titanium.UI.createSearchBar({
	barColor:'#F0F0F0', 
	showCancel:true,
	height:45,
	hintText:'Search Clinic',
	top:0,
});

function listing(){ 
	$.clinicListTv.removeAllChildren();
	
	var data=[]; 
   		var arr = list;
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
			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    backgroundSelectedColor: "#FFE1E1",
				color: "transparent"
			   });
			   row.add(noRecord);
			$.clinicListSv.add(row);
		}else{
			
	   		arr.forEach(function(entry) {
<<<<<<< HEAD
	   			var row = Titanium.UI.createTableViewRow({
				    touchEnabled: true,
				    height: Ti.UI.SIZE,
				    source: entry.id,
				    backgroundSelectedColor: "#FFE1E1",
					title :  entry.clinicName,
					color: "transparent"
				   });
				
				var contentView = Ti.UI.createView({
					layout: "vertical",
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL
				});
				
				var clinicLbl = Titanium.UI.createLabel({
					text:entry.clinicName,
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
				
				var add2 =entry.add2;
				if(add2.trim() != ""){
					add2 = add2  +"\r\n";
=======
	   			console.log(entry.id);
	   			console.log(aspClinicArr);
	   			var isValid = aspClinicArr.indexOf(entry.id);  
	   			
	   			if(isValid != "-1" || corp == ""){	  
		   			var row = Titanium.UI.createTableViewRow({
					    touchEnabled: true,
					    height: Ti.UI.SIZE,
					    source: entry.id,
					    backgroundSelectedColor: "#FFE1E1",
						title :  entry.clinicName,
						color: "transparent"
					   });
					
					var contentView = Ti.UI.createView({
						layout: "vertical",
						height: Ti.UI.SIZE,
						width: Ti.UI.FILL
					});
					
					var clinicLbl = Titanium.UI.createLabel({
						text:entry.clinicName,
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
					
					var add2 =entry.add2;
					if(add2.trim() != ""){
						add2 = add2  +"\r\n";
					}
					var distLbl = Titanium.UI.createLabel({
						text: entry.add1 + "\r\n"+ add2 +  entry.postcode +", " + entry.city +"\r\n"+  entry.state,
						font:{fontSize:14},
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
					 
					/*
						row.addEventListener('touchend', function(e) {
						 //	goAd(e);
						});
					 */
					 
					row.add(contentView);
					row.add(rightForwardBtn); 
				 
					data.push(row);
>>>>>>> origin/master
				}
				var distLbl = Titanium.UI.createLabel({
					text: entry.add1 + "\r\n"+ add2 +  entry.postcode +", " + entry.city +"\r\n"+  entry.state,
					font:{fontSize:14},
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
	   		
	   		if(OS_ANDROID){
<<<<<<< HEAD
				$.clinicListTv.search = searchBar;
=======
				TheTable.search = searchBar;
			}
	   		TheTable.setData(data);
	   		 
			
		 
			$.clinicListSv.add(TheTable);
			common.hideLoading();
			
			if(OS_ANDROID){
				TheTable.search = searchBar;
>>>>>>> origin/master
			}
			
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
}else{
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
	});
	
	$.searchItem.addEventListener('blur', function(e){
		
	});
}

function loadData(corp){
	if(clinicType == "hours24"){ 
		list = library.getPanelBy24Hours("", corp);   
	}else{ 
		list = library.getPanelByClinicType(clinicType,"", corp);   
	}
	common.showLoading();
	listing();
}
