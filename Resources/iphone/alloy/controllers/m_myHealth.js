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
    this.__controllerPath = "m_myHealth";
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
    $.__views.m_myHealth = Ti.UI.createWindow({
        title: "MY HEALTH RECORD",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myHealth"
    });
    $.__views.m_myHealth && $.addTopLevelView($.__views.m_myHealth);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_myHealth.add($.__views.main);
    var __alloyId173 = [];
    $.__views.__alloyId174 = {
        properties: {
            title: "Body Measurements",
            mod: "Body Measurements",
            accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
            id: "__alloyId174"
        }
    };
    __alloyId173.push($.__views.__alloyId174);
    $.__views.__alloyId175 = {
        properties: {
            title: "Me",
            mod: "Me",
            accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
            id: "__alloyId175"
        }
    };
    __alloyId173.push($.__views.__alloyId175);
    $.__views.__alloyId176 = {
        properties: {
            title: "Vitals",
            mod: "Vitals",
            accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
            id: "__alloyId176"
        }
    };
    __alloyId173.push($.__views.__alloyId176);
    $.__views.__alloyId171 = Ti.UI.createListSection({
        title: "Health Data",
        id: "__alloyId171"
    });
    $.__views.__alloyId171.items = __alloyId173;
    var __alloyId177 = [];
    __alloyId177.push($.__views.__alloyId171);
    $.__views.__alloyId170 = Ti.UI.createListView({
        sections: __alloyId177,
        defaultItemTemplate: Titanium.UI.LIST_ITEM_TEMPLATE_SETTINGS,
        id: "__alloyId170"
    });
    $.__views.main.add($.__views.__alloyId170);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;