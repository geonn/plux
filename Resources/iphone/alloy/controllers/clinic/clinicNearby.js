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
        var details = e.details;
        details && details.forEach(function(d) {
            aspClinicArr.push(d.id);
        });
        list = API.getNearbyClinic({
            longitude: longitude,
            latitude: latitude,
            clinicType: clinicType
        });
        Ti.App.removeEventListener("aspClinic", loadClinic);
    }
    function listing(e) {
        var TheTable = Titanium.UI.createTableView({
            width: "100%",
            height: "auto"
        });
        var data = [];
        var arr = e.data;
        if (arr.length < 1) {
            var noRecord = Ti.UI.createLabel({
                text: "No clinic found nearby",
                color: "#CE1D1C",
                textAlign: "center",
                font: {
                    fontSize: 14,
                    fontStyle: "italic"
                },
                top: 15,
                width: Ti.UI.SIZE
            });
            $.clinicNearby.add(noRecord);
        } else {
            arr.forEach(function(entry) {
                var isValid = aspClinicArr.indexOf(entry.id);
                if ("-1" != isValid || "" == corp) {
                    var row = Titanium.UI.createTableViewRow({
                        touchEnabled: true,
                        height: Ti.UI.SIZE,
                        source: entry.id,
                        selectedBackgroundColor: "#FFE1E1"
                    });
                    var contentView = Ti.UI.createView({
                        layout: "vertical",
                        height: Ti.UI.SIZE,
                        width: Ti.UI.FILL
                    });
                    var clinicLbl = Titanium.UI.createLabel({
                        text: entry.clinicname,
                        font: {
                            fontSize: 16
                        },
                        source: entry.id,
                        color: "#CE1D1C",
                        textAlign: "left",
                        top: 5,
                        left: 15,
                        width: "80%",
                        height: Ti.UI.SIZE
                    });
                    contentView.add(clinicLbl);
                    var mobileLbl = Titanium.UI.createLabel({
                        text: "Tel: " + entry.tel,
                        font: {
                            fontSize: 14
                        },
                        source: entry.id,
                        color: "#848484",
                        textAlign: "left",
                        left: 15,
                        height: Ti.UI.SIZE
                    });
                    contentView.add(mobileLbl);
                    var distLbl = Titanium.UI.createLabel({
                        text: "Within " + entry.distance,
                        font: {
                            fontSize: 14
                        },
                        source: entry.id,
                        color: "#848484",
                        textAlign: "left",
                        left: 15,
                        bottom: 5,
                        height: Ti.UI.SIZE
                    });
                    contentView.add(distLbl);
                    var rightForwardBtn = Titanium.UI.createImageView({
                        image: "/images/btn-forward.png",
                        source: entry.id,
                        width: 15,
                        right: 20
                    });
                    row.add(contentView);
                    row.add(rightForwardBtn);
                    data.push(row);
                }
            });
            TheTable.setData(data);
            $.clinicNearby.add(TheTable);
        }
        common.hideLoading();
        TheTable.addEventListener("click", function(e) {
            nav.navigateWithArgs("clinic/clinicDetails", {
                panel_id: e.rowData.source
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicNearby";
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
    $.__views.clinicNearby = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic Nearby",
        id: "clinicNearby",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicNearby && $.addTopLevelView($.__views.clinicNearby);
    $.__views.win_map = Ti.UI.createView({
        id: "win_map",
        layout: "vertical"
    });
    $.__views.clinicNearby.add($.__views.win_map);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicNearby.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId153 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId153"
    });
    $.__views.loadingBar.add($.__views.__alloyId153);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var longitude = args.longitude || "";
    var latitude = args.latitude || "";
    var clinicType = args.clinicType || "";
    var corp = Ti.App.Properties.getString("corpcode");
    var list;
    "" != corp ? API.loadPanelList({
        clinicType: clinicType
    }) : list = API.getNearbyClinic({
        longitude: longitude,
        latitude: latitude,
        clinicType: clinicType
    });
    var aspClinicArr = [];
    common.construct($);
    common.showLoading();
    Ti.App.addEventListener("updateNearbyList", listing);
    Ti.App.addEventListener("aspClinic", loadClinic);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;