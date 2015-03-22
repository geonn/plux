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
    this.__controllerPath = "m_ClaimHistory";
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
    $.__views.m_ClaimHistory = Ti.UI.createWindow({
        fullscreen: true,
        title: "My Claim History",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_ClaimHistory"
    });
    $.__views.m_ClaimHistory && $.addTopLevelView($.__views.m_ClaimHistory);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.m_ClaimHistory.add($.__views.main);
    var __alloyId216 = [];
    $.__views.__alloyId217 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId217"
    });
    __alloyId216.push($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId219"
    });
    $.__views.__alloyId218.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
        id: "__alloyId220"
    });
    $.__views.__alloyId219.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        widht: 70,
        top: 0,
        font: {
            fontSize: 16
        },
        color: "#ff0000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "RM 55.00",
        id: "__alloyId221"
    });
    $.__views.__alloyId219.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/27/2014, 12:00:00",
        id: "__alloyId222"
    });
    $.__views.__alloyId218.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
        id: "__alloyId223"
    });
    $.__views.__alloyId218.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
        id: "__alloyId224"
    });
    $.__views.__alloyId218.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId225"
    });
    __alloyId216.push($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
        id: "__alloyId226"
    });
    $.__views.__alloyId225.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
        id: "__alloyId228"
    });
    $.__views.__alloyId227.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        widht: 70,
        top: 0,
        font: {
            fontSize: 16
        },
        color: "#ff0000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "RM 30.00",
        id: "__alloyId229"
    });
    $.__views.__alloyId227.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/28/2014, 12:00:00",
        id: "__alloyId230"
    });
    $.__views.__alloyId226.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
        id: "__alloyId231"
    });
    $.__views.__alloyId226.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
        id: "__alloyId232"
    });
    $.__views.__alloyId226.add($.__views.__alloyId232);
    $.__views.__alloyId215 = Ti.UI.createTableView({
        data: __alloyId216,
        id: "__alloyId215"
    });
    $.__views.main.add($.__views.__alloyId215);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;