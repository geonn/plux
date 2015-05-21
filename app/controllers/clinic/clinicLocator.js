var args = arguments[0] || {};
var library = Alloy.createCollection('panelList');
var details = library.getPanelList();
if(args.id){
	var clinic = library.getPanelListById(args.id);
}
 
var Map = require('ti.map');
 
var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region: {latitude:clinic.latitude, longitude:clinic.longitude,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
});


details.forEach(function(entry) {
	var detBtn =Ti.UI.createButton({
	    backgroundImage: '/images/btn-forward.png',
	    color: "red",
	    height: 20,
		width: 20,
		panel_id: entry.id
	});
	detBtn.addEventListener('click', function(ex){ 
		nav.navigateWithArgs("clinic/clinicDetails", {panel_id:ex.source.panel_id});
	});       
	var merchantLoc = Map.createAnnotation({
	    latitude:entry.latitude,
	    longitude:entry.longitude, 
	    title: entry.clinicName,
	    image: '/images/marker.png',
	    animate : true, 
	    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
	    pincolor:Map.ANNOTATION_RED,
	    rightView: detBtn,
	    myid: entry.id// Custom property to uniquely identify this annotation.
	});
	 
	//console.log(name[i] + " :"+latitude[i]+", "+ longitude[i]);               
	mapview.addAnnotation(merchantLoc); 
});

//mapview.addAnnotation(mountainView);
$.win_map.add(mapview);
// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
	 
    //Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
});

 