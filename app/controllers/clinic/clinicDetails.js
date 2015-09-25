var args = arguments[0] || {};
var panel_id = args.panel_id || ""; 
var panelListModel = Alloy.createCollection('panelList'); 

var details = panelListModel.getPanelListById(panel_id);

var contacts = Ti.Contacts.getAllPeople(); 
 
var isAddedToContact = "0";
for (var i = 0; i < contacts.length; i++) {
	var phone = contacts[i].phone || "";  
    var workPhone = phone.mobile; 
    if(workPhone != null && workPhone[0] == details.tel ){
    	isAddedToContact = "1";
    	$.add2contact.title = "Already added to contact";
    } 
}  
var phoneArr = [];
if(details != ""){  
	if(details.latitude != "" && details.longitude != "") {
		var Map = require('ti.map');
		var mapview = Map.createView({
		    mapType: Map.NORMAL_TYPE,
		    region: {latitude: details.latitude, longitude: details.longitude, latitudeDelta:0.005, longitudeDelta:0.005},
		    animate:true,
		    regionFit:true,
		    height:200,
		    top:0,
		    userLocation:true
		});
		var merchantLoc = Map.createAnnotation({
		    latitude: details.latitude,
		    longitude: details.longitude, 
		    title: details.clinicName,
		    image: '/images/marker.png',
		    animate : true, 
		  //  subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
		    pincolor:Map.ANNOTATION_RED,
		   
		}); 
		mapview.addAnnotation(merchantLoc);
		$.clinicMap.height = 200;
		$.clinicMap.add(mapview);			
	}
	
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
	if(add2.trim() != ""){
		add2 = add2  +"\r\n";
	}
	$.clinicAddress.text = details.add1 + "\r\n"+ add2 +  details.postcode +", " + details.city +"\r\n"+  details.state;
	//$.clinicAddress2.text = details.add2;
	//$.clinicPostcode.text = details.postcode +", " + details.city;
	//$.clinicState.text = details.state;
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
 
function direction2here(){
	 
	var locationCallback = function(e) {
	    if(!e.success || e.error) {
	    	alert("Please enable location services");
	        Ti.API.info('error:' + JSON.stringify(e.error));
	        return;
	    } 
	    var longitude = e.coords.longitude;
	    var latitude = e.coords.latitude; 
	 	//console.log('http://maps.google.com/maps?saddr='+latitude+','+longitude+'&daddr='+details.latitude+','+details.longitude);
	     
		var url = 'geo:'+latitude+','+longitude+"?q="+details.clinicName+" (" + details.add1 + "\r\n"+ add2 +  details.postcode +", " + details.city +"\r\n"+  details.state + ")";
		  
		   
			if (Ti.Android){
				try
				{
				   	var waze_url = 'waze://?ll='+details.latitude+','+details.longitude+'&navigate=yes';
				   	var intent = Ti.Android.createIntent({
						action: Ti.Android.ACTION_VIEW,
						data: waze_url
					});
					Ti.Android.currentActivity.startActivity(intent);
					console.log('waze');
				}
				catch (ex)
				{	
					console.log(ex);
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
				if(Titanium.Platform.canOpenURL('waze://?ll='+details.latitude+','+details.longitude+'&navigate=yes')){
					Titanium.Platform.openURL('waze://?ll='+details.latitude+','+details.longitude+'&navigate=yes');
				}else{
					nav.navigateWithArgs("clinic/clinicMap", {map_url:'http://maps.apple.com/?daddr='+ details.add1 + "\r\n"+ add2 +  details.postcode +", " + details.city +"\r\n"+  details.state +'&saddr='+details.latitude+ ',' +details.longitude});
				}
				//http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr='+latitude+','+longitude+'&daddr='+details.latitude+','+details.longitude
				//var str = 'http://maps.apple.com/?daddr='+ a +'&saddr='+latitude+ ',' +longitude
				//
	   	 	}
				
				
	    
	   	Titanium.Geolocation.removeEventListener('location', locationCallback); 
	};
	Titanium.Geolocation.addEventListener('location', locationCallback); 
}
 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.panelDetails); 
	}); 
}
