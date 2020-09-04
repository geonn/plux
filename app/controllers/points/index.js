var args = arguments[0] || {};
var id = args.id || "";
var notificationModel = Alloy.createCollection('notificationV2');  
var PDF = require('pdf'); 
var notificationList;
var u_id = Ti.App.Properties.getString('u_id');

var loading = Alloy.createController('loading');
init();

function init(){ 
	$.win.add(loading.getView());
	loading.start();
	refresh();
} 

function refresh(){
	var pWidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;
	Alloy.Globals.API.callByPost({url: "getMemberPointsRecords", new:true, domain: "FREEJINI_DOMAIN",  params: {u_id: u_id}}, function(responseText){
       var res = JSON.parse(responseText);	
       for (var i=0; i < res.data.length; i++) {
         res.data[i].points = res.data[i].points+" points";
         res.data[i].left = Math.floor(pWidth*0.30) - 15;
         res.data[i].type = (res.data[i].type == "add")?"+":"-";
         res.data[i].left_bottom = Math.floor(pWidth*0.30) - 15;
       };
       console.log(res.data);
	   Alloy.Globals.mocx.createCollection("points", res.data);
	   loading.finish();
   });
}

function render(data){
	
}

function monthFormat(datetime){

	var monthNames = [
        "Jan", "Feb", "Mar",
        "April", "May", "June", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

	var timeStamp = datetime.split(" ");
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");
    if(date[1] == "08"){
		date[1] = "8";
	}
	if(date[1] == "09"){
		date[1] = "9";
	}
    month = parseInt(date[1]) -1;
	if(timeStamp.length == 1){
		newFormat =  date[2]+" "+ monthNames[month]+" "+ date[0];
	}else{
		var time = timeStamp[1].split(":");
		if(time[0] > 12){
			ampm = "pm";
			time[0] = time[0] - 12;
		}

		newFormat = date[2]+" "+ monthNames[month]+" "+ date[0] + ", "+ time[0]+":"+time[1]+ " "+ ampm;
	}

	return newFormat;
}

function closeWindow(){
	$.win.close();
}

$.win.addEventListener("close", function(){
	$.destroy();
});