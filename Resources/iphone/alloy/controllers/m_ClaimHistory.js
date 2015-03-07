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
    var __alloyId172 = [];
    $.__views.__alloyId173 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId173"
    });
    __alloyId172.push($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
        id: "__alloyId174"
    });
    $.__views.__alloyId173.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createLabel({
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
        id: "__alloyId177"
    });
    $.__views.__alloyId175.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 11
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/27/2014, 12:00:00",
        id: "__alloyId178"
    });
    $.__views.__alloyId174.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
        id: "__alloyId179"
    });
    $.__views.__alloyId174.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
        id: "__alloyId180"
    });
    $.__views.__alloyId174.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId181"
    });
    __alloyId172.push($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
        id: "__alloyId182"
    });
    $.__views.__alloyId181.add($.__views.__alloyId182);
    $.__views.__alloyId183 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId183"
    });
    $.__views.__alloyId182.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
        id: "__alloyId184"
    });
    $.__views.__alloyId183.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createLabel({
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
        id: "__alloyId185"
    });
    $.__views.__alloyId183.add($.__views.__alloyId185);
    $.__views.__alloyId186 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 11
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/28/2014, 12:00:00",
        id: "__alloyId186"
    });
    $.__views.__alloyId182.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
        id: "__alloyId187"
    });
    $.__views.__alloyId182.add($.__views.__alloyId187);
    $.__views.__alloyId188 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
        id: "__alloyId188"
    });
    $.__views.__alloyId182.add($.__views.__alloyId188);
    $.__views.__alloyId171 = Ti.UI.createTableView({
        data: __alloyId172,
        id: "__alloyId171"
    });
    $.__views.main.add($.__views.__alloyId171);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;