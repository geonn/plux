// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var _ = require('underscore')._;

var common = require('common');
var API = require('api');
var PUSH = require('push');
var nav = require('navigation');

var DBVersionControl = require('DBVersionControl');
DBVersionControl.checkAndUpdate();

if (OS_IOS) {
	var TouchId = require("ti.touchid");
	 /**var CoreMotion = require('ti.coremotion'); 
	if (CoreMotion.isStepCountingAvailable()) { 
	    CoreMotion.startStepCountingUpdates({stepCounts: 1}, function(e){setInterval(function(){ countStep(); }, 1000); });
	} else {
	    Ti.API.warn('This device does not support counting steps.');
	} 
	var isCountStepEventExists = true;
	Ti.App.addEventListener('countStep',countStep );
	Ti.App.iOS.registerBackgroundService({url:'services.js'});   
	function countStep(){ 
		var starts = new Date(new Date().getTime() - 1*1000);
		//console.log('start: '+starts);
		var ends  =new Date();
		CoreMotion.queryStepCount({
	        start: starts, 
	        end: ends
	    }, function (e) { 
	    	var gCurH = Ti.App.Properties.getString('curH') || "";
	    	var gStep = Ti.App.Properties.getString('step') || 0;
	    	gStep = parseInt(gStep);
	    	var myCur =  currentDateTime();
			var d = myCur.split(":");  
			var h = d[0].split(" ");  
			if(gCurH != d[1] || gCurH == ""){
				if(gStep > 0){
					var stepDateTime = Ti.App.Properties.getString('stepDateTime' ); 
					if(stepDateTime != "" ){
						var splitDT = stepDateTime.split(" ");  
						var splitTT = splitDT[1].split(":");
						var lib_health = Alloy.createCollection('health'); 
						lib_health.addHealthData({
							date : splitDT[0],
							time : splitTT[0]+":"+splitTT[1]+":00",
							field1 : "",
							field2 : "",
							amount : gStep,
							type : 10
						});
					}
				}
				Ti.App.Properties.setString('step',"0" );  
				//Ti.App.Properties.setString('stepDateTime',"" ); 
				Ti.App.Properties.setString('curH', d[1] );
			} 
			
			if(e.numberOfSteps > 0){
				gStep += e.numberOfSteps;
				Ti.App.Properties.setString('stepDateTime',myCur ); 
				Ti.App.Properties.setString('curH', d[1] );
				Ti.App.Properties.setString('step',gStep );  
			}
	    	 
	    });
	    
	    if(isCountStepEventExists){ 
	    	Ti.App.removeEventListener('countStep',countStep );
	    	isCountStepEventExists =false;
	    }
	    
	} **/
}

Alloy.Globals.Map = require('ti.map');

/***Facebook Library***/
var FACEBOOK = require('facebook');
FACEBOOK.appid = "684687638302896";
FACEBOOK.permissions = ['email','public_profile','user_friends']; // Permissions your app needs
FACEBOOK.initialize(1000); 
FACEBOOK.forceDialogAuth = true;

//constant variable
var API_DOMAIN = "https://www.asp-medical-clinic.com.my/aida/"; 

function ucwords(str) { 
  	str = str.toLowerCase();
	return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function($1){
            return $1.toUpperCase();
	});
}

//MYSQL ESCAPE STRING
function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

function timeFormat(datetime){
	var timeStamp = datetime.split(" ");  
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");  
	if(timeStamp.length == 1){
		newFormat = date[2]+"/"+date[1]+"/"+date[0] ;
	}else{
		var time = timeStamp[1].split(":");  
		if(time[0] > 12){
			ampm = "pm";
			time[0] = time[0] - 12;
		}
		
		newFormat = date[2]+"/"+date[1]+"/"+date[0] + " "+ time[0]+":"+time[1]+ " "+ ampm;
	}
	
	return newFormat;
}

function IsNumeric(input){
    return (input - 0) == input && (''+input).trim().length > 0;
}

function convertToDBDateFormat(datetime){
	var timeStamp = datetime.split(" ");  
	var newFormat;
	 
	var date = timeStamp[0].split("/");  
	if(timeStamp.length == 1){
		newFormat = date[2]+"-"+date[1]+"-"+date[0] ;
	}else{
		var time = timeStamp[1].split(":");
		var hour = (timeStamp[2] == "pm")?12 + parseInt(time[0]):time[0];
		var min = time[1] || "00";
		var sec = time[2] || "00";
		
		newFormat = date[2]+"-"+date[1]+"-"+date[0] + " "+hour+":"+min+":"+sec;
	}
	
	return newFormat;
}

function currentDateTime(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var sec = today.getSeconds();
	if (minutes < 10){
		minutes = "0" + minutes;
	} 
	if (sec < 10){
		sec = "0" + sec;
	} 
	if(dd<10) {
	    dd='0'+dd;
	} 
	
	if(mm<10) {
	    mm='0'+mm;
	} 
	
	datetime = yyyy+'-'+mm+'-'+dd + " "+ hours+":"+minutes+":"+sec;
	return datetime ;
} 

function nl2br (str, is_xhtml) {
     var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
     str.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
    return str;
    // return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  } 
  
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function resendVerificationEmail(){
	API.resendVerificationEmail();
}

function PixelsToDPUnits(ThePixels){
  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
}

function DPUnitsToPixels(TheDPUnits){
  return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
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


function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}



Titanium.App.addEventListener('resumed', function(e) {
	if (OS_IOS) {
		Titanium.UI.iPhone.setAppBadge("0");
	}
});

PUSH.registerPush();

function parent(key, e){
	// if key.value undefined mean it look for key only
	if(typeof key.value != "undefined"){
		if(eval("e."+key.name+"") != key.value){
			if(eval("e.parent."+key.name+"") != key.value){
				if(eval("e.parent.parent."+key.name+"") != key.value){
	    			console.log("box not found");
	    		}else{
	    			return e.parent.parent;
	    		}
	    	}else{
	    		return e.parent;
	    	}
	    }else{
	    		return e;
	    }
	}else{
		console.log(key.name);
		if(eval("typeof e."+key.name) == "undefined"){
			
			if(eval("typeof e.parent."+key.name+"") == "undefined"){
				if(eval("typeof e.parent.parent."+key.name+"") == "undefined"){
	    			console.log("box not found");
	    		}else{
	    			return eval("e.parent.parent."+key.name);
	    		}
	    	}else{
	    		return eval("e.parent."+key.name);
	    	}
	    }else{
	    		return eval("e."+key.name);
	    }
	}
}

function children(key, e){
	if(eval("e."+key.name+"") != key.value){
		for (var i=0; i < e.children.length; i++) {
			if(eval("e.children[i]."+key.name+"") == key.value){
		  		return e.children[i];
		 	}
			for (var a=0; a < e.children[i].children.length; a++) {
			  if(eval("e.children[i].children[a]."+key.name+"") == key.value){
			  	return e.children[i].children[a];
			  }
			  for (var c=0; c < e.children[i].children[a].children.length; c++) {
				  if(eval("e.children[i].children[a].children[c]."+key.name+"") == key.value){
				  	return e.children[i].children[a].children[c];
				  }
				};
			};
		};
    }else{
		return e;
    }
}

function createIndicator(){
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: 'black',
	  font: {fontFamily:'Helvetica Neue', fontSize:12},
	  message: 'Loading...',
	  style:style,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	return activityIndicator;
}
