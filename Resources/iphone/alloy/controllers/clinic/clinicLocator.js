function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadClinic(e) {
        details = e.returnData;
        details && triggerPosition();
        Ti.App.removeEventListener("aspClinic", loadClinic);
    }
    function triggerPosition() {
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
            Ti.Geolocation.getCurrentPosition(init);
        } else alert("Please enable location services");
    }
    function init(e) {
        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        e.coords.altitude;
        e.coords.heading;
        e.coords.accuracy;
        e.coords.speed;
        e.coords.timestamp;
        e.coords.altitudeAccuracy;
        var Map = require("ti.map");
        var mapview = Map.createView({
            mapType: Map.NORMAL_TYPE,
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            },
            animate: true,
            regionFit: true,
            userLocation: true
        });
        if ("" == details) return false;
        details.forEach(function(entry) {
            var detBtn = Ti.UI.createButton({
                backgroundImage: "/images/btn-forward.png",
                color: "red",
                height: 20,
                width: 20,
                panel_id: entry.id
            });
            detBtn.addEventListener("click", function(ex) {
                nav.navigateWithArgs("clinic/clinicDetails", {
                    panel_id: ex.source.panel_id
                });
            });
            var merchantLoc = Map.createAnnotation({
                latitude: entry.latitude,
                longitude: entry.longitude,
                title: entry.clinicName,
                image: "/images/marker.png",
                animate: true,
                subtitle: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
                pincolor: Map.ANNOTATION_RED,
                rightView: detBtn,
                myid: entry.id
            });
            mapview.addAnnotation(merchantLoc);
        });
        $.win_map.add(mapview);
        mapview.addEventListener("click", function() {});
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicLocator";
    this.args = arguments[0] || {};
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode");
    var details;
    if ("" == corp) {
        details = library.getPanelByClinicType(clinicType);
        triggerPosition();
    } else API.loadPanelList({
        clinicType: clinicType
    });
    Ti.App.addEventListener("aspClinic", loadClinic);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;