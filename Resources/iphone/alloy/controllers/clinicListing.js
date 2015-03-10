function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function listing() {
        var TheTable = Titanium.UI.createTableView({
            width: "100%",
            separatorColor: "#ffffff"
        });
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
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 70,
                    id: entry.id,
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
                row.add(popUpTitle);
                row.add(address);
                row.add(tel);
                data.push(row);
            });
            TheTable.setData(data);
            $.panelListTbl.add(TheTable);
        }
        TheTable.addEventListener("click", function(e) {
            var nav = require("navigation");
            nav.navigateWithArgs("clinicLocator", {
                id: e.rowData.id
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinicListing";
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
    $.__views.panelListTbl = Ti.UI.createWindow({
        fullscreen: true,
        title: "Clinic Locator",
        id: "panelListTbl",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.panelListTbl && $.addTopLevelView($.__views.panelListTbl);
    $.__views.__alloyId2 = Ti.UI.createView({
        id: "__alloyId2"
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
    $.__views.__alloyId2.add($.__views.setting);
    $.__views.panelListTbl.rightNavButton = $.__views.__alloyId2;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var details = library.getPanelList();
    listing();
    $.setting.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigationWindow("clinicLocator");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;