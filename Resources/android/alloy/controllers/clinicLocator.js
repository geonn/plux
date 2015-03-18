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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    console.log(args.id);
    var library = Alloy.createCollection("panelList");
    var details = library.getPanelList();
    if (args.id) var clinic = library.getPanelListById(args.id);
    var showCurLoc = false;
    $.activityIndicator.show();
    var saveCurLoc = function(e) {
        if (e.error) ; else {
            showCurLoc = true;
            console.log("set current loc" + e.coords);
            Ti.App.Properties.setString("latitude", e.coords.latitude);
            Ti.App.Properties.setString("longitude", e.coords.longitude);
        }
    };
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
        Ti.Geolocation.addEventListener("location", saveCurLoc);
    } else alert("Please enable location services");
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
                image: "/images/marker.png",
                subtitle: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
                pincolor: Alloy.Globals.Map.ANNOTATION_RED,
                myid: entry.id
            });
            $.mapview.addAnnotation(merchantLoc);
        });
        if (args.id) $.mapview.region = {
            latitude: clinic.latitude,
            longitude: clinic.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        }; else {
            console.log(showCurLoc);
            if (true == showCurLoc && !args.id) {
                var lat = Ti.App.Properties.getString("latitude");
                var lgt = Ti.App.Properties.getString("longitude");
                {
                    Alloy.Globals.Map.createAnnotation({
                        latitude: lat,
                        longitude: lgt,
                        title: "Current Location",
                        subtitle: "",
                        pincolor: Alloy.Globals.Map.ANNOTATION_GREEN,
                        myid: 99
                    });
                }
                $.mapview.region = {
                    latitude: lat,
                    longitude: lgt,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                };
            }
        }
    };
    $.mapview.addEventListener("click", function(evt) {
        console.log("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;