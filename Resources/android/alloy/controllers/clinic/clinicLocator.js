function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initialized() {
        console.log("initialized");
        $.mapview.removeEventListener("complete", initialized);
        common.showLoading();
        details = "24 Hours" == clinicType ? library.getPanelBy24Hours("", corp) : library.getPanelByClinicType(clinicType, "", corp);
        triggerPosition();
    }
    function triggerPosition() {
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
            Ti.Geolocation.getCurrentPosition(init);
        } else setTimeout(alerts, 1e3);
    }
    function alerts() {
        common.createAlert("Error", "Please enable location services", function() {
            nav.closeWindow($.clinicLocator);
        });
    }
    function init(e) {
        setCurLoc(e);
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;
        e.coords.altitude;
        e.coords.heading;
        e.coords.accuracy;
        e.coords.speed;
        e.coords.timestamp;
        e.coords.altitudeAccuracy;
        var count = 0;
        if ("" != details) {
            console.log(details.length + " how many marker");
            details.forEach(function(entry) {
                $.number_clinic.text = count + " of " + details.length;
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
                console.log("Ti.Platform.displayCaps.density: " + Ti.Platform.displayCaps.density);
                console.log("Ti.Platform.displayCaps.dpi: " + Ti.Platform.displayCaps.dpi);
                if ("" != entry.latitude && "" != entry.longitude) {
                    var merchantLoc = Alloy.Globals.Map.createAnnotation({
                        latitude: entry.latitude,
                        longitude: entry.longitude,
                        title: entry.clinicName,
                        image: "/images/marker.png",
                        animate: true,
                        subtitle: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
                        pincolor: Alloy.Globals.Map.ANNOTATION_RED,
                        rightView: detBtn,
                        panel_id: entry.id
                    });
                    $.mapview.addAnnotation(merchantLoc);
                    count++;
                }
            });
        }
        common.hideLoading();
        $.mapview.addEventListener("click", function(evt) {
            nav.navigateWithArgs("clinic/clinicDetails", {
                panel_id: evt.annotation.panel_id
            });
        });
    }
    function setCurLoc(e) {
        var region = {
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        };
        $.mapview.setLocation(region);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicLocator";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.clinicLocator = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Clinic Locator",
        id: "clinicLocator",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicLocator && $.addTopLevelView($.__views.clinicLocator);
    $.__views.btnList = Ti.UI.createImageView({
        right: 10,
        id: "btnList",
        width: 25,
        height: 25,
        image: "/images/list.png"
    });
    $.__views.clinicLocator.rightNavButton = $.__views.btnList;
    $.__views.win_map = Ti.UI.createView({
        id: "win_map",
        layout: "vertical"
    });
    $.__views.clinicLocator.add($.__views.win_map);
    $.__views.__alloyId633 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId633"
    });
    $.__views.win_map.add($.__views.__alloyId633);
    $.__views.__alloyId634 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId634"
    });
    $.__views.__alloyId633.add($.__views.__alloyId634);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId634.add($.__views.btnBack);
    $.__views.__alloyId635 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId635"
    });
    $.__views.__alloyId633.add($.__views.__alloyId635);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Locator",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId635.add($.__views.pageTitle);
    $.__views.__alloyId636 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId636"
    });
    $.__views.__alloyId633.add($.__views.__alloyId636);
    $.__views.btnList = Ti.UI.createImageView({
        right: 10,
        id: "btnList",
        width: 25,
        height: 25,
        image: "/images/list.png"
    });
    $.__views.__alloyId636.add($.__views.btnList);
    $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "mapview",
        regionFit: true,
        userLocation: true
    });
    $.__views.win_map.add($.__views.mapview);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicLocator.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId637 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId637"
    });
    $.__views.loadingBar.add($.__views.__alloyId637);
    $.__views.number_clinic = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        top: 0,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: "center",
        id: "number_clinic"
    });
    $.__views.loadingBar.add($.__views.number_clinic);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode") || "";
    args.location || "";
    var details;
    common.construct($);
    var longitude;
    var latitude;
    $.btnList.addEventListener("click", function() {
        nav.navigateWithArgs("clinic/clinicNearby", {
            longitude: longitude,
            latitude: latitude,
            clinicType: clinicType
        });
    });
    $.mapview.addEventListener("complete", initialized);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.clinicLocator);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;