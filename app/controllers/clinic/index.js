var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var isRefresh = 1;

var platformHeight = ((OS_IOS)?Ti.Platform.displayCaps.platformHeight:parseInt(Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10));

var platformWidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10));
var type = "CLINIC";
var pin_data = [
	{type: "CLINIC", name: "CLINIC", icon: "/images/icons/clinic_new.png"},
	//{type: "HOSPITAL", name: "HOSPITAL", icon: "/images/icons/hospital_new.png"},
	{type: "DENTAL", name: "DENTAL", icon: "/images/icons/dental_new.png"},
	{type: "OPTICAL", name: "OPTICAL", icon: "/images/icons/optiacl_new.png"},
	//{type: "PHYSIOTHERAPHY", name: "PHYSIOTHERAPHY", icon:"/images/icons/clinic_new.png"},
	//{type: "SPECIALIST", name: "SPECIALIST", icon:"/images/icons/specialist_new.png"},
	{type: "24HOURS", name: "24 HOURS", icon: "/images/icons/24hour_new.png"},
];
var clinic_listing = [], specialist = [];

if(OS_ANDROID){
    //$.filter_button.top = 120;
    //$.quening_button.top = 120;
}
$.mapview.height = platformHeight - 90;

var distance = function(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
          Math.cos(lat1 * p) * Math.cos(lat2 * p) *
          (1 - Math.cos((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
/*
var saveCurLoc = function(e) {
    if (e.error) {
        alert('Location service is disabled. ');
        //Alloy.Globals.common.closeWindow($.location);
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
            showCurLoc = true;
	    	Ti.App.Properties.setString('latitude', e.coords.latitude);
	    	Ti.App.Properties.setString('longitude', e.coords.longitude);
            $.mapview.region =  {latitude: e.coords.latitude, longitude:e.coords.longitude, zoom: 12, latitudeDelta: 0.01, longitudeDelta: 0.01};
            setTimeout(function(){throttle_centerMap({filter: true});}, 1000);
        }
    });
} else {
    alert('Please enable location services');
}

function setFilter(e){
	//$.filter_icon.image = "/images/icons/pin_"+e.source.record.pin_number+".png";
	$.filter_icon.image = e.source.record.icon;
	//$.filter_text.text = e.source.record.name;
	//$.listing_text.text = e.source.record.name+" LISTING";
	isRefresh = 1;
	openCategory();
	type = e.source.record.type;
	$.mapview.removeAllAnnotations();
	loadClinicList();
	loadSpecialist();
	throttle_centerMap({filter: true});
}

var skip = 0;
var compare_lat = 0, compare_long = 0;
var last_zoom_distance = 0;
var annotations = [];

var throttle_centerMap = Alloy.Globals._.throttle(centerMap, 2000);
function centerMap(e){
	if(skip <= 0 || typeof ($.mapview.region.latitude) == "undefined"){
		skip++;
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
			console.log(data);
			console.log('check here');
			console.log(data.length);
			for (var i=0; i < data.length; i++) {
				console.log("nono");
				addMarketToArray(data[i]);
			};
			isRefresh = 0;
		});
		compare_lat = $.mapview.region.latitude;
		compare_long = $.mapview.region.longitude;
	}
}

function addMarketToArray(pin){
    var found = Alloy.Globals._.where(annotations, {id: pin.id});
    if(found.length <= 0){
        if(OS_IOS){
            var pin = {id: pin.id, latitude: pin.latitude, longitude: pin.longitude, title: pin.clinicName, subtitle: pin.add1+pin.add2, record: pin
            , customView: Ti.UI.createView({
                width : 30,
                height : 30,
                children : [Ti.UI.createView({
                    top : 0,
                    width : 30,
                    height : 30,
                    backgroundImage : "images/icons/"+pin.clinicType+".png"
                })]
            })
            };
        }else{

            var pin = {id: pin.id, latitude: pin.latitude, longitude: pin.longitude, title: pin.clinicName, subtitle: pin.add1+pin.add2, record: pin, image: "images/icons/"+pin.clinicType+".png"};
        }
        annotations.push(pin);
        render_annotation(pin);
    }
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
var voucher = false;
var marker = false;
function pinClicked(e){
    $.search.blur();
    var pin = (typeof e.annotation != "undefined")?e.annotation:e;
		console.log(pin.record);
    marker = pin.record;
	$.name.text = pin.record.clinicName;
	$.address.text = pin.record.add1+" "+pin.record.add2+" "+pin.record.city+" "+pin.record.postcode+" "+pin.record.state;
	$.openHour.text = (pin.record.openHour)?pin.record.openHour.replace(/\[nl\]/g, "\n")+" \n"+pin.record.openHour2.replace(/\[nl\]/g, "\n"):"-";
	$.rating.text = (pin.record.rating)?pin.record.rating+" / 5":"Not Rated Yet";
	$.detail.show();
}

function getDirection(){
	try {
   		var waze_url = 'waze://?ll='+marker.latitude+','+marker.longitude+'&navigate=yes';
   		if (Ti.Android){
		   	var intent = Ti.Android.createIntent({
				action: Ti.Android.ACTION_VIEW,
				data: waze_url
			});
			Ti.Android.currentActivity.startActivity(intent);
		}else{
			Ti.Platform.openURL(waze_url);
		}
	} catch (ex) {
		if(OS_IOS){
			Titanium.Platform.openURL('Maps://http://maps.google.com/maps?ie=UTF8&t=h&z=16&daddr='+marker.latitude+','+marker.longitude);
		}else{
		    var intent = Ti.Android.createIntent({
				action: Ti.Android.ACTION_VIEW,
				data: 'geo:'+marker.latitude+','+marker.longitude+"?q="+marker.clinicName+" (" + marker.add1+marker.city+")"
			});
			Ti.Android.currentActivity.startActivity(intent);
		}
	}
}

function call(e){
    var tel = marker.tel;
    tel = tel.replace(/[+]/g, "");
    Ti.Platform.openURL('tel:'+tel);
}


function render_annotation(annotation){
	var ann = Alloy.Globals.Map.createAnnotation(annotation);
	$.mapview.addAnnotation(ann);
}

function closeView(){
	$.detail.hide();
}

function init(){
	$.detail.hide();
	$.right_panel.hide();
	$.view_queue.hide();
	$.win.add(loading.getView());
	$.view_category.width = platformWidth;
	$.view_category.left = -platformWidth;
	loadPinCategory();
	//loadClinicList();
	//loadSpecialist();
}

init();

function loadPinCategory(){
    loading.start();
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var arr_filter = [];
    Alloy.Globals.API.callByPost({url: "getClinicLocatorCategory", domain: "FREEJINI_DOMAIN", new: true, params: {corpcode: corpcode, u_id: u_id, isRefresh:1}}, function(responseText){
console.log(responseText);
console.log('see here');
        var result = JSON.parse(responseText);
        var data = result.data || [];
        for (var i=0; i < data.length; i++) {
            var pin = Alloy.Globals._.where(pin_data, {name: data[i]});
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
        $.filter_list.setData(arr_filter);
        loading.finish();
    });
}

function doSearch(e){
    e.source.blur();
    Alloy.Globals.nav.navigationWindow("clinic/search","","",{keyword: e.value});
}

function loadQueue(){
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    Alloy.Globals.API.callByPost({url: "getQueueList", domain: "VCLINIC_DOMAIN", new: true, params: {corpcode: corpcode}}, function(responseText){

        var result = JSON.parse(responseText);
        var data = result.data || [];

        var arr_filter = [];
        for (var key in data){
            var tvr = $.UI.create("TableViewRow", {classes:['wfill','hsize']});
            var row = $.UI.create("View", {classes:['wsize','hsize','padding'], left: 0, touchEnabled: false});

            var lab_category_name = $.UI.create("Label", {classes:['wsize','hsize','h6'], left: 10, text: key+" : "+data[key], touchEnabled: false});
            row.add(lab_category_name);
            tvr.add(row);
            arr_filter.push(tvr);
        }
        $.queue_list.setData(arr_filter);
        loading.finish();
    });
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
        loading.finish();
    });
}

function loadSpecialist(){
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    Alloy.Globals.API.callByPost({url: "getHospitalList", domain: "FREEJINI_DOMAIN", new: true, params: {}}, function(responseText){

        var result = JSON.parse(responseText);
        var data = result.data || [];

        var arr_filter = [];
        for (var i=0; i < data.length; i++) {
            specialist[i] = {value: data[i]};
        };
        loading.finish();
    });
}

var show_category = false;
var duration = 200;
function openCategory(){
	$.search.blur();
	if (show_category){
		moveTo = -platformWidth;
		show_category=false;
	}else{
	    $.detail.hide();
		moveTo="0";
		show_category=true;
	}

	$.view_category.animate({
		left:moveTo,
		duration: duration
	});
}

function openSpecialistList(){
    //openMoreList();
    Alloy.Globals.nav.navigationWindow("parts/search_list", "","", {displayHomeAsUp: true, title: "Hospital Listing", listing: specialist, callback: function(ex){
        Alloy.Globals.API.callByPost({url: "getHospitalDoctorList", new: true, domain: "FREEJINI_DOMAIN", params: {hospital: ex.value}}, function(responseText){

        var result = JSON.parse(responseText);
        var doctorlist = [];
        var data = result.data || [];
        for(var i=0,j=data.length; i<j; i++){
            doctorlist[i] = data[i];
            doctorlist[i].value = "SPECIALTY: "+result.data[i].specialty+"\nDOCTOR: "+result.data[i].name;
        };
        Alloy.Globals.nav.navigationWindow("parts/search_list", "","", {displayHomeAsUp: true, title: "Specialist Listing", listing: doctorlist, callback: function(ex2){
                console.log("doctor list callback");
                var label_name_title = $.UI.create("Label", {classes:['wfill','hsize','h7', 'bold'], top: 10, left: 10, right: 10, text: "DOCTOR"});
                var label_name_value = $.UI.create("Label", {classes:['wfill','hsize','h7'], left: 10, right: 10, text: ex2.title+" "+ex2.name});
                var label_specialty_title = $.UI.create("Label", {classes:['wfill','hsize','h7', 'bold'], top: 10, left: 10, right: 10, text: "SPECIALIST"});
                var label_specialty_value = $.UI.create("Label", {classes:['wfill','hsize','h7'], left: 10, right: 10, text: ex2.specialty});
                var label_hospital_title = $.UI.create("Label", {classes:['wfill','hsize','h7', 'bold'], top: 10, left: 10, right: 10, text: "PROVIDER"});
                var label_hospital_value = $.UI.create("Label", {classes:['wfill','hsize','h7'], left: 10, right: 10, text: ex2.provider});
                var label_location_title = $.UI.create("Label", {classes:['wfill','hsize','h7', 'bold'], top: 10, left: 10, right: 10, text: "LOCATION"});
                var label_location_value = $.UI.create("Label", {classes:['wfill','hsize','h7'], left: 10, right: 10, text: ex2.location});
                var button_call = $.UI.create("Button", {width: 100, height: 30, top: 10, bottom:10, left: 10, right: 10, title: "CALL", phone: ex2.phone});
                var close_x = $.UI.create("Label", {classes:['wsize','hsize'], color: "red", right:10, top:10, text: "X"});
                var view_container = $.UI.create("View", {classes:['wfill','hsize','vert'], backgroundColor: "#ffffff", left:10, right: 10 });
                view_container.add(close_x);
                view_container.add(label_name_title);
                view_container.add(label_name_value);
                view_container.add(label_specialty_title);
                view_container.add(label_specialty_value);
                view_container.add(label_hospital_title);
                view_container.add(label_hospital_value);
                view_container.add(label_location_title);
                view_container.add(label_location_value);
                view_container.add(button_call);

                close_x.addEventListener("click", function(){
                    $.win.remove(view_container);
                });

                button_call.addEventListener("click", function(b){
                    console.log(b.source.phone);
                    var b = b.source.phone.replace(/[+]/g, "");
                    console.log('tel:'+b);
                    Ti.Platform.openURL('tel:'+b);
                });


                $.win.add(view_container);
            }});
        });
        console.log("hospital Listing callback");
    }});
}

function openClinicList(){
    Alloy.Globals.nav.navigationWindow("parts/search_list", "","", {displayHomeAsUp: true, title: "Clinic Listing", listing: clinic_listing, callback: navToClinic});
    return;
}

var queue_more = true;
function openQueueList(){
    if(!show_more){
        //openMoreList();
    }
    loadQueue();
    $.view_queue.show();
    $.detail.hide();
    $.search.blur();
    if (queue_more){
        moveTo="0";
        queue_more = false;
    }else{
        moveTo = -platformWidth;
        queue_more = true;
    }

    $.view_queue.animate({
        right:moveTo,
        duration: duration
    });

}

var show_more = true;
function openMoreList(){
    $.right_panel.show();
    $.detail.hide();
    $.search.blur();
    if (show_more){
        moveTo="0";
        show_more = false;
    }else{
        moveTo = -platformWidth;
        show_more = true;
    }

    $.right_panel.animate({
        right:moveTo,
        duration: duration
    });

}

function navToClinic(e){
    var source = (typeof e.record == "undefined")?{record: e}:e;
    console.log(source);
    pinClicked(source);
    //$.mapview.removeAllAnnotations();
    addMarketToArray(source.record);
    /*var pin = {id: source.record.id, latitude: source.record.latitude, longitude: source.record.longitude, title: source.record.clinicName, subtitle: source.record.add1+source.record.add2, record: source.record
    , customView: Ti.UI.createView({
        width : 30,
        height : 30,
        children : [Ti.UI.createView({
            top : 0,
            width : 30,
            height : 30,
            backgroundImage : "images/icons/"+source.record.clinicType+".png"
        })]
    })
    };
    annotations.push(pin);
    render_annotation(pin);*/

    $.mapview.region =  {latitude: parseFloat(source.record.latitude)-0.004, longitude:source.record.longitude, zoom: 12, latitudeDelta: 0.01, longitudeDelta: 0.01};// };
}

function closeWindow(){
    $.win.close();
}

$.win.addEventListener("close", function(){
    Ti.App.removeEventListener("clinic/index:navTo", navToClinic);
    $.destroy();
});

$.mapview.addEventListener("regionchanged", throttle_centerMap);
$.mapview.addEventListener("click", pinClicked);

Ti.App.addEventListener("clinic/index:navTo", navToClinic);
