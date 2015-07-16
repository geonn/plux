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
        console.log(e);
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
            var viewRight = Ti.UI.createView({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            detBtn.addEventListener("click", function(ex) {
                nav.navigateWithArgs("clinic/clinicDetails", {
                    panel_id: ex.source.panel_id
                });
            });
            viewRight.add(detBtn);
            if ("" != entry.latitude && "" != entry.longitude) {
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
            }
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
    $.__views.clinicLocator = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic Locator",
        id: "clinicLocator",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicLocator && $.addTopLevelView($.__views.clinicLocator);
    $.__views.win_map = Ti.UI.createView({
        id: "win_map",
        layout: "vertical"
    });
    $.__views.clinicLocator.add($.__views.win_map);
    $.__views.__alloyId145 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId145"
    });
    $.__views.win_map.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId146.add($.__views.btnBack);
    $.__views.__alloyId147 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId147"
    });
    $.__views.__alloyId145.add($.__views.__alloyId147);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Locator",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId147.add($.__views.pageTitle);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicLocator.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId148"
    });
    $.__views.loadingBar.add($.__views.__alloyId148);
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
    $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.clinicLocator);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;