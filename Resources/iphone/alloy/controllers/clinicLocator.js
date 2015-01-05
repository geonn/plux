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
    $.__views.clinicLocator = Ti.UI.createWindow({
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
    $.__views.__alloyId2 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId2"
    });
    $.__views.clinicLocator.add($.__views.__alloyId2);
    $.__views.panelListTbl = Ti.UI.createScrollView({
        id: "panelListTbl",
        layout: "horizontal",
        height: "100%",
        width: "100%"
    });
    $.__views.__alloyId2.add($.__views.panelListTbl);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var details = library.getPanelList();
    $.activityIndicator.show();
    setTimeout(function() {
        panelListResult(details);
    }, 800);
    var panelListResult = function(details) {
        var TheTable = Titanium.UI.createTableView({
            width: "100%",
            separatorColor: "#ffffff"
        });
        var data = [];
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
        } else {
            arr.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 70,
                    source: entry.m_id,
                    selectedBackgroundColor: "#FFE1E1",
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#FEFEFB", "#F7F7F6" ],
                        startPoint: {
                            x: 0,
                            y: 0
                        },
                        endPoint: {
                            x: 0,
                            y: 70
                        },
                        backFillStart: false
                    }
                });
                var popUpTitle = Titanium.UI.createLabel({
                    text: entry.clinicName,
                    font: {
                        fontSize: 16
                    },
                    source: entry.id,
                    color: "#848484",
                    width: "65%",
                    textAlign: "left",
                    top: 8,
                    left: 20,
                    height: 25
                });
                var address = Titanium.UI.createLabel({
                    text: entry.add1 + ", " + entry.add2 + ", " + entry.city + ", " + entry.postcode + ", " + entry.state,
                    source: entry.id,
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    width: "auto",
                    color: "#848484",
                    textAlign: "left",
                    width: "85%",
                    bottom: 23,
                    left: 20,
                    height: 12
                });
                var tel = Titanium.UI.createLabel({
                    text: entry.tel,
                    source: entry.id,
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    width: "auto",
                    color: "#848484",
                    textAlign: "left",
                    bottom: 5,
                    left: 20,
                    height: 12
                });
                row.addEventListener("touchend", function() {});
                row.add(popUpTitle);
                row.add(address);
                row.add(tel);
                data.push(row);
            });
            TheTable.setData(data);
            $.panelListTbl.add(TheTable);
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;