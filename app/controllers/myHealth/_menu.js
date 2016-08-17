var args = arguments[0] || {};
 

/** Keep track popUp view**/
var hideWin = 1;

$.typeWindowPopUp.addEventListener('touchend', function(e){
	if(hideWin == 1){
		$.typeWindowPopUp.close({
			curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
			opacity: 0,
			duration: 200
		});
	}
	hideWin = 1;
});
 
function navByType(evt){
	hideWin =0;
	//evt.source.source
	if(evt.source.source == "profile"){
		nav.navigationWindow("myHealth/profile");
	}else if(evt.source.source == "motion"){
		nav.navigationWindow("myHealth/workout");
	}else{
		//nav.navigateWithArgs("myHealth",{category: evt.source.source}); 
		Ti.App.fireEvent('filterList',{category: evt.source.source});
	}
	
	$.typeWindowPopUp.close({
		curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
		opacity: 0,
		duration: 500
	});
}

$.typeWindowPopUp.addEventListener("close", function(){
    $.destroy();
    hideWin = null;
});


/****** CREATE POP UP TABLE*********/

var TheTable = Titanium.UI.createTableView({
	width:'100%',
	separatorColor: '#FC7474',
	scrollable: false
});

var CustomData = [
{ image:'images/measurement.png', title:"Body Measurement", source:'measurement' }, 
{ image:'images/vitals.png', title:"Vitals",  source:'vitals'}
];
 
var data=[];
console.log(CustomData.length+"number of row");
for (var i = 0; i < CustomData.length; i++) {
	var row = Titanium.UI.createTableViewRow({
	    touchEnabled: true,
	    height: 45,
	    selectedBackgroundColor: "#FFE1E1",
	    source: CustomData[i].source,
		backgroundGradient: {
	      type: 'linear',
	      colors: ['#FEFEFB','#F7F7F6'],
	      startPoint: {x:0,y:0},
	      endPoint:{x:0,y:45},
	      backFillStart:false},
	  });
	
	var leftImage =  Titanium.UI.createImageView({
		image:CustomData[i].image,
		source: CustomData[i].source,
		width:25,
		height:25,
		left:10,
		top:10
	});
 
	var popUpTitle = Titanium.UI.createLabel({
		text:CustomData[i].title,
		source: CustomData[i].source,
		font:{fontSize:16},
		color: "#848484",
		width:'auto',
		textAlign:'left',
		top:8,
		left:40,
		height:25
	});


	row.addEventListener('touchend', function(e) {
	  navByType(e);
	});
 
	row.add(leftImage);
	row.add(popUpTitle);
 
	data.push(row);
};

TheTable.setData(data);
$.popup_view.add(TheTable);
