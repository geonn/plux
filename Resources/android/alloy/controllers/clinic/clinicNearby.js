function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadClinic() {
        details = "hours24" == clinicType ? library.getPanelBy24Hours("", corp) : library.getPanelByClinicType(clinicType, "", corp);
        details && details.forEach(function(d) {
            aspClinicArr.push(d.id);
        });
        list = API.getNearbyClinic({
            longitude: longitude,
            latitude: latitude,
            clinicType: clinicType
        });
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
            $.clinicNearbySv.add(noRecord);
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
            $.clinicNearbySv.add(TheTable);
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
<<<<<<< HEAD
    $.__views.__alloyId610 = Ti.UI.createView({
=======
    $.__views.__alloyId608 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId610"
    });
    $.__views.win_map.add($.__views.__alloyId610);
    $.__views.__alloyId611 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId611"
    });
    $.__views.__alloyId610.add($.__views.__alloyId611);
=======
        id: "__alloyId608"
    });
    $.__views.win_map.add($.__views.__alloyId608);
    $.__views.__alloyId609 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId609"
    });
    $.__views.__alloyId608.add($.__views.__alloyId609);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId611.add($.__views.btnBack);
    $.__views.__alloyId612 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId612"
    });
    $.__views.__alloyId610.add($.__views.__alloyId612);
=======
    $.__views.__alloyId609.add($.__views.btnBack);
    $.__views.__alloyId610 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId610"
    });
    $.__views.__alloyId608.add($.__views.__alloyId610);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Nearby",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId612.add($.__views.pageTitle);
=======
    $.__views.__alloyId610.add($.__views.pageTitle);
>>>>>>> origin/master
    $.__views.clinicNearbySv = Ti.UI.createScrollView({
        id: "clinicNearbySv"
    });
    $.__views.win_map.add($.__views.clinicNearbySv);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicNearby.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId613 = Ti.UI.createLabel({
=======
    $.__views.__alloyId611 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId613"
    });
    $.__views.loadingBar.add($.__views.__alloyId613);
=======
        id: "__alloyId611"
    });
    $.__views.loadingBar.add($.__views.__alloyId611);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var longitude = args.longitude || "";
    var latitude = args.latitude || "";
    var clinicType = args.clinicType || "";
    var corp = Ti.App.Properties.getString("corpcode");
    var library = Alloy.createCollection("panelList");
    var list;
    var details;
    var aspClinicArr = [];
    "" != corp ? loadClinic() : list = API.getNearbyClinic({
        longitude: longitude,
        latitude: latitude,
        clinicType: clinicType
    });
    common.construct($);
    common.showLoading();
    Ti.App.addEventListener("updateNearbyList", listing);
    $.clinicNearby.addEventListener("close", function() {
        Ti.App.removeEventListener("updateNearbyList", listing);
        $.destroy();
        console.log("window close");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;