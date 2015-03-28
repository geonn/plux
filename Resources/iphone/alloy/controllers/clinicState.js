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
                    height: 40,
                    source: entry.state,
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
                var stateLbl = Titanium.UI.createLabel({
                    text: entry.state,
                    font: {
                        fontSize: 16
                    },
                    source: entry.state,
                    color: "#848484",
                    width: "65%",
                    textAlign: "left",
                    top: 8,
                    left: 20,
                    height: 25
                });
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.state,
                    width: 15,
                    right: 20
                });
                row.add(stateLbl);
                row.add(rightForwardBtn);
                data.push(row);
            });
            TheTable.setData(data);
            $.panelClinicTbl.add(TheTable);
        }
        TheTable.addEventListener("click", function(e) {
            var nav = require("navigation");
            nav.navigateWithArgs("clinicListing", {
                state: e.rowData.source
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinicState";
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
    $.__views.panelClinicTbl = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic By State",
        id: "panelClinicTbl",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.panelClinicTbl && $.addTopLevelView($.__views.panelClinicTbl);
    $.__views.__alloyId7 = Ti.UI.createView({
        id: "__alloyId7"
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
    $.__views.__alloyId7.add($.__views.setting);
    $.__views.panelClinicTbl.rightNavButton = $.__views.__alloyId7;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var details = library.getPanelListByState();
    console.log(details);
    listing();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;