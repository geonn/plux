function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doRefresh() {
        API.loadPanelList({
            clinicType: ""
        });
    }
    function listing() {
        var data = [];
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
        } else {
            arr.forEach(function(entry) {
                var myClinicType = entry.clinicType;
                "hours24" == entry.clinicType && (myClinicType = "24 HOURS");
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 70,
                    id: entry.clinicType,
                    backgroundSelectedColor: "#FFE1E1",
                    backgroundColor: "#ffffff"
                });
                var clinicImg = entry.clinicType;
                clinicImg = clinicImg.toLowerCase();
                var leftImage = Titanium.UI.createView({
                    backgroundImage: "/images/" + clinicImg + ".png",
                    width: 50,
                    height: 50,
                    left: 10
                });
                var popUpTitle = Titanium.UI.createLabel({
                    text: myClinicType,
                    font: {
                        fontSize: 16
                    },
                    source: entry.clinicType,
                    color: "#848484",
                    width: "65%",
                    textAlign: "left",
                    left: 70,
                    height: 25
                });
                var totalPanel = Titanium.UI.createLabel({
                    text: entry.total,
                    source: entry.clinicType,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    width: "auto",
                    color: "#848484",
                    right: 50,
                    height: 25
                });
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.clinicType,
                    width: 15,
                    right: 20
                });
                row.add(leftImage);
                row.add(popUpTitle);
                row.add(totalPanel);
                row.add(rightForwardBtn);
                data.push(row);
            });
            $.tblview.setData(data);
        }
        common.hideLoading();
    }
    function init() {
        details = library.getCountClinicType(corp);
        details24 = library.getCount24Hours(corp);
        var det24 = {
            clinicType: "hours24",
            total: details24.total
        };
        details.splice(1, 0, det24);
        listing();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/listing";
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic Type List",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId250 = Ti.UI.createImageView({
        right: "10",
        width: "25",
        height: "25",
        image: "/images/icon_refresh.png",
        id: "__alloyId250"
    });
    doRefresh ? $.addListener($.__views.__alloyId250, "click", doRefresh) : __defers["$.__views.__alloyId250!click!doRefresh"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId250;
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.win.add($.__views.panelListTbl);
    $.__views.tblview = Ti.UI.createTableView({
        id: "tblview",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: "0"
    });
    $.__views.panelListTbl.add($.__views.tblview);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.win.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId251 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId251"
    });
    $.__views.loadingBar.add($.__views.__alloyId251);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode") || "";
    Ti.App.Properties.getString("memno");
    var details;
    common.construct($);
    common.showLoading();
    init();
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("aspClinic", listing);
        details = null;
        details24 = null;
        det24 = null;
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("aspClinic", init);
    $.tblview.addEventListener("click", function(e) {
        var nav = require("navigation");
        nav.navigateWithArgs("clinic/clinicList", {
            clinicType: e.rowData.id
        });
    });
    __defers["$.__views.__alloyId250!click!doRefresh"] && $.addListener($.__views.__alloyId250, "click", doRefresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;