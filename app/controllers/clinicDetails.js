var args = arguments[0] || {};
var panel_id = args.panel_id || ""; 
var panelListModel = Alloy.createCollection('panelList'); 
var details = panelListModel.getPanelListById(panel_id);

var contacts = Ti.Contacts.getAllPeople(); 
var isAddedToContact = "0";
for (var i = 0; i < contacts.length; i++) {
	var phone = contacts[i].phone;
    
    var workPhone = phone.work; 
    if(workPhone != null && workPhone[0] == details.tel ){
    	isAddedToContact = "1";
    	$.add2contact.title = "Already added to contact";
    } 
} 
 
//var a = fruits.indexOf("Apple");
var phoneArr = [];
if(details != ""){ 
	$.clinicName.text = details.clinicName;
	$.clinicAddress1.text = details.add1;
	$.clinicAddress2.text = details.add2;
	$.clinicPostcode.text = details.postcode +", " + details.city;
	$.clinicState.text = details.state;
	$.clinicLocation.text = "COORDINATE : " +details.latitude +", "+ details.longitude;
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
	    work: phoneArr
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
	        Ti.API.info('error:' + JSON.stringify(e.error));
	        return;
	    } 
	    var longitude = e.coords.longitude;
	    var latitude = e.coords.latitude; 
	 	console.log('http://maps.google.com/maps?saddr='+latitude+','+longitude+'&daddr='+details.latitude+','+details.longitude);
	    nav.navigateWithArgs("clinicMap", {url:'http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr='+latitude+','+longitude+'&daddr='+details.latitude+','+details.longitude});
	   	 
	   	Titanium.Geolocation.removeEventListener('location', locationCallback); 
	};
	Titanium.Geolocation.addEventListener('location', locationCallback); 
}
 
