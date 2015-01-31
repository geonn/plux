function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function report(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    }
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
    var __defers = {};
    $.__views.clinicLocator = Ti.UI.createWindow({
        fullscreen: true,
        title: "Clinic Locator",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "clinicLocator"
    });
    $.__views.clinicLocator && $.addTopLevelView($.__views.clinicLocator);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.clinicLocator.add($.__views.main);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId0"
    });
    $.__views.main.add($.__views.__alloyId0);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        top: "100",
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicLocator.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId1"
    });
    $.__views.loadingBar.add($.__views.__alloyId1);
    $.__views.mapview = Alloy.Globals.Map.createView({
        id: "mapview"
    });
    $.__views.clinicLocator.add($.__views.mapview);
    report ? $.__views.mapview.addEventListener("click", report) : __defers["$.__views.mapview!click!report"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var details = library.getPanelList();
    var showCurLoc = false;
    $.activityIndicator.show();
    var saveCurLoc = function(e) {
        if (e.error) ; else {
            showCurLoc = true;
            Ti.App.Properties.setString("latitude", e.coords.latitude);
            Ti.App.Properties.setString("longitude", e.coords.longitude);
        }
    };
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
        Ti.Geolocation.addEventListener("location", saveCurLoc);
    } else alert("Please enable location services");
    if (true == showCurLoc) {
        var currenLocation = Alloy.Globals.Map.createAnnotation({
            latitude: Ti.App.Properties.getString("latitude"),
            longitude: Ti.App.Properties.getString("longitude"),
            title: "Current Location",
            subtitle: "",
            pincolor: Alloy.Globals.Map.ANNOTATION_GREEN,
            myid: 99
        });
        $.mapview.addAnnotation(currenLocation);
    }
    if (true == showCurLoc) {
        var currenLocation = Alloy.Globals.Map.createAnnotation({
            latitude: Ti.App.Properties.getString("latitude"),
            longitude: Ti.App.Properties.getString("longitude"),
            title: "Current Location",
            subtitle: "",
            pincolor: Alloy.Globals.Map.ANNOTATION_GREEN,
            myid: 99
        });
        $.mapview.addAnnotation(currenLocation);
    }
    setTimeout(function() {
        panelListResult(details);
    }, 800);
    var panelListResult = function(details) {
        Titanium.UI.createTableView({
            width: "100%",
            separatorColor: "#ffffff"
        });
        $.loadingBar.height = "0";
        $.loadingBar.top = "0";
        var arr = details;
        if (arr.length < 1) {
            var noRecord = Ti.UI.createLabel({
                text: "No record found",
                color: "#CE1D1C",
                textAlign: "center",
                font: {
                    fontSize: 14,
                    fontStyle: "italic"
                },
                top: 15,
                width: Ti.UI.SIZE
            });
            $.panelListTbl.add(noRecord);
        } else arr.forEach(function(entry) {
            var merchantLoc = Alloy.Globals.Map.createAnnotation({
                latitude: entry.latitude,
                longitude: entry.longitude,
                title: entry.clinicname,
                subtitle: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
                pincolor: Alloy.Globals.Map.ANNOTATION_RED,
                myid: entry.id
            });
            $.mapview.region = {
                latitude: entry.latitude,
                longitude: entry.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            };
            $.mapview.addAnnotation(merchantLoc);
        });
    };
    __defers["$.__views.mapview!click!report"] && $.__views.mapview.addEventListener("click", report);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;