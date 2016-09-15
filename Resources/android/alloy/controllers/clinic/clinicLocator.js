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
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;
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
        "" != details && details.forEach(function(entry) {
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
                    panel_id: entry.id
                });
                mapview.addAnnotation(merchantLoc);
            }
        });
        common.hideLoading();
        $.win_map.add(mapview);
        mapview.addEventListener("click", function(evt) {
            nav.navigateWithArgs("clinic/clinicDetails", {
                panel_id: evt.annotation.panel_id
            });
        });
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
<<<<<<< HEAD
    $.__views.__alloyId601 = Ti.UI.createView({
=======
    $.__views.__alloyId599 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId601"
    });
    $.__views.win_map.add($.__views.__alloyId601);
    $.__views.__alloyId602 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId602"
    });
    $.__views.__alloyId601.add($.__views.__alloyId602);
=======
        id: "__alloyId599"
    });
    $.__views.win_map.add($.__views.__alloyId599);
    $.__views.__alloyId600 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId600"
    });
    $.__views.__alloyId599.add($.__views.__alloyId600);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId602.add($.__views.btnBack);
    $.__views.__alloyId603 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId603"
    });
    $.__views.__alloyId601.add($.__views.__alloyId603);
=======
    $.__views.__alloyId600.add($.__views.btnBack);
    $.__views.__alloyId601 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId601"
    });
    $.__views.__alloyId599.add($.__views.__alloyId601);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId603.add($.__views.pageTitle);
    $.__views.__alloyId604 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId604"
    });
    $.__views.__alloyId601.add($.__views.__alloyId604);
=======
    $.__views.__alloyId601.add($.__views.pageTitle);
    $.__views.__alloyId602 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId602"
    });
    $.__views.__alloyId599.add($.__views.__alloyId602);
>>>>>>> origin/master
    $.__views.btnList = Ti.UI.createImageView({
        right: 10,
        id: "btnList",
        width: 25,
        height: 25,
        image: "/images/list.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId604.add($.__views.btnList);
=======
    $.__views.__alloyId602.add($.__views.btnList);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId605 = Ti.UI.createLabel({
=======
    $.__views.__alloyId603 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId605"
    });
    $.__views.loadingBar.add($.__views.__alloyId605);
=======
        id: "__alloyId603"
    });
    $.__views.loadingBar.add($.__views.__alloyId603);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode") || "";
    args.location || "";
    var details;
    common.construct($);
    initialized();
    var longitude;
    var latitude;
    $.btnList.addEventListener("click", function() {
        nav.navigateWithArgs("clinic/clinicNearby", {
            longitude: longitude,
            latitude: latitude,
            clinicType: clinicType
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.clinicLocator);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;