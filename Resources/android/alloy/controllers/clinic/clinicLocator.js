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
        details = e.details;
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
        common.hideLoading();
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
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.win_map.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId96 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId96"
    });
    $.__views.loadingBar.add($.__views.__alloyId96);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode");
    var details;
    common.construct($);
    common.showLoading();
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