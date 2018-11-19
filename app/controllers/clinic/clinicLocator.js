var args = arguments[0] || {};
var clinicType = args.clinicType || "CLINIC";
var library = Alloy.createCollection('panelList');
var corp = Ti.App.Properties.getString('corpcode') || "";
var location = args.location || "";
var details;
common.construct($);

function initialized(){ 
	//console.log("initialized");
	$.mapview.removeEventListener("complete", initialized);
	common.showLoading();
	if(clinicType == "24 Hours"){  	
		details = library.getPanelBy24Hours("", corp); 
	}else{ 
		details = library.getPanelByClinicType(clinicType, "", corp);     
	} 
	triggerPosition();
	
}
//console.log("clinicType: " +clinicType);


function triggerPosition(){
	if (Ti.Geolocation.locationServicesEnabled) {
	    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	    //Ti.Geolocation.addEventListener('location', setCurLoc);
	    Ti.Geolocation.getCurrentPosition(init);
	} else {
	    //alert('Please enable location services');
	    setTimeout(alerts, 1000);
	} 
}
 
function alerts(){
	common.createAlert("Error", "Please enable location services", function(){nav.closeWindow($.clinicLocator);});
}
 
var longitude;
var latitude;   
function init(e){ 
	setCurLoc(e);
	longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
    var count = 0; 
    
    if(details != ""){ 
    	//console.log(details.length+" how many marker");
    	
		details.forEach(function(entry) {
			$.number_clinic.text = count+" of "+details.length;
			
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
			//console.log('Ti.Platform.displayCaps.density: ' + Ti.Platform.displayCaps.density);
			//console.log('Ti.Platform.displayCaps.dpi: ' + Ti.Platform.displayCaps.dpi);
			if(entry.latitude != "" && entry.longitude != ""){
				var merchantLoc = Alloy.Globals.Map.createAnnotation({
				    latitude: entry.latitude,
				    longitude: entry.longitude, 
				    title: entry.clinicName,
				    image: '/images/marker.png',
				    animate : true, 
				    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
				    pincolor:Alloy.Globals.Map.ANNOTATION_RED,
				    rightView: detBtn,
				    panel_id: entry.id
				    
				}); 
				$.mapview.addAnnotation(merchantLoc);
				count++;
				//if(Ti.Platform.osname == "android"){
				 
				//}
			}
		});
		
	}
	common.hideLoading();
	//mapview.addAnnotation(mountainView);
	
	// Handle click events on any annotations on this map.
	
	if(Ti.Platform.osname == "android"){
		$.mapview.addEventListener('click', function(evt) {
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
    $.mapview.setLocation(region);
}

$.btnList.addEventListener('click', function(){    
	nav.navigateWithArgs("clinic/clinicNearby", {longitude:longitude, latitude:latitude, clinicType: clinicType });
}); 

$.mapview.addEventListener("complete", initialized);

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.clinicLocator); 
	}); 
}
