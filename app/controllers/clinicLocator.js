var args = arguments[0] || {};


var library = Alloy.createCollection('panelList');
var details = library.getPanelList();
if(args.id){
	var clinic = library.getPanelListById(args.id);
}
/*
var showCurLoc = false;

var saveCurLoc = function(e) {
	//console.log(e);
    if (e.error) {
       // alert('Location service is disabled. ');
    } else {
    	//console.log(e);
    	showCurLoc = true;
    	console.log("set current loc"+e.coords);
    	//Ti.App.Properties.setString('latitude', clinic.latitude);
    	//Ti.App.Properties.setString('longitude', clinic.longitude);
    	Ti.App.Properties.setString('latitude', e.coords.latitude);
    	Ti.App.Properties.setString('longitude', e.coords.longitude);
       //console.log(Ti.App.Properties.getString('latitude') + "=="+ Ti.App.Properties.getString('longitude'));
    }
};

if (Ti.Geolocation.locationServicesEnabled) {
	
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
    
    Ti.Geolocation.addEventListener('location',saveCurLoc );
} else {
    alert('Please enable location services');
}

var arr = details;
var mapview = Alloy.Globals.Map.createView({
    mapType: Map.NORMAL_TYPE,
    region: {latitude:33.74511, longitude:-84.38993,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
});

arr.forEach(function(entry) {
	var merchantLoc = Alloy.Globals.Map.createAnnotation({
	    latitude:entry.latitude,
	    longitude:entry.longitude,
	    title: entry.clinicname,
	    animate : true,
	    //image: '/images/marker.png',
	    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
	    pincolor:Alloy.Globals.Map.ANNOTATION_RED,
	    myid:entry.id // Custom property to uniquely identify this annotation.
	});
	
	//console.log(name[i] + " :"+latitude[i]+", "+ longitude[i]);               
	mapview.addAnnotation(merchantLoc); 
});

if(!args.id){
	// API calls to the map module need to use the Alloy.Globals.Map reference
	console.log(showCurLoc);
	if(showCurLoc == true && !args.id){
		var lat = Ti.App.Properties.getString('latitude');
	    var lgt = Ti.App.Properties.getString('longitude');
		 var currenLocation = Alloy.Globals.Map.createAnnotation({
		    latitude: lat,
		    longitude: lgt,
		    title:"Current Location",
		    subtitle:"",
		    pincolor:Alloy.Globals.Map.ANNOTATION_GREEN,
		    myid:99 // Custom property to uniquely identify this annotation.
		}); 
		//$.mapview.addAnnotation(currenLocation);   
		mapview.region = {latitude: lat, longitude:lgt,
					                    latitudeDelta:0.01, longitudeDelta:0.01}; 
	}
}else{
	mapview.region = {latitude: clinic.latitude, longitude:clinic.longitude,
		                    latitudeDelta:0.01, longitudeDelta:0.01};
}

$.win_map.add(mapview);

mapview.addEventListener('click', function(evt) {
	alert('a');
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
});
*/
var Map = require('ti.map');
var mountainView = Map.createAnnotation({
    latitude:37.390749,
    longitude:-122.081651,
    title:"Appcelerator Headquarters",
    subtitle:'Mountain View, CA',
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});

var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region: {latitude:clinic.latitude, longitude:clinic.longitude,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
});

details.forEach(function(entry) {
	var merchantLoc = Map.createAnnotation({
	    latitude:entry.latitude,
	    longitude:entry.longitude,
	    title: entry.clinicname,
	    animate : true,
	    //image: '/images/marker.png',
	    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
	    pincolor:Alloy.Globals.Map.ANNOTATION_RED,
	    myid:entry.id // Custom property to uniquely identify this annotation.
	});
	
	var mountainView = Map.createAnnotation({
	    latitude:entry.latitude,
	    longitude:entry.longitude,
	    title: entry.clinicName,
	    image: '/images/marker.png',
	    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
	    pincolor:Map.ANNOTATION_RED,
	    myid: entry.id// Custom property to uniquely identify this annotation.
	});

	//console.log(name[i] + " :"+latitude[i]+", "+ longitude[i]);               
	mapview.addAnnotation(mountainView); 
});

//mapview.addAnnotation(mountainView);
$.win_map.add(mapview);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
});

 