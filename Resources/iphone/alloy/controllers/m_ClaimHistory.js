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
        backgroundColor: "#ffffff",
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
    var __alloyId156 = [];
    $.__views.__alloyId157 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId157"
    });
    __alloyId156.push($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createLabel({
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
        id: "__alloyId161"
    });
    $.__views.__alloyId159.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/27/2014, 12:00:00",
        id: "__alloyId162"
    });
    $.__views.__alloyId158.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
        id: "__alloyId163"
    });
    $.__views.__alloyId158.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
        id: "__alloyId164"
    });
    $.__views.__alloyId158.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId165"
    });
    __alloyId156.push($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId167"
    });
    $.__views.__alloyId166.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createLabel({
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
        id: "__alloyId169"
    });
    $.__views.__alloyId167.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/28/2014, 12:00:00",
        id: "__alloyId170"
    });
    $.__views.__alloyId166.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
        id: "__alloyId171"
    });
    $.__views.__alloyId166.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
        id: "__alloyId172"
    });
    $.__views.__alloyId166.add($.__views.__alloyId172);
    $.__views.__alloyId155 = Ti.UI.createTableView({
        data: __alloyId156,
        id: "__alloyId155"
    });
    $.__views.main.add($.__views.__alloyId155);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;