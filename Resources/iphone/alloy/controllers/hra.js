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
    var __alloyId67 = [];
    $.__views.__alloyId68 = {
        properties: {
            mod: "bmi",
            title: "BMI Calculator",
            id: "__alloyId68"
        }
    };
    __alloyId67.push($.__views.__alloyId68);
    $.__views.__alloyId69 = {
        properties: {
            mod: "whratio",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId69"
        }
    };
    __alloyId67.push($.__views.__alloyId69);
    $.__views.__alloyId70 = {
        properties: {
            mod: "nutritional_profile",
            title: "Nutritional Profile",
            id: "__alloyId70"
        }
    };
    __alloyId67.push($.__views.__alloyId70);
    $.__views.__alloyId71 = {
        properties: {
            mod: "smokecost",
            title: "Smoking Cost Calculator",
            id: "__alloyId71"
        }
    };
    __alloyId67.push($.__views.__alloyId71);
    $.__views.__alloyId72 = {
        properties: {
            mod: "diabetes",
            title: "Diabetes Risk Calculator",
            id: "__alloyId72"
        }
    };
    __alloyId67.push($.__views.__alloyId72);
    $.__views.__alloyId65 = Ti.UI.createListSection({
        id: "__alloyId65"
    });
    $.__views.__alloyId65.items = __alloyId67;
    var __alloyId73 = [];
    __alloyId73.push($.__views.__alloyId65);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId73,
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