var args = arguments[0] || {};
var type = "CLINIC";
var _ = require('underscore')._;
var pin_data = [
	{type: "CLINIC", name: "CLINIC", icon: "/images/icons/clinic_new.png"},
	//{type: "HOSPITAL", name: "HOSPITAL", icon: "/images/icons/hospital_new.png"},
	{type: "DENTAL", name: "DENTAL", icon: "/images/icons/dental_new.png"},
	{type: "OPTICAL", name: "OPTICAL", icon: "/images/icons/optiacl_new.png"},
	//{type: "PHYSIOTHERAPHY", name: "PHYSIOTHERAPHY", icon:"/images/icons/clinic_new.png"},
	//{type: "SPECIALIST", name: "SPECIALIST", icon:"/images/icons/specialist_new.png"},
	{type: "24HOURS", name: "24 HOURS", icon: "/images/icons/24hour_new.png"},
];
var platformHeight = ((OS_IOS)?Ti.Platform.displayCaps.platformHeight:parseInt(Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10));
var platformWidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10));
var clinic_listing = [], specialist = [];
var isRefresh = 1;
/*
var saveCurLoc = function(e) {
    if (e.error) {
        alert('Location service is disabled. ');
        //COMMON.closeWindow($.location);
    } else {
    	showCurLoc = true;
    	Ti.App.Properties.setString('latitude', e.coords.latitude);
    	Ti.App.Properties.setString('longitude', e.coords.longitude);
			console.log('saveCurLoc');
			console.log(e.coords);
    	$.mapview.region =  {latitude: e.coords.latitude, longitude:e.coords.longitude, zoom: 12, latitudeDelta: 0.01, longitudeDelta: 0.01};
    	setTimeout(function(){throttle_centerMap({filter: true});}, 1000);
    }
    Ti.Geolocation.removeEventListener('location',saveCurLoc);
};
console.log("Ti.Geolocation.locationServicesEnabled"+Ti.Geolocation.locationServicesEnabled);
if (Ti.Geolocation.locationServicesEnabled) {
	console.log("in");
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
    Ti.Geolocation.addEventListener('location', saveCurLoc);
}else{
		setTimeout(function(){alert('Please enable your location service.');}, 2000);
}*/

if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.Alloy.Globals.API.error('Error: ' + e.error);
        } else {
            $.mapview.region =  {latitude: e.coords.latitude, longitude:e.coords.longitude, zoom: 12, latitudeDelta: 0.01, longitudeDelta: 0.01};
        }
    });
} else {
    alert('Please enable location services');
}


function doSearch(e){
    e.source.blur();
    //Alloy.Globals.nav.navigationWindow("clinic/search","","",{keyword: e.value});
}

var show_category = false;
var duration = 200;
function openCategory(){
	$.search.blur();
	if (show_category){
		moveTo = -platformWidth;
		show_category=false;
	}else{
	    //$.detail.hide();
		moveTo="0";
		show_category=true;
	}

	$.view_category.animate({
		left:moveTo,
		duration: duration
	});
}

function loadPinCategory(e){
	var indicator = $.UI.create("ActivityIndicator", {classes:['wsize','hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK,});
    indicator.show();
    e.source.add(indicator);
    
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var arr_filter = [];
    Alloy.Globals.API.callByPost({url: "getClinicLocatorCategory", domain: "FREEJINI_DOMAIN", new: true, params: {corpcode: corpcode, u_id: u_id, isRefresh:1}}, function(responseText){

        var result = JSON.parse(responseText);
        var data = result.data || [];

        for (var i=0; i < data.length; i++) {
            var pin = _.where(pin_data, {name: data[i]});
			console.log(pin);
			if(pin.length > 0){
	            var tvr = $.UI.create("TableViewRow", {classes:['wfill','hsize'], record: pin[0]});
	            var row = $.UI.create("View", {classes:['wsize','hsize','padding'], left: 0, touchEnabled: false});
	            var img_pin = $.UI.create("ImageView", {width: 30, height: 30, left:10, image: pin[0].icon, touchEnabled: false});
	            var lab_category_name = $.UI.create("Label", {classes:['wsize','hsize','h6'], left: 50, text: pin[0].name, touchEnabled: false});
	            row.add(img_pin);
	            row.add(lab_category_name);
	            tvr.add(row);
	            arr_filter.push(tvr);
			}
        };
        e.source.opacity = 1;
        e.source.touchEnabled = true;
        indicator.hide();
        $.filter_list.setData(arr_filter);
    });
}

var skip = 0;
var compare_lat = 0, compare_long = 0;
var last_zoom_distance = 0;
var annotations = [];

var throttle_centerMap = _.throttle(centerMap, 2000);
function centerMap(e){
	return;
	console.log("centerMap");
	console.log($.mapview.region);
	if(typeof ($.mapview.region) == "undefined"){
		//skip++;
		return;
	}
	var u_id = Ti.App.Properties.getString('u_id') || "";
	var corpcode = Ti.App.Properties.getString('corpcode') || "";
	var bounds = getMapBounds($.mapview.region);
	var zoom_distance = distance(bounds.northWest.lat, bounds.northWest.lng, bounds.southEast.lat, bounds.southEast.lng);
	var compare_zoom_distance = (last_zoom_distance.toFixed(1) !=  zoom_distance.toFixed(1))?true:false;
	last_zoom_distance = zoom_distance;
	var dist = distance($.mapview.region.latitude, $.mapview.region.longitude, compare_lat, compare_long);
	if(compare_zoom_distance > 0.1 || e.filter){
		annotations = [];
	}
	if(dist > 0.3 || e.filter){
		Alloy.Globals.API.callByPost({url: "getClinicLocator3", params: {nw_latitude: bounds.northWest.lat, nw_longitude: bounds.northWest.lng, se_latitude: bounds.southEast.lat, se_longitude: bounds.southEast.lng, u_id:u_id, category: type, isRefresh: isRefresh, corpcode: corpcode}}, function(responseText){
			if(compare_zoom_distance > 0.1){
				$.mapview.removeAllAnnotations();
			}
			var result = JSON.parse(responseText);
			var data = result.data;
			for (var i=0; i < data.length; i++) {
				addMarketToArray(data[i]);
			};
			isRefresh = 0;
		});
		compare_lat = $.mapview.region.latitude;
		compare_long = $.mapview.region.longitude;
	}
}

function setFilter(e){
	$.filter_icon.image = e.source.record.icon;
	isRefresh = 1;
	openCategory();
	type = e.source.record.type;
	$.mapview.removeAllAnnotations();
	loadClinicList();
	//loadSpecialist();
	throttle_centerMap({filter: true});
}

function loadClinicList(){
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    Alloy.Globals.API.callByPost({url: "getClinicLocator3", params: {u_id:u_id, category: type, isRefresh: isRefresh, corpcode: corpcode}}, function(responseText){

        var result = JSON.parse(responseText);
        var data = result.data || [];

        var arr_filter = [];
        for (var i=0; i < data.length; i++) {
            clinic_listing[i] = data[i];
            clinic_listing[i].value = data[i].clinicName;
        };
    });
}

function getMapBounds(region) {
    var b = {};
    b.northWest = {}; b.northEast = {};
    b.southWest = {}; b.southEast = {};

    b.northWest.lat = parseFloat(region.latitude) +
        parseFloat(region.latitudeDelta) / 2.0;
    b.northWest.lng = parseFloat(region.longitude) -
        parseFloat(region.longitudeDelta) / 2.0;

    b.southWest.lat = parseFloat(region.latitude) -
        parseFloat(region.latitudeDelta) / 2.0;
    b.southWest.lng = parseFloat(region.longitude) -
        parseFloat(region.longitudeDelta) / 2.0;

    b.northEast.lat = parseFloat(region.latitude) +
        parseFloat(region.latitudeDelta) / 2.0;
    b.northEast.lng = parseFloat(region.longitude) +
        parseFloat(region.longitudeDelta) / 2.0;

    b.southEast.lat = parseFloat(region.latitude) -
        parseFloat(region.latitudeDelta) / 2.0;
    b.southEast.lng = parseFloat(region.longitude) +
        parseFloat(region.longitudeDelta) / 2.0;

    return b;
}

var distance = function(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
          Math.cos(lat1 * p) * Math.cos(lat2 * p) *
          (1 - Math.cos((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};


function init(){
	$.view_category.width = platformWidth;
	$.view_category.left = -platformWidth;
	$.mapview.region =  {latitude: "3.126046657562256", longitude: "101.7652359008789", zoom: 12, latitudeDelta: 0.01, longitudeDelta: 0.01};
}

init();

function closeWindow(){
	$.win.close();
}

$.mapview.addEventListener("regionchanged", throttle_centerMap);
