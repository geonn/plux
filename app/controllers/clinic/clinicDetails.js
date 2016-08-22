var args = arguments[0] || {};
var Map = require('ti.map');
var panel_id = args.panel_id || ""; 
var panelListModel = Alloy.createCollection('panelList');  
var hasContactsPermissions = Ti.Contacts.hasContactsPermissions();
var contacts;
var isAddedToContact = "0";
var details = panelListModel.getPanelListById(panel_id); ;
var phoneArr = [];
init();
 
function init(){
	setTimeout(function(){
		contacts  = Ti.Contacts.getAllPeople(); 
		if (hasContactsPermissions) {
			if(contacts.length > 0 && contacts != null){
				for (var i = 0; i < contacts.length; i++) {
					var phone = contacts[i].phone || "";  
				    var workPhone = phone.mobile; 
				    if(workPhone != null && workPhone[0] == details.tel ){
				    	isAddedToContact = "1";
				    	$.add2contact.title = "Already added to contact";
				    } 
				}  
			}
		}
		populateMap(200);
	},1000);
	
	
	
	
	if(details != ""){   
	var operHour = details.openHour; 
	var operHour_arr = operHour.split("[nl]"); 
	var oh;
	for(var i=0; i < operHour_arr.length; i++){
 		oh = operHour_arr[i].trim();
 		if(oh != ""){ 
 			oh += oh+"<br>\r\n";
 		}
 	}
 	  
	$.clinicName.text = details.clinicName;
	
	var add2 =details.add2;
	if(add2!= ""){
		add2 = add2  +"\r\n";
	}
	$.clinicAddress.text = details.add1 + "\r\n"+ add2 +  details.postcode +", " + details.city +"\r\n"+  details.state;

	$.clinicLocation.text = details.latitude +", "+ details.longitude;
	 
	for(var i=0; i < operHour_arr.length; i++){
 		var oh = operHour_arr[i].trim();
 		if(oh != ""){ 
			oh = oh.replace(/&quot;/g,"'"); 
 			var oper_label = $.UI.create('Label', {
				classes : ['clinic_address'],  
				text: oh,  
				width: "100%",   
				height: Ti.UI.SIZE, 
				textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT, 
				bottom: 1
			});
			$.clinicOper.add(oper_label);
 		} 
 	} 
	$.clinicTel.text = "TEL : " +details.tel  ; 
	phoneArr.push(details.tel);
	}
 
}



function populateMap(mapHeight){
	if(details.latitude != "" && details.longitude != "") {
		
		var mapview = Alloy.Globals.Map.createView({
		    mapType: Alloy.Globals.Map.NORMAL_TYPE,
		    region: {latitude: details.latitude, longitude: details.longitude, latitudeDelta:"0.005", longitudeDelta:"0.005"},
		    animate:true, 
		    height:mapHeight,
		    top:0, 
		}); 
		var merchantLoc = Alloy.Globals.Map.createAnnotation({
		    latitude: details.latitude,
		    longitude: details.longitude, 
		    title: details.clinicName,
		    image: '/images/marker.png',
		    animate : true, 
		  //  subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
		    pincolor: Alloy.Globals.Map.ANNOTATION_RED,
		   
		}); 
		console.log(mapHeight);
		mapview.addAnnotation(merchantLoc);
		$.clinicMap.height = mapHeight;
		$.clinicMap.add(mapview);			
	}
}


function clickToCall(){
	var tel = details.tel;
	tel = tel.replace(/[+]/g, "");
	Ti.Platform.openURL('tel:+'+tel);
}

var performAddressBookFunction = function(){
	var workAddress1 = {
	  'CountryCode': 'my',
	  'Street':  details.add1 +" "+details.add2,
	  'City': details.city,
	  'State': details.state,
	  'Country': 'Malaysia',
	  'ZIP':  details.postcode
	};
	
	var phoneList = { 
	    mobile: phoneArr
	 };
  
	Ti.Contacts.createPerson({
	  firstName: details.clinicName,
	  lastName:'',
	  address:{
	    'work':[workAddress1]
	  },
	  phone : phoneList
	});
	isAddedToContact = "1";
    $.add2contact.title = "Already added to contact";
	common.createAlert("Success", "Successfully added to contact book.");
};

var addressBookDisallowed = function(){
	common.createAlert("Cannot Access Contact Book", "You need allow APLUX to access your contact book.");
};
	
function addToContact(){
	if(isAddedToContact != "1"){
		if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
		    performAddressBookFunction();
		} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
		    Ti.Contacts.requestAuthorization(function(e){
		        if (e.success) {
		            performAddressBookFunction();
		        } else {
		            addressBookDisallowed();
		        }
		    });
		} else {
		    addressBookDisallowed();
		}
	}
}

$.btnDirection.addEventListener('click',direction2here );
function direction2here(){
	 
	var locationCallback = function(e) {
	    if(!e.success || e.error) {
	    	alert("Please enable location services");
	        Ti.API.info('error:' + JSON.stringify(e.error));
	        return;
	    } 
	    var longitude = e.coords.longitude;
	    var latitude = e.coords.latitude; 
	 	 console.log('http://maps.google.com/maps?saddr='+latitude+','+longitude+'&daddr='+details.latitude+','+details.longitude);
	    var add2 =details.add2;
		if(add2!= ""){
			add2 = add2  +"\r\n";
		} 
		var url = 'geo:'+latitude+','+longitude+"?q="+details.clinicName+" (" + details.add1 + "\r\n"+ add2 +  details.postcode +", " + details.city +"\r\n"+  details.state + ")";
		  if (Ti.Android){
				try {
				   	var waze_url = 'waze://?ll='+details.latitude+','+details.longitude+'&navigate=yes';
				   	var intent = Ti.Android.createIntent({
						action: Ti.Android.ACTION_VIEW,
						data: waze_url
					});
					Ti.Android.currentActivity.startActivity(intent); 
				} catch (ex) { 
				  	try {
						Ti.API.info('Trying to Launch via Intent');
						var intent = Ti.Android.createIntent({
							action: Ti.Android.ACTION_VIEW,
							data: url
						});
						Ti.Android.currentActivity.startActivity(intent);
					} catch (e){
						Ti.API.info('Caught Error launching intent: '+e);
						exports.Install();
					}
				} 
			}else{

				Titanium.Platform.openURL('Maps://http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr='+latitude+','+longitude+'&daddr='+details.latitude+','+details.longitude);
				
	   	 	}
				
				
	    
	   	Titanium.Geolocation.removeEventListener('location', locationCallback); 
	};
	
	console.log("geo location");
	Titanium.Geolocation.addEventListener('location', locationCallback); 
}

var showFull = false;
$.showFullMap.addEventListener('click', function(){
	if(showFull === false){
		$.clinicDetailsView.visible =false;
		$.clinicDetailsView.height = 0;
		$.clinicMap.height = Titanium.Platform.displayCaps.platformHeight;
		$.showFullMap.image =  "/images/zoom_out.png";
		$.btnDirection.visible = true;
		showFull = true;
		populateMap(Titanium.Platform.displayCaps.platformHeight);
	}else{
		$.clinicDetailsView.visible =true;
		$.btnDirection.visible = false;
		$.clinicDetailsView.height = Ti.UI.SIZE;
		$.clinicMap.height = 200;
		$.showFullMap.image =  "/images/zoom_in.png";
		showFull = false; 
		populateMap(200);
	}
	
	
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.panelDetails); 
	}); 
}
