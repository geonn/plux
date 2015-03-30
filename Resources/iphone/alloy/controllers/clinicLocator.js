function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinicLocator";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.win_map = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic Locator",
        id: "win_map",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win_map && $.addTopLevelView($.__views.win_map);
    $.__views.win_map.rightNavButton = void 0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var details = library.getPanelList();
    if (args.id) var clinic = library.getPanelListById(args.id);
    var Map = require("ti.map");
    Map.createAnnotation({
        latitude: 37.390749,
        longitude: -122.081651,
        title: "Appcelerator Headquarters",
        subtitle: "Mountain View, CA",
        pincolor: Map.ANNOTATION_RED,
        myid: 1
    });
    var mapview = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {
            latitude: clinic.latitude,
            longitude: clinic.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        },
        animate: true,
        regionFit: true,
        userLocation: true
    });
    details.forEach(function(entry) {
        Map.createAnnotation({
            latitude: entry.latitude,
            longitude: entry.longitude,
            title: entry.clinicname,
            animate: true,
            subtitle: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
            pincolor: Alloy.Globals.Map.ANNOTATION_RED,
            myid: entry.id
        });
        var mountainView = Map.createAnnotation({
            latitude: entry.latitude,
            longitude: entry.longitude,
            title: entry.clinicName,
            image: "/images/marker.png",
            subtitle: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
            pincolor: Map.ANNOTATION_RED,
            myid: entry.id
        });
        mapview.addAnnotation(mountainView);
    });
    $.win_map.add(mapview);
    mapview.addEventListener("click", function(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;