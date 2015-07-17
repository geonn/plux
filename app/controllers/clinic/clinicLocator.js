var args = arguments[0] || {};
var clinicType = args.clinicType || "CLINIC";
var library = Alloy.createCollection('panelList');
var corp = Ti.App.Properties.getString('corpcode');
var details;
common.construct($);
common.showLoading();
if(corp == ""){
	details = library.getPanelByClinicType(clinicType);  
	triggerPosition();
}else{
	API.loadPanelList({clinicType:clinicType});
}

function loadClinic(e){
	details = e.details; 
	if(details){
		triggerPosition(); 
	}
	Ti.App.removeEventListener('aspClinic',loadClinic);
}

function triggerPosition(){
	if (Ti.Geolocation.locationServicesEnabled) {
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	    //Ti.Geolocation.addEventListener('location', setCurLoc);
	    Ti.Geolocation.getCurrentPosition(init);
	} else {
	    alert('Please enable location services');
	} 
}
  
   
function init(e){  
	var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
    
	var Map = require('ti.map');
	var mapview = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {latitude: latitude, longitude: longitude, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true
    });
    if(details == ""){
    	return false;
    }
    
	details.forEach(function(entry) {
		var detBtn =Ti.UI.createButton({
		    backgroundImage: '/images/btn-forward.png',
		    color: "red",
		    height: 20,
			width: 20,
			panel_id: entry.id
		});
		var viewRight = Ti.UI.createView({
		    width: Ti.UI.SIZE,
		    height: Ti.UI.SIZE
		});

		detBtn.addEventListener('click', function(ex){ 
			nav.navigateWithArgs("clinic/clinicDetails", {panel_id:ex.source.panel_id});
		});      
		viewRight.add(detBtn);
		if(entry.latitude != "" && entry.longitude != ""){
			var merchantLoc = Map.createAnnotation({
			    latitude: entry.latitude,
			    longitude: entry.longitude, 
			    title: entry.clinicName,
			    image: '/images/marker.png',
			    animate : true, 
			    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
			    pincolor:Map.ANNOTATION_RED,
			    rightView: detBtn,
			    panel_id: entry.id
			    
			}); 
			mapview.addAnnotation(merchantLoc); 
			//if(Ti.Platform.osname == "android"){
			 
			//}
		}
	});
	common.hideLoading();
	//mapview.addAnnotation(mountainView);
	$.win_map.add(mapview);
	// Handle click events on any annotations on this map.
	if(Ti.Platform.osname == "android"){
		mapview.addEventListener('click', function(evt) {
			 nav.navigateWithArgs("clinic/clinicDetails", {panel_id:evt.annotation.panel_id});
		    // Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.panel_id);
		});
	}
}

function setCurLoc(e){
    var region = {
        latitude: e.coords.latitude, longitude: e.coords.longitude,
        latitudeDelta:0.01, longitudeDelta:0.01
    };
    mapview.setLocation(region);
} 

Ti.App.addEventListener('aspClinic',loadClinic);

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.clinicLocator); 
	}); 
}
