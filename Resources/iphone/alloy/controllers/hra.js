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
    this.__controllerPath = "hra";
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
    $.__views.hra = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Health Risk Assessment",
        id: "hra",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.hra && $.addTopLevelView($.__views.hra);
    var __alloyId135 = [];
    $.__views.__alloyId136 = {
        properties: {
            mod: "bmi",
            title: "BMI Calculator",
            id: "__alloyId136"
        }
    };
    __alloyId135.push($.__views.__alloyId136);
    $.__views.__alloyId137 = {
        properties: {
            mod: "whratio",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId137"
        }
    };
    __alloyId135.push($.__views.__alloyId137);
    $.__views.__alloyId138 = {
        properties: {
            mod: "nutritional_profile",
            title: "Nutritional Profile",
            id: "__alloyId138"
        }
    };
    __alloyId135.push($.__views.__alloyId138);
    $.__views.__alloyId139 = {
        properties: {
            mod: "smokecost",
            title: "Smoking Cost Calculator",
            id: "__alloyId139"
        }
    };
    __alloyId135.push($.__views.__alloyId139);
    $.__views.__alloyId140 = {
        properties: {
            mod: "diabetes",
            title: "Diabetes Risk Calculator",
            id: "__alloyId140"
        }
    };
    __alloyId135.push($.__views.__alloyId140);
    $.__views.__alloyId133 = Ti.UI.createListSection({
        id: "__alloyId133"
    });
    $.__views.__alloyId133.items = __alloyId135;
    var __alloyId141 = [];
    __alloyId141.push($.__views.__alloyId133);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId141,
        id: "menu"
    });
    $.__views.hra.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        nav.navigateWithArgs("hra_detail", {
            mod: item.properties.mod
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;